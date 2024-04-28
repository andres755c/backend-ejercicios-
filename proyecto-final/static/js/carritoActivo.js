const rutaFetch = 'http://localhost:4545/api/carritos/carritosActivos'
const rutaFetchNewCarrito = 'http://localhost:4545/api/carritos'

document.getElementById('nuevoCarrito').addEventListener('click', nuevoCarrito)

cargarCarritos()

function cargarCarritos() {

    fetch(rutaFetch)
        .then(resp => resp.json())
        .then(data => {
            const targetDOM = document.getElementById('listaDeCarritos')
            targetDOM.addEventListener('click', selectCarrito)
            targetDOM.innerHTML = ''

            if (data.length > 0) {
                for (elem of data) {
                    const newElement = document.createElement('tr')
                    newElement.innerHTML = `
                <th scope="row" style="vertical-align: middle;">${elem._id}</th>
                <td style="vertical-align: middle;">Subtotal: ${elem.total}</td>
                <td style="vertical-align: middle;">
                <input type="radio" class="btn-check" name="options-outlined" id=${elem._id} autocomplete="off">
                <label class="btn btn-outline-success" for="success-outlined" id=${elem._id}>Continuar</label>
                </td>
                `
                    targetDOM.appendChild(newElement)
                }
            } else {
                targetDOM.innerHTML = `
                <div class="alert alert-success" role="alert">
                    No hay carritos activos. Crea uno nuevo porfavor!
                </div>
                `
            }
        })
}


function seleccionarCarrito(e) {
    if (e.target.id != '') {
        document.getElementById('carritoActivo').value = e.target.id
        localStorage.setItem('carrito', JSON.stringify(e.target.id))
        window.location = '/productos'
    }
}

function nuevoCarrito(e) {
    fetch(rutaFetchNewCarrito, {
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(data => {
            const newID = data._id
            localStorage.setItem('carrito', JSON.stringify(newID))
            window.location = '/productos'
        })

}