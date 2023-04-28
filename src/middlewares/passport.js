import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {validatePassword} from '../utils/bcrypt.js'
import {userManager} from '../Managers/UserManager.js'
import { Strategy as GithubStrategy } from 'passport-github2'
import {ErrorDeAutenticacion} from '../entidades/errors/ErrorDeAutenticacion.js'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'
import { User } from '../entidades/User.js'


passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    // esto es lo que estaba en el controller de login
    const buscado = await userManager.lookUpByEmail(username)
    if (!buscado)
        return done(new ErrorDeAutenticacion())
    if (!validatePassword(password, buscado['password']))
        return done(new ErrorDeAutenticacion())
    delete buscado['password']
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
        user = await userManager.lookUpByEmail(profile.username)
    } catch (error) {
        // @ts-ignore
        user = new User({
            email: profile.username,
        })
        await userManager.addUser(user)
    }
    done(null, user)
}))

passport.serializeUser((user,next)=>{
    next(null,user)})
passport.deserializeUser((user,next)=>{
    next(null,user)
})

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()



export const autenticacionUserPass = passport.authenticate('local', {failWithError:true})
export const autenticacionPorGithub = passport.authenticate('github',{scope:['user:email']})
export const autenticacionPorGithub_CB = passport.authenticate('github', {failWithError: true})