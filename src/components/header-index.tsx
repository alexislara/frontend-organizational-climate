"use client"
import {Input} from "@/components/ui/input";
import {Plus, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {FunctionComponent, useEffect, useMemo} from "react";
import {useAtom} from "jotai/index";
import {open_filters} from "@/global-atoms";

interface HeaderProps {
    text_button: string;
    text_route: string;
    search: string;
    search_state: (value:string) => void;
}

const HeaderIndex:FunctionComponent<HeaderProps> = ({
    text_button,
    text_route,
    search,
    search_state,
}: HeaderProps) => {
    const {push} = useRouter()
    const [openFilter, setOpenFilter] = useAtom(open_filters)
    const pathname = usePathname();
    

    return (
        <nav className={"flex items-center bg-card border rounded-[10px] p-2 justify-between"}>
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
                <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => setOpenFilter(!openFilter)}
                >
                    <Plus strokeWidth={2.25} className={"ml-[-6px]"} />
                    <span>Filtros</span>
                </Button>
                <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => push(text_route ?? "/")}
                >
                    <Plus strokeWidth={2.25} className={"ml-[-6px]"} />
                    <span>{text_button ?? "sin titulo"}</span>
                </Button>
            </div>
        </nav>
    )
}

export default HeaderIndex;