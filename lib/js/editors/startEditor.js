class StartEditor extends MarkingEditor {
   constructor(viewport, world) {
      super(viewport, world, world.laneGuides);
      this.occupancy = null; // Initialize occupancy as null
   }

   createMarking(center, directionVector) {
      if (this.occupancy === null) { 
         // Prompt only if occupancy is null
         const occupancy = prompt("How many people are in the car? (0-5)", "0");
         const parsedOccupancy = parseInt(occupancy, 10);

         if (!isNaN(parsedOccupancy) && parsedOccupancy >= 0 && parsedOccupancy <= 5) {
            this.occupancy = parsedOccupancy; // Store the occupancy value
         } else {
            alert("Please enter a valid number between 0 and 5.");
            return null;
         }
      }



      const start =  new Start(
         center,
         directionVector,
         this.world.roadWidth / 2,
         this.world.roadWidth / 2,
         this.occupancy
      );

      

      return start;

   }  
}
