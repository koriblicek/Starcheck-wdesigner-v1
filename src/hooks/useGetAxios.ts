import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface IGetErrorObj {
    code: number;
    message: string;
    url: string;
}

function useGetAxios<T>(url: string, params?: AxiosRequestConfig) {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<IGetErrorObj | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const res = await axios.get(url, {
                    ...params,
                    signal: controller.signal
                });
                setResponse(res.data as T);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError({
                        message: err.response?.data.message || "Server Unavailable",
                        code: err.response?.status || 503,
                        url
                    });
                }
                if (err instanceof Error) {
                    setError({
                        message: err.message,
                        code: 500,
                        url
                    });
                }
            } finally {
                setIsLoading(false);
            }

        };
        fetchData();

        //useEffect cleanup function
        return () => {
            controller.abort();
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { response, error, isLoading };
}

export default useGetAxios;