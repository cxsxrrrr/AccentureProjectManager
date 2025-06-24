import React, { useState } from "react";
import Topbar from "../../components/admin/layout/Topbar";
import TopControls from "../../components/admin/layout/TopControls";
import "../../stylesheets/page.css";
import CreateCategoryModal from "../../components/admin/modals/CategorySkills/CreateCategoryModal";
import CreateSkillModal from "../../components/admin/modals/CategorySkills/CreateSkillModal";
import UpdateCategoryModal from "../../components/admin/modals/CategorySkills/UpdateCategoryModal";
import UpdateSkillModal from "../../components/admin/modals/CategorySkills/UpdateSkillModal";
import DisableCategoryModal from "../../components/admin/modals/CategorySkills/DisableCategoryModal";
import DisableSkillModal from "../../components/admin/modals/CategorySkills/DisableSkillModal";

function CategoriesandSkills() {
  // Estado para seleccion
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  // Tabs: 'categories' o 'skills'
  const [tab, setTab] = useState("categories");

  // Mock inicial de categorías y skills
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Software Development",
      description:
        "Design and maintenance of software applications and systems.",
    },
    {
      id: 2,
      name: "Marketing and Advertising",
      description:
        "Campaigns to promote products, services, or brand awareness.",
    },
    {
      id: 3,
      name: "Construction and Civil Works",
      description:
        "Modernization of processes through digital tools and automation.",
    },
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: "Java", category: "Software Development" },
    { id: 2, name: "React", category: "Software Development" },
    {
      id: 3,
      name: "Working with concrete and mortar",
      category: "Construction and Civil Works",
    },
    { id: 4, name: "Marketing Digital", category: "Marketing and Advertising" },
  ]);

  // --- CRUD handlers y modales ---
  const [isCreateCatOpen, setCreateCatOpen] = useState(false);
  const [isCreateSkillOpen, setCreateSkillOpen] = useState(false);

  const handleCreateCategory = (newCat) => {
    setCategories((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((c) => c.id)) + 1 : 1,
        ...newCat,
      },
    ]);
  };
  const handleCreateSkill = (newSkill) => {
    setSkills((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1,
        ...newSkill,
      },
    ]);
  };

  // Update

  const [isUpdateCatOpen, setUpdateCatOpen] = useState(false);
  const [catToEdit, setCatToEdit] = useState(null);

  const [isUpdateSkillOpen, setUpdateSkillOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState(null);

  // Borrar

  // Estados para los modales
  const [isDisableCategoryOpen, setDisableCategoryOpen] = useState(false);
  const [isDisableSkillOpen, setDisableSkillOpen] = useState(false);

  // Abrir/Cerrar modales
  const handleOpenDisableCategory = () => setDisableCategoryOpen(true);
  const handleCloseDisableCategory = () => setDisableCategoryOpen(false);

  const handleOpenDisableSkill = () => setDisableSkillOpen(true);
  const handleCloseDisableSkill = () => setDisableSkillOpen(false);

  // Lógica para deshabilitar (borrar)
  const handleDisableCategory = (categoryId) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    handleCloseDisableCategory();
  };
  const handleDisableSkill = (skillId) => {
    setSkills((prev) => prev.filter((s) => s.id !== skillId));
    handleCloseDisableSkill();
  };

  // Handlers
  const openUpdateCategoryModal = (cat) => {
    setCatToEdit(cat);
    setUpdateCatOpen(true);
  };
  const openUpdateSkillModal = (skill) => {
    setSkillToEdit(skill);
    setUpdateSkillOpen(true);
  };
  const handleUpdateCategory = (catData) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === catData.id ? catData : c))
    );
    setUpdateCatOpen(false);
  };
  const handleUpdateSkill = (skillData) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skillData.id ? skillData : s))
    );
    setUpdateSkillOpen(false);
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
              ? handleOpenDisableCategory
              : handleOpenDisableSkill
          }
        />
      </Topbar>

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
        onClose={handleCloseDisableCategory}
        onDisable={handleDisableCategory}
      />
      <DisableSkillModal
        isOpen={isDisableSkillOpen}
        skills={skills}
        categories={categories}
        onClose={handleCloseDisableSkill}
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
        {tab === "categories" && (
          <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-gray-500 font-bold w-12">
                  #
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold">
                  NAME
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold">
                  DESCRIPTION
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`
                      cursor-pointer transition
                      ${
                        selectedCategoryId === cat.id
                          ? "bg-purple-50 ring-2 ring-purple-200"
                          : "hover:bg-gray-50"
                      }
                    `}
                >
                  <td className="px-6 py-4 text-center font-bold">{i + 1}</td>
                  <td className="px-6 py-4 font-semibold text-lg">
                    {cat.name}
                  </td>
                  <td>
                    <span className="bg-gray-100 rounded-lg px-5 py-2 text-gray-600 text-sm shadow">
                      {cat.description}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "skills" && (
          <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-gray-500 font-bold w-12">
                  #
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold">
                  NAME
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold">
                  CATEGORY
                </th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, i) => (
                <tr
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`
                    cursor-pointer transition
                    ${
                      selectedSkillId === skill.id
                        ? "bg-purple-50 ring-2 ring-purple-200"
                        : "hover:bg-gray-50"
                    }
                  `}
                >
                  <td className="px-6 py-4 text-center font-bold">{i + 1}</td>
                  <td className="px-6 py-4 font-semibold text-lg">
                    {skill.name}
                  </td>
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
