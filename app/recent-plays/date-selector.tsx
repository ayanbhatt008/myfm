import DateRange from "@/lib/ components/date-pickers/date-range";
import SingleDate from "@/lib/ components/date-pickers/single-date-select";
import { Tabs } from "@mantine/core";

interface Props {
    
    setRange: React.Dispatch<React.SetStateAction<[string, string]>>,
    minDate: string | Date,
    maxDate: string | Date,
}

export default function DateSelector({setRange, minDate, maxDate} : Props) {
    return (
        <div> 
            <Tabs defaultValue = "single">
                <Tabs.List>
                    <Tabs.Tab value = "single">
                        Single Date
                    </Tabs.Tab>
                    <Tabs.Tab value = "range">
                        Range
                    </Tabs.Tab>
                </Tabs.List>



                <Tabs.Panel value = "single">
                    <SingleDate
                        setRange={setRange}
                        minDate={minDate}
                        maxDate={maxDate}
                    /> 
                </Tabs.Panel>
                <Tabs.Panel value = "range">
                    <DateRange 
                        setRange={setRange}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}