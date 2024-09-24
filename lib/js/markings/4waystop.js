class FourWayStop extends Marking {
   constructor(center, directionVector, width, height) {
       super(center, directionVector, width, height);

       this.border = this.poly.segments[2];
       this.type = "fourwaystop";
   }

   draw(ctx) {
       // Save the current context state
       ctx.save();

       // Move the origin to the center of the octagon
       ctx.translate(this.center.x, this.center.y);

       // Start drawing the octagon
       const sideLength = this.width / (1 + Math.sqrt(2)); // Calculate side length so the total width matches the `width` property
       const angleIncrement = Math.PI / 4; // 45 degrees in radians
       let currentAngle = -Math.PI / 8; // Start angle to make the octagon upright

       ctx.beginPath();
       for (let i = 0; i < 8; i++) {
           // Calculate vertex
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

       // Draw the "4-WAY" text in the center of the octagon
       ctx.textBaseline = "middle";
       ctx.textAlign = "center";
       ctx.fillStyle = "white";
       ctx.font = "bold " + this.height * 0.3 + "px Arial";
       ctx.fillText("4WAY", 0, 0);

       // Restore the context state
       ctx.restore();
   }
}
