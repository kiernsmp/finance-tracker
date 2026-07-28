export interface MonthlySummary {
    months: MonthSummary[];
}

export interface MonthSummary {
    monthYear: string;
    totalIn: number;
    totalOut: number;
    categories: CategorySummary[];
}

export interface CategorySummary {
    categoryName: string;
    totalIn: number;
    totalOut: number
}