import { getMonthlySummary, updateDashboardCategoryNote } from "@/api/dashboardApi";
import type { MonthlySummary } from "@/types/MonthlySummary";
import { useCallback, useEffect, useState } from "react";

export function useMonthlySummary() {
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);

    const refreshDashboardSummary = useCallback(async (): Promise<void> => {
        try {
            const data = await getMonthlySummary();
            setMonthlySummary(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        void refreshDashboardSummary();
    }, [refreshDashboardSummary]);

    const updateDashboardCategoryNotes = useCallback(
        async (month: string, categoryId: number, note: string): Promise<void> => {
            await updateDashboardCategoryNote(month, categoryId, note);

            setMonthlySummary((current) => {
                if (!current) {
                    return current;
                }

                return {
                    ...current,
                    months: current.months.map((monthSummary) => {
                        if (monthSummary.monthYear !== month) {
                            return monthSummary;
                        }

                        return {
                            ...monthSummary,
                            categories: monthSummary.categories.map((category) =>
                                category.categoryId === categoryId
                                    ? { ...category, note }
                                    : category
                            )
                        };
                    })
                };
            });
        },
        []
    );

    return { monthlySummary, refreshDashboardSummary, updateDashboardCategoryNotes };
}