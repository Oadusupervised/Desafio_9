import { cartModel } from "../models/carts.js"
export async function postCartsController(req, res, next) {
  console.log(req.body)
  const mensajeCreado = await cartModel.create(req.body)
  res.status(201).json(mensajeCreado)
}