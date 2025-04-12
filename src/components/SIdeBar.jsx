import React from "react";
import { NavLink } from "react-router-dom";

const SIdeBar = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 p-4">Sidebar</h2>
      <ul className="space-y-2 px-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AddCustomer"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : ""
            }
          >
            Add Customer
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SIdeBar;
