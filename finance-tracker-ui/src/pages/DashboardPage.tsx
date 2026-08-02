import MonthlySummaryTable from "@/features/dashboard/components/monthlySummaryTable";
import { useMonthlySummary } from "@/features/dashboard/hooks/useMonthlySummary";
import "./DashboardPage.css";
import NetBalance from "@/features/dashboard/components/NetBalance";

export default function DashboardPage() {
    const { monthlySummary } = useMonthlySummary();

    if (!monthlySummary) {
        return <p>Loading...</p>;
    }


    const totalIn = monthlySummary.months.reduce(
        (sum, month) => sum + month.totalIn,
        0
    );

    const totalOut = monthlySummary.months.reduce(
        (sum, month) => sum + month.totalOut,
        0
    );

    const netBalance = totalIn - totalOut;

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                </div>
            </div>

            <NetBalance
                netBalance={netBalance}
            />

            <div className="dashboard-sections">
                <div className="dashboard-section-card">
                    <MonthlySummaryTable monthlySummary={monthlySummary} />
                </div>
            </div>
        </div>
    );
}