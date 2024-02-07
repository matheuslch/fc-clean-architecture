import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/valueObject/address";
import ListCustomerUseCase from "./list.customer.usecase";

const listCostumer = [
    CustomerFactory.createWithAddress(
        "Matheus",
        new Address("Rua 1", 1, "13770000", "Caconde")
    ),
    CustomerFactory.createWithAddress(
        "Luiz",
        new Address("Rua 2", 2, "13770000", "Caconde 2")
    ),
];

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(listCostumer)),
    };
};

describe("Unit test for listing customer use case", () => {
    it("should list a customer", async () => {
        const repository = MockRepository();
        const useCase = new ListCustomerUseCase(repository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(listCostumer.length);
        expect(output.customers[0].id).toBe(listCostumer[0].id);
        expect(output.customers[0].name).toBe(listCostumer[0].name);
        expect(output.customers[0].address.street).toBe(listCostumer[0].address.street);
        expect(output.customers[1].id).toBe(listCostumer[1].id);
        expect(output.customers[1].name).toBe(listCostumer[1].name);
        expect(output.customers[1].address.street).toBe(listCostumer[1].address.street);
    });
});
