import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Products from "./Products";
import AddProduct from "./AddProduct";
import NotFound from "./NotFound";

function AppView() {
  return (<>
    <div>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "2%",
          listStyle: "none"
          
          
        }}
      >
        <li>
          <Link to="/" >Products</Link>
        </li>
        <li>
          <Link to="/AddProduct">Add Product</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/AddProduct" element={<AddProduct />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  </>
  
  );
}

export default AppView;