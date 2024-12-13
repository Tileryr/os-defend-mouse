class Entity {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
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
    draw() {
        ctx.strokeStyle = 'white'
        ctx.lineWidth = '4'
        ctx.shadowBlur = 5
        ctx.shadowColor = 'white'
        ctx.strokeRect(this.position.x, this.position.y, playerWidth, playerWidth)
    }

    update() {
        this.draw()
        this.position.y = lerp(this.position.y, mouse.y - (playerWidth/2), 0.1)
        this.position.x = lerp(this.position.x, mouse.x - (playerWidth/2), 0.1)
    }
}

class Enemy extends Entity {
    draw() {
        ctx.shadowBlur = 0
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.position.x, this.position.y, playerWidth, playerWidth)
    }
}

class Triangle extends Enemy {
    draw() {
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, playerWidth/2, 0, 2 * Math.PI);
        // ctx.stroke();
        let degree = Math.atan2(mouse.y-this.position.y, mouse.x-this.position.x)
        degree = degree*-1
        if (degree < 0) {degree+=Math.PI*2}
        let number = degree / Math.PI
        let circleRadius = playerWidth/2
        var triangle = {
            //the first vertex is on the circumscribed circle at 0 radians where R is the radius of the circle ( R)
            //you may decide to change this.
            x1: this.position.x + circleRadius * Math.cos(number*Math.PI/3),
            y1: this.position.y + circleRadius * Math.sin(number*Math.PI/3),
            //the second vertex is on the circumscribed circle at 2*Math.PI/3 radians 
            //you may decide to change this.
            x2: this.position.x + circleRadius * Math.cos((number+2)*Math.PI/3),
            y2: this.position.y + circleRadius * Math.sin((number+2)*Math.PI/3),
            //calculate the 3-rd vertex
            x3: this.position.x + circleRadius * Math.cos((number+4)*Math.PI/3),
            y3: this.position.y + circleRadius * Math.sin((number+4)*Math.PI/3)
          };
          
        ctx.strokeStyle = "red";
        ctx.shadowColor = "red";

        ctx.beginPath();
        ctx.moveTo(triangle.x1, triangle.y1);
        ctx.lineTo(triangle.x2, triangle.y2);
        ctx.lineTo(triangle.x3, triangle.y3);
        ctx.lineTo(triangle.x1, triangle.y1);
        ctx.closePath();
        ctx.stroke();
    }
}
