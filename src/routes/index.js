import { authRoutes } from "./auth.js";
import { orderRoutes } from "./order.js";
import { categoryRoutes, productRoutes } from "./products.js";

const prefix = "/api";

export const registerRoutes = (fastify, options, done) => {
  fastify.register(authRoutes, { prefix: `${prefix}/auth` });
  fastify.register(orderRoutes, { prefix: `${prefix}/order` });
  fastify.register(categoryRoutes, { prefix: `${prefix}/category` });
  fastify.register(productRoutes, { prefix: `${prefix}/product` });
}