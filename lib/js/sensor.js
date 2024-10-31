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

    update(roadBorders, crossings=[]){
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(
                this.#getReading(
                    this.rays[i],
                    roadBorders,
                    crossings
                )
            );
        }
    }

    #getReading(ray,roadBorders, crossings=[]){
        let touches=[];
        let lifeScore = 0;

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


        for (let i = 0; i < crossings.length; i++) {
            const crossing = crossings[i];
        
            const crossingLine = {
                x: crossing.center.x,  
                top: crossing.center.y - 50,  
                bottom: crossing.center.y + 50 
            };
        
            const topEdgeTouch = getIntersection(
                ray[0], ray[1],
                { x: crossingLine.x, y: crossingLine.top },
                { x: crossingLine.x, y: crossingLine.bottom }
            );
        
            if (topEdgeTouch) {
                touches.push(topEdgeTouch);
                const distance = calculateDistance(ray[0], topEdgeTouch);

                lifeScore = (crossing.peopleCount * 100);
                this.readings.push({lifeScore: lifeScore});
                // sendMessage(`Crossing with ${crossing.peopleCount} people -> ${Math.floor(distance / 10)}m`);
                sendMessage(`Path with ${crossing.peopleCount} people life score ${lifeScore}`)
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

                // ctx.beginPath();
                // ctx.lineWidth=4;
                // ctx.strokeStyle="black";
                // ctx.moveTo(
                //     this.rays[i][1].x,
                //     this.rays[i][1].y
                // );
                // ctx.lineTo(
                //     end.x,
                //     end.y
                // );
                // ctx.stroke();

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