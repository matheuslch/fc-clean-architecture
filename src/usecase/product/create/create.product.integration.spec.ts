import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/model/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

describe("Test integration create product use case", () => {
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const input: InputCreateProductDTO = {
            type: "a",
            name: "Product 1",
            price: 15,
        };

        const expectedOutput: OutputCreateProductDTO = {
            id: expect.any(String),
            name: input.name,
            price: input.price
        };

        const result = await useCase.execute(input);
        expect(result).toEqual(expectedOutput);
    });

});
