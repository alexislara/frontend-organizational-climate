'use client';

import ThemeProvider from "@/components/theme-provider";
import {FunctionComponent, PropsWithChildren} from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { useSession } from "next-auth/react";
import { Toaster } from "sonner";
import NavBar from "@/components/nav-bar";
import { usePathname } from "next/navigation";
import {useAtom} from "jotai";
import {open_filters} from "@/lib/atoms/global-atoms";

const ProvidersClient: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [openFilter, setOpenFilter] = useAtom(open_filters)
    const { status } = useSession();
    const pathname = usePathname();

    const split_pathname = pathname.split("/");

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {status === "authenticated" && (
                <SidebarProvider>
                    {split_pathname.length <= 2 && <AppSidebar />}
                    <div className="flex h-full w-full overflow-hidden">
                        <div className="flex flex-col w-full">
                            <NavBar pathname={split_pathname} />
                            <div className={`${openFilter ? "blur-xs bg-card/40 z-10 fixed h-full w-full": ""}`} />
                            <main className="flex flex-col m-2">
                                {children}
                            </main>
                        </div>
                    </div>
                    <Toaster />
                </SidebarProvider>
            )}
            {status === "unauthenticated" && (
                <main className="grid grid-cols-1 w-full">
                    {children}
                </main>
            )}
        </ThemeProvider>
    );
};

export default ProvidersClient;
