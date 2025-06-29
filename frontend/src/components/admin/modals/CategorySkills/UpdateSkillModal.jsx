import React, { useState, useEffect } from "react";
import { FiSearch, FiCheck } from "react-icons/fi";

export default function UpdateSkillModal({ isOpen, toggle, skill, categories = [], onUpdate }) {
  const [name, setName] = useState("");
  const [catId, setCatId] = useState(null);
  const [catSearch, setCatSearch] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isOpen && skill) {
      setName(skill.name || "");
      // Encuentra el id de la categoría (puede ser por nombre o por id según tu modelo)
      const currentCategory = categories.find(
        c =>
          (c.id && c.id === skill.category_id) ||
          (c.name && c.name.toLowerCase() === (skill.category || "").toLowerCase())
      );
      setCatId(currentCategory ? currentCategory.id : null);
      setCatSearch("");
      setTouched(false);
    }
  }, [isOpen, skill, categories]);

  const valid = name.trim() && catId;
  const filteredCategories = categories.filter(
    c =>
      (c.name && c.name.toLowerCase().includes(catSearch.toLowerCase())) ||
      (c.description && c.description.toLowerCase().includes(catSearch.toLowerCase()))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    const category = categories.find(c => c.id === catId);
    onUpdate &&
      onUpdate({ ...skill, name: name.trim(), category: category.name, category_id: catId });
    toggle();
  };

  if (!isOpen || !skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative"
      >
        {/* Header */}
        <div className="flex items-start mb-10">
          <h2 className="text-3xl font-bold text-gray-700 flex-1">Update Skill</h2>
          <button
            onClick={toggle}
            className="ml-auto text-gray-400 hover:text-red-500 text-2xl"
            aria-label="Close modal"
            type="button"
          >×</button>
        </div>
        {/* Form */}
        <div className="flex flex-col gap-8 mb-10">
          <div>
            <label className="block text-2xl font-bold mb-4" htmlFor="skillname">
              Skill Name <span className="text-red-500">*</span>
            </label>
            <input
              id="skillname"
              className="w-full rounded-lg border border-gray-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
              placeholder="Enter skill name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
            {touched && !name.trim() && (
              <div className="text-red-500 text-sm mb-2">Skill name is required.</div>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold mb-4">Select Category</div>
            <div className="flex items-center border rounded-lg px-3 py-2 mb-5 bg-gray-50 shadow-inner">
              <FiSearch className="text-xl text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search category..."
                value={catSearch}
                onChange={e => setCatSearch(e.target.value)}
                className="w-full outline-none bg-transparent text-lg"
              />
            </div>
            <div className="max-h-48 overflow-y-auto flex flex-col gap-3">
              {filteredCategories.length === 0 ? (
                <div className="text-gray-400 py-4 text-center">No categories found.</div>
              ) : (
                filteredCategories.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCatId(c.id)}
                    className={`
                      flex flex-col items-start p-4 rounded-xl border w-full transition
                      text-left shadow-sm
                      ${catId === c.id
                        ? "bg-purple-100 text-purple-700 border-2 border-purple-400"
                        : "bg-white border-gray-200 hover:bg-purple-100"}
                    `}
                  >
                    <div className="flex items-center w-full">
                      <span className="font-bold text-lg flex-1">{c.name}</span>
                      {catId === c.id && <FiCheck className="text-2xl ml-2 font-bold" />}
                    </div>
                    <span className={`text-xs mt-2 ${catId === c.id ? "text-purple-600" : "text-gray-500"}`}>
                      {c.description || "No description"}
                    </span>
                  </button>
                ))
              )}
            </div>
            {touched && !catId && (
              <div className="text-red-500 text-sm mt-3">Select a category.</div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-8 pt-10">
          <button
            type="button"
            onClick={toggle}
            className="px-8 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium text-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition text-lg shadow"
            disabled={!valid}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}