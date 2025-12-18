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
        <Tabs value={activeTab} onChange={handleTabChange}> 

            <Tabs.List>
                <Tabs.Tab value = "plays"> 
                    History
                </Tabs.Tab>
                <Tabs.Tab value = "analytics">
                    Analytics
                </Tabs.Tab>
            </Tabs.List>



            <Tabs.Panel value = "plays">
                <PlaysHistory
                    responseData={data}
                />
            </Tabs.Panel>

            <Tabs.Panel value = 'analytics'>
                <AnalyticsPage
                    responseData={data}
                    currentTab={activeTab}
                />
            </Tabs.Panel>
        </Tabs>
    )
}