import Settings from "../../settings.js";

class Component {
    constructor(x, y, width, height, value, color, isGridUnits = true) {
        if (isGridUnits) {
            this.x = x * Settings.GRID_SIZE;
            this.y = y * Settings.GRID_SIZE;
            this.width = width * Settings.GRID_SIZE;
            this.height = height * Settings.GRID_SIZE;
        } else {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        this.value = value;
        this.isDragging = false;
        this.outlineWidth = 2;
        this.gridUnitSize = Settings.GRID_SIZE;
        this.color = color;

        this.connectionPoints = [
            { x: this.x, y: this.y }, // Top-left corner
            { x: this.x + this.width, y: this.y }, // Top-right corner
            { x: this.x, y: this.y + this.height }, // Bottom-left corner
            { x: this.x + this.width, y: this.y + this.height }, // Bottom-right corner
            // Add more connection points or modify as needed
        ];
        this.connectionRadius = 3; // Radius for the connection points
    }

    draw(ctx, text) {
        const [xPixels, yPixels] = this.getPosInPixels();
        const [widthPixels, heightPixels] = this.getSizeInPixels();

        // Draw outline
        ctx.fillStyle = "white";
        ctx.fillRect(xPixels - this.outlineWidth, yPixels - this.outlineWidth, widthPixels + 2 * this.outlineWidth, heightPixels + 2 * this.outlineWidth);

        // Draw rect component
        ctx.fillStyle = this.color;
        ctx.fillRect(xPixels, yPixels, widthPixels, heightPixels);

        // Draw text
        ctx.fillStyle = Settings.FONT_COLOR;
        ctx.font = Settings.FONT_SIZE;
        const textWidth = ctx.measureText(text).width;
        const textX = xPixels + widthPixels / 2 - textWidth / 2;
        const textY = yPixels - 10;
        ctx.fillText(text, textX, textY);

        // Draw connection points as circles
        ctx.fillStyle = "#326fa8"; // Adjust the color for connection points
        this.connectionPoints.forEach((point) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, this.connectionRadius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    handleMouseDown(x, y) {
        const [xPixels, yPixels] = this.getPosInPixels();
        const [widthPixels, heightPixels] = this.getSizeInPixels();

        if (x > xPixels && x < xPixels + widthPixels && y > yPixels && y < yPixels + heightPixels) {
            this.isDragging = true;
        }
    }

    handleMouseUp() {
        this.isDragging = false;
    }

    handleMouseMove(x, y) {
        if (this.isDragging) {
            const [xGrid, yGrid] = this.getPosInGridUnits(x, y);
            this.x = xGrid;
            this.y = yGrid;

            // Update connection points
            this.connectionPoints = [
                { x: this.x, y: this.y }, // Top-left corner
                { x: this.x + this.width, y: this.y }, // Top-right corner
                { x: this.x, y: this.y + this.height }, // Bottom-left corner
                { x: this.x + this.width, y: this.y + this.height }, // Bottom-right corner
            ];
        }
    }

    getPosInPixels() {
        return [this.x, this.y];
    }

    getSizeInPixels() {
        return [this.width, this.height];
    }

    getPosInGridUnits(xPixels, yPixels) {
        return [Math.floor(xPixels / this.gridUnitSize) * this.gridUnitSize, Math.floor(yPixels / this.gridUnitSize) * this.gridUnitSize];
    }
}

export default Component;
