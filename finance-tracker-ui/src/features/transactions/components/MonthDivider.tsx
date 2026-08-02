interface MonthDividerProps {
    label: string;
    columnCount: number;
}

export default function MonthDivider({ label, columnCount }: MonthDividerProps) {
    return (
        <tr className="month-divider-row">
            <td colSpan={columnCount}>
                <span className="month-divider-label">
                    {label}
                </span>
            </td>
        </tr>
    );
}
