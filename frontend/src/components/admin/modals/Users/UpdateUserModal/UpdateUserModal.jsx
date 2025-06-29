import React, { useState, useEffect } from "react";
import UpdateUserStep1 from "./UpdateUserStep1";
import UpdateUserStep2 from "./UpdateUserStep2";

// Función para transformar usuario body API -> UI fields
function mapUserApiToUi(user) {
  if (!user) return {};
  return {
    nombre: user.nombre || "",
    apellido: user.apellido || "",
    fechaNacimiento: user.fechaNacimiento ? user.fechaNacimiento.substring(0, 10) : "",
    genero: user.genero || "",
    cedula: user.cedula || "",
    password: user.password || "",
    email: user.email || "",
    numeroTelefono: user.numeroTelefono || "",
    categoria: user.categoria || "",
    habilidades: user.habilidades || [],
    estado: user.estado || "",
    rol: user.rol || {},
    // ...otros campos si tu API los maneja
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
  const [form, setForm] = useState(mapUserApiToUi(user));

  // Pre-carga datos del usuario seleccionado y mapea body API -> UI fields
  useEffect(() => {
    if (user) setForm(mapUserApiToUi(user));
  }, [user, isOpen]);

  if (!isOpen) return null;

  // Siguiente paso
  const handleNext = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  // Atrás
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
