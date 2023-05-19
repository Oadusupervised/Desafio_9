import { usuariosManager } from '../managers/UserManager.js'
import { criptografiador } from '../utils/bcrypt.js'


export async function postSesionesController(req, res, next) {
    const credenciales = req.body

    try {
        console.log('aun no pude encontrar el correo')

        const usuario = await usuariosManager.obtenerSegunEmail(credenciales.email)
        console.log('pude encontrar el correo')
        if (!criptografiador.comparar(credenciales.password, usuario.password)) {
            return next(res.sendStatus(203))
        }
        console.log('apenas generare la cookie')
        const token = criptografiador.generarToken(usuario)
        console.log('cookie creada con exito')
        res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })
        console.log('la cookie nada que la encuentro')

        res.sendStatus(201)

    } catch (error) {
        next(new Error('AUTHENTICATION ERROR'))
    }
}

export async function deleteSesionesController(req, res, next) {
    res.clearCookie('authToken', { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })
    res.sendStatus(200)
}