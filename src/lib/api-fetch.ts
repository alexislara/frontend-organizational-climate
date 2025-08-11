import {HTTPFilterRequest, HTTPRequestError} from "@/types/interfaces";

interface PropsFetch<TFilter, V> extends HTTPFilterRequest<TFilter> {
    id?: string;
    method: "GET" | "POST" | "PUT" | "PATCH";
    body?: Record<string, V>;
}

type PropsMethod<TFilter, V> = Omit<PropsFetch<TFilter, V>, "method">
type PropsHeader<TFilter, V> = Omit<PropsFetch<TFilter, V>, "method" | "filters" | "id">
type ReturnMethod<TData, TError> = Promise<TData | HTTPRequestError<TError> | undefined>


class ApiFetch<TData, TError, TFilter> {
    private readonly baseUrl: string;
    public readonly endpoint: string;

    constructor({ url, endpoint }: { url: string; endpoint: string }) {
        this.baseUrl = url;
        this.endpoint = endpoint;
    }

    protected get_token = async (): Promise<string> => {
        try {
            const res = await fetch("/api/token");
            const data = await res.json();
            return data?.access_token ?? "";
        } catch (error) {
            console.error("Error getting token:", error);
            return "";
        }
    };

    public get_headers = async <V>({body}:PropsHeader<TFilter, V>):Promise<HeadersInit> => {
        const token = await this.get_token()

        const headers: HeadersInit = {
            "Authorization": `Bearer ${token}`
        };

        if (!(body instanceof FormData)) headers["Content-Type"] = "application/json";

        return headers
    }

    public validate_error = async (response:Response): Promise<HTTPRequestError<TError> | undefined> => {
        if (response.status === 200 || response.status === 201) return undefined

        return {
            ok:response.ok,
            statusText:response.statusText,
            statusCode:response.status,
            error:await response.json()
        };
    }

    public url_build = ({id, filters}:PropsMethod<TFilter, unknown>):string => {
        const url_params =new URLSearchParams();

        let base_url = `${this.baseUrl}/${this.endpoint}/`;
        if (id) base_url += `${id}/`;

        Object.entries(filters ?? {}).map(([key, value]) => {
            if (value !== undefined && value !== null) {
                url_params.append(key, String(value));
            }
        });

        return `${base_url}?${url_params}`;
    }

    private fetch_data = async <V, TFilter>({
                                       id,
                                       method,
                                       body,
                                       filters
                                   }:PropsFetch<TFilter, V>):ReturnMethod<TData ,TError>  => {
        try {
            // fetch consumer api
            const response = await fetch(this.url_build({id, filters}), {
                method,
                headers:await this.get_headers({body}),
                body: method !== "GET"
                    ? body instanceof FormData
                        ? body
                        : JSON.stringify(body)
                    : undefined
            })

            // Http error
            const error = await this. validate_error(response)
            if (error) return error;

            // Http ok
            if (response.ok && method !== "GET") return undefined;
            return response.json()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    public get = async <TFilter, V>({
                               id,
                               filters
                           }:PropsMethod<TFilter, V>):ReturnMethod<TData, TError> => {
        return this.fetch_data({id, method:"GET", filters});
    };

    public post = async <V>({
                                body
                            }: PropsMethod<TFilter, V>): ReturnMethod<TData, TError> => {
        return this.fetch_data({method:"POST", body});
    };

    public put = async <V>({
                               id,
                               body
                           }: PropsMethod<TFilter, V>): ReturnMethod<TData, TError> => {
        return this.fetch_data({id, method:"PUT", body});
    };

    public patch = async <TFilter, V>({
                                 id,
                                 body
                             }: PropsMethod<TFilter, V>): ReturnMethod<TData, TError> => {
        return this.fetch_data({id, method:"PATCH", body});
    };

}

export default ApiFetch;