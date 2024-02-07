import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 15);

const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn().mockReturnValue(Promise.resolve(product)),
		findAll: jest.fn(),
	};
};

describe("Test unit update product use case", () => {
	it("should update a product", async () => {
		const productRepository = MockRepository();
		const updateProductUseCase = new UpdateProductUseCase(productRepository);

		const input: InputUpdateProductDTO = {
			id: product.id,
			name: "Product 1 Updated",
			price: 20,
		};

		const expectedOutput: OutputUpdateProductDTO = {
			id: product.id,
			name: "Product 1 Updated",
			price: 20,
		};

		const output = await updateProductUseCase.execute(input);
		expect(output).toEqual(expectedOutput);
	});

	it("should update a product only price", async () => {
		const repository = MockRepository();
		const updateProductUseCase = new UpdateProductUseCase(repository);

		const input: InputUpdateProductDTO = {
			id: product.id,
			price: 30,
		};

		const expectedOutput: OutputUpdateProductDTO = {
			id: product.id,
			name: "Product 1 Updated",
			price: 30,
		};

		const output = await updateProductUseCase.execute(input);
		expect(output).toEqual(expectedOutput);
	});

	it("should update a product only name", async () => {
		const repository = MockRepository();
		const updateProductUseCase = new UpdateProductUseCase(repository);

		const input: InputUpdateProductDTO = {
			id: product.id,
			name: "Product 1 Updated New",
		};

		const expectedOutput: OutputUpdateProductDTO = {
			id: product.id,
			name: "Product 1 Updated New",
			price: 30,
		};

		const output = await updateProductUseCase.execute(input);
		expect(output).toEqual(expectedOutput);
	});

	it("should not find product to update use case", async () => {
		const productRepository = MockRepository();
		productRepository.find.mockImplementation(() => {
			throw new Error("Product not found");
		});
		const usecase = new UpdateProductUseCase(productRepository);

		const input = {
			id: "123",
		};

		expect(() => {
			return usecase.execute(input);
		}).rejects.toThrow("Product not found");
	});
});
