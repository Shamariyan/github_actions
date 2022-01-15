import { useSelector } from 'react-redux';
import { State } from '../store';

const cartToProduct = (item: any, products: any) => {
	// const products = useSelector((state: State) => state.products.products);
	let product =
		products && products.find((obj: any) => obj._id === item.productId);
	product.kg = item.weight;
	product.units = item.units;
	return product;
};

export default cartToProduct;
