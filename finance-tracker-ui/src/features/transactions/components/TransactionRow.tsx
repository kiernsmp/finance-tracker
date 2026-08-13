import type { CategoryOption } from "@/types/CategoryOption";
import type { Transaction } from "@/types/Transaction";
import { formatAuditorAmountWithSigns, formatTransactionDate } from "@/utils/formatters";
import TransactionCategoryCell from "./TransactionCategoryCell";
import type { DisplayTransaction } from "@/types/DisplayTransaction";
import NotesCell from "@/components/NotesCell";

interface TransactionRowProps {
    transaction: DisplayTransaction;
    getDescription: (transaction: DisplayTransaction) => string;
    categoryList: CategoryOption[]
    onApproveTransaction: (id: number, approved: boolean) => void;
    onLockTransaction: (id: number, locked: boolean) => void;
    updateTransactionCategory: (transaction: Transaction, categoryId: number) => void;
    onClick?: () => void;
    className?: string;
    updateTransactionNotes: (id: number, note: string) => void;
    showMetaNotes: boolean;
}

export default function TransactionRow({
    transaction,
    getDescription,
    categoryList,
    updateTransactionCategory,
    onApproveTransaction,
    onLockTransaction,
    onClick,
    className,
    updateTransactionNotes,
    showMetaNotes,
}: TransactionRowProps) {

    return (
        <tr
            className={className}
            onClick={onClick}
            style={{ cursor: onClick ? "pointer" : undefined }}
        >
            <td onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={transaction.approved}
                    onChange={(e) => {
                        onApproveTransaction(transaction.id, e.target.checked);
                    }}
                />
            </td>
            <td>{formatTransactionDate(transaction.date)}</td>
            <td>
                <div className="transaction-description-cell">
                    {getDescription(transaction)}
                </div>
            </td>
            <td>{formatAuditorAmountWithSigns(transaction.amount)}</td>
            <td onClick={(e) => e.stopPropagation()}>
                <TransactionCategoryCell
                    categoryList={categoryList}
                    currentCategoryId={transaction.category?.id}
                    onChange={(categoryId) => updateTransactionCategory(transaction, categoryId)}
                />
            </td>
            <td onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={transaction.locked}
                    onChange={(e) => onLockTransaction(transaction.id, e.target.checked)}
                />
            </td>
            <td onClick={(e) => e.stopPropagation()}>
                <NotesCell
                    value={transaction.notes ?? ""}
                    onSave={(note) => {
                        updateTransactionNotes(transaction.id, note);
                    }}
                />
            </td>
            {showMetaNotes && (
                <td className="transactions-notes-cell">
                    <div className="transaction-notes-cell">
                        {transaction.metaNotes ?? ""}
                    </div>
                </td>
            )}
        </tr>
    )
}
