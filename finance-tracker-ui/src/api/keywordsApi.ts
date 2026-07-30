import axios from "axios";

const API_URL = "http://localhost:8080/keywords";
const POST_UPDATE_KEYWORD_URL = "/add"

export async function updateKeywordCategory(keyword: string, categoryId: number): Promise<void> {

    await axios.post(API_URL + POST_UPDATE_KEYWORD_URL, {
        keyword: keyword,
        categoryId: categoryId
    });

}