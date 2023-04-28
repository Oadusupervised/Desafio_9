import mongoose from "mongoose";
import { schemaProducts } from "../models/products.js";
 

class ProductMongoose {
  #productsDb;
  constructor() {
     this.#productsDb =  mongoose.model("products", schemaProducts);
  }

  async addProduct(product) {
    const prodsave = await this.#productsDb.create(product);
    return prodsave;
  }


  async getProducts() {
    const prodDisp = await this.#productsDb.find().lean();
    return prodDisp;
  }

  async getProductById(id) {
    const product = await this.#productsDb.findById(id).lean();
    return product;
  }

  async deleteProduct(id) {
    const finder = await this.#productsDb.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.#productsDb.findByIdAndRemove(id);
  }

  async updateProduct(id, productUpd) {
    const finder = await this.#productsDb.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.#productsDb.findByIdAndUpdate(id, productUpd);
  }

}
export const productManager = new ProductMongoose();
