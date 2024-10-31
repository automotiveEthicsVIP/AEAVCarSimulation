const carCanvas=document.getElementById("carCanvas");
carCanvas.width=window.innerWidth-200;
carCanvas.height=window.innerHeight;

const carCtx = carCanvas.getContext("2d");

const worldString = localStorage.getItem("world");
const worldInfo = worldString ? JSON.parse(worldString) : null;
const world = worldInfo
   ? World.load(worldInfo)
   : new World(new Graph());

const viewport = new Viewport(carCanvas, world.zoom, world.offset);
// const miniMap = new MiniMap(miniMapCanvas, world.graph, 300);

const trainingCarsSettings = JSON.parse(localStorage.getItem('trainingCar')) || {}

const N = trainingCarsSettings.numberOfCars || 50
const alpha = trainingCarsSettings.alphaValue || .6;
const stopSigns = world.markings.filter(m => m instanceof Stop);
const parkingSpots = world.markings.filter(m => m instanceof Parking);
const cars=generateCars(N);
let bestCar=cars[0];

if(localStorage.getItem("bestBrain")){
    console.log(localStorage.getItem("bestBrain"))

    for(let i=0;i<cars.length;i++){

        cars[i].brain=JSON.parse(

            localStorage.getItem("bestBrain"));

        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,alpha);
        }
    }
}

const crossings = world.markings.filter(m => m instanceof Crossing);
const roadBorders = world.roadBorders.map((s) => [s.p1, s.p2]);

animate();

function save(){
    console.log("saved brain")
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){

    const startPoints = world.markings.filter((m) => m instanceof Start); 
    console.log(startPoints)

    const startPoint = startPoints.length > 0
      ? startPoints[0].center
      : new Point(100, 100);
      
    const dir = startPoints.length > 0
      ? startPoints[0].directionVector
      : new Point(0, -1);
    const startAngle = - angle(dir) + Math.PI / 2;
    const occupancy = 1 
    
    const cars=[];
    for(let i=1;i<=N;i++){
        console.log("car added " + i)
        cars.push(new Car(startPoint.x, startPoint.y,30,50,"AI",startAngle, occupancy)); 
    }
    return cars;
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
            

        }
    }
}

function stopCarAtParking(car, parkingSpots, carIndex) {
    const carBox = car.getBoundingBox();
    for (let i = 0; i < parkingSpots.length; i++) {
        const parkingCenter = parkingSpots[i].center;
        const parkingSize = 50; 
        const parkingBox = {
            left: parkingCenter.x - parkingSize / 2,
            right: parkingCenter.x + parkingSize / 2,
            top: parkingCenter.y - parkingSize / 2,
            bottom: parkingCenter.y + parkingSize / 2
        };

        if (!(carBox.left > parkingBox.right || 
              carBox.right < parkingBox.left || 
              carBox.top > parkingBox.bottom || 
              carBox.bottom < parkingBox.top)) {
            car.speed = 0;
            car.acceleration = 0;
            console.log("stooped")

        }
    }
}
    

function animate(time){
   
    for(let i=0;i<cars.length;i++){
        cars[i].update(roadBorders, crossings);
        stopCar(cars[i], stopSigns);
        stopCarAtParking(cars[i], parkingSpots, i); 

    }
    
    bestCar=cars.find(
        c=>c.fittness==Math.max(
            ...cars.map(c=>c.fittness)
        ));

    world.cars = cars;
    world.bestCar = bestCar;
    viewport.offset.x = -bestCar.x;
    viewport.offset.y = -bestCar.y;

    viewport.reset();
    const viewPoint = scale(viewport.getOffset(), -1);
    world.draw(carCtx, viewPoint, false);
    // miniMap.update(viewPoint);


    requestAnimationFrame(animate);
}

