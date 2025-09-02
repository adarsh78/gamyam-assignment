import React from "react";
import useTheme from "./Hooks/useTheme";
import Header from "./Components/Header";
import Products from "./Components/Products";
import SearchProduct from "./Components/SearchProduct";
import AddProduct from "./Components/AddProduct";

const App = () => {
  const { getThemeClass } = useTheme();
  return (
    <>
      <div
        className={`${getThemeClass("bg")} ${getThemeClass(
          "text"
        )} h-screen overflow-y-scroll`}
      >
        <Header />
        <SearchProduct />
        <Products />
        <AddProduct />
      </div>
    </>
  );
};

export default App;
