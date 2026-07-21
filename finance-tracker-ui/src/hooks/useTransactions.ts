import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionApi";
import type { Transaction } from "../types/Transaction";
import { getAllCategories } from "../api/categoryApi";
import type { CategoryOption } from "../types/CategoryOption";

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categoryList, setCategoryList] = useState<CategoryOption[]>([]);
    
    const [appliedStartDate, setAppliedStartDate] = useState("");
    const [appliedEndDate, setAppliedEndDate] = useState("");
    
    function applyFilters() {
        setAppliedStartDate(startDate);
        setAppliedEndDate(endDate);
    }

    function updateCategory(transactionId: number, categoryId: number): void {
        const selectedCategory = categoryList.find(
            (category) => category.id === categoryId
        );

        if (!selectedCategory) {
            return;
        }

        setTransactions((previousTransactions) =>
            previousTransactions.map((transaction) => {
                if (transaction.id !== transactionId) {
                    return transaction;
                }

                if (transaction.category === selectedCategory.category) {
                    return transaction;
                }

                return {
                    ...transaction,
                    category: selectedCategory.category
                };
                
            })
        );
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
    
    useEffect(() => {
        getAllCategories()
        .then((data) => setCategoryList(data))
        .catch((error) => console.error(error));
    }, []);

    return {
        transactions,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        applyFilters,
        categoryList,
        updateCategory
    };
}