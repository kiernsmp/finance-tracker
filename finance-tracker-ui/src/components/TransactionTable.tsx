import type { Transaction } from "../types/Transaction";

interface TransactionTableProps {
    transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
    const aud = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
    });
    return (
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
                    <td>{new Date(transaction.date).toLocaleDateString('en-GB', { 
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit' 
                    })}
                    </td>
                    <td>{transaction.description}</td>
                    <td>{aud.format(transaction.amount)}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.notes}</td>
                </tr>
            ))}
        </tbody>
    </table>
    )
}