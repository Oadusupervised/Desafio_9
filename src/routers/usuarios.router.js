import { Router } from 'express'
import { postUsuariosController } from '../controllers/usuarios.controller.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', postUsuariosController)