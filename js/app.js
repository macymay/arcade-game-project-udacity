// added confirmation to play game
confirm("Are you ready to play?!")

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for the enemies uses a helper provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Updates the enemy's position with Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiplied movement by the dt parameter to ensure
    // the game runs at the same speed for all computers
    this.x += this.speed * dt;

    // calls checkCollision to send player back to beginning if player
    // collides with any enemy
    this.checkCollision();

    // updates enemies to loop to opposite side of canvas after reaching canvas width
    if (this.x >= 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function() {
    // checks for collisions between enemies and player
    if (
        player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {
        console.log('collided');
        player.x = 202.5;
        player.y = 383;
        }
};

// Wrote my own player class with a render(), handleInput()
// and update() method
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-cat-girl.png';
};

// Draw the player on the screen as well as display score
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  displayScore(keepScore);
};

// handleInput recieves the key which was pressed and moves the Player accordingly
Player.prototype.handleInput = function(keyPress) {
  if (keyPress == 'left') {
    this.x -= this.speed;
  }
  if (keyPress == 'up') {
    this.y -= this.speed - 20;
  }
  if (keyPress == 'right') {
    this.x += this.speed;
  }
  if (keyPress == 'down') {
    this.y += this.speed - 20;
  }
  console.log('keyPress is: ' + keyPress);
};

// if player reaches top of canvas and wins the game, add 1 to the score
// pass score as an argument to the increaseDifficulty function
Player.prototype.update = function() {
  if (this.y + 63 <= 0) {
      this.x = 202.5;
      this.y = 383;
      console.log('you made it!');

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 505, 171);

      keepScore += 1;
      console.log('current score: ' + keepScore);
      increaseDifficulty(keepScore);
    }

    // Keeps player within canvas wall boundaries
    if (this.y > 383 ) {
        this.y = 383;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
};

// Function to display player's score
var displayScore = function(aScore) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score to div
    scoreDiv.innerHTML = 'Your Score: ' + aScore;
    document.body.insertBefore(scoreDiv, firstCanvasTag[0]);
};

// Increases number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // removes all previous enemies on canvas
    allEnemies.length = 0;

    // loads a new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Instantiating objects
// Placed all enemy objects in an array called allEnemies
var allEnemies = [];
// Placed the player object in a variable called player
var player = new Player(202.5, 383, 50);
// Placed score # result in a variable called keepScore
var keepScore = 0;
// Placed the score in a variable called scoreDiv
var scoreDiv = document.createElement('div');
// Enemy placed randomly in set section of the canvas
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

// listens for key presses and sends the keys to player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
