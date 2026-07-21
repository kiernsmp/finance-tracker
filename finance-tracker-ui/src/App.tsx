import { useState } from 'react'

import './App.css'
import Upload from "./pages/Upload";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <Upload />
        </div>


    )
}

export default App
