export interface UploadResponse {
    transactionsFound: string;
    duplicatesFound: string;
    newTransactions: string;
    transactionsSaved: string;
    error?: string | null;
}