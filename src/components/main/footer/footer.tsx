import { Box, Container, Typography } from '@mui/material';

export const Footer = (): JSX.Element => {
	return (
		<Box sx={{ backgroundColor: 'primary.dark', padding: '16px 0' }}>
			<Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant='h4' sx={{ color: '#fff' }}>
					ToDo list
				</Typography>
			</Container>
		</Box>
	);
};
