document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.tetris__grid');
  const scoreDisplay = document.querySelector('#score');
  const width = 10;
  let squares = [];
  let currentPosition = 4;
  let currentRotation = 0;
  let score = 0;
  let timerId;

  // Tetrominos (corrección en el Z-Tetromino)
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
      color: '#33FF57', // Z-Tetromino (corregido)
      shapes: [
        [0, width, width + 1, width * 2 + 1],
        [1, width + 1, width + 2, width * 2 + 2]
      ]
    },
    {
      color: '#3357FF', // T-Tetromino
      shapes: [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
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
        [width, width + 1, width + 2, width + 3]
      ]
    }
  ];

  // Creación del grid
  for (let i = 0; i < 200; i++) {
    const square = document.createElement('div');
    square.classList.add('tetris__grid__cell');
    grid.appendChild(square);
    squares.push(square);
  }

  // Línea base oculta
  for (let i = 0; i < width; i++) {
    const takenSquare = document.createElement('div');
    takenSquare.classList.add('tetris__grid__cell', 'tetris__grid__cell--taken', 'tetris__hidden');
    grid.appendChild(takenSquare);
    squares.push(takenSquare);
  }

  // Selección inicial del Tetromino
  let random = Math.floor(Math.random() * tetrominoes.length);
  let currentTetromino = tetrominoes[random];
  let currentShape = currentTetromino.shapes[currentRotation];

  // Dibuja el Tetromino
  function draw() {
    currentShape.forEach(index => {
      squares[currentPosition + index].classList.add('tetris__grid__cell--tetromino');
      squares[currentPosition + index].style.backgroundColor = currentTetromino.color;
    });
  }

  // Borra el Tetromino
  function undraw() {
    currentShape.forEach(index => {
      squares[currentPosition + index].classList.remove('tetris__grid__cell--tetromino');
      squares[currentPosition + index].style.backgroundColor = '';
    });
  }

  // Mueve el Tetromino hacia abajo
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // Congela el Tetromino y genera uno nuevo
  function freeze() {
    if (currentShape.some(index => squares[currentPosition + index + width].classList.contains('tetris__grid__cell--taken'))) {
      currentShape.forEach(index => squares[currentPosition + index].classList.add('tetris__grid__cell--taken'));
      checkLines();
      newTetromino();
      gameOver();
    }
  }

  // Genera un nuevo Tetromino
  function newTetromino() {
    random = Math.floor(Math.random() * tetrominoes.length);
    currentTetromino = tetrominoes[random];
    currentShape = currentTetromino.shapes[currentRotation];
    currentPosition = 4;
    if (currentShape.some(index => squares[currentPosition + index].classList.contains('tetris__grid__cell--taken'))) {
      clearInterval(timerId);
      alert('Game Over!');
      document.location.reload();
    }
    draw();
  }

  // Comprueba y elimina líneas completas
  function checkLines() {
    for (let i = 0; i < 199; i += width) {
      const row = Array.from({ length: width }, (_, index) => i + index);
      if (row.every(index => squares[index].classList.contains('tetris__grid__cell--taken'))) {
        score += 10;
        scoreDisplay.textContent = score;
        row.forEach(index => {
          squares[index].classList.remove('tetris__grid__cell--taken', 'tetris__grid__cell--tetromino');
          squares[index].style.backgroundColor = '';
        });
        const removedSquares = squares.splice(i, width);
        squares = removedSquares.concat(squares);
        squares.forEach(cell => grid.appendChild(cell));
      }
    }
  }

  // Control del teclado
  function control(e) {
    if (e.key === 'ArrowLeft') moveLeft();
    else if (e.key === 'ArrowRight') moveRight();
    else if (e.key === 'ArrowUp') rotate();
    else if (e.key === 'ArrowDown') moveDown();
  }
  document.addEventListener('keydown', control);

  // Movimiento a la izquierda
  function moveLeft() {
    undraw();
    const isAtLeftEdge = currentShape.some(index => (currentPosition + index) % width === 0);
    if (!isAtLeftEdge) currentPosition -= 1;
    draw();
  }

  // Movimiento a la derecha
  function moveRight() {
    undraw();
    const isAtRightEdge = currentShape.some(index => (currentPosition + index) % width === width - 1);
    if (!isAtRightEdge) currentPosition += 1;
    draw();
  }

  // Rotación
  function rotate() {
    undraw();
    currentRotation = (currentRotation + 1) % currentTetromino.shapes.length;
    currentShape = currentTetromino.shapes[currentRotation];
    draw();
  }

  // Iniciar el juego
  draw();
  timerId = setInterval(moveDown, 1000);
});
