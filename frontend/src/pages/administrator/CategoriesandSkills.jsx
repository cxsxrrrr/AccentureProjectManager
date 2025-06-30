import React, { useEffect, useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import CreateCategoryModal from "../../components/admin/modals/CategorySkills/CreateCategoryModal";
import CreateSkillModal from "../../components/admin/modals/CategorySkills/CreateSkillModal";
import UpdateCategoryModal from "../../components/admin/modals/CategorySkills/UpdateCategoryModal";
import UpdateSkillModal from "../../components/admin/modals/CategorySkills/UpdateSkillModal";
import DisableCategoryModal from "../../components/admin/modals/CategorySkills/DisableCategoryModal";
import DisableSkillModal from "../../components/admin/modals/CategorySkills/DisableSkillModal";
import api from "../../services/axios"; // Ajusta el path si tu configuración cambia

function CategoriesandSkills() {
  // Selección
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  // Tabs
  const [tab, setTab] = useState("categories");

  // Datos reales de API
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);

  // Estado para errores
  const [error, setError] = useState(null);
  // Estado de carga
  const [isLoading, setIsLoading] = useState(true);

  // ==== CARGA INICIAL DESDE BACKEND ====
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      api.get("/category"),
      api.get("/skills")
    ])
      .then(([catRes, skillRes]) => {
        setCategories(catRes.data.map(cat => ({
          id: cat.categoriaId,
          name: cat.nombre,
          description: cat.descripcion,
        })));
        setSkills(skillRes.data.map(skill => ({
          id: skill.skillId,
          name: skill.nombre,
          category: skill.categoria?.nombre || skill.categoriaNombre || "",
        })));
        setError(null);
      })
      .catch(() => {
        setCategories([]);
        setSkills([]);
        setError("Error al cargar los datos");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // ==== CRUD Categoría ====
  const [isCreateCatOpen, setCreateCatOpen] = useState(false);
  const [isUpdateCatOpen, setUpdateCatOpen] = useState(false);
  const [isDisableCategoryOpen, setDisableCategoryOpen] = useState(false);
  const [catToEdit, setCatToEdit] = useState(null);

  const handleCreateCategory = async (newCat) => {
    try {
      const res = await api.post("/category", {
        nombre: newCat.name,
        descripcion: newCat.description,
        estado: "activo"
      });
      setCategories(prev => [
        ...prev,
        { id: res.data.categoriaId, name: res.data.nombre, description: res.data.descripcion, estado: res.data.estado?.toLowerCase?.() || "activo" }
      ]);
    } catch {
      alert("Error al crear la categoría");
    }
  };

  const openUpdateCategoryModal = (cat) => {
    setCatToEdit(cat);
    setUpdateCatOpen(true);
  };

  const handleUpdateCategory = async (catData) => {
    try {
      await api.put(`/category/${catData.id}`, {
        nombre: catData.name,
        descripcion: catData.description,
        estado: "activo"
      });
      setCategories(prev =>
        prev.map(c => (c.id === catData.id ? { ...catData, estado: "activo" } : c))
      );
    } catch {
      alert("Error al actualizar");
    } finally {
      setUpdateCatOpen(false);
    }
  };

  const handleDisableCategory = async (categoryId) => {
    try {
      await api.delete(`/category/${categoryId}`);
      setCategories(prev => prev.filter(c => c.id !== categoryId));
    } catch {
      alert("Error al eliminar la categoría");
    } finally {
      setDisableCategoryOpen(false);
    }
  };

  // ==== CRUD Skill ====
  const [isCreateSkillOpen, setCreateSkillOpen] = useState(false);
  const [isUpdateSkillOpen, setUpdateSkillOpen] = useState(false);
  const [isDisableSkillOpen, setDisableSkillOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState(null);

  const handleCreateSkill = async (newSkill) => {
    // Busca la categoría por nombre para conseguir el ID
    const catObj = categories.find(c => c.name === newSkill.category);
    if (!catObj || !catObj.id) {
      alert("Debes seleccionar una categoría válida para la habilidad.");
      return;
    }
    try {
      const res = await api.post("/skills", {
        nombre: newSkill.name,
        estado: "activo",
        categoriaId: catObj.id
      });
      setSkills(prev => [
        ...prev,
        { id: res.data.skillId, name: res.data.nombre, category: catObj.name || "", estado: res.data.estado?.toLowerCase?.() || "activo" }
      ]);
    } catch {
      alert("Error al crear habilidad");
    }
  };

  const openUpdateSkillModal = (skill) => {
    setSkillToEdit(skill);
    setUpdateSkillOpen(true);
  };

  const handleUpdateSkill = async (skillData) => {
    try {
      // Busca la categoría por nombre para conseguir el ID
      const catObj = categories.find(c => c.name === skillData.category);
      await api.put(`/skills/${skillData.id}`, {
        nombre: skillData.name,
        estado: "activo",
        categoriaId: catObj?.id
      });
      setSkills(prev =>
        prev.map(s => (s.id === skillData.id ? { ...skillData, estado: "activo" } : s))
      );
    } catch {
      alert("Error al actualizar habilidad");
    } finally {
      setUpdateSkillOpen(false);
    }
  };

  const handleDisableSkill = async (skillId) => {
    try {
      await api.delete(`/skills/${skillId}`);
      setSkills(prev => prev.filter(s => s.id !== skillId));
    } catch {
      alert("Error al eliminar habilidad");
    } finally {
      setDisableSkillOpen(false);
    }
  };

  // ==== Render ====

  // Refresca categorías y skills desde el backend
  const handleRefresh = async () => {
    try {
      // Recarga categorías
      const catRes = await api.get("/category");
      setCategories(catRes.data.map(cat => ({
        id: cat.categoriaId,
        name: cat.nombre,
        description: cat.descripcion,
      })));
      // Recarga skills
      const skillRes = await api.get("/skills");
      setSkills(skillRes.data.map(skill => ({
        id: skill.skillId,
        name: skill.nombre,
        category: skill.categoria?.nombre || skill.categoriaNombre || "",
      })));
      setError(null); // Limpiar error si refresca bien
    } catch {
      setError("Error al refrescar los datos");
    }
  };

  return (
    <div className="admin-page">
      <Topbar title="Categories & Skills Management">
        <TopControls
          module="categories_skills"
          onCreate={
            tab === "categories"
              ? () => setCreateCatOpen(true)
              : () => setCreateSkillOpen(true)
          }
          onUpdate={
            tab === "categories"
              ? selectedCategoryId
                ? () =>
                    openUpdateCategoryModal(
                      categories.find((c) => c.id === selectedCategoryId)
                    )
                : undefined
              : selectedSkillId
              ? () =>
                  openUpdateSkillModal(
                    skills.find((s) => s.id === selectedSkillId)
                  )
              : undefined
          }
          onDisable={
            tab === "categories"
              ? () => setDisableCategoryOpen(true)
              : () => setDisableSkillOpen(true)
          }
          onRefresh={handleRefresh}
        />
      </Topbar>

      {error && (
        <div className="text-center p-4 bg-red-100 text-red-700 mb-4 rounded">
          {error}
        </div>
      )}

      <CreateCategoryModal
        isOpen={isCreateCatOpen}
        toggle={() => setCreateCatOpen(false)}
        onCreate={handleCreateCategory}
      />
      <CreateSkillModal
        isOpen={isCreateSkillOpen}
        toggle={() => setCreateSkillOpen(false)}
        onCreate={handleCreateSkill}
        categories={categories}
      />

      <UpdateCategoryModal
        isOpen={isUpdateCatOpen}
        toggle={() => setUpdateCatOpen(false)}
        category={catToEdit}
        onUpdate={handleUpdateCategory}
      />
      <UpdateSkillModal
        isOpen={isUpdateSkillOpen}
        toggle={() => setUpdateSkillOpen(false)}
        skill={skillToEdit}
        onUpdate={handleUpdateSkill}
        categories={categories}
      />

      <DisableCategoryModal
        isOpen={isDisableCategoryOpen}
        categories={categories}
        onClose={() => setDisableCategoryOpen(false)}
        onDisable={handleDisableCategory}
      />
      <DisableSkillModal
        isOpen={isDisableSkillOpen}
        skills={skills}
        categories={categories}
        onClose={() => setDisableSkillOpen(false)}
        onDisable={handleDisableSkill}
      />

      {/* Tabs */}
      <div className="flex gap-8 mt-8 mb-2">
        <button
          className={`pb-2 font-bold text-lg border-b-2 transition ${
            tab === "categories"
              ? "border-purple-500 text-purple-700"
              : "border-transparent text-gray-400 hover:text-purple-500"
          }`}
          onClick={() => setTab("categories")}
        >
          Categories
        </button>
        <button
          className={`pb-2 font-bold text-lg border-b-2 transition ${
            tab === "skills"
              ? "border-purple-500 text-purple-700"
              : "border-transparent text-gray-400 hover:text-purple-500"
          }`}
          onClick={() => setTab("skills")}
        >
          Skills
        </button>
      </div>

      {/* Tab Content */}
      <div className="admin-content mt-4">
        {isLoading ? (
          <div className="text-center text-gray-500 py-4">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              Loading data...
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                <span className="material-icons">error</span>
                <span className="font-semibold">Error</span>
              </div>
              <p className="text-red-600 text-sm">{error}</p>
              <button 
                onClick={handleRefresh}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : tab === "categories" ? (
          <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-gray-500 font-bold w-12">#</th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold">NAME</th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
            {categories.map((category, i) => (
              <tr
                key={category.id} // usa la propiedad que el backend te está enviando
                onClick={() => setSelectedCategoryId(category.id)}
                className={`cursor-pointer transition ${
                  selectedCategoryId === category.categoriaId
                    ? "bg-purple-50 ring-2 ring-purple-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 text-center font-bold">{i + 1}</td>
                <td className="px-6 py-4 font-semibold text-lg">{category.name}</td>
                <td className="px-6 py-4">{category.description}</td>
              </tr>
            ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-gray-500 font-bold w-12">#</th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold">NAME</th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold">CATEGORY</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, i) => (
                <tr
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`cursor-pointer transition ${
                    selectedSkillId === skill.id
                      ? "bg-purple-50 ring-2 ring-purple-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-center font-bold">{i + 1}</td>
                  <td className="px-6 py-4 font-semibold text-lg">{skill.name}</td>
                  <td className="px-6 py-4">{skill.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CategoriesandSkills;