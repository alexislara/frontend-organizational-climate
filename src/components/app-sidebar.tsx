"use client"
import {
    FileArchive,
    Home,
    NotepadText,
    Sheet,
    UsersRound
} from "lucide-react"
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {useRouter} from "next/navigation";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: Home,
    },
    {
        title: "Sucursales",
        url: "#",
        icon: Sheet,
    },
    {
        title: "Usuarios",
        url: "#",
        icon: UsersRound,
    },
    {
        title: "Planes de acción",
        url: "#",
        icon: NotepadText,
    },
    {
        title: "Evidencias",
        url: "#",
        icon: FileArchive,
    },
]

const AppSidebar = () => {
    const {push} = useRouter()
    const { open } = useSidebar()
    // const {data} = useProfile.useHook({
    //     func_data:fetchProfile.Get,
    //     id:user_id
    // })

    return (
        <Sidebar collapsible={"icon"}>
            <SidebarHeader>
                <SidebarMenuButton className={"flex items-center"}>
                    <Image
                        src={"/img/lth-logo.png"}
                        height={50}
                        width={50}
                        alt={""}
                    />
                    <h1>
                        CLIMA ORGANIZACIONAL
                    </h1>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menú principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <SidebarGroupLabel>Manuales</SidebarGroupLabel>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {/* User Profile Only */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className={`w-full transition-[width] duration-200 ease-linear flex items-center ${open ? "foobar":"justify-center"} gap-3 px-1 py-5 rounded-lg hover:bg-muted/50`}>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={"https://github.com/shadcn.png"} />
                                        <AvatarFallback>{`${"sin nombre"}`.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className={`flex flex-col items-start ${open ? "" : "hidden"}`}>
                                        <span className="font-medium truncate w-[88%]">{"sin nombre"}</span>
                                        <span className="text-xs text-muted-foreground">{"a"}</span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild={true}>
                                        {/*<ButtonTheme />*/}
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Perfil
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={async () =>{
                                        push(`${process.env.NEXT_PUBLIC_DJANGO_OAUTH2_SERVER_URL ?? "http://localhost:8000"}/`)
                                    }}
                                >
                                    Configuración
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={async () =>{
                                        push(`${process.env.NEXT_PUBLIC_DJANGO_OAUTH2_SERVER_URL ?? "http://localhost:8000"}/admin`)
                                    }}
                                    // hidden={!is_staff}
                                >
                                    Administracion de api
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={async () => {
                                    // await signOut();
                                    // window.location.assign(LOGOUT_URL)
                                }}>
                                    Cerrar sesión
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;