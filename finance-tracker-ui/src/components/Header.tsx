import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            
            <h3>Financial Tracker</h3>

            <nav>
                <Link to="/transactions">Transactions</Link>
                <Link to="/upload">Upload File</Link>
            </nav>
        </header>
        
    )
}