import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
	return (
		<Box
			sx={{
				width: '100%',
				paddingTop: '25%',
				textAlign: 'center',
			}}
		>
			<CircularProgress />
		</Box>
	);
}
