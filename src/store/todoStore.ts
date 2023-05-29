import { inject, injectable } from 'inversify';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { Types } from '../inversify/inversify.types';
import { TodoService } from '../services/todoService';
import { ITodo } from '../dto/ITodo';
import { LOADING_STATE } from '../utils/loadingStateEnum';

@injectable()
export class TodoStore {
	@inject(Types.TodoService) private _todoService!: TodoService;

	@observable private _todos: ITodo[] = [];
	@observable private _isLoading: LOADING_STATE = LOADING_STATE.NONE;

	constructor() {
		makeAutoObservable(this);
	}

	@computed get todos(): ITodo[] {
		return this._todos;
	}

	@action public setTodos(value: ITodo[]): void {
		this._todos = value;
	}

	@computed get isLoading(): LOADING_STATE {
		return this._isLoading;
	}

	@action public setIsLoading(value: LOADING_STATE): void {
		this._isLoading = value;
	}

	public async getTodos(): Promise<void> {
		this.setIsLoading(LOADING_STATE.LOADING);
		const res = await this._todoService.getTodos();

		if (res.isRight()) {
			this.setTodos(res.value);
			this.setIsLoading(LOADING_STATE.FULFILLED);
		} else {
			this.setIsLoading(LOADING_STATE.REJECT);
		}
	}
}
