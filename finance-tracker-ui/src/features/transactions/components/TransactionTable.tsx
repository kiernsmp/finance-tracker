import type { Transaction } from "@/types/Transaction";
import type { CategoryOption } from "@/types/CategoryOption";
import TransactionCategoryCell from "./TransactionCategoryCell";
import { formatAuditorAmount, formatTransactionDate } from "@/utils/formatters";

interface TransactionTableProps {
    transactions: Transaction[];
    categoryList: CategoryOption[];
    updateTransactionCategory: (transaction: Transaction, categoryId: number) => void;
    onApproveTransaction: (id: number, approved: boolean) => void;
    onLockTransaction: (id: number, locked: boolean) => void;
}

export default function TransactionTable({
    transactions,
    categoryList,
    updateTransactionCategory,
    onApproveTransaction,
    onLockTransaction
}: TransactionTableProps) {
    const getMonthLabel = (date: string) => {
        const parsedDate = new Date(date);
        return parsedDate.toLocaleDateString("en-AU", {
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div className="transaction-table-wrapper">
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Approved</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Locked</th>
                        <th>Notes</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions
                    .map((transaction, index) => {
                        const previousTransaction = transactions[index - 1];
                        const showMonthDivider = index === 0 || getMonthLabel(transaction.date) !== getMonthLabel(previousTransaction.date);

                        return (
                            <>
                                {showMonthDivider && (
                                    <tr className="month-divider-row" key={`month-${transaction.id}`}>
                                        <td colSpan={7}>
                                            <span className="month-divider-label">{getMonthLabel(transaction.date)}</span>
                                        </td>
                                    </tr>
                                )}
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
                                            currentCategoryId={transaction.category?.id}
                                            onChange={(categoryId) => updateTransactionCategory(transaction, categoryId)}
                                        />
                                    </td>
                                    <td>
                                        <input type="checkbox" 
                                            checked={transaction.locked}
                                            onChange={(e) => 
                                                onLockTransaction(transaction.id, e.target.checked)}
                                        />
                                    </td>
                                    <td className="transaction-notes-cell">{transaction.notes}</td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}