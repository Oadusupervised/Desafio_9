import express,{Router} from 'express'
import { productManager } from '../Managers/ProductManager.js';
import { cartManager } from '../Managers/CartManager.js';
import { postUsuarios } from '../controllers/usuarios.controller.js';
import * as sesionesController from '../controllers/sesiones.controller.js'
import { soloLogueadosApi } from '../middlewares/soloLogueados.js'
import {
    postSessionsController,
    getCurrentSessionController,
    logoutSessionsController
} from '../controllers/sesiones.controller.js'
import { autenticacionPorGithub_CB, autenticacionPorGithub, autenticacionUserPass } from '../middlewares/passport.js'
import { usersRouter } from './passport_routers/users.router.js'
import { sessionsRouter } from './sessions.router.js'

export const apiRouter= Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use('/users', usersRouter)
apiRouter.use('/sessions', sessionsRouter)
apiRouter.post("/usuarios",postUsuarios);
apiRouter.post('/sesiones', sesionesController.postSesiones)
apiRouter.delete('/sesiones', sesionesController.deleteSesiones)


//le cargo productos al carrito
apiRouter.post("/:cid/product/:pid", async (req, res, next) => {
  try {
    await productManager.getProductById(req.params.pid);
  } catch (error) {
    return next(error);
  }
  try {
    const product = await cartManager.addProductInCart(req.params.cid, req.params.pid);
    res.json(product);
  } catch (error) {
    next(error);
  }
});


//elimino un producto de un carrito
apiRouter.delete("/:cid/product/:pid", async (req, res, next) => {
  try {
    await productManager.getProductById(req.params.pid);
  } catch (error) {
    return next(error);
  }
  try {
    const deleter = await cartManager.delProductInCart(req.params.cid, req.params.pid);
    res.json(deleter);
  } catch (error) {
    return next(error);
  }
});


//actualizo un carrito
apiRouter.put("/:cid", async (req, res, next) => {
  try {
    const productosEnCarro = await cartManager.updateCart(req.params.cid, req.body);
    res.json(productosEnCarro);
  } catch (error) {
    next(error);
  }
});


//actualizo la cantidad de un producto en un carrito
apiRouter.put("/:cid/product/:pid", async (req, res, next) => {
  try {
    const prod = await productManager.getProductById(req.params.pid);
    try {
      // @ts-ignore
      if (prod?.stock < req.body.quantity) {
        throw new Error("Not Enough Stock");
      }
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
  try {
    const productupd = await cartManager.updProductinCart(
      req.params.cid,
      req.params.pid,
      req.body
    );
    res.json(productupd);
  } catch (error) {
    next(error);
  }
});


//elimino todos los productos de un carrito
apiRouter.delete("/:cid", async (req, res, next) => {
  try {
    const deleter = await cartManager.delAllProductsInCart(req.params.cid);
    res.json(deleter);
  } catch (error) {
    return next(error);
  }
});