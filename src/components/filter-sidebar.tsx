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
import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {SidebarClose} from "lucide-react";
import DatePicker from "@/components/date-picker";
import {GenericHookProps, HTTPFilterRequest} from "@/types/interfaces";
import {DropdownMenu} from "@/components/ui/dropdown-menu";
import GenericSelect from "@/components/generic-select";
import {actionPlansFilters, branchesFilters, evidencesFilters, usersFilters} from "@/lib/utils";
import {PrimitiveAtom, useAtom} from "jotai";
import AtomsFilters from "@/lib/atoms/atoms-filters";

interface FiltersSidebarProps {
    open: boolean;
    onClose: (value: boolean) => void;
    pathname: "branches" | "users" | "action-plans" | "evidences";
    filters: (value:HTTPFilterRequest["filters"]) => void;
}


interface FiltersSidebarContentProps {
    setFilters: (filters:GenericHookProps["filters"]) => void;
    filters?: GenericHookProps["filters"];
}

const BranchContent:FunctionComponent<FiltersSidebarContentProps> = ({
    setFilters,
    filters
}) => {

    useEffect(() => {

    },[setFilters])

    return (
        <SidebarGroupContent className={"space-y-3"}>
            <DropdownMenu>
                <DatePicker
                    setDate={(value) => {
                        setFilters({
                            ...filters,
                            period_start:String(value)
                        })
                    }}
                    date={!filters?.period_start ? undefined : new Date(filters?.period_start)}
                    title={"Período de inicio"}
                />
            </DropdownMenu>
            <DropdownMenu>
                <DatePicker
                    setDate={(value) => {
                        setFilters({
                            ...filters,
                            period_end:String(value)
                        })
                    }}
                    date={filters.period_end ? new Date(filters.period_end):undefined}
                    title={"Fin del período"}
                />
            </DropdownMenu>
            <SidebarMenuItem>
            <GenericSelect
                title={"Estado"}
                data={[
                    {
                        title_content:"Estado",
                        content:[
                            {
                                key:"Completado",
                                value:"aaaaaaaaa"
                            },
                            {
                                key:"Incompletado",
                                value:"bbbbbbbbbbbb"
                            }
                        ]
                    }
                ]}
            />
            </SidebarMenuItem>
        </SidebarGroupContent>
    )
}

const UserContent:FunctionComponent<FiltersSidebarContentProps> = () => {
    return (
        <>

        </>
    )
}

const ActionPlansContent:FunctionComponent<FiltersSidebarContentProps> = () => {
    return (
        <>

        </>
    )
}

const EvidencesContent:FunctionComponent<FiltersSidebarContentProps> = () => {
    return (
        <>
            Evidences
        </>
    )
}

interface SidebarContentProps {
    atom_filters:PrimitiveAtom<AtomsFilters["filters"]>
    Content:FunctionComponent
}

const SidebarContentFilters:FunctionComponent<SidebarContentProps> = ({atom_filters, Content}) => {
    const [filters, setFilters] = useAtom(atom_filters)
    return (
        <Content
            setFilters={setFilters}
            filters={filters}
        />
    )
}

const ContentItem = {
    "":{
        content:BranchContent,
        atom_filters:branchesFilters.filters
    },
    "branches": {
        content:BranchContent,
        atom_filters:branchesFilters.filters
    },
    "users": {
        content:UserContent,
        atom_filters: usersFilters.filters
    },
    "action-plans": {
        content:ActionPlansContent,
        atom_filters: actionPlansFilters.filters
    },
    "evidences": {
        content:EvidencesContent,
        atom_filters: evidencesFilters.filters
    },
}

const FilterSideBar:FunctionComponent<FiltersSidebarProps> = ({open, onClose, pathname}) => {
    const ContentMemo = useMemo(() => {
        return ContentItem[pathname]
    }, [pathname])


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
                <SidebarGroupLabel>Menú de filtros</SidebarGroupLabel>
                <SidebarGroup>
                    <SidebarContentFilters
                        atom_filters={ContentMemo.atom_filters}
                        Content={ContentMemo.content}
                    />
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default FilterSideBar;