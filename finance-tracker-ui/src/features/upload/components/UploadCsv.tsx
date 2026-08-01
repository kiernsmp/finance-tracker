import "./UploadCsv.css";
import { useUploadCsv } from "../hooks/useUploadCsv";

export default function UploadCsv() {
    const {
        isUploading,
        isDragActive,
        handleUpload,
        handleDrop,
        handleDragOver,
        handleDragLeave,
    } = useUploadCsv();

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
