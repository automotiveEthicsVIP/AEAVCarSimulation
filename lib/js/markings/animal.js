class Animal extends Marking {
    constructor(center, directionVector, width, height) {
        super(center, directionVector, width, height);
        this.animalCount = 5;
        this.borders = [this.poly.segments[0], this.poly.segments[2]];
        this.type = "animal"; 
    }

    draw(ctx) {
        const spacing = this.height / this.animalCount;
        const maxOffset = this.width / 6;

        ctx.font = `20px serif`;

        for (let i = 1; i <= this.animalCount; i++) {
            const offsetDirection = i % 2 === 0 ? 1 : -1;
            const offsetX = maxOffset * offsetDirection;
            const baseX = this.center.x + offsetX;
            const baseY = this.center.y - this.height / 2 + i * spacing;

            
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle'; 
            ctx.fillText("🐕", baseX, baseY);
        }

    }
}