"use client"
import {FunctionComponent} from "react";
import {BranchList} from "@/types/types-schemas";
import DataTable from "@/components/data-table";
import columnsFunc from "@/components/layouts/data-table-columns/branch";
import {useRouter} from "next/navigation";
import HeaderIndex from "@/components/header-index";
import {OnChangeFn, PaginationState} from "@tanstack/table-core";

interface BranchIndexProps {
    data:BranchList[]
    setSearch: (value: string) => void;
    search: string;
    pageCount: number;
    setPagination:OnChangeFn<PaginationState>;
    pagination: PaginationState;
}

const BranchIndex:FunctionComponent<BranchIndexProps> = ({
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
                text_route={"/branches/create"}
                search_state={(value) => setSearch(value)}
                search={search}
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

export default BranchIndex;