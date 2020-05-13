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

export { SIRModel };