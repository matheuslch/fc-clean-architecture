import ProductInterface from "../entity/product.interface";
import RepositoryInterface from '../../@shared/repository/repository-interface';

export default interface ProductRepositoryInterface 
    extends RepositoryInterface<ProductInterface> {}
