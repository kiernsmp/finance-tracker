import { formatAuditorAmount } from "./formatters";

interface Props {
    totalOut: number;
    totalIn: number;
}

export default function TransactionSummary({ totalOut, totalIn }: Props) {
    const net = totalIn - totalOut;

    return (
        <table>
            <thead>
                <tr>
                    <th scope="col">Total Out</th>
                    <th scope="col">Total In</th>
                    <th scope="col">Net</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{formatAuditorAmount(totalOut)}</td>
                    <td>{formatAuditorAmount(totalIn)}</td>
                    <td>{formatAuditorAmount(net)}</td>
                </tr>
            </tbody>
        </table>
    );
}