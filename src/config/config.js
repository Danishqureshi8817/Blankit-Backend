import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";
import { Admin } from "../models/user.js";


export const PORT = process.env.PORT || 3000;
export const COKKIE_PASSWORD = process.env.COKKIE_PASSWORD;

const MongoDBStore = ConnectMongoDBSession(fastifySession);
export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "session",
});

sessionStore.on("error", function (error) {
  console.log("MongoDB Session Store Error", error);
});

export const authenticate = async (email,password) => {

  // if (email && password) {
  //   if (email === "danish@gmail.com" && password === "12345") {
  //     return Promise.resolve({email: email,password: password});
  //   }else{
  //     return null;
  //   }
    
  // }

  // uncomment this when created admin manually
  if (email && password) {
    const user = await Admin.findOne({email});
    if (!user) {
      return null;
    }

    if (user.password === password) {
      return Promise.resolve({email: email,password: password});
    } else {
      return null;
    }
  }

  return null;

};