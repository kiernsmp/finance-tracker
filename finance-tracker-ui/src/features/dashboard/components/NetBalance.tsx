import { useBalanceOffset } from "../hooks/useBalanceOffset";
import { formatAuditorAmount } from "@/utils/formatters";
import "./NetBalance.css";

interface NetBalanceProps {
    netBalance: number;
}

export default function NetBalance({ netBalance }: NetBalanceProps) {
    const { balanceOffset } = useBalanceOffset();
    const adjustedNetBalance = netBalance + (balanceOffset?.amount ?? 0);

    return (
        <div className="total-net-card">
            <span className="total-net-label">Total Net</span>
            <strong className="total-net-value">{formatAuditorAmount(adjustedNetBalance)}</strong>
        </div>
    );
}

