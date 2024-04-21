// Obtener el canvas y su contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definir los niveles del juego
const levels = [
    {
        map: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                              B",
            "B                              B",
            "B       R                      B",
            "B                              B",
            "B                              B",
            "B         J                    B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ],
        playerStart: { x: 60, y: 180 },
        goalPosition: { x: 270, y: 240 },
        obstacles: [{ x: 180, y: 120 }, { x: 190, y: 500}, { x: 750, y: 530}, { x: 410, y: 570}, { x: 400, y: 240}],
        deadlyBlocks: [{ x: 140, y:240}, { x: 270, y: 280}, {x: 550, y:240}, { x: 210, y: 0}, { x: 190, y: 570}, { x: 0, y: 500}, { x: 770, y: 500}, {x: 770, y: 470}, {x: 770, y: 440}, {x: 770, y: 410}, {x: 770, y: 380}, {x: 770, y: 350}, {x: 770, y: 320}, {x: 770, y: 290}, {x: 770, y: 260}, {x: 770, y: 230}, {x: 770, y: 120}, {x: 770, y: 90}, {x: 770, y: 60}, {x: 770, y: 30}, {x: 770, y: 0}, {x: 400, y: 0}, { x: 470, y: 570}]
    },
    {
        map: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                              B",
            "B                              B",
            "B       R                      B",
            "B                              B",
            "B                              B",
            "B         J                    B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ],
        playerStart: { x: 60, y: 180 },
        goalPosition: { x: 300, y: 240 },
        obstacles: [{ x: 180, y: 180 }, { x: 180, y: 240}, { x: 400, y: 240}, { x: 30, y: 240}, { x: 60, y: 240}, { x: 90, y: 240}, { x: 120, y: 240}, { x: 150, y: 240}, { x: 180, y: 240}],
        deadlyBlocks: [{ x: 0, y: 210}, { x: 0, y: 150}, { x: 270, y: 240}, { x: 300, y: 270}, { x: 300, y: 570}, { x: 210, y: 180}, { x: 300, y: 210}, { x: 770, y: 210}, { x: 400, y: 210}, { x: 400, y: 570}, { x: 180, y: 90}, { x: 30, y: 240}, { x: 60, y: 240}, { x: 90, y: 240}, { x: 120, y: 240}, { x: 150, y: 240}, { x: 30, y: 300}, { x: 60, y: 300}, { x: 90, y: 300}, { x: 120, y: 300}, { x: 150, y: 300}, { x: 30, y: 150}, { x: 90, y: 150}, { x: 120, y: 150}, { x: 150, y: 150}, { x: 240, y: 240}]
    },
    {
        map: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                              B",
            "B                              B",
            "B       R                      B",
            "B                              B",
            "B                              B",
            "B         J                    B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "B                              B",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ],
        playerStart: { x: 150, y: 180 },
        goalPosition: { x: 210, y: 180 },
        obstacles: [{ x: 0, y: 30}, { x: 30, y: 30}, {x: 30, y: 0}, {x: 180, y: 180}, {x: 150, y: 269}, {x: 181, y: 181}, {x: 210, y: 210}],
        deadlyBlocks: [{ x: 0, y: 210}, { x: 0, y: 0}, { x: 180, y: 180 }, {x: 210, y: 150}, {x: 240, y: 180}, {x: 770, y:570}, {x: 150, y: 270}]
    }
];

// Tamaño de cada celda en el mapa
const tileSize = 30;

// Variables para el jugador
let playerX = 0;
let playerY = 0;
const playerSize = 30;
const playerSpeed = 5;

// Variables para el objetivo (victoria)
let goalX = 0;
let goalY = 0;
const goalSize = 30;

// Variables para los obstáculos y bloques "letales" del nivel actual
let obstacles = [];
let deadlyBlocks = [];

// Dirección de movimiento actual del jugador
let moveDirection = null;

// Variable para rastrear el nivel actual
let currentLevel = 0;

// Función para cargar y configurar el nivel actual
function loadLevel(levelIndex) {
    const level = levels[levelIndex];

    // Cargar la configuración del nivel
    map = level.map;
    playerX = level.playerStart.x;
    playerY = level.playerStart.y;
    goalX = level.goalPosition.x;
    goalY = level.goalPosition.y;
    obstacles = level.obstacles;
    deadlyBlocks = level.deadlyBlocks;
}

// Función principal de dibujo
function draw() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el mapa del nivel actual
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const tile = map[row][col];
            const x = col * tileSize;
            const y = row * tileSize;

            // Dibujar cada tipo de elemento del mapa
            if (tile === 'B') {
                ctx.fillStyle = 'gray';
                ctx.fillRect(x, y, tileSize, tileSize);
            }
        }
    }

    // Dibujar al jugador
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, playerSize, playerSize);

    // Dibujar el objetivo (cuadro amarillo)
    ctx.fillStyle = 'yellow';
    ctx.fillRect(goalX, goalY, goalSize, goalSize);

    // Dibujar los obstáculos (cuadros rojos)
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, tileSize, tileSize);
    });

    // Dibujar los bloques "letales" (cuadros negros)
    ctx.fillStyle = 'black';
    deadlyBlocks.forEach(block => {
        ctx.fillRect(block.x, block.y, tileSize, tileSize);
    });
}

// Función para actualizar la posición del jugador
function update() {
    // Mover al jugador en la dirección presionada
    if (moveDirection === 'left') {
        playerX -= playerSpeed;
    } else if (moveDirection === 'right') {
        playerX += playerSpeed;
    } else if (moveDirection === 'up') {
        playerY -= playerSpeed;
    } else if (moveDirection === 'down') {
        playerY += playerSpeed;
    }

    // Verificar colisiones con los obstáculos
    obstacles.forEach(obstacle => {
        if (
            playerX < obstacle.x + tileSize &&
            playerX + playerSize > obstacle.x &&
            playerY < obstacle.y + tileSize &&
            playerY + playerSize > obstacle.y
        ) {
            // Detener el movimiento si hay colisión con un obstáculo
            moveDirection = null;
        }
    });

    // Verificar colisión con los bloques "letales"
    deadlyBlocks.forEach(block => {
        if (
            playerX < block.x + tileSize &&
            playerX + playerSize > block.x &&
            playerY < block.y + tileSize &&
            playerY + playerSize > block.y
        ) {
            // Colisión con bloque "letal", mostrar mensaje de "Has perdido" y reiniciar el nivel
            alert('¡Has perdido!');
            loadLevel(currentLevel); // Reiniciar el nivel actual
        }
    });

    // Verificar si el jugador alcanzó el objetivo (cuadro amarillo)
    if (
        playerX + playerSize > goalX &&
        playerX < goalX + goalSize &&
        playerY + playerSize > goalY &&
        playerY < goalY + goalSize
    ) {
        // Avanzar al siguiente nivel si el objetivo se alcanza
        currentLevel++;
        if (currentLevel < levels.length) {
            alert('¡Has ganado! Avanzando al siguiente nivel...');
            loadLevel(currentLevel); // Cargar el siguiente nivel
        } else {
            // Si no hay más niveles, mostrar mensaje de victoria final
            window.location.href = 'End.html';
        }
    }

    // Verificar colisión con el borde del mapa
    if (playerX < 0 || playerX + playerSize > canvas.width || playerY < 0 || playerY + playerSize > canvas.height) {
        // Detener el movimiento si se alcanza el borde del mapa
        moveDirection = null;
    }
}

// Función para reiniciar el juego
function resetGame() {
    currentLevel = 0; // Reiniciar al primer nivel
    loadLevel(currentLevel); // Cargar el primer nivel
}

// Manejadores de eventos de teclado
document.addEventListener('keydown', event => {
    if (!moveDirection) {
        const key = event.key;

        // Iniciar movimiento en la dirección presionada
        if (key === 'ArrowLeft') {
            moveDirection = 'left';
        } else if (key === 'ArrowRight') {
            moveDirection = 'right';
        } else if (key === 'ArrowUp') {
            moveDirection = 'up';
        } else if (key === 'ArrowDown') {
            moveDirection = 'down';
        }
    }
});

// Función principal del juego
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Cargar y configurar el primer nivel al inicio del juego
loadLevel(currentLevel);

// Iniciar el bucle principal del juego
gameLoop();