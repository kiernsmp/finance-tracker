import { formatAuditorAmountWithSigns } from "@/utils/formatters";

interface DayDividerProps {
    label: string;
    columnCount: number;
    dayTotal: number;
}

export default function DayDivider({ label, columnCount, dayTotal }: DayDividerProps) {
    return (
        <tr className="day-divider-row">
            <td colSpan={columnCount}>
                <span className="day-divider-label">
                    {label}: { formatAuditorAmountWithSigns(dayTotal) } 
                </span>
            </td>
        </tr>
    );
}
