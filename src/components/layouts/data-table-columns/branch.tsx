"use client"
import { ColumnDef } from "@tanstack/react-table"
import {MoreHorizontal} from "lucide-react"
import {formatDate} from "@/lib/utils";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {BranchList} from "@/types/types-schemas";

type RentalColumnsProps = {
    push:AppRouterInstance["push"]
}


const columnsFunc = ({push}:RentalColumnsProps) => {
    const columns: ColumnDef<BranchList>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <div className="flex justify-center items-center">
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
            accessorKey: "users",
            header: "Usuarios",
            cell: ({ row }) => {
                const data = row.original.users ?? []

                return (
                    <div className="text-right font-medium">
                        {data.map((value, i) => (
                            <div className="text-left font-medium" key={`user-${i}`}>
                                {value}
                            </div>
                        ))}
                    </div>
                )
            },
        },
        {
            accessorKey: "name",
            header: "Nombre de la sucursal",
            cell: ({ row }) => {
                const data = row.original.name

                return (
                    <div className="capitalize text-balance">
                        <p>{data}</p>
                    </div>

                )
            },
        },
        {
            accessorKey: "commercial_distributor",
            header: "Distribuidor comercial",
            cell: ({ row }) => {
                const data = row.original.commercial_distributor

                return (
                    <div className="capitalize text-balance">
                        <p>{data}</p>
                    </div>

                )
            },
        },
        {
            accessorKey: "created",
            header: () => <div className={"text-wrap"}>Fecha de creacion</div>,
            cell: ({ row }) => {
                const data = row.original.created
                const format = formatDate(data ?? "")

                return (
                    <div className="font-medium text-balance">
                        {format}
                    </div>
                )
            }
        },
        {
            accessorKey: "modified",
            header: () => <div className={"text-wrap"}>Fecha de modificación</div>,
            cell: ({ row }) => {
                const data = row.original.created
                const format = formatDate(data ?? "")

                return (
                    <div className="font-medium text-balance">
                        {format}
                    </div>
                )
            }
        },
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
                                onClick={() => push(`branchs/${data.id}`)}
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