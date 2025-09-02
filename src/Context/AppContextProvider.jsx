import React, { createContext, useEffect, useState } from "react";
import productsData from "../assets/products.json";

export const Appcontext = createContext();

const AppContextProvider = ({ children }) => {
  const [productData, setProductData] = useState(productsData);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [searchText, setSearchText] = useState("");
  const [viewFormat, setViewFormat] = useState(
    localStorage.getItem("view") || "card"
  );
  const [modal, setModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    status: "",
    tags: [],
  });
  const [editingProduct, setEditingProduct] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleView = (view) => {
    setViewFormat(view === "card" ? "list" : "card");
  };

  useEffect(() => {
    localStorage.setItem("view", viewFormat);
  }, [viewFormat]);

  return (
    <Appcontext.Provider
      value={{
        productData,
        theme,
        toggleTheme,
        searchText,
        setSearchText,
        viewFormat,
        setViewFormat,
        toggleView,
        modal,
        setModal,
        newProduct,
        setNewProduct,
        editingProduct,
        setEditingProduct,
        setProductData,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
