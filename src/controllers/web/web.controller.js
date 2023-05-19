export function homeController(req, res, next) {
    // if (!req.user || !req.user['email'])
    //     return next(new Error('problemas con la sesion!'))

    res.render('home', {
        pageTitle: 'Home',
        user: req.user['email'],
    })
}

export function loginController(req, res, next) {
    res.render('login', {
        pageTitle: 'Login'
    })
}

export function registerController(req, res, next) {
    res.render('register', {
        pageTitle: 'Register'
    })
}