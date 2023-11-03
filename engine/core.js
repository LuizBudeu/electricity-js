import Battery from "./components/battery.js";
import Resistor from "./components/resistor.js";
import Wire from "./components/wire.js";
import Settings from "../settings.js";
import Solver from "./solver.js";

class Core {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.components = [];
    }

    update() {
        this.updateConnections();
        const current = this.solver.getCurrent();
        this.displayCurrent(current);
    }

    updateConnections() {
        const wires = this.components.filter((component) => component instanceof Wire);

        wires.forEach((wire) => {
            if (wire.startConnectedTo) {
                wire.connectStart(wire.startConnectedTo.component);
            }
            if (wire.endConnectedTo) {
                wire.connectEnd(wire.endConnectedTo.component);
            }
        });
    }

    addComponent(component) {
        this.components.push(component);
    }

    gameLoop() {
        const updateBound = this.update.bind(this);

        const loop = () => {
            updateBound();
            this.clearCanvas(); // Clear the canvas before redrawing
            this.drawGrid(); // Draw the grid before the components
            this.drawComponents(); // Draw the components over the grid
            requestAnimationFrame(loop);
        };

        loop();
    }

    start() {
        // Initialize the canvas, components, and grid
        this.setupCanvas();
        this.setupComponents();
        this.solver = new Solver(this.components);
        this.currentDisplay = document.getElementById("current-display");

        this.canvas.addEventListener("mousedown", (e) => {
            const x = e.clientX - this.canvas.getBoundingClientRect().left;
            const y = e.clientY - this.canvas.getBoundingClientRect().top;

            this.components.forEach((component) => {
                component.handleMouseDown(x, y);
            });
        });

        this.canvas.addEventListener("mouseup", () => {
            this.components.forEach((component) => {
                component.handleMouseUp();
            });
        });

        this.canvas.addEventListener("mousemove", (e) => {
            const x = e.clientX - this.canvas.getBoundingClientRect().left;
            const y = e.clientY - this.canvas.getBoundingClientRect().top;

            this.components.forEach((component) => {
                component.handleMouseMove(x, y);
            });
        });

        // Start the game loop for continuous updates
        this.gameLoop();
    }

    setupCanvas() {
        this.resizeCanvas(); // Assuming resizeCanvas includes setting the background color
        window.addEventListener("resize", () => {
            this.resizeCanvas();
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawComponents(); // Redraw the components after resizing
    }

    setupComponents() {
        const battery = new Battery(3, 4, 9);
        const resistor = new Resistor(10, 6, 100);
        this.addComponent(battery);
        this.addComponent(resistor);

        const otherComponents = this.components.filter((component) => !(component instanceof Wire));
        const wire1 = new Wire(15, 15, 15, 20, otherComponents);
        this.addComponent(wire1);
    }

    drawGrid() {
        // Draw the grid using settings
        const gridSize = Settings.GRID_SIZE;
        this.ctx.beginPath();
        this.ctx.strokeStyle = Settings.GRID_LINE_COLOR;
        this.ctx.lineWidth = Settings.GRID_LINE_WIDTH;

        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
        }

        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
        }

        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawComponents() {
        this.components.forEach((component) => {
            component.draw(this.ctx);
        });
    }

    clearCanvas() {
        this.ctx.fillStyle = Settings.CANVAS_BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    displayCurrent(current) {
        this.currentDisplay.innerText = `Current: ${current} A`;
    }
}

export default Core;
