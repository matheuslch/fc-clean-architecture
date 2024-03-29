import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/model/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductsUseCase from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputListProductsDTO } from "./list.product.dto";

describe("Test integration list product use case", () => {
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

	it("should list products", async () => {
		const productRepository = new ProductRepository();
		const useCase = new ListProductsUseCase(productRepository);

		const product1 = ProductFactory.create("a", "Product 1", 15);
		const product2 = ProductFactory.create("b", "Product 2", 20);

		await productRepository.create(product1);
		await productRepository.create(product2);

		const input: InputListProductsDTO = {};

		const output = await useCase.execute(input);
        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
	});

});
