import React, { useState, useEffect } from "react";
import UpdateUserStep1 from "./UpdateUserStep1";
import UpdateUserStep2 from "./UpdateUserStep2";
import api from "../../../../../services/axios";
import { authService } from "../../../../../services/authService";

function mapUserApiToUi(user) {
  if (!user) return {};
  let rolId = null;
  // Cambia: si user.rol existe y tiene rolId válido, usa ese, si no, pon "" (string vacío)
  if (user.rol && (user.rol.rolId || user.rol.id)) {
    rolId = user.rol.rolId || user.rol.id;
  } else {
    rolId = ""; // Para que el select de rol nunca sea null
  }
  return {
    usuarioId: user.usuarioId || user.id,
    nombre: user.nombre || "",
    apellido: user.apellido || "",
    fechaNacimiento: user.fechaNacimiento
      ? user.fechaNacimiento.substring(0, 10)
      : "",
    genero: user.genero || "",
    cedula: user.cedula || "",
    password: "",
    email: user.email || "",
    numeroTelefono: user.numeroTelefono || "",
    categoria: user.categoria?.nombre || user.categoria || "", // cargar nombre categoría
    habilidades: user.habilidades?.map((h) => h.skillId || h.id) || [],
    estado: user.estado || "Activo",
    rol: rolId,
  };
}

export default function UpdateUserModal({
  isOpen,
  toggle,
  user,
  categories: categoriesProp,
  skills: skillsProp,
  onUpdate,
}) {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState(categoriesProp || []);
  const [skills, setSkills] = useState(skillsProp || []);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);
  const [form, setForm] = useState(mapUserApiToUi(user));
  const [isUpdating, setIsUpdating] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUserAndData = async () => {
      if (isOpen && user && user.usuarioId) {
        setIsLoadingData(true);
        try {
          const res = await api.get(`/usuario/${user.usuarioId}`);
          setForm(mapUserApiToUi(res.data));
        } catch (e) {
          setForm(mapUserApiToUi(user));
        }
        await loadCategoriesAndSkills();
        await loadRoles();
        setStep(1);
        setIsLoadingData(false);
      } else if (isOpen) {
        setForm(mapUserApiToUi(user));
        await loadCategoriesAndSkills();
        await loadRoles();
        setStep(1);
        setIsLoadingData(false);
      }
    };
    fetchUserAndData();
  }, [isOpen, user]);

  const loadRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data);
    } catch (err) {
      console.error("Error loading roles:", err);
    }
  };

  useEffect(() => {
    setCategories(categoriesProp || []);
    setSkills(skillsProp || []);
  }, [categoriesProp, skillsProp]);

  const loadCategoriesAndSkills = async () => {
    try {
      setIsLoadingData(true);
      setDataError(null);
      if (!authService.isAuthenticated()) {
        throw new Error("No authenticated");
      }
      const [categoriesResponse, skillsResponse] = await Promise.all([
        api.get("/category"),
        api.get("/skills"),
      ]);
      setCategories(categoriesResponse.data);
      setSkills(skillsResponse.data);
    } catch (err) {
      console.error("Error loading categories and skills:", err);
      if (err.response?.status === 401) {
        setDataError("Session expired. Please login again.");
        authService.logout();
      } else if (err.response?.status === 403) {
        setDataError("You don't have permission to access this data.");
      } else if (err.message === "No authenticated") {
        setDataError("Please login to continue.");
        authService.logout();
      } else {
        setDataError("Error loading data. Please try again.");
      }
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setForm(mapUserApiToUi(user));
    setCategories(categoriesProp || []);
    setSkills(skillsProp || []);
    setDataError(null);
    toggle();
  };

  const handleNext = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleBack = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(1);
  };

  // --- ACTUALIZAR USUARIO Y ASOCIACIONES ---
  async function updateUserWithAssociations(
    userData,
    categoriaNombre,
    habilidadesIds,
    categoriesList,
    rolId // ahora recibe el ID directamente
  ) {
    try {
      const nowISO = new Date().toISOString();
      // --- Determinar el ID del rol correctamente y evitar null ---
      let realRolId = null;
      if (typeof rolId === "object" && rolId !== null && typeof rolId.rolId !== "undefined" && rolId.rolId !== null && rolId.rolId !== "") {
        realRolId = rolId.rolId;
      } else if (
        (typeof rolId === "number" || typeof rolId === "string") &&
        rolId !== "" &&
        rolId !== null &&
        rolId !== undefined
      ) {
        realRolId = rolId;
      }
      // --- Construir el body para el PUT ---
      const updateUserBody = {
        usuarioId: userData.usuarioId,
        nombre: userData.nombre,
        apellido: userData.apellido,
        numeroTelefono: userData.numeroTelefono,
        cedula: userData.cedula,
        genero: userData.genero,
        fechaNacimiento: userData.fechaNacimiento,
        email: userData.email,
        password: userData.password,
        estado: userData.estado || "Activo",
        fechaCreacion: userData.fechaCreacion || nowISO,
        ultimoAcceso: nowISO,
      };
      // Solo agrega el campo rol si es un número válido mayor a 0
      if (realRolId && !isNaN(Number(realRolId)) && Number(realRolId) > 0) {
        updateUserBody.rol = { rolId: Number(realRolId) };
      }
      await api.put(`/usuario/${userData.usuarioId}`, updateUserBody);
      // --- Actualizar categoría y skills si aplica (opcional, según backend) ---
      // ...existing code for category/skills association if needed...
    } catch (error) {
      throw error;
    }
  }

  const handleSave = async (data) => {
    const finalUser = { ...form, ...data };
    setIsUpdating(true);
    try {
      await updateUserWithAssociations(
        finalUser,
        finalUser.categoria,
        finalUser.habilidades,
        categories,
        finalUser.rol
      );
      alert("Usuario actualizado correctamente");
      if (onUpdate) onUpdate();
      setStep(1);
      toggle();
    } catch (err) {
      alert("Error al actualizar usuario: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRetryLoadData = () => {
    loadCategoriesAndSkills();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-0 relative animate-fade-in max-h-[90vh] overflow-y-auto">
        {dataError && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600">
                <span className="material-icons text-sm">error</span>
                <span className="text-sm font-medium">{dataError}</span>
              </div>
              <button
                onClick={handleRetryLoadData}
                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {isLoadingData ? (
          <div className="p-8 flex items-center justify-center">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-base">Cargando categorías y habilidades...</span>
            </div>
          </div>
        ) : (
          <>
            {step === 1 && (
              <UpdateUserStep1 values={form} onNext={handleNext} onCancel={handleClose} />
            )}
            {step === 2 && (
              <UpdateUserStep2
                values={form}
                categories={categories}
                skills={skills}
                roles={roles}
                isLoadingData={isLoadingData}
                onBack={handleBack}
                onSave={handleSave}
                onCancel={handleClose}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}