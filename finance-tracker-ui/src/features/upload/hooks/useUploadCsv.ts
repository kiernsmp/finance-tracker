import { useCallback, useState, type ChangeEvent, type DragEvent } from "react";
import type { UploadResponse } from "@/types/UploadResponse";
import { uploadCsv } from "@/api/transactionApi";

export function useUploadCsv() {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);
    const [uploadResult, setUploadResult] = useState<UploadResponse | undefined>(undefined);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const uploadFile = useCallback(async (file: File | undefined) => {
        if (!file) {
            return;
        }

        setIsUploading(true);
        setUploadError(null);
        setUploadResult(undefined);

        try {
            const result = await uploadCsv(file);
            setUploadResult(result);
        } catch (error) {
            setUploadError(error instanceof Error ? error.message : "Upload failed.");
        } finally {
            setIsUploading(false);
        }
    }, []);

    const handleUpload = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        await uploadFile(file);
        event.target.value = "";
    }, [uploadFile]);

    const handleDrop = useCallback(async (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragActive(false);

        const file = event.dataTransfer.files?.[0];
        await uploadFile(file);
    }, [uploadFile]);

    const handleDragOver = useCallback((event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragActive(false);
    }, []);

    return {
        isUploading,
        isDragActive,
        uploadResult,
        uploadError,
        handleUpload,
        handleDrop,
        handleDragOver,
        handleDragLeave,
    };
}
