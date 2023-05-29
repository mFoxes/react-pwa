import { observer } from 'mobx-react-lite';
import React from 'react';
import { ITodo } from '../../dto/ITodo';
import { Box } from '@mui/material';

type ITodoProps = ITodo;

export const Todo = observer(({ completed, id, title, ...props }: ITodoProps): JSX.Element => {
	const todoStyle = {
		padding: '8px 16px',
		width: '100%',
		borderRadius: '4px',
		border: `2px solid ${completed ? '#44944A' : 'rgba(196, 30, 58, 0.7)'}`,
		display: 'flex',
		gap: '16px',
		alignItems: 'center',
		fontSize: '18px',
	};

	return (
		<Box sx={todoStyle}>
			<Box>{id}</Box>
			<Box>{title}</Box>
		</Box>
	);
});
