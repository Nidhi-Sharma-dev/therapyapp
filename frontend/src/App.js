import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Soundlull from "./pages/Soundlull";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Soundlull />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
