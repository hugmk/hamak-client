import { Product } from "./product.model";

export class SearchResult {
    products: Product[];
    totalPages: number;
    currentPage: number;
    totalProducts: number;

    constructor(products: Product[], totalPages: number, currentPage: number, totalProducts: number) {
        this.products = products;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.totalProducts = totalProducts;
    }
}