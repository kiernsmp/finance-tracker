export interface TransactionFilter {
    startDate?: string;
    endDate?: string;
    categoryId?: number;
    keyword?: string;
    includeHidden: boolean;
    groupTransactions: boolean;
    approved?: boolean | null;
}
