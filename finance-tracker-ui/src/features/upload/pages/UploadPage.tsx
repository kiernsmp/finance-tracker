import UploadCsv from "@/features/upload/components/UploadCsv";

export default function UploadPage() {
    const csvUploaded = ...

    return (
        <div className="upload-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Upload CSV</h1>
                </div>
            </div>

            <div className="upload-card">
                <UploadCsv />
            </div>
            {csvUploaded}
        </div>
    );
}

