import { useTransactions } from "../../hooks/useTransactions";

export default function Dashboard() {

    const { transactions } = useTransactions();

    return (
        <h1>{transactions[0].description}</h1>
    )
}