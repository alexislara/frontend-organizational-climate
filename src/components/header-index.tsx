"use client"
import {Input} from "@/components/ui/input";
import {Plus, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {FunctionComponent} from "react";

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
            <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => push(text_route ?? "/")}
            >
                <Plus strokeWidth={2.25} className={"ml-[-6px]"} />
                <span>{text_button ?? "sin titulo"}</span>
            </Button>
        </nav>
    )
}

export default HeaderIndex;