"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import {ComponentProps, FunctionComponent} from "react";

const ThemeProvider:FunctionComponent<ComponentProps<typeof NextThemesProvider>> = ({
    children,
    ...props
})=> {
    return (
        <NextThemesProvider {...props}>
            {children}
        </NextThemesProvider>
    )
}

export default ThemeProvider