import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Appcontext } from "../Context/AppContextProvider";

const ListView = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setModal, setEditingProduct } = useContext(Appcontext);

  const itemsPerPage = 10;

  // Indexes calculate
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = products.slice(indexOfFirst, indexOfLast);

  // Total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      <div className="flex flex-wrap gap-[4rem] w-[80rem] items-center justify-center mx-auto px-[5rem] py-[4rem]">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-500">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Tags</th>
              <th className="border p-2">Edit</th>
            </tr>
          </thead>
          {currentItems.map((data) => (
            <tbody>
              <tr>
                <td className="border p-2">{data.id}</td>
                <td className="border p-2">{data.name}</td>
                <td className="border p-2">₹{data.price}</td>
                <td className="border p-2">{data.category}</td>
                <td className="border p-2">{data.stock}</td>
                <td className="border p-2">
                  {data.isActive ? "Available" : "Not Available"}
                </td>
                <td className="border p-2">{data.tags.join(", ")}</td>
                <td className="border p-2 flex justify-center items-center h-11">
                  <FaEdit
                    onClick={() => {
                      setEditingProduct(data);
                      setModal(true);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <div className="flex gap-2 mt-4 justify-center">
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

export default ListView;
