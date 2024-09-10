agregarFunciones();

function movimientosPosibles() {
    const whiteSpaceLocation = document.querySelector('.whiteSpace');
    const posicion = clasesFiltradas(whiteSpaceLocation);
    const textoClase = '.' + posicion.join(".");

    const movimientos = [];
    movimientos.push(textoClase.replace(/(\d+)(\D+)(\d+)/, (match, num1, letras, num2) => { return num1 + letras + (parseInt(num2) + 1); }));
    movimientos.push(textoClase.replace(/(\d+)(\D+)(\d+)/, (match, num1, letras, num2) => { return num1 + letras + (parseInt(num2) - 1); }));
    movimientos.push(textoClase.replace(/\d+/, (num) => parseInt(num) + 1));
    movimientos.push(textoClase.replace(/\d+/, (num) => parseInt(num) - 1));

    return movimientos;
}

function handleClick() {
    moverPieza(this);
}

function moverPieza(element) {
    const whiteSpace = document.querySelector('.whiteSpace');
    whiteSpace.textContent = element.textContent;
    whiteSpace.classList.remove('whiteSpace');
    element.classList.remove('clickable');
    element.classList.add('whiteSpace');
    element.textContent = '';
    document.querySelectorAll('.clickable').forEach(element => {
        element.classList.remove('clickable');
        element.removeEventListener('click', handleClick);
    });
    agregarFunciones();
}

function agregarFunciones() {
    movimientosPosibles().forEach(element => {
        try {
            let elemento = document.querySelector(`${element}`);
            if (elemento && !elemento.classList.contains('clickable')) {
                elemento.classList.add('clickable');
                elemento.addEventListener('click', handleClick);
            }
        } catch (error) {
            console.log(`El elemento ${element} está fuera de los límites.`);
        }
    });
}

function clasesFiltradas(filtrando) {
    const element = filtrando;
    const validClasses = ['ro1', 'ro2', 'ro3', 'ro4', 'co1', 'co2', 'co3', 'co4'];

    const elementClasses = Array.from(element.classList);

    const filteredClasses = elementClasses.filter(cls => validClasses.includes(cls));

    return filteredClasses;
}

function manejarTecla(event) {
    const whiteSpace = document.querySelector('.whiteSpace');
    const posicion = clasesFiltradas(whiteSpace);
    let nuevaFila = posicion[0];
    let nuevaColumna = posicion[1];

    switch (event.key) {
        case 'w':
            nuevaFila = posicion[0].replace(/\d+/, (num) => parseInt(num) + 1);
            break;
        case 's':
            nuevaFila = posicion[0].replace(/\d+/, (num) => parseInt(num) - 1);
            break;
        case 'a':
            nuevaColumna = posicion[1].replace(/\d+$/, (num) => parseInt(num) + 1);
            break;
        case 'd':
            nuevaColumna = posicion[1].replace(/\d+$/, (num) => parseInt(num) - 1);
            break;
        default:
            return;
    }

    const selector = `.${nuevaFila}.${nuevaColumna}`;
    const elementoMovido = document.querySelector(selector);

    if (elementoMovido) {
        moverPieza(elementoMovido);
    }
}

document.addEventListener('keydown', manejarTecla);

function revolverPiezas() {
    const movimientos = ['w', 'a', 's', 'd'];
    const cantidadDeMovimientos = 100;

    for (let i = 0; i < cantidadDeMovimientos; i++) {
        const teclaAleatoria = movimientos[Math.floor(Math.random() * movimientos.length)];
        manejarTecla({ key: teclaAleatoria });
    }
}

document.getElementById('shuffle').addEventListener('click', revolverPiezas);

function verificarPuzzle() {
    const posicionesCorrectas = [
        '1', '2', '3', '4',
        '5', '6', '7', '8',
        '9', '10', '11', '12',
        '13', '14', '15', ''
    ];

    const elementos = Array.from(document.querySelectorAll('.numberitem'));
    const estadoActual = elementos.map(element => element.textContent.trim());

    const estaResuelto = estadoActual.every((valor, indice) => valor === posicionesCorrectas[indice]);

    if (estaResuelto) {
        verificar.classList.add('invisible');
        elementos.forEach(element => {
            element.classList.add('fade-out');
            element.addEventListener('animationend', () => {
                element.remove();
            });
            setTimeout(() => {
                completo.classList.add('fade-in');
            }, 1000);
        });
    } else {
        verificar.classList.add('shake', 'error');

        setTimeout(() => {
            verificar.classList.remove('shake', 'error');
        }, 500);
    }
}

document.getElementById('verificar').addEventListener('click', verificarPuzzle);
