import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/valueObject/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "Matheus",
    new Address("Rua 1", 123, "13770000", "Caconde")
);

const input = {
    id: customer.id,
    name: "Matheus Updated",
    address: {
        street: "Rua Updated",
        number: 1234,
        zip: "13770000 Updated",
        city: "Caconde Updated",
    },
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    };
};

describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});
