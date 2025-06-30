import React, { useState, useEffect } from "react";

export default function UpdateCategoryModal({ isOpen, toggle, category, onUpdate }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isOpen && category) {
      setName(category.name || "");
      setDesc(category.description || "");
      setTouched(false);
    }
  }, [isOpen, category]);

  const valid = name.trim() && desc.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onUpdate && onUpdate({ ...category, name: name.trim(), description: desc.trim() });
    toggle();
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative"
      >
        {/* Header */}
        <div className="flex items-start mb-10">
          <h2 className="text-3xl font-bold text-gray-700 flex-1">Update Category</h2>
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
            <label className="block text-2xl font-bold mb-4" htmlFor="catname">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              id="catname"
              className="w-full rounded-lg border border-gray-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
              placeholder="Enter Category name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
            {touched && !name.trim() && (
              <div className="text-red-500 text-sm mb-2">Category name is required.</div>
            )}
          </div>
          <div>
            <label className="block text-2xl font-bold mb-4" htmlFor="catdesc">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="catdesc"
              className="w-full rounded-lg border border-gray-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
              placeholder="Enter description"
              rows={4}
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            {touched && !desc.trim() && (
              <div className="text-red-500 text-sm mt-2">Description is required.</div>
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
            Save Change
          </button>
        </div>
      </form>
    </div>
  );
}