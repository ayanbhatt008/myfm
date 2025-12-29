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
            <Tabs defaultValue="single" className="w-full">
                <Tabs.List className="border-b border-[#76BED0]/20 mb-6">
                    <Tabs.Tab 
                        value="single"
                        styles={{
                            tab: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontWeight: 500,
                                padding: '0.75rem 1.5rem',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    color: 'rgba(255, 255, 255, 1)',
                                },
                                '&[dataActive]': {
                                    color: '#76BED0',
                                    borderColor: '#76BED0',
                                }
                            }
                        }}
                    >
                        Single Date
                    </Tabs.Tab>
                    <Tabs.Tab 
                        value="range"
                        styles={{
                            tab: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontWeight: 500,
                                padding: '0.75rem 1.5rem',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    color: 'rgba(255, 255, 255, 1)',
                                },
                                '&[data-active]': {
                                    color: '#76BED0',
                                    borderColor: '#76BED0',
                                }
                            }
                        }}
                    >
                        Range
                    </Tabs.Tab>
                </Tabs.List>



                <Tabs.Panel value="single" className="pt-4">
                    <SingleDate
                        setRange={setRange}
                        minDate={minDate}
                        maxDate={maxDate}
                    /> 
                </Tabs.Panel>
                <Tabs.Panel value="range" className="pt-4">
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