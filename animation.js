// Obtener el canvas y su contexto
const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Tamaño y posición inicial del cuadrito azul, cuadrito rosa y cuadrito negro
let blueSquareX = canvas.width - 80; // Iniciar cuadrito azul desde la derecha
let pinkSquareX = 150;
let blackSquareX = canvas.width + 30; // Iniciar cuadrito negro fuera del canvas
const squareY = 150;

// Velocidad de movimiento de los cuadritos
const blueSquareSpeed = 2;
const pinkSquareSpeed = 1;
const blackSquareSpeed = 3;

// Función para iniciar la animación
function startAnimation() {
    // Limpiar el canvas en cada fotograma
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar cuadrito azul
    ctx.fillStyle = 'blue';
    ctx.fillRect(blueSquareX, squareY, 30, 30);

    // Dibujar cuadrito rosa con un corazón encima
    ctx.fillStyle = 'pink';
    ctx.fillRect(pinkSquareX, squareY, 30, 30);
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('❤️', pinkSquareX + 8, squareY + 24);

    // Dibujar cuadrito negro
    ctx.fillStyle = 'black';
    ctx.fillRect(blackSquareX, squareY, 30, 30);

    // Mover el cuadrito azul hacia la izquierda
    blueSquareX -= blueSquareSpeed;

    // Mover el cuadrito rosa hacia la izquierda
    pinkSquareX -= pinkSquareSpeed;

    // Mover el cuadrito negro hacia la izquierda
    blackSquareX -= blackSquareSpeed;

    // Si el cuadrito negro alcanza al cuadrito rosa, mover al cuadrito rosa junto con el negro
    if (blackSquareX <= pinkSquareX + 30 && blackSquareX + 30 >= pinkSquareX) {
        pinkSquareX = blackSquareX - 30; // Mover el cuadrito rosa junto con el negro
    }

    // Volver a dibujar en el siguiente fotograma
    requestAnimationFrame(startAnimation);
}

// Iniciar la animación al cargar la página
startAnimation();

// Redirigir a index.html después de la animación (pasados 5 segundos)
setTimeout(() => {
    window.location.href = 'Intro.html';
}, 5000); // Tiempo en milisegundos (en este caso, 5 segundos)
