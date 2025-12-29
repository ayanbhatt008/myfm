import { tracksOnDay } from "@/lib/types/r2_types";
import { Tabs } from "@mantine/core";
import PlaysHistory from "./play-history";
import { useState } from "react";
import AnalyticsPage from "./analytics-page";

interface Props {
    data: tracksOnDay[] | null;
}

export type possibleTabs = "plays" | "analytics"

export default function HistoryTabs({data} : Props) {
    const [activeTab, SetActiveTab] = useState<possibleTabs>("plays");


    function handleTabChange(newTab : string | null ) {
        if  (!newTab) 
            return;
        SetActiveTab(newTab as possibleTabs)
    }

    return (
        <Tabs value={activeTab} onChange={handleTabChange} className="w-full"> 

            <Tabs.List className="border-b border-[#76BED0]/20 mb-8">
                <Tabs.Tab 
                    value="plays"
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
                    History
                </Tabs.Tab>
                <Tabs.Tab 
                    value="analytics"
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
                    Analytics
                </Tabs.Tab>
            </Tabs.List>



            <Tabs.Panel value="plays" className="pt-4">
                <PlaysHistory
                    responseData={data}
                />
            </Tabs.Panel>

            <Tabs.Panel value="analytics" className="pt-4">
                <AnalyticsPage
                    responseData={data}
                    currentTab={activeTab}
                />
            </Tabs.Panel>
        </Tabs>
    )
}