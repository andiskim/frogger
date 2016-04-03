// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    if(row === 1) {
      this.x = -150;
      this.y = 1*83;
    }
    if(row === 2) {
      this.x = -150;
      this.y = 2*83;
    }
    if(row === 3) {
      this.x = -150;
      this.y = 3*83;
    }
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed;
    if(this.x > (600)) {
      this.x = -150;
    }
    player.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 2 * 101;
  this.y = 5 * 83;
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch(key) {
    case "left":
      if(this.x !== 0){
        this.x = this.x - 101;
      }
      break;
    case "up":
      if(this.y !== 0) {
        this.y = this.y - 83;
      }
      if(this.y === 0){
        alert("Congrats!");
        player.reset();
      }
      break;
    case "right":
      if(this.x !== 404){
        this.x = this.x + 101;
      }
      break;
    case "down":
      if(this.y !== 415){
        this.y = this.y +83;
      }
      break;
    default:
      break;
  }
  console.log(key);
};

Player.prototype.checkCollisions = function() {
  // loop through all enemies and check collision at the edges
  for(var i = 0; i < allEnemies.length; i++) {
    if ((
        (player.x-(83/2) <= allEnemies[i].x + (83/2) &&
        player.x - (83/2) >= allEnemies[i].x - (83/2)) ||
        (player.x+(83/2) <= allEnemies[i].x + (83/2) &&
        player.x + (83/2) >= allEnemies[i].x - (83/2))) && allEnemies[i].y == player.y) {
      player.reset();
    }
  }
};

Player.prototype.logLocation = function() {
  // Coordinates
  for(var i = 0; i < allEnemies.length; i++) {
    console.log("Enemy: " + allEnemies[i].x + ", " + allEnemies[i].y);
  }
  console.log("Player: " + player.x + ", " + player.y);
};

// reset and put player back
Player.prototype.reset = function() {
  player.x = 2 * 101;
  player.y = 5 * 83;
  player.render();
};

// generate random number
var randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

// Now instantiate your objects.
//parameters are row from top and speed
// use random number for row (1-3) and random speed (1-5)
var enemy1 = new Enemy(randomNumber(1,3), randomNumber(1,5));
var enemy2 = new Enemy(randomNumber(1,3), randomNumber(1,5));
var enemy3 = new Enemy(randomNumber(1,3), randomNumber(1,5));
var enemy4 = new Enemy(randomNumber(1,3), randomNumber(1,5));
var enemy5 = new Enemy(randomNumber(1,3), randomNumber(1,5));


// Place all enemy objects in an array called allEnemies

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// Place the player object in a variable called player

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
