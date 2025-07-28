'use client';

import ThemeProvider from "@/components/theme-provider";
import {FunctionComponent, PropsWithChildren} from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { useSession } from "next-auth/react";
import { Toaster } from "sonner";
import NavBar from "@/components/nav-bar";
import { usePathname } from "next/navigation";

const ProvidersClient: FunctionComponent<PropsWithChildren> = ({ children }) => {
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
                    <div className="flex h-screen w-full overflow-hidden">
                        {split_pathname.length <= 2 && <AppSidebar />}
                        <div className="flex flex-col flex-1 min-h-screen">
                            <NavBar
                                pathname={split_pathname}
                            />
                            <main className="flex-1 overflow-auto p-3">
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
