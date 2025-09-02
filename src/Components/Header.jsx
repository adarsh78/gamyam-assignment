import React, { useContext } from "react";
import { Appcontext } from "../Context/AppContextProvider";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const Header = () => {
  const { theme, toggleTheme, setViewFormat, toggleView} = useContext(Appcontext);

  return (
    <>
      <div className="flex justify-end items-center gap-4 py-4 px-2 md:px-8">
        <button
          onClick={() => toggleView("card")}
          className="cursor-pointer"
        >
          List View
        </button>
        <button
          onClick={() => toggleView("list")}
          className="cursor-pointer"
        >
          Card View
        </button>
        <div className="cursor-pointer">
          {theme === "dark" ? (
            <CiLight onClick={toggleTheme} size={22} />
          ) : (
            <MdDarkMode onClick={toggleTheme} size={22} />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
