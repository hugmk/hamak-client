
export class Averages {
    averageScore: number;
    averageEcoscore: number;
    averageEnergyKcal: number;
    averageFat: number;
    averageSaturatedFat: number;
    averageCarbohydrates: number;
    averageSugars: number;
    averageProteins: number;
    averageFiber: number;
    averageSalt: number;
    averageSodium: number;

    constructor(
        averageScore: number,
        averageEcoscore: number,
        averageEnergyKcal: number,
        averageFat: number,
        averageSaturatedFat: number,
        averageCarbohydrates: number,
        averageSugars: number,
        averageProteins: number,
        averageFiber: number,
        averageSalt: number,
        averageSodium: number
    ) {
        this.averageScore = averageScore;
        this.averageEcoscore = averageEcoscore;
        this.averageEnergyKcal = averageEnergyKcal;
        this.averageFat = averageFat;
        this.averageSaturatedFat = averageSaturatedFat;
        this.averageCarbohydrates = averageCarbohydrates;
        this.averageSugars = averageSugars;
        this.averageProteins = averageProteins;
        this.averageFiber = averageFiber;
        this.averageSalt = averageSalt;
        this.averageSodium = averageSodium;
    }
}