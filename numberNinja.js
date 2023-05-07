document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 600;

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
      ctx.drawImage(enemyImage, enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
    });
	if (enemies.length === 0) {
  	ctx.font = '48px serif';
 	 ctx.fillStyle = 'green';
  	ctx.fillText('You Win!', canvas.width / 2 - 100, canvas.height / 2);
	}
  }

	let isGameOver = false;

	let timeRemaining = 60;



  function generateMathProblem() {
    const operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    const number1 = Math.floor(Math.random() * 10) + 1;
    const number2 = Math.floor(Math.random() * 10) + 1;
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

  async function update() {
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

  function gameLoop() {
    if (!isGameOver) {
      draw();
      update();
      requestAnimationFrame(gameLoop);
    }
  }
	countdown();
  gameLoop();
});


