import DateFilter from "../components/transactions/DateFilter";
import TransactionSummary from "../components/transactions/TransactionSummary";
import TransactionTable from "../components/transactions/TransactionTable";
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
        updateCategory,
        totalIn,
        totalOut
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

        <TransactionSummary 
            totalIn={totalIn}
            totalOut={totalOut}
        />
    
        <TransactionTable 
            transactions={transactions} 
            categoryList={categoryList}
            updateCategory={updateCategory}
            />
        </div>
    );
}