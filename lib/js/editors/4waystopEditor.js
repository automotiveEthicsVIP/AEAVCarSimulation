class FourWayStopEditor extends MarkingEditor {
    constructor(viewport, world) {
       super(viewport, world, world.laneGuides);
    }
 
    createMarking(center, directionVector) {
       return new FourWayStop(
          center,
          directionVector,
          world.roadWidth / 2,
          world.roadWidth / 2
       );
    }
 }