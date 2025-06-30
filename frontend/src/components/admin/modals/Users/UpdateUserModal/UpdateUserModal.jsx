import React, { useState, useEffect } from "react";
import UpdateUserStep1 from "./UpdateUserStep1";
import UpdateUserStep2 from "./UpdateUserStep2";
import api from "../../../../../services/axios";
import { authService } from "../../../../../services/authService";

function mapUserApiToUi(user) {
  if (!user) return {};
  let rolId = null;
  if (user.rol && (user.rol.rolId || user.rol.id)) {
    rolId = user.rol.rolId || user.rol.id;
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

  async function updateUserWithAssociations(
    userData,
    categoriaNombre,
    habilidadesIds,
    categoriesList,
    rolNombre
  ) {
    console.log("=== INICIANDO ACTUALIZACIÓN DE USUARIO ===");
    console.log("Usuario ID:", userData.usuarioId);
    console.log("Categoría objetivo:", categoriaNombre);
    console.log("Skills objetivo:", habilidadesIds);

    try {
      const nowISO = new Date().toISOString();

      let rolId = null;
      if (rolNombre) {
        const rol = roles.find((r) => r.nombre === rolNombre);
        if (rol) {
          rolId = Number(rol.id || rol.rolId);
        } else {
          console.warn("No se encontró el rol para asociar:", rolNombre);
        }
      }

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
        rol: rolId !== null ? { rolId } : null,
        // Enviar la categoría y habilidades también si el backend lo espera en el PUT
        categoria: categoriesList.find((cat) => (cat.nombre || cat.name) === categoriaNombre) || null,
        habilidades: habilidadesIds || [],
      };

      console.log("=== ACTUALIZANDO DATOS BÁSICOS DEL USUARIO ===");
      await api.put(`/usuario/${userData.usuarioId}`, updateUserBody);
      console.log("✅ Usuario básico actualizado");

      // === MANEJO DE CATEGORÍAS ===
      console.log("=== GESTIONANDO CATEGORÍAS ===");
      
      // PASO 1: Obtener TODAS las categorías actuales del usuario
      let currentCategoriasIds = [];
      try {
        const res = await api.get(`/category/user/${userData.usuarioId}`);
        console.log("Respuesta de categorías actuales:", res.data);
        
        if (res.data) {
          if (Array.isArray(res.data)) {
            // Si devuelve un array de categorías
            currentCategoriasIds = res.data.map(cat => cat.categoriaId || cat.id);
          } else if (res.data.categoriaId || res.data.id) {
            // Si devuelve una sola categoría
            currentCategoriasIds = [res.data.categoriaId || res.data.id];
          }
        }
      } catch (e) {
        console.warn("Error al obtener categorías actuales:", e);
        // Intentar otro endpoint si existe
        try {
          const res2 = await api.get(`/usuario/${userData.usuarioId}/categorias`);
          if (res2.data && Array.isArray(res2.data)) {
            currentCategoriasIds = res2.data.map(cat => cat.categoriaId || cat.id);
          }
        } catch (e2) {
          console.warn("Segundo intento de obtener categorías falló:", e2);
        }
      }

      console.log("Categorías actuales encontradas:", currentCategoriasIds);

      // PASO 2: Buscar la nueva categoría
      const categoria = categoriesList.find(
        (cat) => (cat.nombre || cat.name) === categoriaNombre
      );
      if (!categoria) {
        console.error("Categorías disponibles:", categoriesList.map(c => c.nombre || c.name));
        throw new Error(`Categoría "${categoriaNombre}" no encontrada`);
      }
      const nuevaCategoriaId = categoria.id || categoria.categoriaId;
      console.log("Nueva categoría ID:", nuevaCategoriaId);

      // PASO 3: Remover TODAS las categorías actuales
      if (currentCategoriasIds.length > 0) {
        console.log("Removiendo todas las categorías actuales...");
        for (const catId of currentCategoriasIds) {
          try {
            await api.delete("/category/user/remover", {
              data: {
                usuarioId: userData.usuarioId,
                categoriaId: catId,
              },
            });
            console.log(`✅ Categoría ${catId} removida exitosamente`);
          } catch (e) {
            console.warn(`⚠️ No se pudo remover la categoría ${catId}:`, e.response?.data || e.message);
          }
        }
      }

      // PASO 4: Asociar la nueva categoría
      try {
        console.log("Asociando nueva categoría...");
        await api.post("/category/user/asociar", {
          usuarioId: userData.usuarioId,
          categoriaId: nuevaCategoriaId,
        });
        console.log(`✅ Categoría ${nuevaCategoriaId} asociada exitosamente`);
      } catch (e) {
        console.error("❌ Error al asociar nueva categoría:", e.response?.data || e.message);
        throw new Error(`Error al asociar la categoría: ${e.response?.data?.message || e.message}`);
      }

      // === MANEJO DE SKILLS ===
      console.log("=== GESTIONANDO SKILLS ===");
      
      // PASO 1: Obtener TODAS las skills actuales del usuario
      let currentSkillIds = [];
      try {
        const res = await api.get(`/skills/usuario/${userData.usuarioId}`);
        console.log("Respuesta de skills actuales:", res.data);
        
        if (res.data && Array.isArray(res.data)) {
          currentSkillIds = res.data.map((h) => Number(h.skillId || h.id));
        }
      } catch (e) {
        console.warn("Error al obtener skills actuales:", e);
        // Intentar otro endpoint si existe
        try {
          const res2 = await api.get(`/usuario/${userData.usuarioId}/skills`);
          if (res2.data && Array.isArray(res2.data)) {
            currentSkillIds = res2.data.map((h) => Number(h.skillId || h.id));
          }
        } catch (e2) {
          console.warn("Segundo intento de obtener skills falló:", e2);
        }
      }

      console.log("Skills actuales encontradas:", currentSkillIds);
      
      const newSkillIds = habilidadesIds.map(id => Number(id));
      console.log("Skills nuevas:", newSkillIds);

      // PASO 2: Remover TODAS las skills actuales
      if (currentSkillIds.length > 0) {
        console.log("Removiendo todas las skills actuales...");
        for (const skillId of currentSkillIds) {
          try {
            await api.delete("/skills/user/remover", {
              data: {
                usuarioId: userData.usuarioId,
                skillId: skillId,
              },
            });
            console.log(`✅ Skill ${skillId} removida exitosamente`);
          } catch (e) {
            console.warn(`⚠️ No se pudo remover la skill ${skillId}:`, e.response?.data || e.message);
          }
        }
      }

      // PASO 3: Asociar las nuevas skills
      if (newSkillIds.length > 0) {
        console.log("Asociando nuevas skills...");
        for (const skillId of newSkillIds) {
          try {
            await api.post("/skills/user/asociar", {
              usuarioId: userData.usuarioId,
              skillId: skillId,
            });
            console.log(`✅ Skill ${skillId} asociada exitosamente`);
          } catch (e) {
            console.error(`❌ Error al asociar skill ${skillId}:`, e.response?.data || e.message);
            // Continuar con las demás skills
          }
        }
      }

      console.log("=== ACTUALIZACIÓN COMPLETADA EXITOSAMENTE ===");

    } catch (error) {
      console.error("❌ ERROR GENERAL en updateUserWithAssociations:", error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "";
        const fullError = error.response.data;
        
        console.error("Status:", status);
        console.error("Message:", message);
        console.error("Full error:", fullError);
        
        if (status === 400 || status === 409) {
          if (message.includes("cedula") || message.includes("cédula")) {
            throw new Error("La cédula ya está registrada.");
          } else if (message.includes("email") || message.includes("correo")) {
            throw new Error("El correo electrónico ya está registrado.");
          } else if (message.includes("numeroTelefono") || message.includes("teléfono")) {
            throw new Error("El número de teléfono ya está registrado.");
          } else if (message.includes("categoría") || message.includes("category")) {
            throw new Error(`Error con categoría: ${message}`);
          } else if (message.includes("skill") || message.includes("habilidad")) {
            throw new Error(`Error con habilidades: ${message}`);
          } else {
            throw new Error(`Error ${status}: ${message}`);
          }
        } else {
          throw new Error(`Error ${status}: ${message}`);
        }
      } else {
        throw new Error("Error de conexión: " + error.message);
      }
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