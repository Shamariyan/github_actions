import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { ChangeEventHandler, Key, useState } from 'react';

const useStyles = makeStyles((theme) => {
	return {
		prodQuantity: { paddingTop: '5%' },
	};
});
const ProductCustomization = ({
	kg,
	uom,
	handleUom,
}: {
	kg: number;
	uom: Array<any>;
	handleUom: any;
}) => {
	const classes = useStyles();

	return (
		<Grid
			item
			container
			xs={12}
			sm={12}
			md={12}
			lg={12}
			xl={12}
			className={classes.prodQuantity}
		>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
				<TextField
					fullWidth
					id="standard-select-kg"
					select
					label="Kg"
					defaultValue={1}
					value={kg}
					onChange={handleUom}
					variant="standard"
				>
					{uom.map((option: any, index: Key) => (
						<MenuItem key={index} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={9} sm={9} md={9} lg={9} xl={9}></Grid>
		</Grid>
	);
};

export default ProductCustomization;
