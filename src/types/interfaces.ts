export interface HTTPRequestError<T> {
    ok: Response["ok"];
    statusText: Response["statusText"];
    statusCode: Response["status"];
    error: T | T[];
}

export interface HTTPFilterRequest<TFilter> {
    filters?: Record<string, TFilter>;
}

export interface GenericHookProps<TFilter> {
    id?: string;
    filters: HTTPFilterRequest<TFilter>["filters"];
    enable: boolean;
    queryName: string;
}