import Select from "react-select";
import type { CategoryOption } from "@/types/CategoryOption";

interface Props {
    categoryList: CategoryOption[];
    currentCategoryId?: number;
    onChange: (categoryId: number) => void;
}

export default function TransactionCategoryCell({
    categoryList,
    currentCategoryId,
    onChange
}: Props) {

    const options = categoryList.map(category => ({
        value: category.id,
        label: category.label
    }));

    const selectedOption = options.find((option) => option.value === currentCategoryId) ?? null;

    return (
        <Select
            options={options}
            value={selectedOption}
            onChange={(selected) => {
                if (selected) {
                    onChange(selected.value);
                }
            }}
        />
    );


}