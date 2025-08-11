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
import {useMemo} from "react"
import AtomsFilters from "@/lib/atoms/atoms-filters";
import {useAtom} from "jotai";
import {ListFilter} from "lucide-react";
import BranchContent from "@/components/layouts/sheet-filters/branch-content";
import {PathnameFilters} from "@/types/types";

interface SheetFiltersProps<T> {
    atom_filters: AtomsFilters<T>
    pathname: PathnameFilters;
}

const SheetContentFilters = {
    "": {
        content: () => (<>Foobar</>)
    },
    "branches": {content: BranchContent},
    "users": {content: BranchContent},
    "action-plans": {content: BranchContent},
    "evidences": {content: BranchContent},
}

const SheetFilters = <T,>({pathname, atom_filters}: SheetFiltersProps<T>) => {
    const [, setFilters] = useAtom(atom_filters.filters)

    const MemoContent = useMemo(() => {
        return SheetContentFilters[pathname].content
    }, [pathname])

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size={"sm"}
                >
                    <ListFilter strokeWidth={2.25} className={"ml-[-6px]"} />
                    <span>Filtros</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filtros de búsqueda</SheetTitle>
                    <SheetDescription>
                        Ajusta los criterios para refinar los resultados.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min list-none gap-6 px-4 py-4">
                    <MemoContent />
                </div>
                <SheetFooter>
                    <Button
                        onClick={() => setFilters(atom_filters.default_filters)}
                    >
                        Quitar Filtros
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
