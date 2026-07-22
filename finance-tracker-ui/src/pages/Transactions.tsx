import DateFilter from "../components/DateFilter";
import TransactionTable from "../components/TransactionTable";
import { useTransactions } from "../hooks/useTransactions";

export default function Transactions() {
    const {
        transactions,
        startDate,
        endDate,
        categoryId,
        setStartDate,
        setEndDate,
        setCategoryId,
        applyFilters,
        categoryList,
        updateCategory
    } = useTransactions();
    
    return (
        <div>
        <h1>Transactions</h1>
        
        <DateFilter
            startDate={startDate}
            endDate={endDate}
            categoryId={categoryId}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setCategoryId={setCategoryId}
            categoryList={categoryList}
            applyFilters={applyFilters}
        />
        
        <TransactionTable 
            transactions={transactions} 
            categoryList={categoryList}
            updateCategory={updateCategory}
            />
        </div>
    );
}