import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/valueObject/address";

export default class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
        const customer = CustomerFactory.createWithAddress(
            input.name,
            new Address(
                input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city
            )
        );

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
            },
        };
    }
}
