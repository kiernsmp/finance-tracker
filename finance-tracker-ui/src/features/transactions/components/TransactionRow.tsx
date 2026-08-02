import type { CategoryOption } from "@/types/CategoryOption";
import type { Transaction } from "@/types/Transaction";
import { formatAuditorAmountWithSigns, formatTransactionDate } from "@/utils/formatters";
import TransactionCategoryCell from "./TransactionCategoryCell";
import type { DisplayTransaction } from "@/types/DisplayTransaction";

interface TransactionRowProps {
    transaction: DisplayTransaction;
    getDescription: (transaction: DisplayTransaction) => string;
    categoryList: CategoryOption[]
    onApproveTransaction: (id: number, approved: boolean) => void;
    onLockTransaction: (id: number, locked: boolean) => void;
    updateTransactionCategory: (transaction: Transaction, categoryId: number) => void;
    onClick?: () => void;
    className?: string;
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
            <td>{getDescription(transaction)}</td>
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
            <td className="transaction-notes-cell">{transaction.notes}</td>
        </tr>
    )
}