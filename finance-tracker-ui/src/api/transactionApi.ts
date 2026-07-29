import axios from "axios";
import type { Transaction } from "@/types/Transaction";
import type { TransactionFilter } from "@/types/TransactionFilter";

const API_URL = "http://localhost:8080/transactions";
const GET_RECORD_URL = "/records";
const POST_CSV_URL = "/upload";
const PATCH_APPROVE = "/approve";
const PATCH_APPROVE_ALL = "/approve-all";
const PATCH_TRANSACTION = "/lock"


export async function getTransactions(filter: TransactionFilter): Promise<Transaction[]> {

    console.log("Transaction filter:", filter);
    console.log("startDate:", filter.startDate, "endDate:", filter.endDate, "categoryId:", filter.categoryId);
    
    const response = await axios.get(
        API_URL + GET_RECORD_URL,
    {
        params: filter
    });

    return response.data;
}

export async function uploadCsv(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(API_URL + POST_CSV_URL, formData);
}

export async function approveAllTransactions(): Promise<void> {
    await axios.patch(API_URL + PATCH_APPROVE_ALL);
}

export async function approveTransaction(id: number, approved: boolean): Promise<void> {
    console.log("API CALL: " + approved)
    await axios.patch(API_URL + "/" + id + PATCH_APPROVE,
        {
            approved
        }
    );
}

export async function lockTransaction(id: number, locked: boolean): Promise<void> {
    await axios.patch(API_URL + "/" + id + PATCH_TRANSACTION,
        {
            locked
        }
    );

}
