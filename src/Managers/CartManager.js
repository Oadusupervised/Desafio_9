import mongoose from 'mongoose'
import {schemaCarts} from '../models/carts.js'
import {schemaProducts} from '../models/products.js'

export  class CartManager{
  #cartsDb
  #productsDb
  constructor() {
    this.#cartsDb = mongoose.model("carts", schemaCarts)
    this.#productsDb = mongoose.model("products", schemaProducts);

  }

  async addCart(cart) {
    const cartsave = await this.#cartsDb.create({
      _id: cart.id,
      nombreProducts: cart.nombreProducts
    });
    return cartsave;
  }
  
  async getProductsInCartById(id) {
    const cart = await this.#cartsDb.findOne({ _id: id }).lean();
    if (!cart) {
      throw new Error("Not Found");
    }
    return cart;
  }
  
  async addProductInCart(cid, pid) {
    const product = await this.#productsDb.findById(pid);
    if (!product) {
      return "Product not found";
    }
  
    const updatedCart = await this.#cartsDb.findOneAndUpdate(
      { _id: cid, "nombreProducts.id": { $ne: pid } }, // no actualizar si el producto ya existe
      { $push: { nombreProducts: { id: pid, quantity: 1 } } },
      { new: true }
    );
  
    if (!updatedCart) { // si no se actualizó significa que el producto ya existe en el carrito
      await this.#cartsDb.findOneAndUpdate(
        { _id: cid, "nombreProducts.id": pid },
        { $inc: { "nombreProducts.$.quantity": 1 } }
      );
    }
    return product
  }
  
  
  async  delProductInCart(cid, pid) {
    try {
      const cart = await this.#cartsDb.findOne({ _id: cid });
  
      if (!cart) {
        throw new Error("Not Found");
      }
  
      const result = await this.#cartsDb.findOneAndUpdate(
        { _id: cid },
        { $pull: { nombreProducts: { product: pid } } },
        { new: true }
      );
      //@ts-ignore
      return result.nombreProducts;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async updateCart(cid, updcart) {
    const cart = await this.#cartsDb.findOne({ _id: cid });
    if (!cart) {
      throw new Error("Not Found");
    }
    cart.nombreProducts[0].product = updcart;
    await cart.save();
  }
  
  async  updProductinCart(cid, pid, updquantity) {
    try {
      const cart = await this.#cartsDb.findOne({ _id: cid });
      if (!cart) {
        throw new Error("Not Found");
      }
  
      const result = await this.#cartsDb.findOneAndUpdate(
        {
          _id: cid,
          "nombreProducts.product": pid
        },
        {
          $set: {
            "nombreProducts.$.quantity": updquantity
          }
        },
        {
          new: true
        }
      );
  
      if (!result) {
        throw new Error("Not Found");
      }
  
      return result.nombreProducts;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  
  async delAllProductsInCart(cid) {
    const cart = await this.#cartsDb.findOne({ _id: cid });
    if (!cart) {
      throw new Error("Not Found");
    }
    cart.nombreProducts = [];
    await cart.save();
    return cart;
  }
  
}

export const cartManager = new CartManager()


