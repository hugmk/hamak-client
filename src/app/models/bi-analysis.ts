import { Averages } from "./averages.model";
import { Product } from "./product.model";

export class BIAnalysis {
    bestProducts: Product[];
    worstProducts: Product[];
    averages: Averages;

    constructor(bestProducts: Product[], worstProducts: Product[], averages: Averages) {
        this.bestProducts = bestProducts;
        this.worstProducts = worstProducts;
        this.averages = averages;
    }
}