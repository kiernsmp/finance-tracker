interface ApprovalsProps {
    approveAll: () => void;

}

export default function Approvals({
    approveAll
}: ApprovalsProps) {

    return (
        <button onClick={approveAll}>
                Approve All
        </button>
    )
}