"use client"

import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {FunctionComponent, useState} from "react";

interface DatePickerProps {
    date?: Date
    setDate: (value: Date | undefined) => void
    title?:string;
    sub_title?:string;
}

const DatePicker:FunctionComponent<DatePickerProps> = ({date, setDate, title, sub_title}) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="date" className="px-1">
                {title ?? "Date of birth"}
            </Label>
            <Popover open={open} onOpenChange={setOpen} >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString() : sub_title ?? "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DatePicker;