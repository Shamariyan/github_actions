import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Key } from 'react';
import { CategoryListItems } from './CategoryListItem';

interface categoriesListProps {
	data: any;
	closeDrawer: any;
}

const CategoriesList = (props: categoriesListProps) => {
	const { data, closeDrawer } = props;

	return data.map((item: any, index: Key | null | undefined) => {
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
				<AccordionDetails>
					{item.types.map((item: any) => {
						return (
							<CategoryListItems
								key={item}
								item={item}
								closeDrawer={closeDrawer}
							/>
						);
					})}
				</AccordionDetails>
			</Accordion>
		);
	});
};

export default CategoriesList;
