const carCanvas=document.getElementById("carCanvas");
carCanvas.width=window.innerWidth - 330;
const miniMapCanvas=document.getElementById("miniMapCanvas");
miniMapCanvas.width=300;
miniMapCanvas.height=300;

carCanvas.height=window.innerHeight;

const carCtx = carCanvas.getContext("2d");


const worldString = localStorage.getItem("world");
const worldInfo = worldString ? JSON.parse(worldString) : null;
const world = worldInfo
   ? World.load(worldInfo)
   : new World(new Graph());

const viewport = new Viewport(carCanvas, world.zoom, world.offset);
const miniMap = new MiniMap(miniMapCanvas, world.graph, 300);

const N=90;
const alpha = .4
const cars=generateVehicles();
let bestCar=cars[0];

if(localStorage.getItem("bestBrain")){
    console.log(localStorage.getItem("bestBrain"))

    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(localStorage.getItem("bestBrain"));
    }
}

const traffic=[];
const roadBorders = world.roadBorders.map((s) => [s.p1, s.p2]);

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateVehicles(){
    const startPoints = world.markings.filter((m) => m instanceof Start); 

    const cars = [];
    
    // Loop over each start point and create a car
    startPoints.forEach((startPoint) => {
        const center = startPoint.center;
        const dir = startPoint.directionVector;
        const startAngle = -angle(dir) + Math.PI / 2;
        const occupancy = 1; // Assuming each car has the same occupancy
        
        cars.push(new Car(center.x, center.y, 30, 50, "AI", startAngle, occupancy));
    });

    return cars;
}


    

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(roadBorders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(roadBorders,traffic);
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
    miniMap.update(viewPoint);

    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    requestAnimationFrame(animate);
}