import axios from "axios";
import type { MonthlySummary } from "@/types/MonthlySummary";

const API_URL = "http://localhost:8080/dashboard";
const GET_DASHBOARD_SUMMARY_URL = "/summaries";

export async function getMonthlySummary(): Promise<MonthlySummary> {
    const response = await axios.get(API_URL + GET_DASHBOARD_SUMMARY_URL);

    return response.data;

}