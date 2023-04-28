export function manejoDeErrores(error, req, res, next) {
    switch (error.tipo) {
        case 'ERROR_DE_AUTENTICACION':
            res.status(401)
            break
        case 'ERROR_DE_PERMISOS':
            res.status(403)
            break
        default:
            res.status(500)
    }
    console.log('comienza el log del error')
    console.log(error)
    console.log('fin del log del error')

    res.json({ errorMsg: error.message })
}
