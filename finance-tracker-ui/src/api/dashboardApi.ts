import axios from "axios";
import type { MonthlySummary } from "@/types/MonthlySummary";
import type { BalanceOffsetResponse } from "@/types/BalanceOffsetResponse";

const API_URL = "http://localhost:8080/dashboard";
const GET_DASHBOARD_SUMMARY_URL = "/summaries";
const NET_BALANCE = "/net-balance";

export async function getMonthlySummary(): Promise<MonthlySummary> {
    const response = await axios.get(API_URL + GET_DASHBOARD_SUMMARY_URL);

    return response.data;
}

export async function getBalanceOffset(user_id: number): Promise<BalanceOffsetResponse> {
    const response = await axios.get(API_URL + "/" + user_id + NET_BALANCE);

    return response.data;
}