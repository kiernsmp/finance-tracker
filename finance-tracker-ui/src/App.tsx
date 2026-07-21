import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Transactions from "./pages/Transactions";
import Upload from "./pages/Upload";



import './App.css'

function App() {

    return (
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/transactions" replace /> } />
                <Route path="/upload" element={<Upload />} />
                <Route path="/transactions" element={<Transactions />} />
            </Routes>
        </BrowserRouter>


    )
}

export default App
