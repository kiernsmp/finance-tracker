interface Props {
    totalOut: number;
    totalIn: number;
}

export default function TransactionSummary({ totalOut, totalIn}: Props) {
    const net = totalIn - totalOut;

    const aud = new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
        });

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
                    <td>{aud.format(totalOut)}</td>
                    <td>{aud.format(totalIn)}</td>
                    <td>{aud.format(net)}</td>
                </tr>
            </tbody>
        </table>
    );



}