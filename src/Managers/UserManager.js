import mongoose from "mongoose";
import { usuarioSchema } from "../models/usuario.model.js";
 

class UserMongoose {
  #userDb;
  constructor() {
     this.#userDb =  mongoose.model("usuarios", usuarioSchema);
  }

  async addUser(product) {
    const prodsave = await this.#userDb.create(product);
    return prodsave;
  }


  async getUsers() {
    const prodDisp = await this.#userDb.find().lean();
    return prodDisp;
  }

  async getUsersById(id) {
    const product = await this.#userDb.findById(id).lean();
    return product;
  }

  async deleteUser(id) {
    const finder = await this.#userDb.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.#userDb.findByIdAndRemove(id);
  }

  async updateUser(id, productUpd) {
    const finder = await this.#userDb.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.#userDb.findByIdAndUpdate(id, productUpd);
  }

  lookUpByEmail(email) {
    //@ts-ignore
    const buscado = this.#userDb.findById(u => u.email === email).lean()
    if (!buscado) throw new Error('usuario no encontrado')
    // devuelvo una copia para imitar el comportamiento de una db
    return { ...buscado }
}

}
export const userManager = new UserMongoose();
