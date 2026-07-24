import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Transactions from "./pages/Transactions";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";

import './App.css'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/transactions" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/transactions" element={<Transactions />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
