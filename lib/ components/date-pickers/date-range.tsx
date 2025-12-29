import { DatePickerInput } from "@mantine/dates";
import { stringFromBase64URL } from "@supabase/ssr";
import { useEffect, useState } from "react";

interface Props {
    
    setRange: React.Dispatch<React.SetStateAction<[string, string]>>,
    maxDate: Date | string,
    minDate: Date | string, 
}

export default function DateRange({setRange, maxDate, minDate} : Props) {
    const [value, setValue] = useState<[string | null, string | null]>([null, null]);

    

    useEffect(() => {
        
        const r = parseDateStringsToLocal(value);

        if (r[0] && r[1])

            setRange([r[0], r[1]]);
        
        
        
    }, [value]);

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-[#76BED0]/20 rounded-xl p-4"> 
            <DatePickerInput
                type="range"
                label="Pick dates range"
                placeholder="Pick dates range"
                value={value}
                onChange={setValue}
                allowSingleDateInRange
                maxDate={maxDate}
                minDate={minDate}
                classNames={{
                    label: "text-white font-medium mb-2",
                    input: "bg-white/10 border-[#76BED0]/30 text-white placeholder-white/50 focus:border-[#76BED0]",
                    day: "text-white hover:bg-[#76BED0]/20",
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