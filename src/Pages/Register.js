import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function Register () {
    const navigate = useNavigate();
    const [register, setRegister] = useState({email: "", name: "", cpf: "", password: ""});

    function sentRequest (event) {
        event.preventDefault();
        axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up', register).then(() => navigate("/")).catch(() => alert("Falha no cadastro, favor verificar e tentar novamente."));
    }

    return (
        <Container>
            <form onSubmit={sentRequest}>
                <input placeholder="Nome" required value={register.name} onChange={e => setRegister({...register, name: e.target.value})} />
                <input placeholder="CPF" required value={register.cpf} onChange={e => setRegister({...register, cpf: e.target.value})} />
                <input type="email" placeholder="E-mail" required value={register.email} onChange={e => setRegister({...register, email: e.target.value})} />
                <input type="password" placeholder="Senha" required value={register.password} onChange={e => setRegister({...register, password: e.target.value})} />
                <button typeof="submit">CADASTRAR</button>
            </form>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <p>Já possuí uma conta? Entre</p>
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
    font-weight: 700;
}

p {
    color: white;
    text-decoration: underline;
    margin-top: 25px;
}
`