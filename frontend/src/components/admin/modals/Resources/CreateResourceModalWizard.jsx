import React, { useState } from "react";
import CreateResourceStep1 from "./CreateResourceStep1";
import CreateResourceStep2 from "./CreateResourceStep2";

const CreateResourceModalWizard = ({
  isOpen,
  onClose,
  onCreate, // recibe el objeto final creado
}) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    type: "",
    cost: "",
    availability: "",
    unit: "",
    description: "",
  });

  // Resetear cuando abres/cierra
  React.useEffect(() => {
    if (!isOpen) setForm({
      name: "",
      type: "",
      cost: "",
      availability: "",
      unit: "",
      description: "",
    });
    setStep(1);
  }, [isOpen]);

  if (!isOpen) return null;

  // Avanzar
  const handleNext = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  // Volver
  const handleBack = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(1);
  };

  // Guardar recurso nuevo
  const handleCreate = (data) => {
    const finalData = { ...form, ...data };
    onCreate(finalData);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-8 w-[500px]">
        {step === 1 && (
          <CreateResourceStep1
            values={form}
            onNext={handleNext}
            onCancel={onClose}
          />
        )}
        {step === 2 && (
          <CreateResourceStep2
            values={form}
            onBack={handleBack}
            onCreate={handleCreate}
            onCancel={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default CreateResourceModalWizard;
