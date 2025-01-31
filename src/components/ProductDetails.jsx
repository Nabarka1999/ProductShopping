import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ product }) {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  const [productSpecs, setProductSpecs] = useState(null);

  useEffect(() => {
    console.log(state);
    setProductSpecs(state);
  }, [id]);

  return (
    <Container maxWidth="md">
      {productSpecs ? (
        <>
          <img
            src={`https://picsum.photos/900/700?random=${Math.floor(
              Math.random() * 1000
            )}`}
          />
          <Typography variant="h4" className="product-title">
            {productSpecs.name}
          </Typography>
          <Typography className="product-detail">
            <strong>Category:</strong> {productSpecs.main_category}
          </Typography>
          <Typography className="product-detail">
            <strong>Price:</strong> {productSpecs.mrp?.mrp || "N/A"}{" "}
            {productSpecs.mrp?.currency || ""}
          </Typography>
          <Typography className="product-detail">
            <strong>GST Charges:</strong> {productSpecs.sgst} %
          </Typography>
          <Typography className="product-detail">
            <strong>Location:</strong> {productSpecs.mrp?.location}
          </Typography>
          <Typography className="product-detail">
            <strong>Target Market:</strong> {productSpecs.mrp?.target_market}
          </Typography>
          <Typography className="product-detail">
            <strong>Packaging Type:</strong> {productSpecs.packaging_type}
          </Typography>
        </>
      ) : (
        <Typography>Loading product details...</Typography>
      )}
    </Container>
  );
}

export default ProductDetails;
