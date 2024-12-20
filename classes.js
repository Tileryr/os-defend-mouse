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
        this.shieldAngle = 0
        this.shieldRadians = 0
        this.attackBox = {
            position: this.position,
            length: playerWidth*2
        }
    }

    draw() {
        ctx.strokeStyle = 'white'
        ctx.lineWidth = '4'
        ctx.shadowBlur = 5
        ctx.shadowColor = 'white'

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, playerWidth*0.5, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, playerWidth*0.8, this.shieldRadians-(Math.PI*0.25), this.shieldRadians+(Math.PI*0.25))
        ctx.stroke()

        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, playerWidth/2, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fillStyle = "blue";
        // ctx.fillRect(
        //     this.attackBox.position.x, 
        //     this.attackBox.position.y, 
        //     this.attackBox.length, 
        //     this.attackBox.length
        // )
    }

    update() {
        this.draw()
        this.position.y = lerp(this.position.y, mouse.y, 0.3)
        this.position.x = lerp(this.position.x, mouse.x, 0.3)
        this.attackBox.length = playerWidth
        this.shieldRadians = this.shieldAngle%(Math.PI*2)
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
        this.dead = false
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
        
        let degree = Math.atan2(mouse.y-this.position.y, mouse.x-this.position.x)
        if (degree < 0) {degree+=Math.PI*2}
        this.size = playerWidth/2
        this.shape = makeShape(this.position, this.sides, this.size, degree)
        if(!this.dead) {
            this.velocity.x = Math.cos(degree) * this.speed
            this.velocity.y = Math.sin(degree) * this.speed
        }
        this.attackBox.length = playerWidth 
        this.attackBox.position.x = this.position.x-this.size
        this.attackBox.position.y = this.position.y-this.size

        if(rectangularCollision(this, player)) {
            let collisionDegree = Math.atan2(this.position.y-mouse.y, this.position.x-mouse.x)
            // console.log(degree)
            // console.log(player.shieldRadians)
            let angleDifference = (degree - player.shieldRadians + Math.PI) % (Math.PI*2) - Math.PI
            console.log(Math.PI*-0.25)
            console.log(collisionDegree)
            if(Math.PI*-0.25 < collisionDegree < Math.PI*0.25) {
                console.log("BLOCK")
                // V
                // this.velocity.x
                // this.velocity.y
                // N
                // x
                // cos(player.shieldRadians)
                // y
                // sin(player.shieldRadians)
                // let bounce = v - (2 * (v ∙ n) * n)
                // v dot n
                this.velocity.x = this.velocity.x - (2 * (this.velocity.x * Math.cos(player.shieldRadians) + this.velocity.y * Math.sin(player.shieldRadians)) * Math.cos(player.shieldRadians))
                this.velocity.y = this.velocity.y - (2 * (this.velocity.x * Math.cos(player.shieldRadians) + this.velocity.y * Math.sin(player.shieldRadians)) * Math.sin(player.shieldRadians))
                this.dead = true
            }
        }
    }
}
