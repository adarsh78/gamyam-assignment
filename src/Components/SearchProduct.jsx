import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import useTheme from "../Hooks/useTheme";
import { Appcontext } from "../Context/AppContextProvider";
import { IoIosAddCircle } from "react-icons/io";

const SearchProduct = () => {
  const { getThemeClass } = useTheme();
  const { setSearchText, setModal } = useContext(Appcontext);

  const [inputValue, setInputValue] = useState("");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="flex items-center flex-col gap-4 md:flex-row md:gap-0">
        <div
          className={`${getThemeClass("searchBg")} ${getThemeClass(
            "searchText"
          )} flex items-center justify-center gap-5 w-[20rem] mx-auto md:-mr-[6rem] py-3 rounded-2xl`}
        >
          <CiSearch size={28} />
          <input
            className={`placeholder-gray-500 outline-none`}
            type="text"
            placeholder="Search for a product"
            value={inputValue}
            onChange={handleSearch}
          />
        </div>
        <button
          onClick={() => setModal(true)}
          className="flex gap-3 items-center cursor-pointer bg-gray-500 ml-[15rem] md:mr-4 p-2 rounded-md"
        >
          Add
          <IoIosAddCircle size={22} />
        </button>
      </div>
    </>
  );
};

export default SearchProduct;
