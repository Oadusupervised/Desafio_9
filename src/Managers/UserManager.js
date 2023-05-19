import { usuarioModel } from "../models/usuario.model.js";
 

class UserMongoose {
  #usuariosDb
  constructor() {
      this.#usuariosDb = usuarioModel
  }

  async guardar(datosUsuario) {
      let usuarioGuardado = await this.#usuariosDb.create(datosUsuario)
      usuarioGuardado = JSON.parse(JSON.stringify(usuarioGuardado))
      return usuarioGuardado
  }

  async obtenerTodos() {
      return await this.#usuariosDb.find().lean()
  }

  async obtenerSegunId(id) {
      const usuario = await this.#usuariosDb.findById(id).lean()
      if (!usuario) throw new Error('NOT FOUND')
      return usuario
  }

  async obtenerSegunEmail(email) {
      const usuario = await this.#usuariosDb.findOne({ email }).lean()
      if (!usuario) throw new Error('NOT FOUND')
      return usuario
  }
}

export const usuariosManager = new UserMongoose()
