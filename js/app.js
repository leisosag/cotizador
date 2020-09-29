// CONSTRUCTORES
function Presupuesto(torta, tamaño) {
    this.torta = torta;
    this.tamaño = tamaño;
}

// realiza la cotizacion con los datos
Presupuesto.prototype.cotizarTorta = function () {
    /*
    1 coco = 100
    2 brownie = 110
    3 fontana = 120
    4 cheesecake = 130
    5 crumble = 140
    */

    // precio base
    let precio;
    switch (this.torta) {
        case '1':
            precio = 100;
            break;
        case '2':
            precio = 110;
            break;
        case '3':
            precio = 120;
            break;
        case '4':
            precio = 130;
            break;
        case '5':
            precio = 140;
            break;
        default:
            break;
    }

    // leer el tamaño
    /*
    si es grande +20%
    si es mediana =
    si es mini -20%
    */

    if (this.tamaño === 'grande') {
        precio *= 1.20;
    } else if (this.tamaño === 'mini') {
        precio *= 0.8;
    }

    return precio;
}

function UI() { }

// prototype de UI para validar el form
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    // mensaje y su clase por defecto
    div.textContent = mensaje;
    div.classList.add('mensaje', 'm-3');

    // segun el tipo
    (tipo === 'error') ? div.classList.add('error') : div.classList.add('correcto');

    // inserto en HTML
    const formulario = document.getElementById('cotizar-torta');
    formulario.insertBefore(div, document.getElementById('resultado'));

    // limpia el mensaje
    setTimeout(() => {
        div.remove();
    }, 1000);
}

UI.prototype.mostrarResultado = (presupuesto, total) => {
    const { torta, tamaño } = presupuesto;

    // imprimir el tipo de torta
    let textoTorta;
    switch (torta) {
        case '1':
            textoTorta = 'Coco'
            break;
        case '2':
            textoTorta = 'Brownie'
            break;
        case '3':
            textoTorta = 'Fontana'
            break;
        case '4':
            textoTorta = 'Cheesecake'
            break;
        case '5':
            textoTorta = 'Crumble'
            break;
        default:
            break;
    }

    // crear el resultado
    const div = document.createElement('div');
    div.classList.add('m-3');
    div.innerHTML = `
        <p class="header">Tu cotización</p>
        <p>Torta: ${textoTorta}</p>
        <p>Tamaño: ${tamaño}</p>
        <p>Total: $${total}</p>
    `;
    const resultadoDiv = document.getElementById('resultado');

    // mostrar spinner
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';

    // muestra la cotizacion y borra el spinner
    setTimeout(function () {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 1000);
}

// instanciar UI
const ui = new UI();

// EVENT LISTENERS
eventListeners();
function eventListeners() {
    const formulario = document.getElementById('cotizar-torta');
    formulario.addEventListener('submit', cotizarTorta);
}

function cotizarTorta(e) {
    e.preventDefault();
    // leer tipo de torta
    const torta = document.getElementById('torta').value;

    // leer tamaño
    const tamaño = document.querySelector('input[name="tamaño"]:checked').value;

    // validacion del form
    if (torta === '' || tamaño === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
        return;
    }

    // limpiar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }

    // instanciar el presupuesto
    const presupuesto = new Presupuesto(torta, tamaño);
    const total = presupuesto.cotizarTorta();

    // utilizar el protoype que va a cotizar
    ui.mostrarResultado(presupuesto, total);
}