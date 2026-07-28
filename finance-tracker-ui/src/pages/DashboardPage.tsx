import MonthlySummaryTable from "@/features/dashboard/components/monthlySummaryTable";
import { useMonthlySummary } from "@/features/dashboard/hooks/useMonthlySummary";
// import { useTransactionFilters } from "@/features/transactions/hooks/useTransactionFilters";

export default function DashboardPage() {
    // const {
    //         appliedFilter,
    //         setAppliedFilter,
    //     } = useTransactionFilters();

    const { monthlySummary } = useMonthlySummary();

    if (!monthlySummary) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h1>Dashboard</h1>
            
            <MonthlySummaryTable 
                monthlySummary = { monthlySummary }
            />

        </div>
    );
}