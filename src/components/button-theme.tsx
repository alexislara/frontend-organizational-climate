import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ButtonTheme = () => {
    const { setTheme, theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Efecto para evitar hidratación no coincidente en el servidor/cliente
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" className="w-full px-0" disabled>
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="ml-2">Toggle theme</span>
            </Button>
        );
    }

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={"w-full px-0"}>
                <Button variant="ghost" className="w-full flex justify-between items-center px-0">
                    <span className="">Tema</span>
                    {currentTheme === "dark" ? (
                        <Moon className="h-[1.2rem] w-[1.2rem]"/>
                    ) : (
                        <Sun className="h-[1.2rem] w-[1.2rem]"/>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={"flex justify-between items-center"}
                >
                    Light
                    <Sun className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={"flex justify-between items-center"}
                >
                    Dark
                    <Moon className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className={"flex justify-between items-center"}
                >
                    System
                    <Monitor className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ButtonTheme;