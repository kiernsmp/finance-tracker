import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Dashboard from "./features/dashboard/pages/DashboardPage";
import Upload from "./features/upload/pages/UploadPage";
import TransactionsPage from "./pages/TransactionsPage";

import './App.css'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/transactions" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
