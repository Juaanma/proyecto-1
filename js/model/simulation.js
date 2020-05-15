// Modelo para la simulación

// ODESolver: se encarga de resolver un sistema de ecuaciones diferenciales ordinarias
class ODESolver {
    constructor(model) {
        this.size = model.size;
        this.initialConditions = model.initialConditions;
        this.equations = model.equations;
    }

    // Para cada instante de tiempo, calcula los siguientes valores utilizando advance
    solve(timePoints) {
        const conditionsEvolution = [this.initialConditions];

        for (let i = 0; i < timePoints.length - 1; i++) {
            const currentTime = timePoints[i];
            const currentConditions = conditionsEvolution[i];

            const nextTime = timePoints[i + 1];
            const nextConditions = this.advance(currentConditions, currentTime, nextTime);

            conditionsEvolution.push(nextConditions);
        }

        return conditionsEvolution;
    }

    // Suma a cada variable (condition) su derivada multiplicado por delta t
    advance(currentConditions, currentTime, nextTime) {
        const deltaTime = nextTime - currentTime;

        const nextConditions = [];
        for (let i = 0; i < this.size; i++) {
            const nextCondition = currentConditions[i] + this.equations[i](currentConditions) * deltaTime;
            nextConditions.push(nextCondition);
        }

        return nextConditions;
    }
}

// SIRModel: encapsula las ecuaciones del modelo SIR
class SIRModel {
    constructor(susceptible, infected, recovered, transmissionRate, recoveryRate) {
        this.size = 3;

        this.totalPopulation = susceptible + infected + recovered;
        this.initialConditions = [susceptible, infected, recovered];

        this.equations = [
            (currentConditions) => {
                const [susceptible, infected] = currentConditions;
                return -transmissionRate * susceptible * infected / this.totalPopulation;
            },
            (currentConditions) => {
                const [susceptible, infected] = currentConditions;
                return transmissionRate * susceptible * infected / this.totalPopulation - recoveryRate * infected;
            },
            (currentConditions) => {
                const [_, infected] = currentConditions;
                return recoveryRate * infected;
            }
        ];
    }
}

export { ODESolver, SIRModel };