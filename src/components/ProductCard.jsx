import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function ProductCard({ product, onClick }) {
  return (
    <Card
      elevation={3}
      onClick={onClick}
      style={{
        cursor: "pointer",
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={`https://picsum.photos/300/200?random=${Math.floor(
          Math.random() * 1000
        )}`}
        alt={product.name}
        style={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2">
          <strong>Category:</strong> {product.main_category}
        </Typography>
        <Typography variant="body2">
          <strong>Price:</strong> {product.mrp?.mrp || "N/A"}{" "}
          {product.mrp?.currency || ""}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
