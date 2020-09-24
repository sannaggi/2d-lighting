class Ray {
    constructor(pos, angle) {
        this.pos = pos
        this.dir = p5.Vector.fromAngle(angle)
    }

    show() {
        stroke(200, 100, 150)
        push()
        translate(this.pos.x, this.pos.y)
        line(0, 0, this.dir.x * 10, this.dir.y * 10)
        pop()
    }

    cast(wall) {
        // const x1 = wall.start.x
        // const y1 = wall.start.y
        // const x2 = wall.end.x
        // const y2 = wall.end.y

        // const x3 = this.pos.x
        // const y3 = this.pos.y
        // const x4 = this.pos.x + this.dir.x
        // const y4 = this.pos.y + this.dir.y

        // const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

        // if (den === 0) {
        //     return
        // }

        const t2 = (this.dir.x * (wall.start.y - this.pos.y) + this.dir.y * (this.pos.x - wall.start.x)) / (wall.dir.x * this.dir.y - wall.dir.y * this.dir.x)
        const t1 = (wall.start.x + wall.dir.x * t2 - this.pos.x) / this.dir.x
        
        // const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
        // const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den
        
        if (t2 > 0 && t2 < 1 && t1 > 0) {
            const pt = createVector()
            pt.x = this.pos.x + this.dir.x * t1
            pt.y = this.pos.y + this.dir.y * t1
            pt.dist = t1
            return pt
        }

        return
    }
}