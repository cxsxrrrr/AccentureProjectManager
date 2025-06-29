import React, { useState, useEffect } from "react";
import CreateUserStep1 from "./CreateUserStep1";
import CreateUserStep2 from "./CreateUserStep2";
import api from "../../../../../services/axios";
import { authService } from "../../../../../services/authService";

export default function CreateUserModal({
  isOpen,
  toggle,
  onCreate,
}) {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    genero: "",
    fechaNacimiento: "",
    password: "",
    numeroTelefono: "",
    email: "",
    categoria: "",
    habilidades: [],
    estado: "Active",
    fechaCreacion: new Date().toISOString(),
    ultimoAcceso: new Date().toISOString(),
  });

  useEffect(() => {
    if (isOpen) {
      loadCategoriesAndSkills();
    }
  }, [isOpen]);

  const loadCategoriesAndSkills = async () => {
    try {
      setIsLoadingData(true);
      setDataError(null);

      if (!authService.isAuthenticated()) {
        throw new Error('No authenticated');
      }

      const [categoriesResponse, skillsResponse] = await Promise.all([
        api.get('/category'),
        api.get('/skills'),
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
      } else if (err.message === 'No authenticated') {
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
    setForm({
      nombre: "",
      apellido: "",
      cedula: "",
      genero: "",
      fechaNacimiento: "",
      password: "",
      numeroTelefono: "",
      email: "",
      categoria: "",
      habilidades: [],
      estado: "Active",
      fechaCreacion: new Date().toISOString(),
      ultimoAcceso: new Date().toISOString(),
    });
    setCategories([]);
    setSkills([]);
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

  async function createUserWithAssociations(userData, categoriaNombre, habilidadesIds, categoriesList) {
    try {
      const nowISO = new Date().toISOString();
      const createUserBody = {
        nombre: userData.nombre,
        apellido: userData.apellido,
        numeroTelefono: userData.numeroTelefono,
        cedula: userData.cedula,
        genero: userData.genero,
        fechaNacimiento: userData.fechaNacimiento,
        email: userData.email,
        password: userData.password,
        estado: "Activo",
        fechaCreacion: nowISO,
        ultimoAcceso: nowISO,
      };

      const userResponse = await api.post("/auth/register", createUserBody);
      const createdUser = userResponse.data;
      const usuarioId = createdUser.usuarioId || createdUser.id;

      if (!usuarioId) throw new Error("No se recibió ID del usuario creado");

      const categoria = categoriesList.find(
        (cat) => (cat.nombre || cat.name) === categoriaNombre
      );
      if (!categoria) throw new Error("Categoría no encontrada");

      await api.post("/category/user/asociar", {
        usuarioId,
        categoriaId: categoria.id || categoria.categoriaId,
      });

      for (const skillId of habilidadesIds) {
        await api.post("/skills/user/asociar", {
          usuarioId,
          skillId,
        });
      }

      return createdUser;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "";

        if (status === 400 || status === 409) {
          if (message.includes("cedula")) {
            throw new Error("La cédula ya está registrada.");
          } else if (message.includes("email")) {
            throw new Error("El correo electrónico ya está registrado.");
          } else if (message.includes("numeroTelefono")) {
            throw new Error("El número de teléfono ya está registrado.");
          } else {
            throw new Error("Datos inválidos o duplicados.");
          }
        } else {
          throw new Error("Error en la solicitud: " + message);
        }
      } else {
        throw new Error("Error desconocido al crear usuario.");
      }
    }
  }

  const handleSave = async (data) => {
    const finalUser = { ...form, ...data };

    try {
      setIsLoadingData(true);
      await createUserWithAssociations(finalUser, finalUser.categoria, finalUser.habilidades, categories);
      alert("Usuario creado correctamente");
      onCreate();
      handleClose();
    } catch (err) {
      alert("Error al crear usuario: " + err.message);
    } finally {
      setIsLoadingData(false);
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

        {isLoadingData && (
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">Loading categories and skills...</span>
            </div>
          </div>
        )}

        {step === 1 && (
          <CreateUserStep1
            values={form}
            onNext={handleNext}
            onCancel={handleClose}
          />
        )}

        {step === 2 && (
          <CreateUserStep2
            values={form}
            categories={categories}
            skills={skills}
            isLoadingData={isLoadingData}
            onBack={handleBack}
            onSave={handleSave}
            onCancel={handleClose}
          />
        )}
      </div>
    </div>
  );
}
