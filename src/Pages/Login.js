import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import logo from "../Images/logo.svg";
import TokenContext from "../Contexts/TokenContext";

export default function Login () {
    const navigate = useNavigate();
    const [login, setLogin] = useState({email: "dh5v@gmail.com", password: "123"});
    const { setToken } = useContext(TokenContext);

    function sentRequest (event) {
        event.preventDefault();
        axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', login).then(goodLogin).catch(badLogin);
    }

    function goodLogin (e) {
        setToken(e.data.token);
        e.data.membership ? navigate("/home") : navigate("/subscriptions");
    }

    function badLogin () {
        alert("Falha no login, favor tentar novamente.");
        setLogin({email: "", password: ""});
    }

    return (
        <Container>
            <img src={logo} alt="Logo" />
            <form onSubmit={sentRequest}>
                <input type="email" placeholder="E-mail" required value={login.email} onChange={e => setLogin({...login, email: e.target.value})} />
                <input type="password" placeholder="Senha" required value={login.password} onChange={e => setLogin({...login, password: e.target.value})} />
                <button typeof="submit">ENTRAR</button>
            </form>
            <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                <p>Não possuí uma conta? Cadastre-se</p>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    background-color: #0e0e13;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-size: 14px;

img {
    height: 50px;
    width: 300px;
    margin-bottom: 100px;
}

form {
    display: flex;
    flex-direction: column;
}

input {
    margin-bottom: 16px;
    padding-left: 15px;
    height: 52px;
    width: 300px;
    border-radius: 8px;
    border: none;
}

button {
    background-color: #FF4791;
    color: white;
    border-radius: 8px;
    border: none;
    height: 52px;
    width: 300px;
    margin-top: 8px;
}

p {
    color: white;
    text-decoration: underline;
    margin-top: 25px;
}
`