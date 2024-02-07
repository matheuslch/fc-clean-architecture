import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/valueObject/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Matheus")
const address = new Address("Rua teste", 123, "12345678", "São Paulo");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test find customer use case", () => {
    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

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

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    });
});
