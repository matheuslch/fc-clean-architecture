import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/model/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";


describe("Test integration update product use case", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should update a product", async () => {
		const productRepository = new ProductRepository();
		const useCase = new UpdateProductUseCase(productRepository);

		const product1 = ProductFactory.create("a", "Product 1", 10);

		await productRepository.create(product1);

		const input: InputUpdateProductDTO = {
			id: product1.id,
			name: "Product 1 Updated",
			price: 20,
		};

		const expectedOutput: OutputUpdateProductDTO = {
			id: product1.id,
			name: "Product 1 Updated",
			price: 20,
		};

		const result = await useCase.execute(input);
		expect(result).toEqual(expectedOutput);
	});

});
