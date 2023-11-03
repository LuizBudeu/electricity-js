import Component from "./component.js";

// class Battery {
//     constructor(x, y, voltage, isGridUnits = true) {
//         if (isGridUnits) {
//             this.x = x * Settings.GRID_SIZE;
//             this.y = y * Settings.GRID_SIZE;
//         } else {
//             this.x = x;
//             this.y = y;
//         }
//         this.voltage = voltage;
//         this.isDragging = false;
//         this.widthInGrids = 2;
//         this.heightInGrids = 1;
//         this.outlineWidth = 2;
//         this.gridUnitSize = Settings.GRID_SIZE; // Initialize gridUnitSize with the grid size from settings
//     }

//     draw(ctx) {
//         console.log(this.getPosInPixels());
//         const [xPixels, yPixels] = this.getPosInPixels();
//         const [widthPixels, heightPixels] = this.getSizeInPixels();

//         ctx.fillStyle = "white";
//         ctx.fillRect(xPixels - this.outlineWidth, yPixels - this.outlineWidth, widthPixels + 2 * this.outlineWidth, heightPixels + 2 * this.outlineWidth);

//         ctx.fillStyle = "orange";
//         ctx.fillRect(xPixels, yPixels, widthPixels, heightPixels);
//         ctx.fillStyle = Settings.FONT_COLOR;
//         ctx.font = Settings.FONT_SIZE;

//         const textWidth = ctx.measureText(`Voltage: ${this.voltage}V`).width;
//         const textX = xPixels + widthPixels / 2 - textWidth / 2;
//         const textY = yPixels - 10;
//         ctx.fillText(`Voltage: ${this.voltage}V`, textX, textY);
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

class Battery extends Component {
    constructor(x, y, voltage, isGridUnits = true) {
        super(x, y, 2, 1, voltage, "orange", isGridUnits);
    }

    draw(ctx) {
        super.draw(ctx, `Voltage: ${this.value}V`);
    }
}

export default Battery;
