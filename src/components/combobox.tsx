"use client"
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import {FunctionComponent, useState} from "react";
import { Button } from "./ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {PopoverContent} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "./ui/command";
import {cn} from "@/lib/utils";

export interface ItemCombobox {
    label: string;
    value: string;
}

interface ComboboxProps {
    data: ItemCombobox[];
    data_selected: string;
    setData: (data: string) => void;
    search?: string;
    setSearch?: (search: string) => void;
}

const Combobox: FunctionComponent<ComboboxProps> = ({data, setData, data_selected, search, setSearch}) => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {data_selected
                        ? data.find((data_combobox) => data_combobox.value === data_selected)?.label
                        : "Select framework..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px] p-0" align={"start"}>
                <Command shouldFilter={false}>
                    <CommandInput placeholder="Buscar..." className="h-9" value={search} onValueChange={setSearch}/>
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((data_combobox) => (
                                <CommandItem
                                    key={data_combobox.value}
                                    value={data_combobox.value}
                                    onSelect={(currentValue) => {
                                        setData(currentValue === data_selected ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {data_combobox.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            data_selected === data_combobox.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Combobox;