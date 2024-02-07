import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/valueObject/address";
import CustomerModel from "../../../infrastructure/customer/model/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "Matheus")
        const address = new Address("Rua teste", 123, "12345678", "São Paulo");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "Matheus",
            address: {
                street: "Rua teste",
                city: "São Paulo",
                number: 123,
                zip: "12345678",
            },
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});
