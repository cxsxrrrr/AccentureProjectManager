import React, { useState, useEffect } from "react";
import UpdateResourceStep1 from "./UpdateResourceStep1";
import UpdateResourceStep2 from "./UpdateResourceStep2";

const UpdateResourceModalWizard = ({
  isOpen,
  resource,
  onClose,
  onSave, // recibe el objeto final editado
}) => {
  const [step, setStep] = useState(1);
  // Normaliza el recurso a la estructura estándar
  const normalizeResource = (r) => ({
    id: r?.id || r?.recursoId || "",
    name: r?.name || r?.nombreRecurso || "",
    type: r?.type || r?.tipo || "",
    cost: r?.cost || r?.costo || r?.coste || "",
    availability: r?.availability || r?.disponibilidad || r?.estado || "",
    unit_measure: r?.unit_measure || r?.unit || r?.cantidad || "",
    description: r?.description || r?.descripcionRecurso || "",
  });

  const [form, setForm] = useState(resource ? normalizeResource(resource) : {
    id: "",
    name: "",
    type: "",
    cost: "",
    availability: "",
    unit_measure: "",
    description: "",
  });

  // Cuando abres el modal con otro recurso, actualiza el form
  useEffect(() => {
    if (resource) {
      setForm(normalizeResource(resource));
      setStep(1);
    }
  }, [resource, isOpen]);

  if (!isOpen) return null;

  // Avanzar a siguiente paso
  const handleNext = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  // Volver al primer paso
  const handleBack = (data) => {
    setForm((prev) => ({ ...prev, ...data }));
    setStep(1);
  };

  // Guardar cambios
  const handleSave = (data) => {
    const finalData = {
      id: form.id || resource?.id || resource?.recursoId || "",
      nombreRecurso: form.name || "",
      tipo: form.type || "",
      coste: parseFloat(form.cost || "0"),
      estado: form.availability || "",
      cantidad: parseInt(data.unit_measure || "0", 10),
      descripcionRecurso: data.description || "",
    };

    console.log("Final data to save:", finalData); // Log para depuración
    onSave(finalData);
    setStep(1);
    onClose();
  };

  // Aquí el modal overlay (cubre la pantalla)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-8 w-[500px]">
        {step === 1 && (
          <UpdateResourceStep1
            values={form}
            onNext={handleNext}
            onCancel={onClose}
          />
        )}
        {step === 2 && (
          <UpdateResourceStep2
            values={form}
            onBack={handleBack}
            onSave={handleSave}
            onCancel={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateResourceModalWizard;
