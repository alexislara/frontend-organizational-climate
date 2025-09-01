"use client"
import {Input} from "@/components/ui/input";
import {Plus, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import SheetFilters from "@/components/sheet-filters";
import {branchesFilters} from "@/lib/utils";
import {PathnameFiltersSchema} from "@/types/schema";
import AtomsFilters from "@/lib/atoms/atoms-filters";

interface HeaderProps<T> {
    text_button: string;
    text_route: string;
    search: string;
    search_state: (value:string) => void;
    atom_filters: AtomsFilters<T>["filters"]
    hidden_button_create?: boolean | false;
}


const HeaderIndex = <T,>({
    text_button,
    text_route,
    search,
    search_state,
    hidden_button_create,
}: HeaderProps<T>) => {
    const {push} = useRouter()
    const pathname = usePathname();
    const pathname_split = pathname.split("/")

    return (
        <nav className={"flex items-center bg-card border rounded-t-md p-2 justify-between"}>
            <div className={"static flex items-center w-[35%]"}>
                <Input
                    className={"pl-8"}
                    placeholder={"Search..."}
                    value={search}
                    onChange={(event) => search_state(event.target.value)}
                />
                <Search
                    strokeWidth={2.25}
                    size={16}
                    className={"absolute ml-2"}
                />
            </div>
            <div className={"space-x-2"}>
                <SheetFilters
                    atom_filters={branchesFilters}
                    pathname={PathnameFiltersSchema.parse(pathname_split[1])}
                />
                <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => push(text_route ?? "/")}
                    hidden={hidden_button_create}
                >
                    <Plus strokeWidth={2.25} className={"ml-[-6px]"} />
                    <span>{text_button ?? "sin titulo"}</span>
                </Button>
            </div>
        </nav>
    )
}

export default HeaderIndex;