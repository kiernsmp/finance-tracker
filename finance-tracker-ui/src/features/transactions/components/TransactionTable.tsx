import type { Transaction } from "@/types/Transaction";
import type { CategoryOption } from "@/types/CategoryOption";
import TransactionCategoryCell from "./TransactionCategoryCell";
import { formatAuditorAmount, formatTransactionDate } from "./formatters";


interface TransactionTableProps {
    transactions: Transaction[];
    categoryList: CategoryOption[];
    updateTransactionCategory: (transactionId: number, categoryId: number) => void;
    onApproveTransaction: (id: number, approved: boolean) => void;
}

export default function TransactionTable({
    transactions,
    categoryList,
    updateTransactionCategory,
    onApproveTransaction
}: TransactionTableProps) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Approved</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Notes</th>
                </tr>
            </thead>

            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>
                            <input 
                                type="checkbox"
                                checked={transaction.approved}
                                onChange={(e) => {
                                        console.log(e.target.checked)
                                        onApproveTransaction(transaction.id, e.target.checked)
                                    }
                                }
                            />
                        </td>
                        <td>{formatTransactionDate(transaction.date)}</td>
                        <td>{transaction.description}</td>
                        <td>{formatAuditorAmount(transaction.amount)}</td>
                        <td>
                            <TransactionCategoryCell
                                categoryList={categoryList}
                                currentCategory={transaction.category}
                                onChange={(categoryId) => updateTransactionCategory(transaction.id, categoryId)}
                            />
                        </td>
                        <td>{transaction.notes}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}