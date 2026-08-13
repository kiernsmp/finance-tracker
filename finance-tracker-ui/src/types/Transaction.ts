export interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: Category;
    notes: string;
    metaNotes: string;
    approved: boolean;
    locked: boolean;
}

export interface Category {
    id: number;
    name: string;
}