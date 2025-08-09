"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "./ui/sheet"
import { Button } from "@/components/ui/button"
import {FunctionComponent, PropsWithChildren} from "react"
import AtomsFilters from "@/lib/atoms/atoms-filters";
import {useAtom} from "jotai";

interface SheetFiltersProps {
    atom_filters: AtomsFilters["filters"]
}

const SheetFilters: FunctionComponent<PropsWithChildren<SheetFiltersProps>> = ({children, atom_filters}) => {
    const [filters, setFilters] = useAtom(atom_filters)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Filtros</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filtros de búsqueda</SheetTitle>
                    <SheetDescription>
                        Ajusta los criterios para refinar los resultados.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4 py-4">
                    {children}
                </div>
                <SheetFooter>
                    <Button
                        onClick={() => setFilters((filters) => ({
                                ...filters
                            })
                        )}
                    >
                        Aplicar filtros
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Cerrar</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default SheetFilters
