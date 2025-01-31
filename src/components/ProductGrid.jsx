import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const products = [
  {
    id: 1,
    name: "React",
    main_category: "Frontend",
    mrp: { mrp: 30, currency: "USD" },
  },
  {
    id: 2,
    name: "MUI",
    main_category: "UI Library",
    mrp: { mrp: 20, currency: "USD" },
  },
];

export default function ProductGrid() {
  const columns = [
    {
      field: "name",
      headerName: "Product",
      width: 400,
      renderCell: (params) => {
        const product = params.row;

        return (
          <Card
            elevation={3}
            onClick={() => alert(`Clicked on ${product.name}`)}
            style={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
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
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
    </div>
  );
}
