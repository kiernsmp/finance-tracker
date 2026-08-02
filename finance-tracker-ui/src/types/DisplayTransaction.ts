import type { Transaction } from "@/types/Transaction";
import type { GroupedTransaction } from "@/features/transactions/utils/groupTransactions";

export type DisplayTransaction = Transaction | GroupedTransaction;