import { getMonthlySummary } from "@/api/dashboardApi";
import type { MonthlySummary } from "@/types/MonthlySummary";
import { useCallback, useEffect, useState } from "react";

export function useMonthlySummary() {
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);

    const refreshDasboardSummary = useCallback(async (): Promise<void> => {
        try {
            const data = await getMonthlySummary();
            setMonthlySummary(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        void refreshDasboardSummary();
    }, []);

    return { monthlySummary };

}