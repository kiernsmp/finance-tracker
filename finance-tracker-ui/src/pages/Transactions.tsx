import DateFilter from "../components/DateFilter";
import TransactionTable from "../components/TransactionTable";
import { useTransactions } from "../hooks/useTransactions";

export default function Transactions() {
    const {
        transactions,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
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
            setStartDate={setStartDate}
            setEndDate={setEndDate}
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