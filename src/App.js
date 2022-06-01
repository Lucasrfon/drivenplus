import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Components/reset.css';
import './Components/globalStyle.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Subscriptions from './Pages/Subscriptions';
import Home from './Pages/Home';
import TokenContext from './Contexts/TokenContext';
import { useState } from 'react';

export default function App () {
    const [token, setToken] = useState("")
    return (
        <BrowserRouter>
            <TokenContext.Provider value={{ token, setToken }}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route path="/subscriptions/:idSubscription" element={<Subscriptions />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </TokenContext.Provider>
        </BrowserRouter>
    )
}