import { confirmOrder, createOrder, getOrderById, getOrders, updateOrderStatus } from "../controllers/order/order.js";
import { verifyToekn } from "../middlewares/auth.js";

export const orderRoutes = (fastify, options, done) => {

  fastify.addHook("preHandler", async (request, reply) => {
    const isAuthenticated = await verifyToekn(request, reply);
    if (!isAuthenticated) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  });

  fastify.post("/order", createOrder);
  fastify.get("/orders", getOrders);
  fastify.patch("/order/:orderId/status", updateOrderStatus);
  fastify.post("/order/:orderId/confirm", confirmOrder);
  fastify.get("/order/:orderId", getOrderById);
  done();
};