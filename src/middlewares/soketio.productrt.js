import { productManager } from "../Managers/ProductManager.js";

export async function socketFn(req, res, next) {
  const products = await productManager.getProducts();

}
