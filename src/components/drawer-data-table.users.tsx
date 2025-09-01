"use client"

import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {useState} from "react";
import HeaderIndex from "@/components/header-index";
import {branchDataTableAtom, branchesFilters, format_paginated, gte_page_count, reportFilters} from "@/lib/utils";
import DataTable from "@/components/data-table";
import columnsFunc from "@/components/layouts/data-table-columns/reports";
import {useAtom, useAtomValue} from "jotai/index";
import useReport from "@/hooks/use-report";
import {ReportsListResponseSchema} from "@/types/schema";
import {useRouter} from "next/navigation";
import {DialogTitle} from "@/components/ui/dialog";

const data = [20]

const DrawerDataTableUsers = ()=> {
    const [search, setSearch] = useState<string>("")
    const {push} = useRouter();
    const [pagination, setPagination] = useAtom(branchDataTableAtom.pagination)
    const filters = useAtomValue(branchesFilters.filters)

    const {isError, isLoading, data} = useReport({
        queryName:"report-list",
        enable: true,
        filters:{
            ...filters,
            search,
            page:format_paginated(pagination.pageIndex),
            page_size:String(pagination.pageSize)
        }
    })

    if (isLoading) return <>Loading...</>
    if (isError) return <>Error</>

    const parse_data = ReportsListResponseSchema.safeParse(data)

    if (!parse_data.success) return <>Error data parse</>

    const page_count = gte_page_count(parse_data.data.count, pagination.pageSize)

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button
                    className={"w-full focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"}
                >
                    Ver usuarios
                </button>
            </DrawerTrigger>
            <DrawerContent className={"w-full"}>
                <DrawerHeader className={"flex pb-1"}>
                    <DrawerTitle>Usuarios</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 pb-4">
                    <div className="h-[190px] w-full">
                        <HeaderIndex
                            text_button={"Registro de sucursal"}
                            text_route={"/Reportes/create"}
                            search_state={(value) => setSearch(value)}
                            search={search}
                            atom_filters={reportFilters.filters}
                            hidden_button_create={true}
                        />
                        <DataTable
                            columns={columnsFunc({push})}
                            data={parse_data.data.results ?? []}
                            setPagination={setPagination}
                            pagination={pagination}
                            pageCount={page_count}
                            full_screen={false}
                        />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerDataTableUsers