import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductsUseCase from "./list.product.usecase";
import { InputListProductsDTO } from "./list.product.dto";

const listProducts = [
	ProductFactory.create("a", "Product 1", 10),
	ProductFactory.create("b", "Product 2", 20),
];

const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn(),
		findAll: jest.fn().mockReturnValue(Promise.resolve(listProducts)),
	};
};

describe("Test unit list product use case", () => {
	it("should list products", async () => {
		const productRepository = MockRepository();
		const listProductsUseCase = new ListProductsUseCase(productRepository);

		const input: InputListProductsDTO = {};

		const output = await listProductsUseCase.execute(input);
        expect(output.products.length).toBe(listProducts.length);
        expect(output.products[0].id).toBe(listProducts[0].id);
        expect(output.products[0].name).toBe(listProducts[0].name);
        expect(output.products[0].price).toBe(listProducts[0].price);
        expect(output.products[1].id).toBe(listProducts[1].id);
        expect(output.products[1].name).toBe(listProducts[1].name);
        expect(output.products[1].price).toBe(listProducts[1].price);
	});
});
