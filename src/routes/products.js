import { getAllCategories } from "../controllers/product/category.js";
import { getProductByCategoryId } from "../controllers/product/product.js";

export const categoryRoutes = (fastify, options, done) => {
  fastify.get("/categories", getAllCategories);
  done();
}
export const productRoutes = (fastify, options, done) => {
  fastify.get("/products/:categoryId", getProductByCategoryId);
  done();
}