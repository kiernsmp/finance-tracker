import { useState } from "react";
import { uploadCsv } from "../api/transactionApi";

export default function UploadCsv() {
    const [isUploading, setIsUploading] = useState(false);

    async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setIsUploading(true);

        try {
            await uploadCsv(file);
        } finally {
            setIsUploading(false);
            
        }
    }

    return (
        <label>
            Upload CSV
            <input type="file" accept=".csv" onChange={handleUpload} disabled={isUploading} />
        </label>
    );
}
