import React from "react";
import "../../stylesheets/topbar.css";
import "../../stylesheets/topcontrols.css";

import newIcon from "../../assets/icons/new.svg";
import updateIcon from "../../assets/icons/update.svg";
import disableIcon from "../../assets/icons/disable.svg";
import assignRoleIcon from "../../assets/icons/assign-role.svg";
import addPermissionIcon from "../../assets/icons/add-permission.svg";
import assignTask from "../../assets/icons/assign_task.svg";
import assignResource from "../../assets/icons/assign_resource.svg";

function TopControls({ module, onCreate, onUpdate, onDisable, onAssign }) {
  const renderButtons = () => {
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
      <button
        key="disable"
        className="control-button"
        onClick={onDisable}
      >
        <img src={disableIcon} alt="" className="button-icon" />
        Disable
      </button>,
    ];

    if (module === "user") {
      return [
        ...common,
        <button key="assign-role" className="control-button" onClick={onAssign}>
          <img src={assignRoleIcon} alt="" className="button-icon" />
          Assign Role
        </button>,
      ];
    }

    if (module === "employees" || module === "help" || module === "dashboard") return null;

    if (module === "task") {
      return [
        ...common,
        <button key="assign-task" className="control-button">
          <img src={assignTask} alt="" className="button-icon" />
          Assign Task
        </button>,
      ];
    }

    if (module === "resource") {
      return [
        ...common,
        <button key="assign-resource" className="control-button">
          <img src={assignResource} alt="" className="button-icon" />
          Assign Resource
        </button>,
      ];
    }

    return common;
  };

  const renderFilters = () => {
    const inputClass = "topbar-search";

    if (module === "employees") {
      return (
        <>
          <select className={inputClass}>
            <option>Role</option>
          </select>
          <select className={inputClass}>
            <option>Status</option>
          </select>
          <select className={inputClass}>
            <option>Gender</option>
          </select>
          <select className={inputClass}>
            <option>Category</option>
          </select>
        </>
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
