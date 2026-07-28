import type { MonthlySummary } from "@/types/MonthlySummary";
import { formatMonth } from "./formatters";

interface MonthlySummaryProps {
    monthlySummary: MonthlySummary
}

export default function MonthlySummaryTable({
    monthlySummary
}: MonthlySummaryProps) {
    

    return (
        <table>
            <tbody>
                {monthlySummary?.months.map((month) =>
                <>
                    <tr>
                        <td><h1>{formatMonth(month.monthYear)}</h1></td>
                    </tr>
                    <tr>
                        <td>Total In: {month.totalIn}</td>
                        <td>Total Out: {month.totalOut}</td>
                        <td>net:{month.totalIn - month.totalOut} </td>
                    </tr>
                
                </>

                )}
            </tbody>
        </table>
    )
}