import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import {criptografiador} from '../utils/bcrypt.js'
import { usuariosManager } from '../managers/UserManager.js'
import { ErrorDeAutenticacion } from '../entidades/errors/ErrorDeAutenticacion.js'
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'
import { User } from '../entidades/User.js'

//TODO agregado para jwt desde acá ---------------------------------------------------------

import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { JWT_SECRET } from '../config/auth.config.js'

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
        let token = null
        if (req && req.signedCookies) {
            token = req.signedCookies['jwt_authorization']
        }
        return token
    }]),
    secretOrKey: JWT_SECRET,
}, async (jwt_payload, done) => {
    try {
        done(null, jwt_payload) // payload es el contenido del token, ya descifrado
    } catch (error) {
        done(error)
    }
}))

export function autenticacionJwtApi(req, res, next) {
    passport.authenticate('jwt', (error, jwt_payload, info) => {
        if (error || !jwt_payload) return next(new ErrorDeAutenticacion())
        req.user = jwt_payload
        next()
    })(req, res, next)
}

export function autenticacionJwtView(req, res, next) {
    passport.authenticate('jwt', (error, jwt_payload) => {
        if (error || !jwt_payload) return res.redirect('/login')
        req.user = jwt_payload
        next()
    })(req, res, next)
}
//TODO hasta acá ---------------------------------------------------------

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    const buscado = await usuariosManager.obtenerSegunEmail(username)
    if (!buscado)
        return done(new ErrorDeAutenticacion())
    if (!criptografiador.comparar(password, buscado.password))
        return done(new ErrorDeAutenticacion())
    //@ts-ignore
    delete buscado.password
    done(null, buscado)
}))

passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    let user
    try {
        user = await usuariosManager.obtenerSegunEmail(profile.username)
    } catch (error) {
        // @ts-ignore
        user = new User({
            email: profile.username,
        })
        await usuariosManager.guardar(user)
    }
    done(null, user)
}))

export function afterLoginViewController(req, res, next) {
    res.cookie('jwt_authorization', criptografiador.generarToken(req.user), { signed: true, httpOnly: true })
    res.redirect('/views/current')
}

//TODO de acá saqué todo lo que tiene que ver con session! ---------------------------

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
// passport.serializeUser((user, next) => { next(null, user) })
// passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
// export const passportSession = passport.session()


// estos son para cargar como middlewares antes de los controladores correspondientes
export const autenticacionLocal = passport.authenticate('local', { session: false, failWithError: true })
export const autenticacionPorGithub = passport.authenticate('github', { session: false, scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { session: false, failWithError: true })
