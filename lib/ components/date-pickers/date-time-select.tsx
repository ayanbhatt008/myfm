import { DateTimePicker } from "@mantine/dates";
import { stringFromBase64URL } from "@supabase/ssr";
import { useEffect, useState } from "react";

interface useStateProps {
    
    setRange: React.Dispatch<React.SetStateAction<[string, string]>>,
}

export default function DateTimeRange({setRange} : useStateProps) {
    const [value, setValue] = useState<any>(null);

    

    useEffect(() => {
        
        console.log(value);

        
        
        
        
    }, [value]);

    return (
        <div className="bg-white text-black"> 
            <DateTimePicker
                label="Pick Date & Time"
                placeholder="Pick Date & Time"
                value={value}
                onChange={setValue}
                timePickerProps={{
                    withDropdown: true,
                    popoverProps: { withinPortal: false },
                    format: '12h',
                }}
            />
        </div>
    )
}


function parseDateStringsToLocal(dates : (string | null)[]): (string | null)[]{
    
    const dateRanges = dates.map((val, index) => {

        if (!val)
            return null;
        const [YY, MM, DD] = val.split("-").map(Number);

        return new Date(YY, MM-1, DD + index).toISOString();

    })

    return dateRanges;
}