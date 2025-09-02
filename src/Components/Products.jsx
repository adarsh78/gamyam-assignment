import React, { useContext } from "react";
import { Appcontext } from "../Context/AppContextProvider";
import CardView from "./CardView";
import ListView from "./ListView";

const Products = () => {
  const { productData, searchText, viewFormat } = useContext(Appcontext);

  const products = productData.filter((data) =>
    data.name.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log(viewFormat);

  return (
    <>
      <div>
        {products.length > 0 ? (
          viewFormat === "card" ? (
            <CardView products={products} />
          ) : (
            <ListView products={products} />
          )
        ) : (
          <p>No Poducts Found</p>
        )}
      </div>
    </>
  );
};

export default Products;
