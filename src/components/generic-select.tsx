"use client"
import {FunctionComponent} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Label} from "@/components/ui/label";

type DataContent = {
    title_content: string;
    content: {
        key: string;
        value: string;
    }[];
}

interface SelectProps {
    title: string;
    data: DataContent[];
}

const GenericSelect:FunctionComponent<SelectProps> = ({title, data}) => {
    return (
        <div className={"flex flex-col gap-3 w-full"}>
            <Label htmlFor="date" className="px-1">
                {title ?? "Date of birth"}
            </Label>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={title} />
                </SelectTrigger>
                <SelectContent>
                    {data.map(({title_content, content}, index) => (
                        <SelectGroup key={`${title}-${index}-item`}>
                            <SelectLabel>
                                {title_content}
                            </SelectLabel>
                            {content.map(({key, value}, index) => (
                                <SelectItem
                                    key={`${key}-${value}-${index}-item`}
                                    value={value}
                                >
                                    {key}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default GenericSelect;