import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components";
import MemberContext from "../Contexts/MemberContext";


export default function User () {
    const navigate = useNavigate();
    const { member } = useContext(MemberContext);
    return (
        <Container>
            <Link to="/home">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
            <form onSubmit={() => navigate(`/users/${member.id}/update`)}>
                <input value={member.name} disabled />
                <input value={member.cpf} disabled />
                <input value={member.email} disabled />
                <button typeof="submit">ATUALIZAR</button>
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