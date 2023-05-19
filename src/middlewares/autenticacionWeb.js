import {criptografiador} from '../utils/bcrypt.js'

export function extraerCredenciales(req,res,next){
  try{
    const token  = req.signedCookies.authToken
    const datosUsuarios = criptografiador.decodificarToken(token)
    req.usuario = datosUsuarios
  }
  catch(error){}
    next()
}

//autorizando
export function soloAutenticados(req, res, next) {
  if (!req.usuario) {
    return next(new Error('AUTHORIZATION ERROR'))
  }
  next()
}