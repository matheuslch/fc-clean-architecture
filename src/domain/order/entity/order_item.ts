export default class OrderItem {

    private _id: string;
    private _productId: string;
    private _name: string;
    private _unitPrice: number;
    private _quantity: number;

    constructor(id: string, name: string, unitPrice: number, productId: string, quantity: number) {
        this._id = id;
        this._name = name;
        this._unitPrice = unitPrice;
        this._productId = productId;
        this._quantity = quantity;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get productId(): string {
        return this._productId;
    }

    get quantity(): number {
        return this._quantity;
    }

    get unitPrice(): number {
        return this._unitPrice;
    }

    totalPrice(): number {
        return this._unitPrice * this._quantity;
    }

    validate() {
        if (!this._id) {
            throw new Error("Id is required");
        }

        if (!this._productId) {
            throw new Error("ProductId is required");
        }

        if (!this._name) {
            throw new Error("Name is required");
        }

        if (this._unitPrice <= 0) {
            throw new Error("Unit price must be greater than 0");
        }

        if (this._quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
    }
}