let pantalla = document.getElementById('pantalla');
let operacionActual = '';
let operacionAnterior = '';
let operador = null;

function agregar(valor) {
    if (pantalla.value === '0' && valor !== '.') {
        pantalla.value = valor;
    } else {
        pantalla.value += valor;
    }
}

function limpiar() {
    pantalla.value = '';
    operacionActual = '';
    operacionAnterior = '';
    operador = null;
}

function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
}

function calcular() {
    try {
        let expresion = pantalla.value;
        
        expresion = expresion.replace(/×/g, '*');
        
        let resultado = Function('"use strict"; return (' + expresion + ')')();
        
        resultado = Math.round(resultado * 100000000) / 100000000;
        
        pantalla.value = resultado;
    } catch (error) {
        pantalla.value = 'Error';
        setTimeout(() => {
            limpiar();
        }, 1500);
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        agregar(key);
    } else if (key === '+' || key === '-') {
        agregar(key);
    } else if (key === '*') {
        agregar('×');
    } else if (key === '/') {
        agregar('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calcular();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        limpiar();
    } else if (key === 'Backspace') {
        borrar();
    }
});

// Inicializar pantalla
window.onload = function() {
    pantalla.value = '';
};