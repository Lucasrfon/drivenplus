import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Components/reset.css';
import './Components/globalStyle.css';
import Login from './Pages/Login';
import Register from './Pages/Register';

export default function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}