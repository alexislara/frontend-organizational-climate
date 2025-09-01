"use client"
import {FunctionComponent} from "react";
import {ReportsListType} from "@/types/types";
import DataTable from "@/components/data-table";
import {useRouter} from "next/navigation";
import HeaderIndex from "@/components/header-index";
import {OnChangeFn, PaginationState} from "@tanstack/table-core";
import {reportFilters} from "@/lib/utils";
import columnsFunc from "@/components/layouts/data-table-columns/reports";

interface ReportIndexProps {
    data: ReportsListType[];
    setSearch: (value: string) => void;
    search: string;
    pageCount: number;
    setPagination:OnChangeFn<PaginationState>;
    pagination: PaginationState;
}

const ReportIndex:FunctionComponent<ReportIndexProps> = ({
    data,
    search,
    setSearch,
    pageCount,
    setPagination,
    pagination
}) => {
    const {push} = useRouter()

    return (
        <div>
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
                data={data}
                setPagination={setPagination}
                pagination={pagination}
                pageCount={pageCount}
            />
        </div>
    )
}

export default ReportIndex;