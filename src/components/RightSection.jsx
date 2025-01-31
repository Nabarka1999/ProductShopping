import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import "./RightSection.css";

export default function RightSection({ sortOrder }) {
  return (
    <div className="right-section">
      <Routes>
        <Route path="/" element={<ProductList sortOrder={sortOrder} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}
