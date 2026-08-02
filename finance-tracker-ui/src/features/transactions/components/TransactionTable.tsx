import { Fragment, useMemo, useState } from "react";
import type { Transaction } from "@/types/Transaction";
import type { CategoryOption } from "@/types/CategoryOption";
import type { GroupedTransaction } from "@/features/transactions/utils/groupTransactions";
import TransactionRow from "./TransactionRow";
import MonthDivider from "./MonthDivider";
import DayDivider from "./DayDivider";
import type { DisplayTransaction } from "@/types/DisplayTransaction";

interface TransactionTableProps {
    transactions: Transaction[];
    categoryList: CategoryOption[];
    updateTransactionCategory: (transaction: Transaction, categoryId: number) => void;
    onApproveTransaction: (id: number, approved: boolean) => void;
    onLockTransaction: (id: number, locked: boolean) => void;
    groupTransactions: (transactions: Transaction[]) => GroupedTransaction[];
    isGrouped: boolean
}

const TABLE_COLUMN_COUNT = 7;

const getMonthLabel = (date: string) => {
    const parsedDate = new Date(date);

    return parsedDate.toLocaleDateString("en-AU", {
        month: "long",
        year: "numeric"
    });
};

const isGroupedTransaction = (
    value: DisplayTransaction
): value is GroupedTransaction =>
    "groupedTransactions" in value && value.transactionCount !== 1;


export default function TransactionTable({
    transactions,
    categoryList,
    updateTransactionCategory,
    onApproveTransaction,
    onLockTransaction,
    groupTransactions,
    isGrouped,
}: TransactionTableProps) {
    const [expandedGroupIds, setExpandedGroupIds] = useState<number[]>([]);

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

    const displayedTransactions: DisplayTransaction[] =
        isGrouped
            ? groupTransactions(transactions)
            : transactions;

    const dailyNegativeTotals = useMemo(() => {
        const totals = new Map<string, number>();

        transactions.forEach((transaction) => {
            if (transaction.amount < 0) {
                totals.set(
                    transaction.date,
                    (totals.get(transaction.date) ?? 0) + transaction.amount
                );
            }
        });

        return totals;
    }, [transactions]);

    const getDescription = (transaction: DisplayTransaction) => {
            if (isGroupedTransaction(transaction)) {
                return `${transaction.description} (${transaction.transactionCount})`;
            }
            return transaction.description;
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
                    { displayedTransactions.map((transaction, index) => {

                        const previousTransaction = displayedTransactions[index - 1];
                        const monthLabel = getMonthLabel(transaction.date);
                        const showMonthDivider =
                            index === 0 ||
                            monthLabel !== getMonthLabel(previousTransaction?.date ?? "");
                        const showDayDivider =
                            index === 0 ||
                            transaction.date !== (previousTransaction?.date ?? "");
                        const dayTotal = dailyNegativeTotals.get(transaction.date) ?? 0;

                        return (
                            <Fragment key={isGrouped ? `group-${transaction.id}` : transaction.id}>
                                {showMonthDivider && (
                                    <MonthDivider
                                        label={monthLabel}
                                        columnCount={TABLE_COLUMN_COUNT}
                                    />
                                )}

                                {showDayDivider && (
                                    <DayDivider
                                        label={monthLabel}
                                        columnCount={TABLE_COLUMN_COUNT}
                                        dayTotal={dayTotal}
                                    />
                                )}
                                    
                                <TransactionRow
                                    transaction={transaction}
                                    getDescription={getDescription}
                                    categoryList={categoryList}
                                    updateTransactionCategory={updateTransactionCategory}
                                    onApproveTransaction={onApproveTransaction}
                                    onLockTransaction={onLockTransaction}
                                    onClick={isGroupedTransaction(transaction)
                                            ? () => toggleGroupExpansion(transaction)
                                            : undefined
                                    }
                                />

                                {isGroupedTransaction(transaction) &&
                                expandedGroupIds.includes(transaction.id) &&
                                transaction.groupedTransactions.map((childTransaction) => (
                                    <TransactionRow
                                        key={`child-${childTransaction.id}`}
                                        transaction={childTransaction}
                                        getDescription={getDescription}
                                        categoryList={categoryList}
                                        updateTransactionCategory={updateTransactionCategory}
                                        onApproveTransaction={onApproveTransaction}
                                        onLockTransaction={onLockTransaction}
                                    />
                                ))}
                            </Fragment>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}