import { usuarioModel } from '../models/usuario.model.js'

export async function postSesiones(req, res, next) {
  console.log(req.body)

  const usuarioEncontrado = await usuarioModel.findOne({ email: req.body.email }).lean()
  if (!usuarioEncontrado) return res.sendStatus(401)

  if (usuarioEncontrado.password !== req.body.password) {
    return res.sendStatus(401)
  }

  req.session.user = {
    name: usuarioEncontrado.first_name + ' ' + usuarioEncontrado.last_name,
    email: usuarioEncontrado.email,
    age: usuarioEncontrado.age,
  }
  if (usuarioEncontrado.email.includes("admin")) {
    req.session.admin = {
      email: usuarioEncontrado.email
    };
  }

  res.status(201).json(req.session.user)
}

export async function deleteSesiones(req, res, next) {
  req.session.destroy(err => {
    res.sendStatus(200)
  })
}

export function getCurrentSessionController(req, res, next) {
  // passport guarda la sesion directamente en ** req.user ** en lugar del campo session de la peticion !
  res.json(req.user)
}

export async function logoutSessionsController(req, res, next) {
  // lo que estaba acá lo reemplacé por el atajo que me provee passport
  req.logout(err => {
      res.sendStatus(200)
  })
}

export function postSessionsController(req, res, next) {
  res.status(201).json(req.user)
}