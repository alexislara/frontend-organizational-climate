import {SidebarTrigger} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {BellRing, ChevronLeft} from "lucide-react";
import {FunctionComponent} from "react";
import {useRouter} from "next/navigation";

interface NavBarProps {
    pathname: string[];
}

const NavBar:FunctionComponent<NavBarProps> = ({pathname}) => {
    const {back} = useRouter()

    return (
        <nav className="flex justify-between items-center border-b w-full px-2 p-3 dark:bg-transparent">
            <div className="flex items-center">
                <div className="border-r mr-2">
                    {pathname.length <= 2 && (
                        <SidebarTrigger className={"mr-1 hover:bg-accent/20"}/>
                    )}
                    {pathname.length > 2 && (
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            className={"h-7 w-7 mr-2"}
                            onClick={() => back()}
                        >
                            <ChevronLeft />
                        </Button>
                    )}
                </div>
                <span className={"font-bold capitalize"}>
                    {pathname[1] ? pathname[1] : "dashboard"}
                </span>
            </div>
        </nav>
    );
};

export default NavBar;