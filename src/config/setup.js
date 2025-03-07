import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { authenticate, COKKIE_PASSWORD, sessionStore } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";
import { Admin, Customer, DeliveryPartner } from "../models/user.js";
import Branch from "../models/branch.js";
import Product from "../models/products.js";
import Category from "../models/category.js";
import Order from "../models/order.js";
import Counter from "../models/counter.js";

AdminJS.registerAdapter(AdminJSMongoose);

export const admin = new AdminJS({
  resources: [
    {
      resource: Customer,
      options: {
        listProperties: ["phone", "role", "isActivated"],
        filterProperties: ["phone", "role"]
      },
    },
    {
      resource: DeliveryPartner,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"]
      },
    },
    {
      resource: Admin,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"]
      },
    },
    { resource: Branch },
    { resource: Product },
    { resource: Category },
    { resource: Order },
    { resource: Counter }
  ],
  branding: {
    companyName: "Grocery Delivery App",
    withMadeWithLove: false,
  },
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  rootPath: '/admin'
});

export const buildAdminRouter = async (app) => {
  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookiePassword:COKKIE_PASSWORD,
      cookieName:'adminjs'
    },
    app,
    {
      store:sessionStore,
      saveUnintialized:true,
      secret:'sieL67H7GbkzJ4XCoH0cmO1hGBSiG598jkj',
      cookie:{
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      }
    }
  )
}