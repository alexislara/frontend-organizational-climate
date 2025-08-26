"use client"

import { FunctionComponent } from "react"
import DatePicker from "@/components/date-picker"
import { useAtom } from "jotai"
import { branchesFilters } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {format} from "date-fns";

const formatDate = (date?: Date) =>
    date ? format(date, "yyyy-MM-dd") : undefined

const BranchContent: FunctionComponent = () => {
    const [filters, setFilters] = useAtom(branchesFilters.filters)

    return (
        <div className="space-y-4">
            <DatePicker
                setDate={(value) =>
                    setFilters((prev) => ({
                        ...prev,
                        period_start__gte: formatDate(value?.from),
                        period_start__lte: formatDate(value?.to),
                    }))
                }
                date={{
                    from: filters.period_start__gte
                        ? new Date(filters.period_start__gte)
                        : undefined,
                    to: filters.period_start__lte
                        ? new Date(filters.period_start__lte)
                        : undefined,
                }}
                title="Período de inicio"
            />
            <DatePicker
                setDate={(value) =>
                    setFilters((prev) => ({
                        ...prev,
                        period_end__gte: formatDate(value?.from),
                        period_end__lte: formatDate(value?.to),
                    }))
                }
                date={{
                    from: filters.period_end__gte
                        ? new Date(filters.period_end__gte)
                        : undefined,
                    to: filters.period_end__lte
                        ? new Date(filters.period_end__lte)
                        : undefined,
                }}
                title="Fin del período"
            />
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
                <Checkbox
                    id="filter-completed"
                    checked={filters.completed ?? false}
                    onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                            ...prev,
                            completed:checked !== "indeterminate" ? checked:undefined
                        }))
                    }
                    className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                />
                <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                        Mostrar solo completados
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Filtra la lista para ver únicamente las tareas que ya están
                        finalizadas.
                    </p>
                </div>
            </Label>
        </div>
    )
}

export default BranchContent
