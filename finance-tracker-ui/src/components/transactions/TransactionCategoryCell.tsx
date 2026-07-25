import Select from "react-select";
import type { CategoryOption } from "../../types/CategoryOption";

interface Props {
    categoryList: CategoryOption[];
    currentCategory: string;
    onChange: (categoryId: number) => void;
}
export default function CategorySelect({
    categoryList,
    currentCategory,
    onChange
}: Props) {

    const options = categoryList.map(category => ({
        value: category.id,
        label: category.category
    }));

    const selectedOption = options.find((option) => option.label === currentCategory) ?? null;

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