import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";
import TokenContext from "../Contexts/TokenContext";

export default function Subscriptions () {
    const { token } = useContext(TokenContext);
    const [plans, setPlans] = useState([]);

    useEffect(() => {axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships', token).then((e) => setPlans(e.data))}, []);

    return (
        <Container>
            <h1>Escolha seu Plano</h1>
            {plans.map((a) =>
                <Link to={`/subscriptions/${a.id}`} key={a.id} style={{ textDecoration: 'none' }}>
                    <div>
                        <img src={a.image} alt={`plano ${a.id}`} />
                        <span>R$ {a.price}</span>
                    </div>
                </Link>
            )}
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
    font-weight: 700;

h1 {
    color: white;
    font-size: 32px;
    margin-bottom: 25px;
}

div {
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 180px;
    width: 300px;
    margin-bottom: 10px;
}

span {
    font-size: 24px;
    color: white;
}
`