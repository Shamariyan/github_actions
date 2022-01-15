import { State } from './../store';
import { useSelector } from 'react-redux';
import cartToProduct from './cartToProduct';
import totalPriceCalculator from './totalPriceCalculator';

interface orderObj {
	userId: string;
	orderPrice: number;
	paymentDone: boolean;
	paymentMethod: string;
	deliveryAddress: any;
	orderItems: Array<any>;
}

const orderCreator = (address: any, user: any, products: any) => {
	// const address = useSelector((state: State) => state.products.address);
	// const user = useSelector((state: State) => state.auth.user);
	// const totalPrice = totalPriceCalculator();
	const productArray = user.cartItems.map((item: any) => {
		const product = cartToProduct(item, products);
		return product;
	});
	const orderItems = productArray.map((item: any) => {
		const obj = {
			productId: '',
			vendorId: '',
			count: 0,
			price: 0,
			weight: 0,
			orderStatus: 'In progress',
		};
		obj.productId = item._id;
		obj.vendorId = item.vendorId;
		obj.count = item.units;
		obj.weight = item.weight;

		return obj;
	});

	const orderObject: orderObj = {
		userId: user._id,
		orderPrice: 11,
		paymentDone: false,
		paymentMethod: 'COD',
		deliveryAddress: address,
		orderItems: orderItems,
	};
	console.log(orderObject);
	return orderObject;
};

export default orderCreator;
