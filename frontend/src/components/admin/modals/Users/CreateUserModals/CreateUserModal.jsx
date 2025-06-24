import React, { useState } from "react";
import CreateUserStep1 from "./CreateUserStep1";
import CreateUserStep2 from "./CreateUserStep2";

export default function CreateUserModal({
  isOpen,
  toggle,
  onCreate,
  categories = [],
  skills = [],
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    docType: "",
    docNumber: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    selectedSkills: [],
  });

  // Reset form and step when closing
  const handleClose = () => {
    setStep(1);
    setForm({
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      docType: "",
      docNumber: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      selectedSkills: [],
    });
    toggle();
  };

  // Siguiente paso
  const handleNext = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  // Atrás al paso 1
  const handleBack = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(1);
  };

  // Guardar usuario (finalizar wizard)
  const handleSave = (data) => {
    const finalUser = { ...form, ...data };
    onCreate(finalUser); // Tu lógica de crear
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-0 relative animate-fade-in
                max-h-[90vh] overflow-y-auto"
      >
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
            onBack={handleBack}
            onSave={handleSave}
            onCancel={handleClose}
          />
        )}
      </div>
    </div>
  );
}
