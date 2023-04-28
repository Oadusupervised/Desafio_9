import { Router } from 'express'
import { soloLogueadosView } from '../../middlewares/soloLogueados.js'
import { homeController, loginController, registerController } from '../../controllers/web.controller.js'

export const webRouter = Router()

webRouter.get('/', soloLogueadosView, homeController)
webRouter.get('/login', loginController)
webRouter.get('/register', registerController)