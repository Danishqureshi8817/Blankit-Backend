import { fetchUser, loginCustomer, loginDeliveryPartner, refreshToken } from "../controllers/auth/auth.js";
import { updateUser } from "../controllers/tracking/user.js";
import { verifyToekn } from "../middlewares/auth.js";

export const authRoutes = (fastify, options, done) => {
  fastify.post("/customer/login", loginCustomer);
  fastify.post("/delivery/login", loginDeliveryPartner);
  fastify.post("/refresh-token", refreshToken);
  fastify.get("/user", { preHandler: [verifyToekn] }, fetchUser);
  fastify.patch("/user", { preHandler: [verifyToekn] }, updateUser);
  done()
};
