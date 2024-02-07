export interface InputListProductsDTO { }

type Product = {
    id: string;
    name: string;
    price: number;
}

export interface OutputListProductsDTO {
    products: Product[]
}
