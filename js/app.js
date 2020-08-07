// constructor para el seguro
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

// cotizacion
Seguro.prototype.cotizarSeguro = function(informacion) {
    /* Multiplico el valor base segun la marca
    1 - Americano = 1.15
    2 - Asiatico = 1.05
    3 - Europeo = 1.35
    */
   let cantidad;
   const base = 2000;

   switch(this.marca) {
       case '1':
           cantidad = base*1.15
           break;
        case '2':
            cantidad = base*1.05
            break;
        case '3':
           cantidad = base*1.35
           break;
   }

   const diferenciaAnio = new Date().getFullYear()-this.anio;
   // cada año de diferencia es un 3% menos
   cantidad -= ((diferenciaAnio*3) * cantidad/100);
   /* segun tipo de seguro
   Basico = base + 30%
   Completo = base + 50%
   */
   if(this.tipo === 'basico') {
       cantidad = cantidad * 1.30;
   } else {
       cantidad = cantidad * 1.50;
   }
   return cantidad
}

// todo lo que se muestra en el hmtl
function Interfaz() {}

// mensaje que se imprime en el html
Interfaz.prototype.mostrarMensaje = function(mensaje, tipo) {
    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }

    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function() {
        document.querySelector('.mensaje').remove();
    }, 2000);
}

// imprime el resultado de la cotizacion
Interfaz.prototype.mostrarResultado = function(seguro, total) {
    const resultado = document.getElementById('resultado');

    let marca;
    switch (seguro.marca) {
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3':
            marca = 'Europeo';
            break;
    }

    const div = document.createElement('div');
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo de seguro: ${seguro.tipo}</p>
        <p>Total: $ ${total}</p>
    `;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function () {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    },2000);
}

// event listeners
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const interfaz = new Interfaz();

    // revisamos que todos los campos esten completos
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        interfaz.mostrarMensaje('Faltan datos. Revisa el formulario', 'error');
    } else {
        const resultados = document.querySelector('#resultado div')
        if (resultados != null) {
            resultados.remove();
        }
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        const cantidad = seguro.cotizarSeguro();
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...', 'correcto');
    }
});

// agrego la lista de años al html
const max = new Date().getFullYear();
const min = max-20;
const selectAnios = document.getElementById('anio');

for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}