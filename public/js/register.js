const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const input_first_name = document.querySelector('#input_first_name')
    const input_last_name = document.querySelector('#input_last_name')
    const input_email = document.querySelector('#input_email')
    const input_age = document.querySelector('#input_age')
    const input_password = document.querySelector('#input_password')
    const input_role = document.querySelector('#input_role')

    if (
      input_first_name instanceof HTMLInputElement &&
      input_last_name instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement&&
      input_role instanceof HTMLInputElement 

    ) {

      const datosUsuario = {
        
        email: input_email.value,
        password: input_password.value,
        first_name: input_first_name.value,
        last_name: input_last_name.value,
        age: input_age.value,
        role: input_role.value
      }

      const usuarioCreado = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      }).then(res => res.json())

      console.log(usuarioCreado)
    }
  })
}