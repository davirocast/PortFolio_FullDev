document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const width = 10;
    let squares = [];
  
    // Crear la cuadrícula
    for (let i = 0; i < 200; i++) {
      const square = document.createElement('div');
      square.classList.add('cell');
      grid.appendChild(square);
      squares.push(square);
    }
  
    // Definir las piezas y sus rotaciones
    const tetrominoes = [
      {
        color: '#FF5733', // L-Tetromino
        shapes: [
          [1, width + 1, width * 2 + 1, 2],
          [width, width + 1, width + 2, width * 2 + 2],
          [1, width + 1, width * 2 + 1, width * 2],
          [width, width * 2, width * 2 + 1, width * 2 + 2]
        ]
      },
      {
        color: '#33FF57', // Z-Tetromino
        shapes: [
          [0, width, width + 1, width * 2 + 1],
          [1, width, width + 1, width + 2]
        ]
      },
      {
        color: '#3357FF', // T-Tetromino
        shapes: [
          [1, width, width + 1, width + 2],
          [1, width + 1, width + 2, width * 2 + 1],
          [width, width + 1, width + 2, width * 2 + 1],
          [width, width + 1, width + 2, width * 2 + 1]
        ]
      },
      {
        color: '#FFFF33', // O-Tetromino
        shapes: [
          [0, 1, width, width + 1]
        ]
      },
      {
        color: '#FF33FF', // I-Tetromino
        shapes: [
          [1, width + 1, width * 2 + 1, width * 3 + 1],
          [width, width + 1, width + 2, width + 3],
          [1, width + 1, width * 2 + 1, width * 3 + 1],
          [width, width + 1, width + 2, width + 3]
        ]
      }
    ];
  
    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * tetrominoes.length);
    let current = tetrominoes[random];
    let currentShape = current.shapes[currentRotation];
    let score = 0;
  
    // Dibuja el tetromino en su posición
    function draw() {
      currentShape.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
        squares[currentPosition + index].style.backgroundColor = current.color;
      });
    }
  
    // Elimina el tetromino de la cuadrícula
    function undraw() {
      currentShape.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino');
        squares[currentPosition + index].style.backgroundColor = '';
      });
    }
  
    // Mueve el tetromino hacia abajo
    function moveDown() {
      undraw();
      currentPosition += width;
      draw();
      freeze();
    }
  
    // Congela el tetromino cuando toca el fondo o se encuentra con otra pieza
    function freeze() {
      if (currentShape.some(index => currentPosition + index + width >= 200 || squares[currentPosition + index + width].classList.contains('taken'))) {
        currentShape.forEach(index => squares[currentPosition + index].classList.add('taken'));
        checkLines();
        random = Math.floor(Math.random() * tetrominoes.length);
        currentRotation = 0;
        current = tetrominoes[random];
        currentShape = current.shapes[currentRotation];
        currentPosition = 4;
        draw();
        gameOver();
      }
    }
  
    // Verifica si se completan líneas y las elimina
    function checkLines() {
      for (let i = 0; i < 199; i += width) {
        const row = Array.from({ length: width }, (_, j) => i + j);
        if (row.every(index => squares[index].classList.contains('taken'))) {
          score += 10;
          scoreDisplay.textContent = score;
          row.forEach(index => {
            squares[index].classList.remove('taken', 'tetromino');
          });
          // Elimina la línea y mueve las piezas hacia abajo
          squares.splice(i, width).forEach(cell => grid.appendChild(cell));
          squares = squares.concat(Array.from({ length: width }, () => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            return cell;
          }));
        }
      }
    }
  
    // Finaliza el juego si el tetromino toca la parte superior
    function gameOver() {
      if (currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        alert('Game Over');
        document.location.reload();
      }
    }
  
    // Control del teclado
    document.addEventListener('keydown', control);
    function control(e) {
      if (e.keyCode === 37) moveLeft(); // izquierda
      else if (e.keyCode === 38) rotate(); // rotar
      else if (e.keyCode === 39) moveRight(); // derecha
      else if (e.keyCode === 40) moveDown(); // abajo
    }
  
    function moveLeft() {
      undraw();
      const isAtLeftEdge = currentShape.some(index => (currentPosition + index) % width === 0);
      if (!isAtLeftEdge) currentPosition -= 1;
      if (currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1;
      }
      draw();
    }
  
    function moveRight() {
      undraw();
      const isAtRightEdge = currentShape.some(index => (currentPosition + index) % width === width - 1);
      if (!isAtRightEdge) currentPosition += 1;
      if (currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1;
      }
      draw();
    }
  
    // Función para rotar las piezas
    function rotate() {
      undraw();
      currentRotation = (currentRotation + 1) % current.shapes.length;
      currentShape = current.shapes[currentRotation];
  
      // Verifica si la rotación está fuera de los límites o colisiona
      if (currentShape.some(index => squares[currentPosition + index].classList.contains('taken') || 
        (currentPosition + index) < 0 || (currentPosition + index) >= 200 || 
        (currentPosition + index) % width === 0)) {
        currentRotation = (currentRotation - 1 + current.shapes.length) % current.shapes.length;
        currentShape = current.shapes[currentRotation];
      }
  
      draw();
    }
  
    // Dibuja el primer tetromino
    draw();
    
    // Inicia el juego y mueve las piezas hacia abajo
    setInterval(() => {
      moveDown();
    }, 1000);
  });
  