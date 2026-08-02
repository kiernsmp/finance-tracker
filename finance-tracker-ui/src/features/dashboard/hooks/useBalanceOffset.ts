import { getBalanceOffset } from "@/api/dashboardApi";
import type { BalanceOffsetResponse } from "@/types/BalanceOffsetResponse";
import { useEffect, useState } from "react";

export function useBalanceOffset() {
    const [balanceOffset, setBalanceOffset] = useState<BalanceOffsetResponse | null>(null);

    useEffect(() => {
        const fetchBalanceOffset = async () => {
            try {
                const data = await getBalanceOffset(1);
                setBalanceOffset(data);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchBalanceOffset();
    }, []);

    return { balanceOffset };
}