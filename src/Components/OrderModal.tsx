import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import PreviousOrderItems from './PreviousOrderItems';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { ProductItem } from './PreviousOrderItem';
import Loading from '../utils/Loading';
import IconButton from '@mui/material/IconButton';
import Close from '@material-ui/icons/Close';
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	height: '95%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 3,
	overflow: 'scroll',
};

export const OrderModal = ({
	open,
	handleClose,
}: {
	open: boolean;
	handleClose: any;
}) => {
	const width = window.innerWidth;
	const order = useSelector((state: State) => state.auth.currentOrder);
	const loading = useSelector((state: State) => state.auth.loading);

	let arr: any[] = [];
	order &&
		order.orderItems.map((order: any) => {
			let a = order.products;
			arr.push(...a);
		});

	return order === null ? null : loading ? (
		<Loading />
	) : (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={handleClose}
			closeAfterTransition
		>
			<Fade in={open}>
				<Box sx={style}>
					<Box sx={{ width: '100%', textAlign: 'right' }}>
						<IconButton
							size="small"
							sx={{ textAlign: 'end', width: 15 }}
							aria-label="delete item"
							onClick={handleClose}
						>
							<Close fontSize="large" color="disabled" />
						</IconButton>
					</Box>
					<Typography fontWeight={600} fontSize={18} textAlign={'center'}>
						Your Order has been placed successfully
					</Typography>
					{width > 600 ? (
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Box>
								<Typography py={2} fontWeight={400}>
									Order Id{' '}
								</Typography>
								<Typography py={2} fontWeight={400}>
									Order Date{' '}
								</Typography>
								<Typography py={2} fontWeight={400}>
									Order Address{' '}
								</Typography>
								<Typography py={2} fontWeight={400}>
									Order Total{' '}
								</Typography>
							</Box>
							<Box sx={{ textAlign: 'right' }}>
								<Typography py={2}>{order.orderId}</Typography>
								<Typography py={2}>{order.orderDate.slice(0, 10)}</Typography>
								<Typography py={2}>
									{order.deliveryAddress.address},
									{order.deliveryAddress.pinCode}
								</Typography>
								<Typography py={2}>₹ {order.orderPrice.toFixed(2)}</Typography>
							</Box>
						</Box>
					) : (
						<MobileOrderDetail order={order} />
					)}
					{arr.length > 0
						? arr.map((item: any) => {
								return <ProductItem key={item._id} item={item} />;
						  })
						: null}
				</Box>
			</Fade>
		</Modal>
	);
};

const MobileOrderDetail = ({ order }: any) => {
	return (
		<Box sx={{ display: 'flex', overflow: 'scroll', flexDirection: 'column' }}>
			<Box
				sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
			>
				<Typography py={2} fontSize={12} fontWeight={'bold'}>
					Order Id{' '}
				</Typography>
				<Typography py={2} fontSize={12} textAlign={'right'}>
					{order.orderId}
				</Typography>
			</Box>
			<Box
				sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
			>
				<Typography py={2} fontSize={12} fontWeight={'bold'}>
					Order Date{' '}
				</Typography>
				<Typography py={2} fontSize={12} textAlign={'right'}>
					{order.orderDate.slice(0, 10)}
				</Typography>
			</Box>
			<Box
				sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
			>
				<Typography py={2} fontSize={12} fontWeight={'bold'}>
					Address{' '}
				</Typography>
				<Typography py={2} fontSize={12} textAlign={'right'}>
					{order.deliveryAddress.address},{order.deliveryAddress.pinCode}
				</Typography>
			</Box>
			<Box
				sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
			>
				<Typography py={2} fontSize={12} fontWeight={'bold'}>
					Order Total{' '}
				</Typography>
				<Typography py={2} fontSize={12} textAlign={'right'}>
					₹ {order.orderPrice.toFixed(2)}
				</Typography>
			</Box>
		</Box>
	);
};
