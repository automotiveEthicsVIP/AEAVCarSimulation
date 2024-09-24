class Crossing extends Marking {



   constructor(center, directionVector, width, height, peopleCount) {
       super(center, directionVector, width, height);
       this.peopleCount = peopleCount;

       this.borders = [this.poly.segments[0], this.poly.segments[2]];
       this.type = "crossing";
   }

   draw(ctx) {

      const perp = perpendicular(this.directionVector);
      const line = new Segment(
         add(this.center, scale(perp, this.width / 2)),
         add(this.center, scale(perp, -this.width / 2))
      );
      line.draw(ctx, {
         width: this.height,
         color: "white",
         dash: [11, 11]
      });

      const spacing = this.height / (this.peopleCount); // Spacing between each person

       // Determine the maximum horizontal offset for staggering
       const maxOffset = this.width / 8; // Adjust as necessary for visual effect

       for (let i = 1; i <= this.peopleCount; i++) {
           // Alternate offset direction for each figure
           const offsetDirection = i % 2 === 0 ? 1 : -1;
           const offsetX = maxOffset * offsetDirection; // Calculate the actual offset for this figure

           const baseX = this.center.x + offsetX;
           const baseY = this.center.y - this.height / 2 + i * spacing;

           // Draw head
           const headRadius = this.width / 16; // Adjust head size as needed
           ctx.beginPath();
           ctx.arc(baseX, baseY - 2 * headRadius, headRadius, 0, Math.PI * 2);
           ctx.fillStyle = "orange";
           ctx.fill();

           // Draw body
           ctx.beginPath();
           ctx.moveTo(baseX, baseY - headRadius);
           ctx.lineTo(baseX, baseY + 2 * headRadius);
           ctx.strokeStyle = "black";
           ctx.lineWidth = 2;
           ctx.stroke();

           // Draw arms
           ctx.beginPath();
           ctx.moveTo(baseX - headRadius, baseY);
           ctx.lineTo(baseX + headRadius, baseY);
           ctx.stroke();

           // Draw legs
           ctx.beginPath();
           ctx.moveTo(baseX, baseY + 2 * headRadius);
           ctx.lineTo(baseX - headRadius, baseY + 4 * headRadius);
           ctx.moveTo(baseX, baseY + 2 * headRadius);
           ctx.lineTo(baseX + headRadius, baseY + 4 * headRadius);
           ctx.stroke();
       }


   }
}
