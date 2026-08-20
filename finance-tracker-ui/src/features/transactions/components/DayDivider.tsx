import { formatTransactionDate, formatAuditorAmountWithSigns } from "@/utils/formatters";

interface DayDividerProps {
    label: string;
    columnCount: number;
    dayTotal: number;
    count: number;
}

export default function DayDivider({ label, columnCount, dayTotal, count}: DayDividerProps) {
    return (
        <tr className="day-divider-row">
            <td colSpan={columnCount}>
                <span className="day-divider-label">
                    {formatTransactionDate(label)}: { formatAuditorAmountWithSigns(dayTotal) } ({count}) 
                </span>
            </td>
        </tr>
    );
}
