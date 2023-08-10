import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="flex justify-center py-5 mb-10 text-lg gap-x-5">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-white"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-white"
          }
          to="movies"
        >
          Movies
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-white"
          }
          to="*"
        >
          TV series
        </NavLink>
      </header>
    </>
  );
};

export default Header;
