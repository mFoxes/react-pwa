import { Either } from '@sweet-monads/either';
import { AxiosApi } from './api/base/axiosApi';
import { ITodo } from '../dto/ITodo';

export class TodoService extends AxiosApi {
	public getTodos(): Promise<Either<unknown, ITodo[]>> {
		const req = this._get<ITodo[]>({ url: '/todos' });

		return this._doApiRequest(req);
	}
}
