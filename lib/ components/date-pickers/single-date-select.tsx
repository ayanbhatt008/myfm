import { DatePickerInput } from "@mantine/dates";
import { stringFromBase64URL } from "@supabase/ssr";
import { useEffect, useState } from "react";

interface useStateProps {
    
    setRange: React.Dispatch<React.SetStateAction<[string, string]>>,
}

export default function SingleDate({setRange} : useStateProps) {
    const [value, setValue] = useState<string | null>(null);

    

    useEffect(() => {
        if (!value)
            return
        setRange(parseDateStrings(value))
        
        
        
    }, [value]);

    return (
        <div className="bg-white text-black"> 
            <DatePickerInput
                label="Pick date"
                placeholder="Pick date"
                value={value}
                onChange={setValue}
            />
        </div>
    )
}


function parseDateStrings(date : string): [string, string]{
    let dateRanges : [string, string] = ["",""];
    const day_indexes = date.split("-").map(Number);


    const d : Date = new Date(day_indexes[0], day_indexes[1]-1, day_indexes[2]);    
    dateRanges[0] = d.toISOString();

    d.setDate(d.getDate() + 1);
    dateRanges[1] = d.toISOString();
    return dateRanges;
}