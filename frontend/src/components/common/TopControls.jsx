import React from "react";
import "../../stylesheets/topbar.css";
import "../../stylesheets/topcontrols.css";

import newIcon from "../../assets/icons/new.svg";
import updateIcon from "../../assets/icons/update.svg";
import disableIcon from "../../assets/icons/disable.svg";
import assignRoleIcon from "../../assets/icons/assign-role.svg";
import assignTask from "../../assets/icons/assign_task.svg";
import assignResource from "../../assets/icons/assign_resource.svg";

function TopControls({
  module,
  onCreate,
  onUpdate,
  onDisable,
  onAssign,
  onAssignResource,
  onUnassign,
  // Filtros empleados
  search = "",
  setSearch = () => {},
  role = "",
  setRole = () => {},
  roles = [],
  status = "",
  setStatus = () => {},
  statuses = [],
  gender = "",
  setGender = () => {},
  genders = [],
  category = "",
  setCategory = () => {},
  categories = [],
}) {
  // Botones
  const common = [
    <button key="new" className="control-button" onClick={onCreate}>
      <img src={newIcon} alt="" className="button-icon" />
      New
    </button>,
    <button
      key="update"
      className="control-button"
      onClick={onUpdate}
      disabled={!onUpdate}
    >
      <img src={updateIcon} alt="" className="button-icon" />
      Update
    </button>,
    <button key="disable" className="control-button" onClick={onDisable}>
      <img src={disableIcon} alt="" className="button-icon" />
      Disable
    </button>,
  ];

  const renderButtons = () => {
    if (module === "team") {
      return [
        <button
          key="assign-project"
          className="control-button"
          onClick={onAssign}
          disabled={!onAssign}
        >
          <img src={assignTask} alt="" className="button-icon" />
          Assign Project
        </button>,
        <button
          key="unassign-project"
          className="control-button"
          onClick={onUnassign}
          disabled={!onUnassign}
        >
          <img src={assignTask} alt="" className="button-icon" />
          Unassign Project
        </button>,
      ];
    }

    if (module === "user") {
      return [
        ...common,
        <button key="assign-role" className="control-button" onClick={onAssign}>
          <img src={assignRoleIcon} alt="" className="button-icon" />
          Assign Role
        </button>,
      ];
    }

    if (module === "employees" || module === "help" || module === "dashboard")
      return null;

    if (module === "task") {
      return [
        <button key="assign-task" className="control-button" onClick={onAssign} disabled={!onAssign}>
          <img src={assignTask} alt="" className="button-icon" />
          Assign Task
        </button>,
        ...common,
      ];
    }

    if (module === "resource") {
      // Solo update y delete para resources (como lo quieres)
      return [
        <button
          key="assign-resource"
          className="control-button"
          onClick={onAssignResource}
        >
          <img src={assignResource} alt="" className="button-icon" />
          Assign Resource
        </button>,
        ...common.slice(1, 3),
      ];
    }

    if (module === "resourceManager") {
      // Solo update y delete para resources (como lo quieres)
      return [
        <button
          key="assign-resource"
          className="control-button"
          onClick={onAssignResource}
        >
          <img src={assignResource} alt="" className="button-icon" />
          Assign Resource
        </button>,
        ...common
      ];
    }    

    if (module === "project") {
      // Solo update y delete para resources (como lo quieres)
      return [...common.slice(0, 2)];
    }

    return common;
  };

  const renderFilters = () => {
    const inputClass = "topbar-search";

    if (module === "employees") {
      return (
        <div className="flex gap-2 items-center">
          <input
            className={inputClass}
            placeholder="Search Employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={inputClass}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            className={inputClass}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            {genders.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
          <select
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      );
    }

    if (module === "allocate") {
      return (
        <select className={`${inputClass} category-filter`}>
          <option>Category</option>
        </select>
      );
    }

    return null;
  };

  return (
    <>
      <div className="top-controls">{renderButtons()}</div>
      {renderFilters()}
    </>
  );
}

export default TopControls;
