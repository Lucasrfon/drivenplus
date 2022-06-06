import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import styled from "styled-components";
import MemberContext from "../Contexts/MemberContext";
import TokenContext from "../Contexts/TokenContext";
import LoginContext from "../Contexts/LoginContext";


export default function Update () {
    const { token } = useContext(TokenContext);
    const { member, setMember } = useContext(MemberContext);
    const { setLogin } = useContext(LoginContext);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function updateUser(event) {
        event.preventDefault();
        setLogin({email: member.email, password: member.password});
        axios.put('https://mock-api.driven.com.br/api/v4/driven-plus/users/', {
            name: member.name,
            cpf: member.cpf,
            email: member.email,
            currentPassword: password,
            newPassword: member.password
        }, token).then(() => navigate(`/users/${member.id}`)).catch(() => alert('Algo de errado não está certo, favor tentar novamente!'))
    }

    return (
        <Container>
            <Link to={`/users/${member.id}`}>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
            <form onSubmit={updateUser}>
                <input placeholder={member.name} required onChange={e => setMember({...member, name: e.target.value})} />
                <input value={member.cpf} disabled />
                <input type="email" placeholder={member.email} required onChange={e => setMember({...member, email: e.target.value})} />
                <input type="password" placeholder="Senha atual" required onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Nova senha" required onChange={e => setMember({...member, password: e.target.value})} />
                <button typeof="submit">SALVAR</button>
            </form>
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

input:nth-child(2) {
    background-color: #EBEBEB;
}

button {
    background-color: #FF4791;
    color: white;
    border-radius: 8px;
    border: none;
    height: 52px;
    width: 300px;
    font-weight: 700;
}

ion-icon {
    color: white;
    font-size: 40px;
    font-weight: 700;
    position: fixed;
    top: 0;
    left: 0;
    margin: 30px 25px;
}
`