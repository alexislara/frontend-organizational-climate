"use client"

import { FunctionComponent } from "react"
import DatePicker from "@/components/date-picker"
import GenericSelect from "@/components/generic-select"
import { useAtom } from "jotai"
import { branchesFilters } from "@/lib/utils"

const BranchContent: FunctionComponent = () => {
    const [filters, setFilters] = useAtom(branchesFilters.filters)

    return (
        <div className="space-y-4">
            <GenericSelect
                title="Estado"
                data={[
                    {
                        title_content: "Estado",
                        content: [
                            { key: "Completado", value: "completed" },
                            { key: "Incompletado", value: "incomplete" }
                        ]
                    }
                ]}
                defaultValue={filters.status}
                value={filters.status}
                onValueChange={(selected) =>
                    setFilters((prev) => ({
                        ...prev,
                        status: selected
                    }))
                }
            />
            <DatePicker
                setDate={(value) =>
                    setFilters((prev) => ({
                        ...prev,
                        period_start: value
                    }))
                }
                date={filters.period_start}
                title="Período de inicio"
            />
            <DatePicker
                setDate={(value) =>
                    setFilters((prev) => ({
                        ...prev,
                        period_end: value
                    }))
                }
                date={filters.period_end}
                title="Fin del período"
            />
        </div>
    )
}

export default BranchContent
