const formCargaCarts = document.querySelector("#cargaCarts");
if (formCargaCarts instanceof HTMLFormElement) {
  formCargaCarts.addEventListener("submit", async  (event) => {
      event.preventDefault();
      const inputId = document.querySelector('#inputId')
      const inputId_del_producto = document.querySelector('#inputId_del_producto')
      const inputCantidad = document.querySelector('#inputCantidad')


      if (
        inputId instanceof HTMLInputElement &&
        inputId_del_producto instanceof HTMLInputElement&&
        inputCantidad instanceof HTMLInputElement
      ) {
  
        const datosUsuario = {
          id: inputId.value,
          nombreProducts: [
            {product:inputId_del_producto.value,
            quantity:inputCantidad.value}
          ]
        }
  
        const carritoCreado = await fetch('/views/realTimeCarts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosUsuario)
        }).then(res => res.json())
  
        console.log(carritoCreado)
      }
      console.log("nunca llegaron los datos")
    })
  }

