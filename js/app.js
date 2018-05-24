// Enemies our player must avoid
class Enemy {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        this.speed = Math.floor((Math.random() * 200) + 100);
        this.sprite = 'images/enemy-bug.png';
    }


    update(dt) {

        if (this.x < 505) {
            this.x = this.x + this.speed * dt;
        } else {
            this.x = -2;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


class Player {
    constructor() {
        this.x = 200;
        this.y = 320;
        this.speed = 90;
        this.sprite = 'images/char-boy.png';
    }
    update(dt) {

        let resetPlayer = this;
        if (this.key === 'up' && this.y > 0) {
            this.y = this.y - this.speed;
        }
        if (this.key === 'down' && this.y < 400) {
            this.y = this.y + this.speed;
        }
        if (this.key === 'right' && this.x < 400) {
            this.x = this.x + this.speed;
        }
        if (this.key === 'left' && this.x > 0) {
            this.x = this.x - this.speed;
        }

        this.key = null;

        if (this.y < 0) {
            this.reset();
            swal({
                title: 'Congratulations',
                animation: false,
                customClass: 'animated bounceInDown',
                confirmButtonText: 'Play again'
            }).then((result) => {
                if (result.value) {
                    window.location.reload();
                }
            });
        }

        allEnemies.forEach(function(enemy) {
            if (resetPlayer.x >= enemy.x - 25 && resetPlayer.x <= enemy.x + 25 && (resetPlayer.y >= enemy.y - 25 && resetPlayer.y <= enemy.y + 25)) {
                resetPlayer.reset();
            }
        });
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(d) {
        this.key = d;
    }

    reset() {
        this.x = 200;
        this.y = 320;
    }

}


let allEnemies = [];
(function addEnemies() {
    allEnemies.push(new Enemy(0, 55));
    allEnemies.push(new Enemy(0, 125));
    allEnemies.push(new Enemy(0, 225));
}());
let player = new Player();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
