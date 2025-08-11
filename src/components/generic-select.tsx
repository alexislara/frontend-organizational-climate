"use client"

import { FunctionComponent } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type DataContent = {
    title_content: string
    content: {
        key: string
        value: string
    }[]
}

interface SelectProps {
    title: string
    data: DataContent[]
    value?: string
    defaultValue?: string
    onValueChange: (value?: string) => void
}

const GenericSelect: FunctionComponent<SelectProps> = ({
   title,
   data,
   value,
   defaultValue,
   onValueChange
}) => {
    return (
        <div className="flex flex-col gap-3">
            <Label className="px-1">
                {title ?? "None name"}
            </Label>
            <Select
                value={value}
                defaultValue={defaultValue}
                onValueChange={onValueChange}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={title} />
                </SelectTrigger>
                <SelectContent>
                    {data.map(({ title_content, content }, index) => (
                        <SelectGroup key={`${title}-${index}-item`}>
                            <SelectLabel>{title_content}</SelectLabel>
                            {content.map(({ key, value }, index) => (
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

export default GenericSelect
