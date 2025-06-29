import React, { useState } from "react";
import CreateUserStep1 from "./CreateUserStep1";
import CreateUserStep2 from "./CreateUserStep2";

export default function CreateUserModal({
  isOpen,
  toggle,
  onCreate,
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    genero: "",
    fechaNacimiento: "",
    password: "",
    numeroTelefono: "",
    email: "",
    // campos internos para el backend
    estado: "Active",
    fechaCreacion: new Date().toISOString(),
    ultimoAcceso: new Date().toISOString(),
    rol: { rolId: 1, nombre: "Administrador" }, // puedes hacer dinámico si quieres
  });

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
      estado: "Active",
      fechaCreacion: new Date().toISOString(),
      ultimoAcceso: new Date().toISOString(),
      rol: { rolId: 1, nombre: "Admin" },
    });
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

  const handleSave = (data) => {
    const finalUser = { ...form, ...data };
    onCreate(finalUser); // <<--- este objeto ya va con la estructura que pide tu backend
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-0 relative animate-fade-in max-h-[90vh] overflow-y-auto">
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
            onBack={handleBack}
            onSave={handleSave}
            onCancel={handleClose}
          />
        )}
      </div>
    </div>
  );
}
