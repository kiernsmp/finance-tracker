import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionApi";
import type { Transaction } from "../types/Transaction";
import { getAllCategories } from "../api/categoryApi";
import { updateKeywordCategory } from "../api/keywordsApi";
import type { CategoryOption } from "../types/CategoryOption";

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [appliedCategoryId, setAppliedCategoryId] = useState<number | undefined>(undefined);
    const [categoryList, setCategoryList] = useState<CategoryOption[]>([]);
    const [appliedStartDate, setAppliedStartDate] = useState("");
    const [appliedEndDate, setAppliedEndDate] = useState("");
    const [totalIn, setTotalIn] = useState(0);
    const [totalOut, setTotalOut] = useState(0);
    
    function applyFilters(nextCategoryId?: number): void {
        setAppliedStartDate(startDate);
        setAppliedEndDate(endDate);
        setAppliedCategoryId(nextCategoryId ?? categoryId);
    }

    async function updateCategory(transactionId: number, categoryId: number): Promise<void> {
        const selectedCategory = categoryList.find((category) => category.id === categoryId);
        if (!selectedCategory) return;

        const target = transactions.find((transaction) => transaction.id === transactionId);
        if (!target) return;
    
        try {
            await updateKeywordCategory(target.description, selectedCategory.id);
            
            const filter = {
                startDate: appliedStartDate || undefined,
                endDate: appliedEndDate || undefined,
                categoryId: appliedCategoryId
            };
            const data = await getTransactions(filter);
            setTransactions(data);

        } catch (error) {
            console.error(error);
        }

    }
    
    useEffect(() => {
        const filter = {
            startDate: appliedStartDate || undefined,
            endDate: appliedEndDate || undefined,
            categoryId: appliedCategoryId
        };
        
        getTransactions(filter)
        .then((data) => setTransactions(data))
        .catch((error) => console.error(error));
    }, [appliedStartDate, appliedEndDate, appliedCategoryId]);
    
    useEffect(() => {
        getAllCategories()
        .then((data) => setCategoryList(data))
        .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const totalOut = transactions.reduce((sum, transaction) =>
            transaction.amount < 0 ? sum + transaction.amount : sum, 0);
        
        const totalIn = transactions.reduce((sum, transaction) =>
            transaction.amount > 0 ? sum + transaction.amount : sum, 0);

        setTotalIn(totalIn);
        setTotalOut(totalOut);

    }, [transactions])

    return {
        transactions,
        startDate,
        endDate,
        categoryId,
        setStartDate,
        setEndDate,
        setCategoryId,
        applyFilters,
        categoryList,
        updateCategory,
        totalIn,
        totalOut
    };
}