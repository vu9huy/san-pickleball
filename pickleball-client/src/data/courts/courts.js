import courts from "./courts.json";
import { globalConfig } from "@/config/globalConfig";

// Chuyển thành custom hook để dùng useGetCourtsFetchingApi
export async function loadCourtDataset() {
    const response = await fetch(`${globalConfig.baseApiUrl}/courts?limit=8&page=1`, { cache: "force-cache" });
    const data = await response.json();
    const courts = data?.results;

    for (let i = 0; i < courts.length; i++) {
        (courts[i]).key = `court-${i}`;
    }
    delete data.results;
    return {
        courts: courts,
        ...data
    };
}

export function getCategories(courts) {
    if (!courts) return [];

    const countByCategory = {};
    for (const court of courts) {
        if (!countByCategory[court.category]) countByCategory[court.category] = 0;
        countByCategory[court.category]++;
    }

    return Object.entries(countByCategory).map(([key, value]) => {
        const label = key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        return {
            key: key,
            label,
            count: value
        };
    });
}

// export default courts;
