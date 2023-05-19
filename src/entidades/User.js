export class User {
    #nombre
    #email
    #password
    #rol
  
    constructor({ email, password, nombre, rol }) {
      this.#email = email
      this.#password = password
      this.#nombre = nombre
      this.#rol = rol
    }
  
    get email() { return this.#email }
    get password() { return this.#password }
    get nombre() { return this.#nombre }
    get rol() { return this.#rol }
  
    datos() {
      return {
        nombre: this.#nombre,
        email: this.#email,
        password: this.#password,
        rol: this.#rol,
      }
    }
  }