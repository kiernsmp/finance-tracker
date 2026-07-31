import UploadCsv from "@/features/upload/components/UploadCsv";

export default function UploadPage() {
    return (
        <div className="upload-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Upload CSV</h1>
                    <p className="page-subtitle">Import your transactions from a CSV file.</p>
                </div>
            </div>

            <div className="upload-card">
                <UploadCsv />
            </div>
        </div>
    );
}

