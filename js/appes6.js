// constructor para el seguro
class Seguro{
    constructor(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }
    // cotizacion
    cotizarSeguro(){
        /* Multiplico el valor base segun la marca
        1 - Americano = 1.15
        2 - Asiatico = 1.05
        3 - Europeo = 1.35
        */
       let cantidad;
       const base = 2000;
    
       // segun marca
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
    
       // segun año
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
}

// todo lo que se muestra en el hmtl
// lo cargo como un objeto vacio
class Interfaz{
    // mensaje que se imprime en el html
    mostrarMensaje(mensaje, tipo){
        const div = document.createElement('div');
    
        if(tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
    
        // se imprime el mensaje en el html
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));
    
        // hago que desaparezca el mensaje despues de un tiempo
        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 2000);
    }
    // imprime el resultado de la cotizacion
    mostrarResultado(seguro, total){
        const resultado = document.getElementById('resultado');
        // tengo que poner el texto la marca
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
        
        // creo el div donde va el resultado
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="header">Tu resumen</p>
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo de seguro: ${seguro.tipo}</p>
            <p>Total: $ ${total}</p>
        `;
        // carga el spinner y despues resultado
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function () {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        },2000);
    }
}

// event listeners
// para cuando hago click en submit
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // lee la marca del <select>
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // lee el año del <select>
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // lee el valor del radio button del <select>
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    // crear instancia de interfaz
    const interfaz = new Interfaz();

    // revisamos que todos los campos esten completos
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        // si falta un dato
        interfaz.mostrarMensaje('Faltan datos. Revisa el formulario', 'error');
    } else {
        // elimina los resultados anteriores
        const resultados = document.querySelector('#resultado div')
        if (resultados != null) {
            resultados.remove();
        }
        // cotizar y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        // cotizar el seguro con un protoype
        const cantidad = seguro.cotizarSeguro();
        // mostrar el resultado de la cotizacion
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...', 'correcto');
    }

});

// agrego la lista de años al html
const max = new Date().getFullYear();
const min = max-20;
const selectAnios = document.getElementById('anio');

// con el for recorro los años entre max y min y agrego los valores como options al html
for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}