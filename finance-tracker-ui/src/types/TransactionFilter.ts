export interface TransactionFilter {
    startDate?: string;
    endDate?: string;
    categoryId?: number;
    approved?: boolean;
    keyword?: string;
    includeHidden: boolean;
    groupTransactions: boolean;
}
