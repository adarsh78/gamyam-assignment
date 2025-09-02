import React, { useContext, useState, useEffect } from "react";
import { Appcontext } from "../Context/AppContextProvider";

const AddProduct = () => {
  const {
    modal,
    newProduct,
    setNewProduct,
    setModal,
    productData,
    setProductData,
    editingProduct,
    setEditingProduct,
  } = useContext(Appcontext);

  const [errors, setErrors] = useState({});

  // in edit mode, data will be prefilled
  useEffect(() => {
    if (editingProduct) {
      setNewProduct(editingProduct);
    }
  }, [editingProduct, setNewProduct]);

  const validate = () => {
    let newErrors = {};

    if (!newProduct.name || newProduct.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (
      !newProduct.price ||
      isNaN(newProduct.price) ||
      Number(newProduct.price) <= 0
    ) {
      newErrors.price = "Price must be a valid number greater than 0";
    }

    if (!newProduct.category || newProduct.category.trim() === "") {
      newErrors.category = "Category is required";
    }

    if (
      !newProduct.stock ||
      isNaN(newProduct.stock) ||
      Number(newProduct.stock) <= 0
    ) {
      newErrors.stock = "Stock must be a valid number greater than 0";
    }

    if (!newProduct.status || newProduct.status.trim() === "") {
      newErrors.status = "Status is required";
    }

    if (!newProduct.tags || newProduct.tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // to convert tags into array
    if (name === "tags") {
      setNewProduct((prev) => ({ ...prev, tags: value.split(",") }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingProduct) {
      // Update existing product
      const updatedList = productData.map((p) =>
        p.id === editingProduct.id ? { ...p, ...newProduct } : p
      );
      setProductData(updatedList);
      setEditingProduct(null);
    } else {
      // Add new product
      const newId =
        productData.length > 0 ? productData[productData.length - 1].id + 1 : 1;

      const updatedProduct = { id: newId, ...newProduct };
      setProductData([...productData, updatedProduct]);
    }

    // Reset
    setModal(false);
    setNewProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
      status: "",
      tags: [],
    });
    setErrors({});
  };

  return (
    <>
      {modal && (
        <div
          onClick={() => {
            setModal(false);
            setEditingProduct(null);
          }}
          className="fixed inset-0 bg-black/50 z-10 flex justify-center items-center"
        >
          <div
            className="flex flex-col bg-gray-500 gap-2 w-[22rem] p-4 rounded-sm z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
              <h2 className="text-white text-lg font-semibold text-center">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>

              {/* NAME */}
              <div className="flex">
                <label>Name</label>
                <div className="flex flex-col items-center">
                  <input
                    className="ml-10 pl-2 outline-none border border-white w-[15rem] rounded-sm"
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-800 text-[12px] mr-3">{errors.name}</p>
                  )}
                </div>
              </div>

              {/* PRICE */}
              <div className="flex">
                <label>Price</label>
                <div className="flex flex-col items-center">
                  <input
                    className="ml-12 pl-2 outline-none border border-white w-[15rem] rounded-sm"
                    type="text"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                  />
                  {errors.price && (
                    <p className="text-red-800 text-[12px] ml-10">{errors.price}</p>
                  )}
                </div>
              </div>

              {/* CATEGORY */}
              <div className="flex">
                <label>Category</label>
                <div className="flex flex-col items-center">
                  <input
                    className="ml-[1.1rem] pl-2 outline-none border border-white w-[15rem] rounded-sm"
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                  />
                  {errors.category && (
                    <p className="text-red-800 text-[12px] mr-[7rem]">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* STOCK */}
              <div className="flex">
                <label>Stock</label>
                <div className="flex flex-col items-center">
                  <input
                    className="ml-11 pl-2 outline-none border border-white w-[15rem] rounded-sm"
                    type="text"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleChange}
                  />
                  {errors.stock && (
                    <p className="text-red-800 text-[12px] ml-9">{errors.stock}</p>
                  )}
                </div>
              </div>

              {/* STATUS */}
              <div className="flex">
                <label>Status</label>
                <div className="flex flex-col items-center">
                  <input
                    className="ml-[2.4rem] pl-2 outline-none border border-white w-[15rem] rounded-sm"
                    type="text"
                    name="status"
                    value={newProduct.status}
                    onChange={handleChange}
                  />
                  {errors.status && (
                    <p className="text-red-800 text-[12px] mr-[7rem]">{errors.status}</p>
                  )}
                </div>
              </div>

              {/* TAGS */}
              <div className="flex">
                <label>Tags</label>
                <div className="flex flex-col items-center">
                  <input
                    className="ml-[3rem] outline-none border border-white w-[15rem] rounded-sm"
                    type="text"
                    name="tags"
                    value={newProduct.tags}
                    onChange={handleChange}
                  />
                  {errors.tags && (
                    <p className="text-red-800 text-[12px] mr-[3rem]">{errors.tags}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="cursor-pointer bg-gray-700 py-1 rounded-md w-[50%] mx-auto"
              >
                {editingProduct ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
