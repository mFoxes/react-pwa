import { Box, CircularProgress, Container, Pagination, PaginationProps, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useInject } from '../../../hooks/useInject';
import { Types } from '../../../inversify/inversify.types';
import { TodoStore } from '../../../store/todoStore';
import { LOADING_STATE } from '../../../utils/loadingStateEnum';
import { Todo } from '../../todo/todo';

const TODO_COUNT_ON_PAGE = 20;

export const Content = observer((): JSX.Element => {
	const todoStore = useInject<TodoStore>(Types.TodoStore);

	const [currentPageNumber, setCurrentPageNumber] = useState(1);

	const todoListOnPage = [...todoStore.todos].slice(
		(currentPageNumber - 1) * TODO_COUNT_ON_PAGE,
		currentPageNumber * TODO_COUNT_ON_PAGE,
	);

	useEffect(() => {
		todoStore.getTodos();
	}, []);

	const paginationProps: PaginationProps = {
		count: Math.round(todoStore.todos.length / TODO_COUNT_ON_PAGE),
		page: currentPageNumber,
		shape: 'rounded',
		onChange: (_: React.ChangeEvent<unknown>, page: number): void => {
			setCurrentPageNumber(page);
		},
	};

	return (
		<Box sx={{ flex: '1 0 100%' }}>
			<Container
				sx={{
					padding: '24px 0',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '16px',
				}}
			>
				{todoStore.isLoading === LOADING_STATE.LOADING ? (
					<CircularProgress />
				) : (
					<>
						<Stack spacing={2} sx={{ width: '100%' }}>
							{todoListOnPage.map((todo) => (
								<Todo key={todo.id} {...todo} />
							))}
						</Stack>
						<Pagination {...paginationProps} />
					</>
				)}
			</Container>
		</Box>
	);
});
