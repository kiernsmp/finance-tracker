import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionApi";
import type { Transaction } from "../types/Transaction";

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const [appliedStartDate, setAppliedStartDate] = useState("");
    const [appliedEndDate, setAppliedEndDate] = useState("");
    
    function applyFilters() {
        setAppliedStartDate(startDate);
        setAppliedEndDate(endDate);
    }
    
    useEffect(() => {
        const filter = {
            startDate: appliedStartDate || undefined,
            endDate: appliedEndDate || undefined
        };
        
        getTransactions(filter)
        .then((data) => setTransactions(data))
        .catch((error) => console.error(error));
    }, [appliedStartDate, appliedEndDate]);
    
    return {
        transactions,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        applyFilters
    };
}