import { State } from '../store';
import { useSelector } from 'react-redux';

const totalPriceCalculator = (cart: any[], products: any[]) => {
	// const cart = useSelector((state: State) => state.auth.user.cartItems);
	// const products = useSelector((state: State) => state.products.products);

	if (cart) {
		const detailedArray = products.filter((item: any) => {
			for (let i = 0; i < cart.length; i++) {
				if (item._id === cart[i].productId) {
					item.kg = cart[i].weight;
					item.units = cart[i].units;
					return item;
				}
			}
		});

		const arr = detailedArray.map((item: any) => {
			var itemPrice = item.price * item.kg * item.units;
			return itemPrice;
		});

		var total = arr.includes(NaN)
			? 0.0
			: arr.reduce((a: number, b: number) => a + b, 0).toFixed(2);

		return total;
	}
	return 0;
};

export default totalPriceCalculator;
