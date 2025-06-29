import React, { useState, useEffect } from "react";
import UpdateUserStep1 from "./UpdateUserStep1";
import UpdateUserStep2 from "./UpdateUserStep2";
import api from "../../../../../services/axios";
import { authService } from "../../../../../services/authService";

function mapUserApiToUi(user) {
  if (!user) return {};
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
    categoria: user.categoria || "",
    habilidades: user.habilidades?.map((h) => h.skillId || h.id) || [],
    estado: user.estado || "Active",
  };
}

export default function UpdateUserModal({
  isOpen,
  toggle,
  user,
  categories,
  skills,
  roles,              // <-- Agregado: recibir roles
  onUpdate
}) {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);
  const [form, setForm] = useState(mapUserApiToUi(user));
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCategoriesAndSkills();
    }
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      setForm(mapUserApiToUi(user));
    }
  }, [user, isOpen]);

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
    setForm(mapUserApiToUi(user));
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

  // Guardar cambios - convierte UI fields -> body API (español)
  const handleSave = (data) => {
    const salida = {
      ...form,
      ...data,
      fechaNacimiento: form.fechaNacimiento, // ya está en formato yyyy-mm-dd
      cedula: Number(form.cedula),
      numeroTelefono: form.numeroTelefono,
      email: form.email,
      rol: { nombre: data.rol },            // <-- Aquí el objeto con nombre del rol
      // Puedes agregar el resto de campos aquí si tu modal los permite editar
    };
    onUpdate(salida);
    setStep(1);
    toggle();
  };

  const handleRetryLoadData = () => {
    loadCategoriesAndSkills();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {step === 1 && (
        <UpdateUserStep1
          values={form}
          onNext={handleNext}
          onCancel={toggle}
        />
      )}
      {step === 2 && (
        <UpdateUserStep2
          values={form}
          categories={categories}
          skills={skills}
          roles={roles}         // <-- Aquí pasas los roles
          onBack={handleBack}
          onSave={handleSave}
          onCancel={toggle}
        />
      )}
    </div>
  );
}