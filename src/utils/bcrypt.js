import bcrypt from 'bcrypt'


export function hashear(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

export function validatePassword(recibida,almacenada){
    return bcrypt.compareSync(recibida,almacenada)
}