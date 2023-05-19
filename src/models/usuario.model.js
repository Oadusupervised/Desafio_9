import mongoose from 'mongoose'

export const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  age: { type: Number, required: false },
  role:{type:String, default:'user'}
}, { versionKey: false })

export const usuarioModel = mongoose.model('usuarios', usuarioSchema)
