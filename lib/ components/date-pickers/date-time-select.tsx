import { DateTimePicker } from "@mantine/dates";
import { stringFromBase64URL } from "@supabase/ssr";
import { useEffect, useState } from "react";


const INVALID_STRING = 'INVALID_TIME';
interface useStateProps {
    
    setRange: React.Dispatch<React.SetStateAction<[string, string]>>,
}

export default function DateTimeRange({setRange} : useStateProps) {
    const [startTime, setStartTime] = useState<string | null>(null);

    

    useEffect(() => {
        if (!startTime)
            return;
        const startISO : string = parseDateString(startTime);

        if (startISO === INVALID_STRING)
            return;

        console.log(parseDateString(startTime));

        
        
        
        
    }, [startTime]);

    return (
        <div className="bg-white text-black"> 
            <DateTimePicker
                label="Pick Date & Time"
                placeholder="Pick Date & Time"
                value={startTime}
                onChange={setStartTime}
                timePickerProps={{
                    withDropdown: true,
                    popoverProps: { withinPortal: false },
                    format: '12h',
                }}
            />
        </div>
    )
}


function parseDateString(data : string): string
{
    const [date , time]  = data.split(" ");
    
    if (time === '00:00:00')
        return INVALID_STRING;

    //const [YY, MM, DD] 

    return time;
}