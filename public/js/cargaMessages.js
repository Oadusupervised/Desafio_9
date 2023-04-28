const formCargaMessages = document.querySelector("#cargaMessages");
if (formCargaMessages instanceof HTMLFormElement) {
  formCargaMessages.addEventListener("submit", async  (event) => {
      event.preventDefault();
      const inputUser = document.querySelector('#inputUser')
      const inputMessages = document.querySelector('#inputMessages')

      if (
        inputUser instanceof HTMLInputElement &&
        inputMessages instanceof HTMLInputElement
      ) {
  
        const datosMensaje = {
          user: inputUser.value,
          message: inputMessages.value
        }
  
        const mensajeCreado = await fetch('/views/realTimeMessages', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosMensaje)
        }).then(res => res.json())
  
        console.log(mensajeCreado)
      }
      console.log("nunca llegaron los datos")
    })
  }

