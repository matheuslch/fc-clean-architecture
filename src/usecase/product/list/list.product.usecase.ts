import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductsDTO, OutputListProductsDTO } from "./list.product.dto";

export default class ListProductsUseCase {
	private productRepository: ProductRepositoryInterface;

	constructor(productRepository: ProductRepositoryInterface) {
		this.productRepository = productRepository;
	}

	async execute(input: InputListProductsDTO): Promise<OutputListProductsDTO> {
		const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
	}
}

class OutputMapper {
    static toOutput(product: ProductInterface[]): OutputListProductsDTO {
        return {
            products: product.map((product) => ({
                id: product.id,
                name: product.name,
				price: product.price,
            })),
        };
    }
}
