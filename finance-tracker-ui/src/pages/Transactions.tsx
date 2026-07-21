import { useEffect, useState } from "react";
import type { Transaction } from "../types/Transaction";
import { getTransactions } from "../api/transactionApi";
import DateFilter from "../components/DateFilter";

export default function Transactions() {
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

    return (
        <div>
            <h1>Transactions</h1>

            <DateFilter 
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                applyFilters={applyFilters}
            />

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Notes</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{new Date(transaction.date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )

}