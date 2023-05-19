import { Router } from 'express'
import { postSesionesController, deleteSesionesController } from '../controllers/sesiones.controller.js'
import { antenticacionPorGithub_CB, autenticacionPorGithub, autenticacionLocal, autenticacionJwtApi } from '../middlewares/autenticaciongithub.js'
import { afterLoginViewController } from '../middlewares/autenticaciongithub.js'

export const sesionesRouter = Router()


// login con github
sesionesRouter.get('/github', autenticacionPorGithub)
sesionesRouter.get('/githubcallback',
    antenticacionPorGithub_CB,
    afterLoginViewController //TODO
)


sesionesRouter.post('/', postSesionesController)
sesionesRouter.delete('/logout', deleteSesionesController)