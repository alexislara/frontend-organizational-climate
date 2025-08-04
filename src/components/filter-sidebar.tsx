"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {FunctionComponent} from "react";
import {SidebarClose} from "lucide-react";
import {children_filters} from "@/global-atoms";
import {useAtomValue} from "jotai";

interface FiltersSidebarProps {
    open: boolean;
    onClose: (value: boolean) => void;
}

const FilterSideBar:FunctionComponent<FiltersSidebarProps> = ({open, onClose}) => {
    const childrenFilter = useAtomValue(children_filters)

    return (
        <Sidebar side={"right"}>
            <SidebarHeader>
                <SidebarMenuItem className={"flex space-x-2"}>
                    <SidebarClose
                        size={25}
                        className={"hover:bg-accent p-1 rounded-md"}
                        onClick={() => onClose(!open)}
                    />
                    <h1 className={"font-extrabold capitalize"}>
                        Menú de filtros
                    </h1>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menú de filtros</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {childrenFilter.children}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default FilterSideBar;