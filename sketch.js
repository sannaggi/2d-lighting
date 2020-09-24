const walls     = []
const vertices  = []
const rays      = []

let pos
let canvas
let drawOrigin
let wallStart

function setup() {
    canvas = createCanvas(400, 400)
    pos = createVector(169, 315)

    createWalls()
    addVertices()
}

function mouseClicked() {
    const clickPosition = createVector(mouseX, mouseY)
    if (!drawOrigin) {
        drawOrigin = clickPosition
    }

    if (wallStart) {
        createWall(wallStart.x, wallStart.y, clickPosition.x, clickPosition.y)
    }

    wallStart = clickPosition
}

function doubleClicked() {
    createWall(wallStart.x, wallStart.y, drawOrigin.x, drawOrigin.y)
    drawOrigin = wallStart = null
    addVertices()
}

function createWalls() {
    createWall(0, 0, 400, 0)
    createWall(400, 0, 400, 400)
    createWall(400, 400, 0, 400)
    createWall(0, 400, 0, 0)
    
    createWall(50, 50, 100, 150)
    createWall(100, 150, 30, 120)
    createWall(30, 120, 50, 50)

    createWall(200, 100, 300, 100)
    createWall(300, 100, 300, 300)
    createWall(300, 300, 200, 300)
    createWall(200, 300, 200, 100)

    createWall(50, 150, 50, 180)
    createWall(50, 190, 50, 220)
    createWall(50, 230, 50, 260)
    createWall(50, 270, 50, 300)
}

function addVertices() {
    for (let i = 0; i < walls.length; i++) {
        vertices.push(walls[i].start, walls[i].end)

        // intersecting walls
        for (let j = i + 1; j < walls.length; j++) {
            const t2 = (walls[j].dir.x * (walls[i].start.y - walls[j].start.y) + walls[j].dir.y * (walls[j].start.x - walls[i].start.x)) / (walls[i].dir.x * walls[j].dir.y - walls[i].dir.y * walls[j].dir.x)
            const t1 = (walls[i].start.x + walls[i].dir.x * t2 - walls[j].start.x) / walls[j].dir.x
            
            if (t2 > 0 && t2 < 1 && t1 > 0 && t1 < 1) {
                const pt = createVector()
                pt.x = walls[j].start.x + walls[j].dir.x * t1
                pt.y = walls[j].start.y + walls[j].dir.y * t1
                pt.dist = t1
                vertices.push(pt)
            }
        }

    }
}

function createWall(x1, y1, x2, y2) {
    const start = createVector(x1, y1)
    const end = createVector(x2, y2)

    walls.push(new Wall(start, end))
}

function draw() {
    background(0)

    pos.x = mouseX
    pos.y = mouseY

    rays.length = 0

    walls.forEach(wall => {
        wall.show()
    });

    if (!drawOrigin) {
        drawLight()
    } else {
        showCurrentDrawWall()
    }
}

function drawLight() {
    const sources = []

    sources.push(pos)

    sources.forEach(source => {
        const points = []
    
        vertices.forEach(vertex => {
            addRay(vertex, source)
        });
    
        rays.forEach(ray => {
            let nearestPoint = null
            let nearestDist = Infinity
    
            walls.forEach(wall => {
                const pt = ray.cast(wall)
                if (pt) {
                    if (pt.dist < nearestDist) {
                        nearestDist = pt.dist
                        nearestPoint = pt
                    }
                }
            });
    
            if (nearestPoint) {
                points.push(nearestPoint)
            }
        })
    
        sortPoints(points, source)
        for (let index = 0; index < points.length; index++) {
            fill(255, 100)
            noStroke()
            triangle(source.x, source.y, points[index].x, points[index].y, points[(index + 1) % points.length].x, points[(index + 1) % points.length].y)
        }
    });
}

function showCurrentDrawWall() {
    stroke(255, 204, 0);
    line(wallStart.x, wallStart.y, mouseX, mouseY)
}

function sortPoints(points, source) {
    points.sort(function(a, b) {
        return p5.Vector.sub(a, source).heading() - p5.Vector.sub(b, source).heading()
    })
}

function addRay(target, source) {
    let angle = p5.Vector.sub(target, source).heading()
    let ray = new Ray(source, angle - 0.0001)
    rays.push(ray)
    ray = new Ray(source, angle)
    rays.push(ray)
    ray = new Ray(source, angle + 0.0001)
    rays.push(ray)
}

function testCircle(pt, radius=8) {
    fill(255)
    ellipse(pt.x, pt.y, radius, radius)
}