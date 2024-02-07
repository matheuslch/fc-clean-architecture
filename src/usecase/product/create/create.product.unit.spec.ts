import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDTO } from "./create.product.dto";

const product = ProductFactory.create("a", "Product 1", 10);

const MockRepository = () => {
	return {
		create: jest.fn().mockReturnValue(Promise.resolve(product)),
		update: jest.fn(),
		find: jest.fn(),
		findAll: jest.fn(),
	};
};

describe("Test unit create product use case", () => {
	it("should create a product", async () => {
		const repository = MockRepository();
		const createProductUseCase = new CreateProductUseCase(repository);

		const input: InputCreateProductDTO = {
			type: "a",
			name: product.name,
			price: product.price,
		};

		const result = await createProductUseCase.execute(input);

		expect(result.id).toBeTruthy();
		expect(result.name).toEqual(product.name);
		expect(result.price).toEqual(product.price);
	});
});
