const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 16 * 50; // Ancho del laberinto con 16 columnas
canvas.height = 12 * 50; // Alto del laberinto con 12 filas

canvas.setAttribute("tabindex", 0);
canvas.focus();

const tileSize = 50;

const pacman = {
    x: tileSize + tileSize / 2, // Posición inicial de Pac-Man (fila 1, columna 1)
    y: tileSize + tileSize / 2,
    size: 20,
    speed: 5,
    mouthOpen: 0.2,
    direction: 'right',
    nextDirection: 'right'
};

// Fantasma

const ghost = [
    { x: tileSize * 14.5, y: tileSize * 6.5, size:20, color: 'red', direction: 'up', speed: 2},
    { x: tileSize * 13.5, y: tileSize * 6.5, size:20, color: 'pink', direction: 'down', speed: 2},
    { x: tileSize * 12.5, y: tileSize * 6.5, size:20, color: 'cyan', direction: 'left', speed: 2},
    { x: tileSize * 11.5, y: tileSize * 6.5, size:20, color: 'orange', direction: 'right', speed: 2},
];

// Laberinto: 1 = pared, 0 = espacio vacío
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Cápsulas de Pac-Man (coordenadas de las celdas vacías donde Pac-Man puede comer)
const capsules = [];
function generateCapsules() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 0) { // Solo colocar cápsulas en las celdas vacías
                capsules.push({ x: col * tileSize + tileSize / 2, y: row * tileSize + tileSize / 2 });
            }
        }
    }
}

function drawPacman() {
    ctx.beginPath();
    let startAngle, endAngle;
    switch (pacman.direction) {
        case 'right':
            startAngle = pacman.mouthOpen;
            endAngle = 2 * Math.PI - pacman.mouthOpen;
            break;
        case 'left':
            startAngle = Math.PI + pacman.mouthOpen;
            endAngle = Math.PI - pacman.mouthOpen;
            break;
        case 'up':
            startAngle = 1.5 * Math.PI + pacman.mouthOpen;
            endAngle = 1.5 * Math.PI - pacman.mouthOpen;
            break;
        case 'down':
            startAngle = 0.5 * Math.PI + pacman.mouthOpen;
            endAngle = 0.5 * Math.PI - pacman.mouthOpen;
            break;
    }
    ctx.arc(pacman.x, pacman.y, pacman.size, startAngle, endAngle);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

function drawMaze() {
    ctx.fillStyle = 'blue';
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

function drawCapsules() {
    ctx.fillStyle = 'white';
    for (let i = 0; i < capsules.length; i++) {
        const capsule = capsules[i];
        ctx.beginPath();
        ctx.arc(capsule.x, capsule.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

// Funcion Dibujar Fantasmas

function drawGhosts() {
    ghost.forEach((ghost) => {
        ctx.beginPath();
        ctx.arc(ghost.x, ghost.y, ghost.size,Math.PI,0);
        ctx.lineto(ghost.x + ghost.size /2);
        ctx.arc(ghost.x, ghost.size /2, ghost.size, 0, Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = ghost.color;
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(ghost.x - 5, ghost.y -5, 5, 0, 2 * Math.PI);
        ctx.arc(ghost.x + 5, ghost.y -5, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(ghost.x - 5, ghost.y +5, 5, 0, 2 * Math.PI);
        ctx.arc(ghost.x + 5, ghost.y +5, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}
function canMove(x, y) {
    let row = Math.floor(y / tileSize);
    let col = Math.floor(x / tileSize);

    if (maze[row] && maze[row][col] === 0) {
        return true;  // Se puede mover si la celda es vacía (0)
    }
    return false; // No se puede mover si hay una pared (1)
}

function movePacman() {
    // Intentar moverse en la dirección que el jugador presionó
    if (pacman.nextDirection === 'right' && canMove(pacman.x + pacman.speed, pacman.y)) {
        pacman.x += pacman.speed;
        pacman.direction = 'right';
    } else if (pacman.nextDirection === 'left' && canMove(pacman.x - pacman.speed, pacman.y)) {
        pacman.x -= pacman.speed;
        pacman.direction = 'left';
    } else if (pacman.nextDirection === 'up' && canMove(pacman.x, pacman.y - pacman.speed)) {
        pacman.y -= pacman.speed;
        pacman.direction = 'up';
    } else if (pacman.nextDirection === 'down' && canMove(pacman.x, pacman.y + pacman.speed)) {
        pacman.y += pacman.speed;
        pacman.direction = 'down';
    }
}

function moveGhosts()  {
    ghost.forEach((ghost) => {
        let nextX = ghost.x;
        let nextY = ghost.y;

        switch (ghost.direction) {
            case 'left': nextX -= ghost.speed; break;
            case 'right': nextX += ghost.speed; break;
            case 'up': nextY -= ghost.speed; break;
            case 'down': nextY += ghost.speed; break;
        }

        if (!canMove(nextX, nextY)) {
            const directions = ['left', 'right', 'up', 'down'];
            ghost.direction = directions[Math.floor(Math.random() * directions.length)];
        }else {
            ghost.x = nextX;
            ghost.y = nextY;
        }
    });
}

function chasePacman() {
    ghost.forEach((ghost) => {
        const dx = pacman.x - ghost.x;
        const dy = pacman.y - ghost.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            ghost.direction = dx > 0 ? 'right' : 'left';
        } else {
            ghost.direction = dy > 0 ? 'down' : 'up';
        }
    });
}

function checkCapsuleCollision() {
    for (let i = 0; i < capsules.length; i++) {
        const capsule = capsules[i];
        const distance = Math.sqrt(Math.pow(pacman.x - capsule.x, 2) + Math.pow(pacman.y - capsule.y, 2));
        if (distance < pacman.size + 5) { // Si la distancia es menor que la suma de los radios
            capsules.splice(i, 1); // Eliminar la cápsula
            scoreElement.textContent = `Score: ${score}`; // Actualizar el puntaje (asumiendo que hay un contador de score)
            break;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    drawMaze();
    drawCapsules();
    drawPacman();
    movePacman();
    moveGhosts();
    chasePacman();
    drawGhosts();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    // Cambiar la dirección solo si es una tecla de flecha
    switch (e.key) {
        case 'ArrowRight':
            pacman.nextDirection = 'right';
            break;
        case 'ArrowLeft':
            pacman.nextDirection = 'left';
            break;
        case 'ArrowUp':
            pacman.nextDirection = 'up';
            break;
        case 'ArrowDown':
            pacman.nextDirection = 'down';
            break;
    }
});

generateCapsules(); // Generar cápsulas
gameLoop(); // Iniciar el ciclo del juego




