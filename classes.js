class Entity {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.attackBox = {
            position: {x: 0, y: 0},
            length: 20,
        }
    }

    draw() {
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.position.x, this.position.y, 30, this.height)
    }

    update() {
        this.draw()
    }
}

class Player extends Entity {
    constructor({ position, velocity, attackBox }) {
        super({position, velocity, attackBox})
        this.attackBox = {
            position: this.position,
            length: playerWidth
        }
    }

    draw() {
        ctx.strokeStyle = 'white'
        ctx.lineWidth = '4'
        ctx.shadowBlur = 5
        ctx.shadowColor = 'white'
        ctx.strokeRect(this.position.x, this.position.y, playerWidth, playerWidth)

        this.attackBox.length = playerWidth
        ctx.fillStyle = "blue";
        ctx.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y, 
            this.attackBox.length, 
            this.attackBox.length
        )
    }

    update() {
        this.draw()
        this.position.y = lerp(this.position.y, mouse.y - (playerWidth/2), 0.1)
        this.position.x = lerp(this.position.x, mouse.x - (playerWidth/2), 0.1)
    }
}

class Enemy extends Entity {
    constructor({ position, velocity, attackBox, speed, }) {
        super({position, velocity, attackBox})
        this.speed = speed
    }

    draw() {
        ctx.shadowBlur = 0
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.position.x, this.position.y, playerWidth, playerWidth)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Shape extends Enemy {
    constructor({ position, velocity, attackBox, speed, sides, size}) {
        super({position, velocity, attackBox, speed})
        this.sides = sides
        this.size = size
        this.shape = makeShape(this.position, this.sides, this.size, 0)
    }

    draw() {
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, playerWidth/2, 0, 2 * Math.PI);
        // ctx.stroke();
          
        ctx.strokeStyle = "red";
        ctx.shadowColor = "red";

        //HITBOX
        ctx.fillStyle = "blue";
        ctx.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y, 
            this.attackBox.length, 
            this.attackBox.length
        )
        
        ctx.beginPath();
        ctx.moveTo(this.shape.x[0], this.shape.y[0]);
        for (let index = 1; index <= this.sides-1; index++) {
            ctx.lineTo(this.shape.x[index], this.shape.y[index])
        }
        ctx.lineTo(this.shape.x[0], this.shape.y[0]);
        ctx.closePath();
        ctx.stroke();
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        var degree = Math.atan2(mouse.y-this.position.y, mouse.x-this.position.x)
        if (degree < 0) {degree+=Math.PI*2}
        this.size = playerWidth/2
        this.shape = makeShape(this.position, this.sides, this.size, degree)

        this.velocity.x = Math.cos(degree) * this.speed
        this.velocity.y = Math.sin(degree) * this.speed

        this.attackBox.length = playerWidth 
        this.attackBox.position.x = this.position.x-this.size
        this.attackBox.position.y = this.position.y-this.size

        if(rectangularCollision(this, player)) {
            console.log("oh no")
        }
    }
}
