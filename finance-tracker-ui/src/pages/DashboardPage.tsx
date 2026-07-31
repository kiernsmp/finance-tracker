import MonthlySummaryTable from "@/features/dashboard/components/monthlySummaryTable";
import { useMonthlySummary } from "@/features/dashboard/hooks/useMonthlySummary";
import "./DashboardPage.css";

export default function DashboardPage() {
    const { monthlySummary } = useMonthlySummary();

    if (!monthlySummary) {
        return <p>Loading...</p>;
    }

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                </div>
            </div>

            <div className="dashboard-sections">
                <div className="dashboard-section-card">
                    <MonthlySummaryTable monthlySummary={monthlySummary} />
                </div>
            </div>
        </div>
    );
}