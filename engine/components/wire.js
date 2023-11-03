import Settings from "../../settings.js";

class Wire {
    constructor(startX, startY, endX, endY, components, isGridUnits = true) {
        if (isGridUnits) {
            this.startX = startX * Settings.GRID_SIZE;
            this.startY = startY * Settings.GRID_SIZE;
            this.endX = endX * Settings.GRID_SIZE;
            this.endY = endY * Settings.GRID_SIZE;
        } else {
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;
        }
        this.components = components;

        this.isDraggingStart = false;
        this.isDraggingEnd = false;
        this.startRadius = 3; // Radius for start endpoint
        this.endRadius = 3; // Radius for end endpoint
        this.gridUnitSize = Settings.GRID_SIZE;

        this.startConnectedTo = null;
        this.endConnectedTo = null;
    }

    handleMouseDown(x, y) {
        const startDist = this.getDistance(x, y, this.startX, this.startY);
        const endDist = this.getDistance(x, y, this.endX, this.endY);

        if (startDist <= this.startRadius) {
            this.isDraggingStart = true;
        } else if (endDist <= this.endRadius) {
            this.isDraggingEnd = true;
        }
    }

    handleMouseUp() {
        this.isDraggingStart = false;
        this.isDraggingEnd = false;
    }

    handleMouseMove(x, y) {
        if (this.isDraggingStart) {
            this.startX = this.snapToGrid(x);
            this.startY = this.snapToGrid(y);
        } else if (this.isDraggingEnd) {
            this.endX = this.snapToGrid(x);
            this.endY = this.snapToGrid(y);
        }

        // Check if the wire's endpoint is within a range of a component's connection point
        this.components.forEach((component) => {
            component.connectionPoints.forEach((point) => {
                if (this.getDistance(this.startX, this.startY, point.x, point.y) < this.startRadius) {
                    this.connectStart(component);
                }
                if (this.getDistance(this.endX, this.endY, point.x, point.y) < this.startRadius) {
                    this.connectEnd(component);
                }
            });
        });
    }

    connectStart(component) {
        // Detect and connect to the nearest connection point on the component
        const nearestPoint = this.findNearestConnectionPoint(this.startX, this.startY, component.connectionPoints);

        this.startConnectedTo = { component, connectionPoint: nearestPoint };

        // Snap the wire's start point to the nearest connection point
        this.startX = nearestPoint.x;
        this.startY = nearestPoint.y;
    }

    connectEnd(component) {
        // Detect and connect to the nearest connection point on the component
        const nearestPoint = this.findNearestConnectionPoint(this.endX, this.endY, component.connectionPoints);
        this.endConnectedTo = { component, connectionPoint: nearestPoint };

        // Snap the wire's end point to the nearest connection point
        this.endX = nearestPoint.x;
        this.endY = nearestPoint.y;
    }

    findNearestConnectionPoint(x, y, connectionPoints) {
        // Find the nearest connection point on the component to the specified coordinates
        let minDistance = Infinity;
        let nearestPoint = null;

        connectionPoints.forEach((point) => {
            const distance = this.getDistance(x, y, point.x, point.y);
            if (distance < minDistance) {
                minDistance = distance;
                nearestPoint = point;
            }
        });

        return nearestPoint;
    }

    snapToGrid(value) {
        return Math.round(value / this.gridUnitSize) * this.gridUnitSize;
    }

    draw(ctx) {
        ctx.strokeStyle = "yellow"; // Adjust the wire color
        ctx.lineWidth = 3; // Adjust the wire thickness

        // Draw line between two endpoints
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();

        // Draw start and end endpoints as red circles
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.startX, this.startY, this.startRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.endX, this.endY, this.endRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Helper function to calculate distance between two points
    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    getStartPositionInPixels() {
        return [this.startX, this.startY];
    }

    getEndPositionInPixels() {
        return [this.endX, this.endY];
    }
}

export default Wire;
