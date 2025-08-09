"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useState} from "react"
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "./ui/pagination"
import {PaginationState, OnChangeFn} from "@tanstack/table-core"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    pagination: PaginationState;
    setPagination:OnChangeFn<PaginationState>;
    pageCount: number;
}


const generatePages = (current: number, end: number): number[] => {
    if (current > end) return [];
    return [current, ...generatePages(current + 1, end)];
};

const DataTable = <T,>({ data, columns, pagination, pageCount, setPagination }: DataTableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        pageCount,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
        manualPagination: true,
    })

    const currentPage = table.getState().pagination.pageIndex
    const totalPages = table.getPageCount()

    const getPageNumbers = () => {
        const maxVisiblePages = 3;
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage >= totalPages) {
            endPage = totalPages - 1;
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        const pages: (number | string)[] = [];

        if (startPage > 0) {
            pages.push(0);
            if (startPage > 1) pages.push('ellipsis-start');
        }

        pages.push(...generatePages(startPage, endPage));

        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) pages.push('ellipsis-end');
            pages.push(totalPages - 1);
        }

        return pages;
    };

    return (
        <div className="w-full mt-2 rounded-md">
            <div className="rounded-md border overflow-x-auto h-[calc(100vh-190px)]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-[calc(100vh-232px)] text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between border rounded-md p-2 bg-card my-2">
                <Select
                    defaultValue={"20"}
                    onValueChange={(select_value) => {
                        setPagination({
                            pageIndex: 0,
                            pageSize: Number(select_value)
                        })
                    }}
                >
                    <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="pagination" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tamaño de paginacion</SelectLabel>
                            {[10, 20, 30, 40, 50].map((item, index) => (
                                <SelectItem
                                    key={`item-${index}-page`}
                                    value={`${item}`}
                                >
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => table.previousPage()}
                                size={"sm"}
                            />
                        </PaginationItem>

                        {getPageNumbers().map((page, index) => {
                            if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                                return (
                                    <PaginationItem key={`ellipsis-${index}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )
                            }
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => table.setPageIndex(page as number)}
                                        isActive={page === currentPage}
                                    >
                                        {(page as number) + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => table.nextPage()}
                                size={"sm"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default DataTable