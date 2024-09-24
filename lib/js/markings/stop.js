class Stop extends Marking {
   constructor(center, directionVector, width, height) {
       super(center, directionVector, width, height);

       this.border = this.poly.segments[2];
       this.type = "stop";
   }

   draw(ctx) {
       ctx.save();

       ctx.translate(this.center.x, this.center.y);

       const sideLength = this.width / (1 + Math.sqrt(2)); 
       const angleIncrement = Math.PI / 4; 
       let currentAngle = -Math.PI / 8; 

       ctx.beginPath();
       for (let i = 0; i < 8; i++) {
           const vertexX = Math.cos(currentAngle) * sideLength;
           const vertexY = Math.sin(currentAngle) * sideLength;
           if (i === 0) {
               ctx.moveTo(vertexX, vertexY);
           } else {
               ctx.lineTo(vertexX, vertexY);
           }
           currentAngle += angleIncrement;
       }
       ctx.closePath();

       // Set the styles for the octagon
       ctx.fillStyle = "red";
       ctx.fill();
       ctx.strokeStyle = "black";
       ctx.lineWidth = 2;
       ctx.stroke();

       ctx.textBaseline = "middle";
       ctx.textAlign = "center";
       ctx.fillStyle = "white";
       ctx.font = "bold " + this.height * 0.3 + "px Arial";
       ctx.fillText("STOP", 0, 0);

       ctx.restore();
   }
}
