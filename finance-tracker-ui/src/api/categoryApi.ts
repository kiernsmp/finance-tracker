import axios from "axios";
import type { CategoryOption } from "../types/CategoryOption";

const API_URL = "http://localhost:8080/categories";
const GET_ALL_URL = "/all";
const POST_UPDATE_KEYWORD_URL = "/add"

export async function getAllCategories(): Promise<CategoryOption[]> {
    const response = await axios.get<CategoryOption[]>(API_URL + GET_ALL_URL);
    
    return response.data;
}

export async function updateKeywordCategory(keyword: string, categoryId: int): Promise<void> {
    const formData = new FormData();

    await axios.post(API_URL + POST_UPDATE_KEYWORD_URL, formData);
}