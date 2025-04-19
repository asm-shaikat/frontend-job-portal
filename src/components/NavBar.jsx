import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
        <NavLink
            to="/"
          >Job Portal
          </NavLink></h1>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-medium"
                : "text-white hover:text-yellow-300"
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/applications"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-medium"
                : "text-white hover:text-yellow-300"
            }
          >
            Applications
          </NavLink>
        </div>
      </div>
    </nav>
  );
}