import "dotenv/config";
import mongoose from "mongoose";
import { Category,Product } from "./src/models/index.js";
import {categories,products} from "./seedData.js";

async function seedDatabase(params) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Category.deleteMany({});

   const categoryDocs = await Category.insertMany(categories);

   const categoryMap = categoryDocs.reduce((acc, category) => {
    acc[category.name] = category._id;
    return acc;
  }, {});

  const productsWithCategoryIds = products.map((product) => {
    return {
      ...product,
      category: categoryMap[product.category],
    };
  });

  await Product.insertMany(productsWithCategoryIds);

    console.log("DATABASE SEEDED SUSSESSFULLY");
    
  } catch (error) {
    console.log("Error seeding database",error);
  }finally {
    await mongoose.connection.close();
  }
}

seedDatabase();