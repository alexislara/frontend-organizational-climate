"use client"
import {FunctionComponent, PropsWithChildren} from "react";
import {SessionProvider} from "next-auth/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

const ProvidersServer:FunctionComponent<PropsWithChildren> = ({ children })  => {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                {/*<ReactQueryDevtools initialIsOpen={false} />*/}
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default ProvidersServer;