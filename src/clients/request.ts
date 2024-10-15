import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { routes } from './endpoints';


interface RequestParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    data?: any;
    config?: AxiosRequestConfig;
    secretKey?: string; 
}

export async function makeRequest<T = any>({
    method,
    url,
    data = null,
    config = {},
    secretKey = routes?.apisecret
}: RequestParams): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios({
            method,
            url,
            data,
            headers: {
                ...config.headers,
                'X-Secret-Key': secretKey 
            },
        });
        return response.data;
    } catch (error) {

        console.error('Error making the request:', error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Axios error: ${(error as Error).message}`);
        } else {
            throw new Error(`Unexpected error: ${error}`);
        }
    }
}