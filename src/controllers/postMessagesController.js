import { messageModel } from "../models/messages.js"
export async function postMessagesController(req, res, next) {
  console.log(req.body)
  const mensajeCreado = await messageModel.create(req.body)
  res.status(201).json(mensajeCreado)
}