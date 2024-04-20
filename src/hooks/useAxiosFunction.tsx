import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

export interface IAxiosErrorObj {
    code: number;
    message: string;
    url: string;
}

export default function useAxiosFunction<T, S>() {
    const [error, setError] = useState<IAxiosErrorObj | null>(null);
    const [response, setResponse] = useState<T | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [controller, setController] = useState<AbortController>();

    const axiosRequest = useCallback(async (url: string, method: "post" | "get" | "put" | "delete", data?: S, params?: AxiosRequestConfig) => {
        try {
            setIsRequesting(true);
            setError(null);
            setResponse(null);

            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axios({
                method,
                url,
                data,
                params,
                signal: ctrl.signal
            });
            setResponse(res.data as T);
        } catch (err) {
            if (axios.isCancel(err)) {
                setError(null);
            } else {
                if (err instanceof AxiosError) {
                    console.log(err);
                    setError({
                        message: err.response?.data.message || err.message,
                        code: err.response?.status || 503,
                        url
                    });
                } else {
                    if (err instanceof Error) {
                        setError({
                            message: err.message,
                            code: 500,
                            url
                        });
                    }
                }
            }
        } finally {
            setIsRequesting(false);
        }
    }, []);

    const cancelRequest = useCallback(() => {
        setError(null);
        setIsRequesting(false);
        setResponse(null);
        controller && controller.abort();
    }, [controller]);

    useEffect(() => {
        //useEffect cleanup function
        return () => {
            controller && controller.abort();
        };
    }, [controller]);

    return { error, isRequesting, response, axiosRequest, cancelRequest };
}