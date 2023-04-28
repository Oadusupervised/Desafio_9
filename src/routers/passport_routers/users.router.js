import { Router } from 'express'
import { getUsersController, postUsersController } from '../../controllers/users.controller.js'

export const usersRouter = Router()

usersRouter.post('/', postUsersController)
usersRouter.get('/', getUsersController)

