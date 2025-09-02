import React, { useContext, useState } from "react";
import useTheme from "../Hooks/useTheme";
import { FaEdit } from "react-icons/fa";
import { Appcontext } from "../Context/AppContextProvider";

const CardView = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setModal, setEditingProduct } = useContext(Appcontext);
  const itemsPerPage = 9;

  // Indexes calculate
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = products.slice(indexOfFirst, indexOfLast);

  // Total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const { getThemeClass } = useTheme();

  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-7 mt-5 md:px-[10rem]">
        {currentItems.map((data) => (
          <div
            key={data.id}
            className={`${getThemeClass("productCardBg")} ${getThemeClass(
              "productCardText"
            )} w-[20rem] rounded-md p-4`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl mb-2">{data.name}</h2>
              <FaEdit
                onClick={() => {
                  setEditingProduct(data);
                  setModal(true);
                }}
                size={22}
                className="mb-2 cursor-pointer"
              />
            </div>
            <p className="font-bold">
              Price: <span className="font-normal">${data.price}</span>
            </p>
            <p className="font-bold">
              Category: <span className="font-normal">{data.category}</span>
            </p>
            <p className="font-bold">
              Stock: <span className="font-normal">{data.stock}</span>
            </p>
            <p className="font-bold">
              Status:{" "}
              <span className="font-normal">
                {data.isActive ? "Available" : "Not Available"}
              </span>
            </p>
            <p className="font-bold">
              Tags: <span className="font-normal">{data.tags.join(", ")}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex gap-2 my-4 justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded cursor-pointer"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded cursor-pointer ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded cursor-pointer"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CardView;
