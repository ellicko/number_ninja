document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 800;
  canvas.height = 600;

  let level = 1;
  let gameStarted = false;

  const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 50,
    speed: 5,
  };

  const hero = new Image();
  hero.src = 'hero.png';

  const enemies = [
    {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 30,
      speed: 2,
      direction: Math.random() * Math.PI * 2,
    },
    {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 30,
      speed: 2,
      direction: Math.random() * Math.PI * 2,
    },
    {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 30,
      speed: 2,
      direction: Math.random() * Math.PI * 2,
    },
  ];

  const enemyImage = new Image();
  enemyImage.src = 'enemy.png';

  const enemy2Image = new Image();
  enemy2Image.src = 'enemy2.png';


  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
      player.y -= player.speed;
    } else if (e.code === 'ArrowDown') {
      player.y += player.speed;
    } else if (e.code === 'ArrowLeft') {
      player.x -= player.speed;
    } else if (e.code === 'ArrowRight') {
      player.x += player.speed;
    }

    // Keep the hero within the canvas borders
    player.x = Math.min(Math.max(player.x, player.size / 2), canvas.width - player.size / 2);
    player.y = Math.min(Math.max(player.y, player.size / 2), canvas.height - player.size / 2);
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw canvas border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    // Draw player
    ctx.drawImage(hero, player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
  
    // Draw timer
    ctx.font = '36px serif';
    ctx.fillStyle = 'red';
    ctx.fillText(`Time Left: ${timeRemaining}`, canvas.width - 200, canvas.height - 50);
  
    // Draw enemies
    enemies.forEach((enemy) => {
      if (level === 1) {
        ctx.drawImage(enemyImage, enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
      } else if (level === 2) {
        ctx.drawImage(enemy2Image, enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
      }
    });
  
    if (enemies.length === 0) {
      ctx.font = '48px serif';
      ctx.fillStyle = 'green';
      ctx.fillText('Congratulations! Next Level', canvas.width / 2 - 100, canvas.height / 2);
    }
  }
  

	let isGameOver = false;

	let timeRemaining = 60;


  function generateMathProblem() {
    const operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    let number1 = Math.floor(Math.random() * 10) + 1;
    let number2 = Math.floor(Math.random() * 10) + 1;
  
    if (operation === '/') {
      number1 = number1 * number2;
    } else if (operation === '-') {
      if (number2 > number1) {
        [number1, number2] = [number2, number1];
      }
    }
  
    const problemText = `${number1} ${operation} ${number2}`;
    const correctAnswer = eval(problemText);
  
    const userAnswer = prompt(`Solve: ${problemText}`);
  
    if (parseInt(userAnswer) === correctAnswer) {
      return true;
    } else {
      return false;
    }
  }
  
  

  function checkCollision(player, enemy) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < player.size / 2 + enemy.size / 2;
  }

function countdown() {
  const timer = setInterval(() => {
    timeRemaining--;
    if (timeRemaining === 0) {
      clearInterval(timer);
      isGameOver = true;
      alert("Game Over!");
    }
  }, 1000);
}

  function update() {
    if (isGameOver) {
      return;
    }
	if (enemies.length === 0) {
  isGameOver = true;
}



    // Update enemy positions and check for canvas border collision
    enemies.forEach((enemy) => {
      enemy.x += Math.cos(enemy.direction) * enemy.speed;
      enemy.y += Math.sin(enemy.direction) * enemy.speed;

      if (enemy.x <= enemy.size / 2 || enemy.x >= canvas.width - enemy.size / 2) {
        enemy.direction = Math.PI - enemy.direction;
      }
      if (enemy.y <= enemy.size / 2 || enemy.y >= canvas.height - enemy.size / 2) {
        enemy.direction = -enemy.direction;
      }

      // Keep enemy within canvas bounds
      enemy.x = Math.min(Math.max(enemy.x, enemy.size / 2), canvas.width - enemy.size / 2);
      enemy.y = Math.min(Math.max(enemy.y, enemy.size / 2), canvas.height - enemy.size / 2);
    });

    // Check for collisions between the player and enemies
    enemies.forEach((enemy, index) => {
      if (checkCollision(player, enemy)) {
        if (generateMathProblem()) {
          enemies.splice(index, 1);
        } else {
          isGameOver = true;
          alert("Game Over!");
        }
      }
    });
  }

  
  function showInstructions() {
    ctx.fillStyle = 'black';
    ctx.font = '24px sans-serif';
    ctx.fillText('הוראות הפעלה:', 40, 100);
    ctx.font = '16px sans-serif';
    ctx.fillText('הי אורי, עלייך להשתמש בחצים על מנת לכוון את פיקצו אל המפלצות', 40, 140);
    ctx.fillText('לאחר שתתנגש במפלצות, תצטרך לפתור תרגיל בחשבון', 40, 160);
    ctx.fillText('אם תענה נכון, תביס את המפלצת', 40, 180);
    ctx.fillText('תביס את כל המפלצות לפני שנגמר הזמן ותעלה לשלב הבא ', 40, 200);

    ctx.fillStyle = 'blue';
    ctx.font = '32px sans-serif';
    ctx.fillText('Click to Start', canvas.width / 2 - 80, canvas.height / 2);
  }

  showInstructions();

  function showLevelStart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '48px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(`Level ${level}`, canvas.width / 2 - 80, canvas.height / 2);
  }


  function initializeLevel(level) {
    if (level === 1) {
      timeRemaining = 60;
      enemies.length = 0;
      for (let i = 0; i < 3; i++) {
        enemies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 30,
          speed: 2,
          direction: Math.random() * Math.PI * 2,
        });
      }
    } else if (level === 2) {
      timeRemaining = 45;
      enemies.length = 0;
      for (let i = 0; i < 5; i++) {
        enemies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 30,
          speed: 3, // Increased enemy speed
          direction: Math.random() * Math.PI * 2,
        });
      }
    }
  }
  

  function startGame() {
    showLevelStart();
    setTimeout(() => {
      initializeLevel(level);
      countdown();
      isGameOver = false; // Add this line to set isGameOver to false
      gameLoop();
    }, 2000);
  }
  
  
  function gameLoop() {
    if (!isGameOver) {
      draw();
      update();
  
      // Check if the current level is completed
      if (enemies.length === 0) {
        level++; // Increment the level
        isGameOver = true; // Set isGameOver to true to stop the current game loop
        startGame(); // Start the next level
      } else {
        requestAnimationFrame(gameLoop);
      }
    }
  }

  canvas.addEventListener('click', () => {
    if (!gameStarted) {
      gameStarted = true;
      startGame();
    }
  });
});