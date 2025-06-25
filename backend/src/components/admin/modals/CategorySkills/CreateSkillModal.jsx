import React, { useState, useEffect } from "react";
import { FiSearch, FiCheck } from "react-icons/fi";

export default function CreateSkillModal({ isOpen, toggle, categories = [], onCreate }) {
  const [name, setName] = useState("");
  const [catSearch, setCatSearch] = useState("");
  const [catId, setCatId] = useState(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setCatSearch("");
      setCatId(null);
      setTouched(false);
    }
  }, [isOpen]);

  // Buscador de categorías
  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(catSearch.toLowerCase())
  );

  const valid = name.trim() && catId;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    const category = categories.find(c => c.id === catId);
    onCreate && onCreate({ name: name.trim(), category: category.name });
    toggle();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative"
      >
        {/* Header */}
        <div className="flex items-start mb-8">
          <h2 className="text-3xl font-bold text-gray-700 flex-1">New Skill</h2>
          <button
            onClick={toggle}
            className="ml-auto text-gray-400 hover:text-red-500 text-2xl"
            aria-label="Close modal"
            type="button"
          >×</button>
        </div>
        {/* Form */}
        <div className="mb-8">
          <label className="block text-2xl font-bold mb-3" htmlFor="skillname">
            Skill name <span className="text-red-500">*</span>
          </label>
          <input
            id="skillname"
            className="w-full rounded-lg border border-gray-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-7"
            placeholder="Enter skill name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
          {touched && !name.trim() && (
            <div className="text-red-500 text-sm mb-2">Skill name is required.</div>
          )}

          <div className="mb-4">
            <div className="text-2xl font-bold mb-3">Select Category</div>
            <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 shadow-inner">
              <FiSearch className="text-xl text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search category..."
                value={catSearch}
                onChange={e => setCatSearch(e.target.value)}
                className="w-full outline-none bg-transparent text-lg"
              />
            </div>
            <div className="max-h-40 overflow-y-auto flex flex-col gap-2">
              {filteredCategories.length === 0 && (
                <div className="text-gray-400 py-4 text-center">No categories found.</div>
              )}
              {filteredCategories.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCatId(c.id)}
                  className={`
                    flex flex-col items-start p-4 rounded-xl border w-full transition
                    text-left shadow-sm
                    ${catId === c.id
                      ? "bg-purple-500 text-white border-purple-500"
                      : "bg-white border-gray-200 hover:bg-purple-100"}
                  `}
                >
                  <div className="flex items-center w-full">
                    <span className="font-bold text-lg flex-1">{c.name}</span>
                    {catId === c.id && <FiCheck className="text-2xl ml-2 font-bold" />}
                  </div>
                  <span className={`text-xs mt-1 ${catId === c.id ? "text-purple-100" : "text-gray-500"}`}>
                    {c.description || "No description"}
                  </span>
                </button>
              ))}
            </div>
            {touched && !catId && (
              <div className="text-red-500 text-sm mt-2">Select a category.</div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-3 pt-8">
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
