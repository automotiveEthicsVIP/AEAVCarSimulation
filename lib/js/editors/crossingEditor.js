class CrossingEditor extends MarkingEditor {
   constructor(viewport, world, peopleCount=3) {

      super(viewport, world, world.graph.segments);
      this.peopleCount = peopleCount;

   }

   createMarking(center, directionVector) {
      return new Crossing(
         center,
         directionVector,
         world.roadWidth,
         world.roadWidth / 2, 
         this.peopleCount
      );
   }
}