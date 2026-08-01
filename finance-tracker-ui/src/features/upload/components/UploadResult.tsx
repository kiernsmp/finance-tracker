import type { UploadResponse } from "@/types/UploadResponse";

interface UploadResultProps {
    result?: UploadResponse;
    error?: string;
}

export default function UploadResult({ result, error }: UploadResultProps) {
    if (!error && !result) {
        return null;
    }

    return (
        <div className={`upload-csv-result${error ? " error" : " success"}`} role="status" aria-live="polite">
            <span className="upload-csv-result-title">
                {error ? "Upload failed" : "Upload complete"}
            </span>

            {error ? (
                <span className="upload-csv-result-message">{error}</span>
            ) : (
                <span className="upload-csv-result-message">
                    {result?.transactionsFound} transactions found.{"\n"}
                    <br />
                    {result?.duplicatesFound} duplicates skipped.{"\n"}
                    <br />
                    {result?.transactionsSaved} saved.
                </span>
            )}
        </div>
    );
}