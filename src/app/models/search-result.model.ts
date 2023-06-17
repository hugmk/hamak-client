import { Product } from "./product.model";

export class SearchResult {
    products: Product[];
    totalPages: number;
    currentPage: number;
    totalProducts: number;
    sort: string;

    constructor(products: Product[], totalPages: number, currentPage: number, totalProducts: number, sort: string) {
        this.products = products;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.totalProducts = totalProducts;
        this.sort = sort;
    }
}