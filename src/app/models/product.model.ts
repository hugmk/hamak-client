
export class Product {
    _id: string;
    additives: string[];
    allergens: string[];
    barcode: number;
    brand: string;
    calculatedScore: number;
    carbohydrates_100g: number;
    categories: string[];
    certifications: string;
    ecoscoreGrade: string;
    ecoscoreScore: number;
    energy_kcal_100g: number;
    fat_100g: number;
    fiber_100g: number;
    imageUrl: string;
    ingredients: string;
    mainCategory: string;
    name: string;
    novaGroup: string;
    nutrientLevelsReference: string;
    nutriscoreGrade: string;
    nutriscoreScore: number;
    proteins_100g: number;
    quantity: string;
    salt_100g: number;
    saturated_fat_100g: number;
    sodium_100g: number;
    sugars_100g: number;
    traces: string[];

    constructor(
        id: string,
        additives: string[],
        allergens: string[],
        barcode: number,
        brand: string,
        calculatedScore: number,
        carbohydrates_100g: number,
        categories: string[],
        certifications: string,
        ecoscoreGrade: string,
        ecoscoreScore: number,
        energy_kcal_100g: number,
        fat_100g: number,
        fiber_100g: number,
        imageUrl: string,
        ingredients: string,
        mainCategory: string,
        name: string,
        novaGroup: string,
        nutrientLevelsReference: string,
        nutriscoreGrade: string,
        nutriscoreScore: number,
        proteins_100g: number,
        quantity: string,
        salt_100g: number,
        saturated_fat_100g: number,
        sodium_100g: number,
        sugars_100g: number,
        traces: string[]
    ) {
        this._id = id
        this.additives = additives
        this.allergens = allergens
        this.barcode = barcode
        this.brand = brand
        this.calculatedScore = calculatedScore
        this.carbohydrates_100g = carbohydrates_100g
        this.categories = categories
        this.certifications = certifications
        this.ecoscoreGrade = ecoscoreGrade
        this.ecoscoreScore = ecoscoreScore
        this.energy_kcal_100g = energy_kcal_100g
        this.fat_100g = fat_100g
        this.fiber_100g = fiber_100g
        this.imageUrl = imageUrl
        this.ingredients = ingredients
        this.mainCategory = mainCategory
        this.name = name
        this.novaGroup = novaGroup
        this.nutrientLevelsReference = nutrientLevelsReference
        this.nutriscoreGrade = nutriscoreGrade
        this.nutriscoreScore = nutriscoreScore
        this.proteins_100g = proteins_100g
        this.quantity = quantity
        this.salt_100g = salt_100g
        this.saturated_fat_100g = saturated_fat_100g
        this.sodium_100g = sodium_100g
        this.sugars_100g = sugars_100g
        this.traces = traces
    }
}