import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/categoryApi";
import type { CategoryOption } from "../../types/CategoryOption";

export function useCategories() {
    const [categoryList, setCategoryList] = useState<CategoryOption[]>([]);

    useEffect(() => {
        getAllCategories()
            .then((data) => setCategoryList(data))
            .catch((error) => console.error(error));
    }, []);

    return { categoryList };
}
