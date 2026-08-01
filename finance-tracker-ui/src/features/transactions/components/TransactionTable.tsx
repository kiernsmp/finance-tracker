import { Fragment, useState } from "react";
import type { Transaction } from "@/types/Transaction";
import type { CategoryOption } from "@/types/CategoryOption";
import TransactionCategoryCell from "./TransactionCategoryCell";
import { formatAuditorAmount, formatTransactionDate } from "@/utils/formatters";
import type { GroupedTransaction } from "@/features/transactions/utils/groupTransactions";

interface TransactionTableProps {
    transactions: Transaction[];
    categoryList: CategoryOption[];
    updateTransactionCategory: (transaction: Transaction, categoryId: number) => void;
    onApproveTransaction: (id: number, approved: boolean) => void;
    onLockTransaction: (id: number, locked: boolean) => void;
    groupTransactions: (transactions: Transaction[]) => GroupedTransaction[];
    groupTransactionsFlag: boolean;
}

export default function TransactionTable({
    transactions,
    categoryList,
    updateTransactionCategory,
    onApproveTransaction,
    onLockTransaction,
    groupTransactionsFlag,
    groupTransactions
}: TransactionTableProps) {
    const getMonthLabel = (date: string) => {
        const parsedDate = new Date(date);
        return parsedDate.toLocaleDateString("en-AU", {
            month: "long",
            year: "numeric"
        });
    };

    type DisplayTransaction = Transaction | GroupedTransaction;

    const [expandedGroupIds, setExpandedGroupIds] = useState<number[]>([]);

    const displayedTransactions: DisplayTransaction[] =
        groupTransactionsFlag
            ? groupTransactions(transactions)
            : transactions;

    const isGroupedTransaction = (
        value: DisplayTransaction
    ): value is GroupedTransaction =>
        "groupedTransactions" in value && value.transactionCount !== 1;

    const toggleGroupExpansion = (transaction: DisplayTransaction) => {
        if (!isGroupedTransaction(transaction)) {
            return;
        }

        setExpandedGroupIds((previous) =>
            previous.includes(transaction.id)
                ? previous.filter((id) => id !== transaction.id)
                : [...previous, transaction.id]
        );
    };

    const truncate = (text: string, length: number) =>
        text.length > length ? `${text.slice(0, length)}...` : text;

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
                    {displayedTransactions.map((transaction, index) => {
                        const previousTransaction = displayedTransactions[index - 1];
                        const showMonthDivider =
                            index === 0 ||
                            getMonthLabel(transaction.date) !== getMonthLabel(previousTransaction?.date ?? "");
                        const isGrouped = isGroupedTransaction(transaction);
                        const isExpanded = isGrouped && expandedGroupIds.includes(transaction.id);

                        return (
                            <Fragment key={isGrouped ? `group-${transaction.id}` : transaction.id}>
                                {showMonthDivider && (
                                    <tr className="month-divider-row">
                                        <td colSpan={7}>
                                            <span className="month-divider-label">{getMonthLabel(transaction.date)}</span>
                                        </td>
                                    </tr>
                                )}
                                <tr
                                    className={isGrouped ? "grouped-transaction-row" : undefined}
                                    onClick={() => toggleGroupExpansion(transaction)}
                                    style={{ cursor: isGrouped ? "pointer" : undefined }}
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
                                    <td>{isGroupedTransaction(transaction) ? `${truncate(transaction.description, 30)} (${transaction.transactionCount})` : truncate(transaction.description, 30)}</td>
                                    <td>{formatAuditorAmount(transaction.amount)}</td>
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
                                {isGrouped && isExpanded &&
                                    transaction.groupedTransactions.map((childTransaction) => (
                                        <tr
                                            key={`child-${childTransaction.id}`}
                                            className="grouped-transaction-child-row"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <td />
                                            <td>{formatTransactionDate(childTransaction.date)}</td>
                                            <td>{childTransaction.description}</td>
                                            <td>{formatAuditorAmount(childTransaction.amount)}</td>
                                            <td>
                                                <TransactionCategoryCell
                                                    categoryList={categoryList}
                                                    currentCategoryId={childTransaction.category?.id}
                                                    onChange={(categoryId) => updateTransactionCategory(childTransaction, categoryId)}
                                                />
                                            </td>
                                            <td />
                                            <td className="transaction-notes-cell">{childTransaction.notes}</td>
                                        </tr>
                                    ))}
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}