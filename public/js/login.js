const formLogin = document.querySelector('#formLogin')

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')

    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {

      const datosUsuario = {
        email: input_email.value,
        password: input_password.value,
      }

      const response= await fetch('/api/sessions', {
        method: 'POST',
        body: JSON.stringify(datosUsuario),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 201) {
        window.location.href = '/views/current'
      } else {
        console.log('[login] estado inesperado: ' + status)
      }
      if (response.status === 203) {
        window.location.href = '/views/login'
      }
    }
  })
}