import React, { useState, useEffect } from "react";
import UpdateUserStep1 from "./UpdateUserStep1";
import UpdateUserStep2 from "./UpdateUserStep2";

export default function UpdateUserModal({ isOpen, toggle, user, categories, skills, onUpdate }) {
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

  // Pre-carga datos del usuario seleccionado
  useEffect(() => {
    if (user) setForm({ ...form, ...user });
  // eslint-disable-next-line
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleNext = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleBack = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(1);
  };

  const handleSave = (data) => {
    const finalData = { ...form, ...data };
    onUpdate(finalData);
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
          onBack={handleBack}
          onSave={handleSave}
          onCancel={toggle}
        />
      )}
    </div>
  );
}
