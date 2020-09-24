class Wall {
    constructor(start, end) {
        this.start = start
        this.end = end
        this.dir = p5.Vector.sub(this.end, this.start)
    }

    show() {
        stroke(255, 204, 0);
        line(this.start.x, this.start.y, this.end.x, this.end.y)
    }

    closestPointFromPos(pos){
        let posToWallStart = p5.Vector.sub(this.start, pos);
        if(p5.Vector.dot(this.dir, posToWallStart) > 0){
            return this.start
        }
    
        let wallEndToPos = p5.Vector.sub(pos, this.end);
        if(p5.Vector.dot(this.dir, wallEndToPos) > 0){
            return this.end;
        }
    
        let closestDist = p5.Vector.dot(this.dir, posToWallStart);
        let closestVect = p5.Vector.mult(this.dir, closestDist)
        return p5.Vector.sub(this.start, closestVect)
    }
}