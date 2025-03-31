import jwt from "jsonwebtoken";

export const verifyToken = async (req, reply) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers["authorization"];
    // Check if the Authorization header is missing or doesn't start with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log(authHeader, 'No Authorization Header or Invalid Format');
      return reply.status(401).send({ message: "Access token required" });
    }

    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach the decoded token to the request object for future use
    req.user = decoded;
    return true
    console.log("Token Verified Successfully:", req.user);
  } catch (error) {
    // Handle token verification errors
    // console.error("Error Verifying Token:", error.message);
    return reply.status(401).send({ message: "Invalid or expired token", error: error.message });
  }
};
