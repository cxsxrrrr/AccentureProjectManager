import React, { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import CreateCategoryModal from "../../components/admin/modals/CategorySkills/CreateCategoryModal";
import CreateSkillModal from "../../components/admin/modals/CategorySkills/CreateSkillModal";
import UpdateCategoryModal from "../../components/admin/modals/CategorySkills/UpdateCategoryModal";
import UpdateSkillModal from "../../components/admin/modals/CategorySkills/UpdateSkillModal";
import DisableCategoryModal from "../../components/admin/modals/CategorySkills/DisableCategoryModal";
import DisableSkillModal from "../../components/admin/modals/CategorySkills/DisableSkillModal";

function CategoriesandSkills() {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const openDisableCategoryModal = (category) => {
    setSelectedCategoryId(category.id);
    setDisableCategoryOpen(true);
  };

  const openDisableSkillModal = (skill) => {
    setSelectedSkillId(skill.id);
    setDisableSkillOpen(true);
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const [tab, setTab] = useState("categories");

  const [isCreateCatOpen, setCreateCatOpen] = useState(false);
  const [isCreateSkillOpen, setCreateSkillOpen] = useState(false);
  const [isUpdateCatOpen, setUpdateCatOpen] = useState(false);
  const [catToEdit, setCatToEdit] = useState(null);
  const [isUpdateSkillOpen, setUpdateSkillOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState(null);
  const [isDisableCategoryOpen, setDisableCategoryOpen] = useState(false);
  const [isDisableSkillOpen, setDisableSkillOpen] = useState(false);

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = '/login';
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setCategories([]);
      setSkills([]);

      const token = localStorage.getItem("token");

<<<<<<< HEAD
      const [categoriesResponse, skillsResponse] = await Promise.all([
        axios.get("http://localhost:8080/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/skills", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

=======
      // Primero cargar categorías
      const categoriesResponse = await axios.get(
        "http://localhost:8080/api/category", 
        config
      );
      
      // Verificar si la respuesta tiene datos
      if (!categoriesResponse.data) {
        throw new Error("No se recibieron datos de categorías");
      }
      
>>>>>>> 3ada313 (test pt 4)
      setCategories(categoriesResponse.data);
      setSkills(sskillsResponse.data);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Error loading data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = async (newCat) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/categories",
        newCat,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCategories((prev) => [...prev, response.data]);
      setCreateCatOpen(false);
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Error creating category. Please try again.");
    }
  };

  const handleCreateSkill = async (newSkill) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/skills",
        newSkill,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSkills((prev) => [...prev, response.data]);
      setCreateSkillOpen(false);
    } catch (err) {
      console.error("Error creating skill:", err);
      setError("Error creating skill. Please try again.");
    }
  };

  const handleUpdateCategory = async (catData) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/categories/${catData.id}`,
        catData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCategories((prev) =>
        prev.map((c) => (c.id === catData.id ? catData : c))
      );
      setUpdateCatOpen(false);
    } catch (err) {
      console.error("Error updating category:", err);
      setError("Error updating category. Please try again.");
    }
  };

  const handleUpdateSkill = async (skillData) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/skills/${skillData.id}`,
        skillData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSkills((prev) =>
        prev.map((s) => (s.id === skillData.id ? skillData : s))
      );
      setUpdateSkillOpen(false);
    } catch (err) {
      console.error("Error updating skill:", err);
      setError("Error updating skill. Please try again.");
    }
  };

  const handleDisableCategory = async (categoryId) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/api/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
      setDisableCategoryOpen(false);
    } catch (err) {
      console.error("Error disabling category:", err);
      setError("Error disabling category. Please try again.");
    }
  };

  const handleDisableSkill = async (skillId) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/api/skills/${skillId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSkills((prev) => prev.filter((s) => s.id !== skillId));
      setDisableSkillOpen(false);
    } catch (err) {
      console.error("Error disabling skill:", err);
      setError("Error disabling skill. Please try again.");
    }
  };

  const handleRefresh = () => {
    loadData();
  };
   const openUpdateCategoryModal = (category) => {
  setCatToEdit(category);
  setUpdateCatOpen(true);
  };

  const openUpdateSkillModal = (skill) => {
  setSkillToEdit(skill);
  setUpdateSkillOpen(true);
  };

  const handleTabChange = (newTab) => {
  setTab(newTab);
  setSelectedCategoryId(null);
  setSelectedSkillId(null);
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
          onClick={() => handleTabChange("categories")}
        >
          Categories
        </button>
        <button
          className={`pb-2 font-bold text-lg border-b-2 transition ${
            tab === "skills"
              ? "border-purple-500 text-purple-700"
              : "border-transparent text-gray-400 hover:text-purple-500"
          }`}
          onClick={() => handleTabChange("skills")}
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
              {categories.map((cat, i) => (
                <tr
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`cursor-pointer transition ${
                    selectedCategoryId === cat.id
                      ? "bg-purple-50 ring-2 ring-purple-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-center font-bold">{i + 1}</td>
                  <td className="px-6 py-4 font-semibold text-lg">{cat.name}</td>
                  <td>
                    <span className="bg-gray-100 rounded-lg px-5 py-2 text-gray-600 text-sm shadow">
                      {cat.description}
                    </span>
                  </td>
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
                    <td className="px-6 py-4">
                    {categories.find(cat => cat.id === skill.category)?.name || "N/A"}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
const openDisableCategoryModal = (category) => {
  setSelectedCategoryId(category.id);
  setDisableCategoryOpen(true);
};

const openDisableSkillModal = (skill) => {
  setSelectedSkillId(skill.id);
  setDisableSkillOpen(true);
};

export default CategoriesandSkills;