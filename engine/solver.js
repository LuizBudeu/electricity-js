import Wire from "./components/wire.js";
import Battery from "./components/battery.js";
import Resistor from "./components/resistor.js";

class Solver {
    constructor(components) {
        this.components = components;
    }

    isCircuitClosed() {
        const wires = this.components.filter((component) => component instanceof Wire);
        const connectedComponents = new Set();

        for (const wire of wires) {
            if (wire.startConnectedTo) {
                connectedComponents.add(wire.startConnectedTo.component);
            }
            if (wire.endConnectedTo) {
                connectedComponents.add(wire.endConnectedTo.component);
            }
        }

        // If all components are connected through wires, the circuit is closed
        return connectedComponents.size === this.components.length - wires.length;
    }

    getCurrent() {
        if (this.isCircuitClosed()) {
            let totalVoltage = 0;
            let totalResistance = 0;

            // Calculate total voltage across batteries and total resistance of resistors
            for (const component of this.components) {
                if (component instanceof Battery) {
                    totalVoltage += component.value;
                } else if (component instanceof Resistor) {
                    totalResistance += component.value;
                }
            }

            // Calculate current based on Ohm's law: I = V / R
            const totalCurrent = totalVoltage / totalResistance;

            return totalCurrent;
        }

        return 0;
    }
}

export default Solver;
