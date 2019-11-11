// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 300 + 100;
    
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x > ctx.canvas.width) {
            this.x = -100;
        }
    }
    
    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor (x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    update(){

    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(arrowKeyPressed){
        switch (arrowKeyPressed) {
			case 'right':
                if (this.x > 350) {
                    this.x = 350;
                }
				this.x += 50;
                break;			
            case 'left':
                if (this.x < 50) {
                    this.x = 50;
                }
				this.x -= 50;
				break;
            case 'down':
                if (this.y > 350) {
                    this.y = 350;
                }
                this.y += 50;
                break;
            case 'up':
                if (this.y < 50 ) {
                    scoreElement.innerText = ++score;
                    this.resetPlayer();
                } else {
                    this.y -= 50;
                }
				break;
        }
    }

    resetPlayer() {
        this.x = 200;
        this.y = 350;
    }
}

let score = 0;
scoreElement = document.getElementById('score');
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
for (y of [60, 145, 230]) {
    x = -200;
    allEnemies.push(new Enemy(x, y));
}
// Place the player object in a variable called player
let player = new Player(200, 350);

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

function checkCollisions() {
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    
    allEnemies.forEach(enemy => {
        let x = enemy.x - player.x;
        let y = enemy.y - player.y;
        let distance = Math.sqrt(x*x + y*y);
        if (distance < 75) {
            // player back to start point
            player.resetPlayer();
        }
    })
}
