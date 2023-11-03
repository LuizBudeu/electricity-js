import Core from "./engine/core.js";

const core = new Core();

// Function to resize the canvas and set the background color
function resizeCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    const gridSize = 20; // Adjust the grid size as needed
    ctx.beginPath();
    ctx.strokeStyle = "#2f3945"; // Color for the grid lines

    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();
    ctx.closePath();

    // Redraw components or update the view as necessary
    core.drawComponents();
}

// Event listener for window resize
window.addEventListener("resize", resizeCanvas);

// Initial setup: Start the engine and resize the canvas
core.start();
resizeCanvas();
