class Start extends Marking {
   constructor(center, directionVector, width, height, occupancy = 1) {
      super(center, directionVector, width, height);

      this.img = new Image();
      this.img.src = "../assets/car.png";
      this.type = "start";
      this.occupancy = occupancy;
      this.blinkColor = 'red'; 



   }



   



   draw(ctx) {
      ctx.save();
      ctx.translate(this.center.x, this.center.y);
      ctx.rotate(angle(this.directionVector) - Math.PI / 2);
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "red"; 
      ctx.strokeStyle = "white"; 
      ctx.lineWidth = 10;
      ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
      ctx.fillText(`${this.occupancy}`, (-this.img.width / 4) + 7, -this.img.height / 2 + 33);


      ctx.restore();
   }
}



