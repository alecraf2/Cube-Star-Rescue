// Obtener el canvas y su contexto
const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Tamaño y posición inicial del cuadrito azul y cuadrito rosa
let blueSquareX = -30; // Iniciar cuadrito azul fuera del canvas
let pinkSquareX = canvas.width + 30; // Iniciar cuadrito rosa fuera del canvas
const squareY = 150;

// Velocidad de movimiento de los cuadritos
const blueSquareSpeed = 2;
const pinkSquareSpeed = 2;

// Variables para controlar la animación
let collision = false;
let gameOver = false;
let heartSize = 0; // Tamaño inicial del corazón

// Función para iniciar la animación
function startAnimation() {
    // Limpiar el canvas en cada fotograma
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mover el cuadrito azul hacia la derecha
    blueSquareX += blueSquareSpeed;

    // Mover el cuadrito rosa hacia la izquierda
    pinkSquareX -= pinkSquareSpeed;

    // Detectar colisión entre los cuadritos azul y rosa
    if (blueSquareX + 30 >= pinkSquareX) {
        // Si hay colisión, detener los cuadritos en la posición de colisión
        blueSquareX = pinkSquareX - 30;
        collision = true;
    } else {
        collision = false;
    }

    // Dibujar cuadrito azul
    ctx.fillStyle = 'blue';
    ctx.fillRect(blueSquareX, squareY, 30, 30);

    // Dibujar cuadrito rosa
    ctx.fillStyle = 'pink';
    ctx.fillRect(pinkSquareX, squareY, 30, 30);

    // Dibujar corazón si hay colisión
    if (collision) {
        ctx.font = `bold ${heartSize}px Arial`;
        ctx.fillStyle = 'red';
        ctx.fillText('❤️', blueSquareX + 5, squareY - 10);
        heartSize += 1; // Aumentar tamaño del corazón

        // Mostrar "GAME OVER" después de que el corazón haya crecido lo suficiente
        if (heartSize >= 30) {
            gameOver = true;
        }
    }

    // Mostrar "GAME OVER" y corazón encima si gameOver es true
    if (gameOver) {
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('GAME OVER', canvas.width / 2 - 100, squareY - 50);

        // Dibujar corazón encima de "GAME OVER"
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('❤️', canvas.width / 2 - 40, squareY - 90);
    }

    // Volver a dibujar en el siguiente fotograma
    requestAnimationFrame(startAnimation);
}

// Iniciar la animación al cargar la página
startAnimation();

// Redirigir a index.html después de la animación (pasados 5 segundos)
setTimeout(() => {
    window.location.href = 'index.html';
}, 5000); // Tiempo en milisegundos (en este caso, 5 segundos)
