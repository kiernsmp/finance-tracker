import axios from "axios";
import type { Transaction } from "../types/Transaction";

const API_URL = "http://localhost:8080/transactions";
const GET_RECORD_URL = "/records";
const POST_CSV_URL = "/upload";

export async function getTransactions(): Promise<Transaction[]> {
    const response = await axios.get(API_URL + GET_RECORD_URL);

    return response.data;
}

export async function uploadCsv(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(API_URL + POST_CSV_URL, formData);
}