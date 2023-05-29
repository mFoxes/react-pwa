import { Either, left, right } from '@sweet-monads/either';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';
import { BaseApi, RequestData } from './baseApi';

@injectable()
export class AxiosApi extends BaseApi<InternalAxiosRequestConfig> {
	private $api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' });

	constructor() {
		super();

		this.$api.interceptors.request.use(
			(config) => this._interceptOnFulfilled(config),
			(e) => this._interceptOnReject(e),
		);
	}

	protected _doApiRequest = async <TBody, TError>(
		apiRequest: Promise<AxiosResponse<TBody>>,
	): Promise<Either<AxiosResponse<TError>, TBody>> => {
		try {
			const response = await apiRequest;
			return right(response.data);
		} catch (e: any) {
			console.log(e);
			return left(e.response);
		}
	};

	protected _get = <T, R = AxiosResponse<T>>(data: RequestData<InternalAxiosRequestConfig>): Promise<R> => {
		return this.$api.get<T, R>(data.url, data.config);
	};

	protected _post = <T, R = AxiosResponse<T>>(data: RequestData<InternalAxiosRequestConfig>): Promise<R> => {
		return this.$api.post<T, R>(data.url, data.payload, data.config);
	};

	protected _put = <T, R = AxiosResponse<T>>(data: RequestData<InternalAxiosRequestConfig>): Promise<R> => {
		return this.$api.put<T, R>(data.url, data.payload, data.config);
	};

	protected _delete = <T, R = AxiosResponse<T>>(data: RequestData<InternalAxiosRequestConfig>): Promise<R> => {
		return this.$api.delete<T, R>(data.url);
	};

	private _interceptOnFulfilled(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
		return config;
	}

	private _interceptOnReject(error: unknown): Promise<never> {
		console.error(error);
		return Promise.reject(error);
	}
}
