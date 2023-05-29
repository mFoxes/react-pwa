import { Container } from 'inversify';
import 'reflect-metadata';
import { Types } from './inversify.types';
import { TodoStore } from '../store/todoStore';
import { TodoService } from '../services/todoService';

const container = new Container();

container.bind<TodoStore>(Types.TodoStore).to(TodoStore).inSingletonScope();

container.bind<TodoService>(Types.TodoService).to(TodoService);

export default container;
