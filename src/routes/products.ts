import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";

const app = express.Router();

// Create New Product  - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

// Search route To get all Products with Filters
app.get("/all", getAllProducts);

// To get last 10 Products  - /api/v1/product/latest
app.get("/latest", getLatestProducts);

// To get al unique Categories  - /api/v1/product/categories
app.get("/categories", getAllCategories);

// To get all Products for Admin  - /api/v1/product/admin-products
app.get("/admin-products", adminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
