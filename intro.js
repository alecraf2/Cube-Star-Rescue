// Obtener el canvas y su contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamaño de cada celda en el mapa
const tileSize = 30;

// Elementos de la pantalla de inicio con instrucciones
const introElements = [
    { text: 'This is you, you can move through the walls (You can stick to all the walls! The gray boxes are just decoration)', color: 'blue', x: 50, y: 150 },
    { text: 'or sliding (PRESS ENTER TO PLAY)', color: 'blue', x: 50, y: 170 },
    { text: 'Reach this star to get its power and destroy all the black squares in the level.', color: 'yellow', x: 50, y: 220 },
    { text: 'These are blocks to move (you can pass them)', color: 'red', x: 50, y: 290 },
    { text: 'Dont touch them or you will die, if you die you will appear moving in the direction you died', color: 'black', x: 50, y: 360 },
    { text: 'YOU have the power of intelligence! Now go and save little pink square!', color: 'pink', x: 50, y: 390 }
];

// Función para mostrar la pantalla de inicio con instrucciones
function showInstructions() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar los elementos de la pantalla de inicio
    introElements.forEach(element => {
        // Dibujar cuadro de color con texto
        ctx.fillStyle = element.color;
        ctx.fillRect(20, element.y - 20, 20, 20); // Cuadro de color
        ctx.fillStyle = 'black'; // Color de texto
        ctx.fillText(element.text, 50, element.y); // Texto
    });

    // Escuchar el evento de teclado para iniciar el juego al presionar "Enter"
    document.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            // Redirigir a la página de niveles (cargar el juego)
            window.location.href = 'game.html';
        }
    });
}

// Mostrar la pantalla de inicio con instrucciones al cargar la página
showInstructions();
