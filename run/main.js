let simulationRunning = true;  
const carCanvas=document.getElementById("carCanvas");
carCanvas.width=window.innerWidth;

carCanvas.height=window.innerHeight;

const carCtx = carCanvas.getContext("2d");


const worldString = localStorage.getItem("world");
const worldInfo = worldString ? JSON.parse(worldString) : null;
const world = worldInfo
   ? World.load(worldInfo)
   : new World(new Graph());

const viewport = new Viewport(carCanvas, world.zoom, world.offset);

const cars=generateVehicles();
const stopSigns = world.markings.filter(m => m instanceof Stop);
let bestCar=cars[0];

if(localStorage.getItem("bestBrain")){
    console.log(localStorage.getItem("bestBrain"))
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(localStorage.getItem("bestBrain"));
    }
}

const crossings = world.markings.filter(m => m instanceof Crossing);
const roadBorders = world.roadBorders.map((s) => [s.p1, s.p2]);

animate();

function generateVehicles(){
    const startPoints = world.markings.filter((m) => m instanceof Start); 

    const cars = [];
    
    startPoints.forEach((startPoint) => {
        const center = startPoint.center;
        const dir = startPoint.directionVector;
        const startAngle = -angle(dir) + Math.PI / 2;
        const occupancy = 1; 
        
        cars.push(new Car(center.x, center.y, 30, 50, "AI", startAngle, false));
    });

    return cars;
}

function checkCollision(car1, car2) {
    const box1 = car1.getBoundingBox();
    const box2 = car2.getBoundingBox();

    return !(box1.left > box2.right || 
             box1.right < box2.left || 
             box1.top > box2.bottom || 
             box1.bottom < box2.top);
}

function detectCollisions(cars) {
    for (let i = 0; i < cars.length; i++) {
        for (let j = i + 1; j < cars.length; j++) {
            if (checkCollision(cars[i], cars[j])) {
                console.log(`Collision detected between car ${i} and car ${j}`);
                cars[i].damaged = true;
                cars[j].damaged = true;
            }
        }
    }
}

function stopCar(car, stopSigns) {
    const carBox = car.getBoundingBox();
    for (let i = 0; i < stopSigns.length; i++) {
        const stopSignCenter = stopSigns[i].center;
        const stopSignSize = 50;
        const stopSignBox = {
            left: stopSignCenter.x - stopSignSize / 2,
            right: stopSignCenter.x + stopSignSize / 2,
            top: stopSignCenter.y - stopSignSize / 2,
            bottom: stopSignCenter.y + stopSignSize / 2
        };
        
        if (!(carBox.left > stopSignBox.right || 
              carBox.right < stopSignBox.left || 
              carBox.top > stopSignBox.bottom || 
              carBox.bottom < stopSignBox.top)) {
            car.speed = 0;
            car.acceleration = 0;
            car.damaged = true;
            

        }
    }
}
    

function hitCrossing(car, crossings) {
    const carBox = car.getBoundingBox();
    for (let i = 0; i < crossings.length; i++) {
        const crossingCenter = crossings[i].center;
        const lineLength = 100;  
        
        const crossingLine = {
            x: crossingCenter.x, 
            top: crossingCenter.y - lineLength / 2, 
            bottom: crossingCenter.y + lineLength / 2 
        };
    
        if (!(carBox.left > crossingLine.x || 
              carBox.right < crossingLine.x || 
              carBox.top > crossingLine.bottom || 
              carBox.bottom < crossingLine.top)) {
            
            car.speed = 0;
            car.acceleration = 0;
            // sendMessage("Hit " + crossings[i].peopleCount + " people");
            car.damaged = true;
            stopSimulation();
        }
    }
    
}
    

function animate(time){
    if (!simulationRunning) {
        return; 
    }

    for(let i=0;i<cars.length;i++){
        cars[i].update(roadBorders, crossings);
        stopCar(cars[i], stopSigns);
        hitCrossing(cars[i], crossings);
    }
    
    world.cars = cars;
    world.bestCar = bestCar;

    viewport.reset();
    const viewPoint = scale(viewport.getOffset(), -1);
    world.draw(carCtx, viewPoint, false);

    detectCollisions(cars);
    requestAnimationFrame(animate);
}

function stopSimulation() {
    simulationRunning = false;  
}