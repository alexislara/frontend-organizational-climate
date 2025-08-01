export interface HTTPRequestError<T> {
    ok: Response["ok"];
    statusText: Response["statusText"];
    statusCode: Response["status"];
    error: T | T[];
}

export interface HTTPFilterRequest {
    filters?: Record<string, string | string[]>;
}

export interface GenericHookProps {
    id?: string;
    filters?: Record<string, string | string[]>;
    enable: boolean;
    queryName: string;
}