import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";
import { InputFindProductDTO } from "./find.product.dto";

const product = ProductFactory.create("a", "Product 1", 15);

const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn().mockReturnValue(Promise.resolve(product)),
		findAll: jest.fn(),
	};
};

describe("Test unit find product use case", () => {
	it("should find a product", async () => {
		const repository = MockRepository();
		const findProductUseCase = new FindProductUseCase(repository);

		const input: InputFindProductDTO = {
			id: product.id,
		};

		const result = await findProductUseCase.execute(input);

		expect(result.id).toEqual(product.id);
		expect(result.name).toEqual(product.name);
		expect(result.price).toEqual(product.price);
	});

	it("should not find product use case", async () => {
		const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});
