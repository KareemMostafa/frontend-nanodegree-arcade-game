// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(x,y){
      this.x = x;
      this.y = y;
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      this.speed = Math.floor((Math.random()*200)+100);
      this.sprite = 'images/enemy-bug.png';
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 505) {
      this.x = this.x + this.speed * dt;
    }else{
      this.x = -2;
    }
}

// Draw the enemy on the screen, required method for game
    render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.x = 200;
    this.y = 320;
    this.speed = 90;
    this.sprite = 'images/char-boy.png';
  }
  update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      let resetPlayer = this;
      if(this.key === 'up' && this.y > 0) {
        this.y = this.y - this.speed;
      }
      if(this.key === 'down' && this.y < 400) {
        this.y = this.y + this.speed;
      }
      if(this.key === 'right' && this.x < 400) {
        this.x = this.x + this.speed;
      }
      if(this.key === 'left' && this.x > 0) {
        this.x = this.x - this.speed;
      }

      this.key = null;

      if(this.y < 0 ) {
        this.reset();
      }

      allEnemies.forEach(function(enemy) {
        if(resetPlayer.x >= enemy.x - 25 && resetPlayer.x <= enemy.x + 25 && (resetPlayer.y >= enemy.y - 25 && resetPlayer.y <= enemy.y + 25)) {
          resetPlayer.reset();
        }
    });
  }

  // Draw the enemy on the screen, required method for game
 render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(d) {
    this.key = d;
  }

  reset () {
    this.x = 200;
    this.y = 320;
  }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
(function addEnemies(){
  allEnemies.push(new Enemy(0,55));
  allEnemies.push(new Enemy(0,125));
  allEnemies.push(new Enemy(0,225));
}());
let player = new Player ();

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
