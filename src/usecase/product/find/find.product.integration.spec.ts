import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/model/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";

describe("Test integration find product use case", () => {
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository);

        const product = ProductFactory.create("a", "Product", 15);

        await productRepository.create(product);

        const input: InputFindProductDTO = {
            id: product.id,
        };

        const expectedOutput: OutputFindProductDTO = {
            id: product.id,
            name: product.name,
            price: product.price
        };

        const result = await useCase.execute(input);
        expect(result).toEqual(expectedOutput);
    });

});
