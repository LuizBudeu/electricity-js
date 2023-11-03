import Component from "./component.js";

// class Resistor {
//     constructor(x, y, resistance, isGridUnits = true) {
//         if (isGridUnits) {
//             this.x = x * Settings.GRID_SIZE;
//             this.y = y * Settings.GRID_SIZE;
//         } else {
//             this.x = x;
//             this.y = y;
//         }
//         this.resistance = resistance;
//         this.isDragging = false;
//         this.widthInGrids = 3; // Adjust the width of the resistor
//         this.heightInGrids = 1; // Height in grid units
//         this.outlineWidth = 2;
//         this.gridUnitSize = Settings.GRID_SIZE; // Initialize gridUnitSize with the grid size from settings
//     }

//     draw(ctx) {
//         const [xPixels, yPixels] = this.getPosInPixels();
//         const [widthPixels, heightPixels] = this.getSizeInPixels();

//         ctx.fillStyle = "white";
//         ctx.fillRect(xPixels - this.outlineWidth, yPixels - this.outlineWidth, widthPixels + 2 * this.outlineWidth, heightPixels + 2 * this.outlineWidth);

//         ctx.fillStyle = "brown"; // Change the resistor color
//         ctx.fillRect(xPixels, yPixels, widthPixels, heightPixels);
//         ctx.fillStyle = Settings.FONT_COLOR;
//         ctx.font = Settings.FONT_SIZE;

//         const textWidth = ctx.measureText(`Resistance: ${this.resistance}Ω`).width;
//         const textX = xPixels + widthPixels / 2 - textWidth / 2;
//         const textY = yPixels - 10;
//         ctx.fillText(`Resistance: ${this.resistance}Ω`, textX, textY);
//     }

//     handleMouseDown(x, y) {
//         const [xPixels, yPixels] = this.getPosInPixels();
//         const [widthPixels, heightPixels] = this.getSizeInPixels();

//         if (x > xPixels && x < xPixels + widthPixels && y > yPixels && y < yPixels + heightPixels) {
//             this.isDragging = true;
//         }
//     }

//     handleMouseUp() {
//         this.isDragging = false;
//     }

//     handleMouseMove(x, y) {
//         if (this.isDragging) {
//             const [xGrid, yGrid] = this.getPosInGridUnits(x, y);
//             this.x = xGrid;
//             this.y = yGrid;
//         }
//     }

//     getPosInPixels() {
//         return [this.x, this.y];
//     }

//     getSizeInPixels() {
//         return [this.widthInGrids * this.gridUnitSize, this.heightInGrids * this.gridUnitSize];
//     }

//     getPosInGridUnits(xPixels, yPixels) {
//         return [Math.floor(xPixels / this.gridUnitSize) * this.gridUnitSize, Math.floor(yPixels / this.gridUnitSize) * this.gridUnitSize];
//     }
// }

class Resistor extends Component {
    constructor(x, y, resistance, isGridUnits = true) {
        super(x, y, 3, 1, resistance, "brown", isGridUnits);
    }

    draw(ctx) {
        super.draw(ctx, `Resistance: ${this.value}Ω`);
    }
}

export default Resistor;
