import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  TextField,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductList({ sortOrder }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const productsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [category, sortOrder]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/cms/products");
      let data = response.data.products || [];

      if (category) {
        data = data.filter(
          (product) =>
            product.main_category &&
            product.main_category.toLowerCase() === category.toLowerCase()
        );
      }

      if (sortOrder === "asc") {
        data = [...data].sort((a, b) => (a.mrp?.mrp || 0) - (b.mrp?.mrp || 0));
      } else if (sortOrder === "desc") {
        data = [...data].sort((a, b) => (b.mrp?.mrp || 0) - (a.mrp?.mrp || 0));
      }

      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = page * productsPerPage;
  const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="Search by Name"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
      />

      <Select
        value={category}
        displayEmpty
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        style={{ marginBottom: "1rem" }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="HOUSE HOLD NEEDS">Household Needs</MenuItem>
        <MenuItem value="HOME NEEDS">Home Needs</MenuItem>
        <MenuItem value="CLEANING & HOUSEHOLD">Cleaning And Household</MenuItem>
        <MenuItem value="Kitchen, Garden & Pets">Kitchen Needs</MenuItem>
      </Select>

      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : currentPageProducts.length > 0 ? (
          currentPageProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product}
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: product })
                }
              />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ textAlign: "center", width: "100%", marginTop: "2rem" }}
          >
            No results found
          </Typography>
        )}
      </Grid>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Button
          onClick={() => handlePageChange("prev")}
          disabled={page === 1}
          style={{ marginRight: "1rem" }}
        >
          Previous
        </Button>
        <Typography variant="body1">
          Page {page} of {totalPages}
        </Typography>
        <Button
          onClick={() => handlePageChange("next")}
          disabled={page === totalPages}
          style={{ marginLeft: "1rem" }}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}

export default ProductList;
