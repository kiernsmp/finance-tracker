import { useTransactionData } from "../../transactions/hooks/useTransactionData";

const emptyFilter = {};

export default function Dashboard() {
    const { transactions } = useTransactionData(emptyFilter);

    return (
        <h1>{transactions[0]?.description ?? "No transactions"}</h1>
    );
}