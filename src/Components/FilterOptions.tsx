import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Checkbox from '@mui/material/Checkbox';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { productsActionCreators } from '../store';

const data = [
	{
		label: 'Type',
		types: ['Fresh cream cake', 'Butter cream cake'],
	},
];

export const filterOptionItems = (props: any[]): any => {
	const didMountRef = useRef(false);
	const dispatch = useDispatch();
	const { filterByType } = bindActionCreators(productsActionCreators, dispatch);

	const [checked, setChecked] = useState({
		freshCreamCake: false,
		butterCreamCake: false,
	});

	const { freshCreamCake, butterCreamCake } = checked;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked({ ...checked, [event.target.name]: event.target.checked });
	};

	useEffect(() => {
		if (didMountRef.current) {
			freshCreamCake
				? filterAction('Fresh cream cake')
				: butterCreamCake
				? filterAction('Butter cream cake')
				: null;
		} else didMountRef.current = true;
	}, [freshCreamCake]);
	useEffect(() => {
		if (didMountRef.current) {
			butterCreamCake
				? filterAction('Butter cream cake')
				: freshCreamCake
				? filterAction('Fresh cream cake')
				: null;
		} else didMountRef.current = true;
	}, [butterCreamCake]);

	const filterAction = (text: string) => {
		filterByType(text);
	};

	return props.map((item, index) => {
		return (
			<ListItemButton
				key={index}
				component="a"
				disableRipple
				disableTouchRipple
			>
				<ListItemText
					sx={{ my: 0 }}
					primary={item}
					primaryTypographyProps={{
						fontSize: 16,
					}}
				/>
				<ListItemIcon>
					<Checkbox
						edge="end"
						checked={
							item === 'Fresh cream cake' ? freshCreamCake : butterCreamCake
						}
						name={
							item === 'Fresh cream cake' ? 'freshCreamCake' : 'butterCreamCake'
						}
						onChange={handleChange}
						// tabIndex={-1}
						disableRipple
						//inputProps={{ 'aria-labelledby': labelId }}
					/>
				</ListItemIcon>
			</ListItemButton>
		);
	});
};

const FilterOptions = (): any => {
	return data.map((item, index) => {
		return (
			<Accordion
				disableGutters={true}
				elevation={0}
				key={index}
				TransitionProps={{ unmountOnExit: true }}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography fontWeight="medium">{item.label}</Typography>
				</AccordionSummary>
				<AccordionDetails>{filterOptionItems(item.types)}</AccordionDetails>
			</Accordion>
		);
	});
};

export default FilterOptions;
