"use client"
import { ColumnDef } from "@tanstack/react-table"
import {ArrowDown01, ArrowDownZA, CalendarArrowDown, MoreHorizontal} from "lucide-react"
import {formatDate} from "@/lib/utils";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {CampaignList, ColumnsProps} from "@/types/types";

const columnsFunc = ({push}:ColumnsProps) => {
    const columns: ColumnDef<CampaignList>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <div className="flex justify-center items-center ">
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center items-center">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: () => (
                <Button
                    variant={"ghost"}
                    onClick={() => {}}
                    size={"sm"}
                >
                    <ArrowDownZA />
                    Nombre de la sucursal
                </Button>
            ),
            cell: ({ row }) => {
                const data = row.original.branch

                return (
                    <div className="w-full">
                        <p className={"capitalize text-balance w-40"}>{data}</p>
                    </div>
                )
            },
        },
        {
            accessorKey: "commercial_distributor",
            header: () => (
                <Button
                    variant={"ghost"}
                    onClick={() => {}}
                    size={"sm"}
                >
                    <ArrowDownZA />
                    Distribuidor comercial
                </Button>
            ),
            cell: ({ row }) => {
                const data = row.original.commercial_distributor

                return (
                    <div className="capitalize text-balance">
                        <p className={"font-medium text-balance w-48"}>{data}</p>
                    </div>

                )
            },
        },
        {
            accessorKey: "user_amount",
            header: () => (
                <Button
                    variant={"ghost"}
                    onClick={() => {}}
                    size={"sm"}
                >
                    <ArrowDown01 />
                    Cantidad de usuarios
                </Button>
            ),
            cell: ({ row }) => {
                const data = row.original.user_amount

                return <span className={"flex justify-center items-center"}>{data}</span>
            }
        },
        {
            accessorKey: "period_start",
            header: () => (
                <Button
                    variant={"ghost"}
                    onClick={() => {}}
                    size={"sm"}
                >
                    <CalendarArrowDown />
                    Inicio del período
                </Button>
            ),
            cell: ({ row }) => {
                const data = row.original.period_start
                const format = formatDate(data ?? "")

                return (
                    <div className="font-medium text-balance">
                        {format}
                    </div>
                )
            }
        },
        {
            accessorKey: "period_end",
            header: () => (
                <Button
                    variant={"ghost"}
                    onClick={() => {}}
                    size={"sm"}
                >
                    <CalendarArrowDown />
                    Fin del periodo
                </Button>
            ),
            cell: ({ row }) => {
                const data = row.original.period_end
                const format = formatDate(data ?? "")

                return (
                    <div className="font-medium text-balance">
                        {format}
                    </div>
                )
            }
        },
        // {
        //     accessorKey: "created",
        //     header: () => (
        //         <Button
        //             variant={"ghost"}
        //             onClick={() => {}}
        //             size={"sm"}
        //         >
        //             <CalendarArrowDown />
        //             Fecha de creacion
        //         </Button>
        //     ),
        //     cell: ({ row }) => {
        //         const data = row.original.created
        //         const format = formatDate(data ?? "")
        //
        //         return (
        //             <div>
        //                 {format}
        //             </div>
        //         )
        //     }
        // },
        // {
        //     accessorKey: "modified",
        //     header: () => (
        //         <Button
        //             variant={"ghost"}
        //             onClick={() => {}}
        //             size={"sm"}
        //         >
        //             <CalendarArrowDown />
        //             Fecha de modificación
        //         </Button>
        //     ),
        //     cell: ({ row }) => {
        //         const data = row.original.modified
        //         const format = formatDate(data ?? "")
        //
        //         return (
        //             <div className="font-medium text-balance">
        //                 {format}
        //             </div>
        //         )
        //     }
        // },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const data = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => push(`branches/${data.id}`)}
                            >
                                Editar sucursal
                            </DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
    return columns;
}

export default columnsFunc;