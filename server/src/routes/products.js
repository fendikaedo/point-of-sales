import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const productsRoutes = [
  {
    method: "GET",
    path: "/products",
    handler: getProducts,
  },
  {
    method: "POST",
    path: "/products",
    options: {
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
        maxBytes: 10 * 1024 * 1024, // 10MB
      },
    },
    handler: createProduct,
  },
  {
    method: "PUT",
    path: "/products/{id}",
    handler: updateProduct,
  },
  {
    method: "DELETE",
    path: "/products/{id}",
    handler: deleteProduct,
  },
];

export default productsRoutes;
