import { useState, type ChangeEvent, type DragEvent } from "react";
import { uploadCsv } from "@/api/transactionApi";
import "./UploadCsv.css";

export default function UploadCsv() {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);

    async function uploadFile(file: File | undefined) {
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

    async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        await uploadFile(file);
        event.target.value = "";
    }

    async function handleDrop(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault();
        setIsDragActive(false);

        const file = event.dataTransfer.files?.[0];
        await uploadFile(file);
    }

    function handleDragOver(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault();
        setIsDragActive(true);
    }

    function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault();
        setIsDragActive(false);
    }

    return (
        <label
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`upload-csv-dropzone${isDragActive ? " active" : ""}${isUploading ? " uploading" : ""}`}
        >
            <div className="upload-csv-section">
                <div className="upload-csv-icon">⬆</div>
                <div className="upload-csv-copy">
                    <span className="upload-csv-help">
                        {isDragActive
                            ? "Release to upload"
                            : "Drag and drop CSV to upload"}
                    </span>
                </div>
                <span className="upload-csv-action">
                    {isUploading ? "Uploading..." : isDragActive ? "Release to upload" : "Choose file"}
                </span>
            </div>
            <input
                id="csv-upload-input"
                type="file"
                accept=".csv"
                onChange={handleUpload}
                disabled={isUploading}
                className="upload-csv-input"
            />
            {isUploading ? <span className="upload-csv-status">Uploading...</span> : null}
        </label>
    );
}
