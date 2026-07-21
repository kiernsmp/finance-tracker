import axios from "axios";
import type { CategoryOption } from "../types/CategoryOption";

const API_URL = "http://localhost:8080/categories";
const GET_ALL_URL = "/all";



export async function getAllCategories(): Promise<CategoryOption[]> {
    
    const response = await axios.get<CategoryOption[]>(API_URL + GET_ALL_URL);

    return response.data;
}
