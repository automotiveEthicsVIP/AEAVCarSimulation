class Sensor{
    constructor(car){

        const trainingCarsSettings = JSON.parse(localStorage.getItem('trainingCar')) || {}

        this.car=car;
        this.rayCount = trainingCarsSettings.numberOfRays || 10; 
        this.rayLength = trainingCarsSettings.rayLength || 200;  
        this.raySpread=Math.PI/2;
        this.rays=[];
        this.readings=[];
    }

    update(roadBorders,traffic, crossings=[]){
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(
                this.#getReading(
                    this.rays[i],
                    roadBorders,
                    traffic,
                    crossings
                )
            );
        }
    }

    #getReading(ray,roadBorders,traffic, crossings=[]){
        let touches=[];

        for(let i=0;i<roadBorders.length;i++){
            const touch=getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }

        for(let i=0;i<traffic.length;i++){
            const poly=traffic[i].polygon;
            for(let j=0;j<poly.length;j++){
                const value=getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j+1)%poly.length]
                );
                if(value){
                    touches.push(value);
                }
            }
        }

        for (let i = 0; i < crossings.length; i++) {
            const crossing = crossings[i];
        
            const crossingSize = 50; 
            const crossingBox = {
                left: crossing.center.x - crossingSize / 2,
                right: crossing.center.x + crossingSize / 2,
                top: crossing.center.y - crossingSize / 2,
                bottom: crossing.center.y + crossingSize / 2
            };
        
            const topEdgeTouch = getIntersection(
                ray[0], ray[1],
                { x: crossingBox.left, y: crossingBox.top },
                { x: crossingBox.right, y: crossingBox.top }
            );
        
            const bottomEdgeTouch = getIntersection(
                ray[0], ray[1],
                { x: crossingBox.left, y: crossingBox.bottom },
                { x: crossingBox.right, y: crossingBox.bottom }
            );
        
            const leftEdgeTouch = getIntersection(
                ray[0], ray[1],
                { x: crossingBox.left, y: crossingBox.top },
                { x: crossingBox.left, y: crossingBox.bottom }
            );
        
            const rightEdgeTouch = getIntersection(
                ray[0], ray[1],
                { x: crossingBox.right, y: crossingBox.top },
                { x: crossingBox.right, y: crossingBox.bottom }
            );
        
            const validTouches = [topEdgeTouch, bottomEdgeTouch, leftEdgeTouch, rightEdgeTouch].filter(touch => touch !== null);
        
            if (validTouches.length > 0) {
                let closestTouch = validTouches[0];
                let minDistance = calculateDistance(ray[0], closestTouch);
        
                for (let j = 1; j < validTouches.length; j++) {
                    const distance = calculateDistance(ray[0], validTouches[j]);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestTouch = validTouches[j];
                    }
                }
        
                sendMessage(`Distance to crossing: ${Math.floor(minDistance)}`);
            }
        }
    

        if(touches.length==0){
            return null;
        }else{
            const offsets=touches.map(e=>e.offset);
            const minOffset=Math.min(...offsets);
            return touches.find(e=>e.offset==minOffset);
        }
    }

       
    

    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;

            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                    Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
        }
    }

    draw(ctx){

        for(let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];
            

            if(this.readings[i]){
                end=this.readings[i];
            }

            if (this.rays[i][1].x !== end.x && this.rays[i][1].y !== end.y) {

                ctx.beginPath();
                ctx.lineWidth=4;
                ctx.strokeStyle="red";
                ctx.moveTo(
                    this.rays[i][0].x,
                    this.rays[i][0].y
                );
                ctx.lineTo(
                    end.x,
                    end.y
                );
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth=4;
                ctx.strokeStyle="black";
                ctx.moveTo(
                    this.rays[i][1].x,
                    this.rays[i][1].y
                );
                ctx.lineTo(
                    end.x,
                    end.y
                );
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.fillStyle = "white";  
                ctx.arc(end.x, end.y, 10, 0, 2 * Math.PI);
                ctx.fill(); 
                ctx.lineWidth = 4;  
                ctx.strokeStyle = "red";
                ctx.stroke();       
                }
        }
        
    }        
}