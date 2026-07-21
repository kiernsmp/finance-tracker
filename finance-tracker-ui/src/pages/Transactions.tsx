import { useEffect, useState } from "react";
import type { Transaction } from "../types/Transaction";
import { getTransactions } from "../api/transactionApi";

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        getTransactions()
            .then((data) => setTransactions(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Transactions</h1>

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
                            <td>{transaction.date}</td>
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