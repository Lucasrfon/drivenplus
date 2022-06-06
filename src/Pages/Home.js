import axios from "axios";
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginContext from "../Contexts/LoginContext";
import MemberContext from "../Contexts/MemberContext"
import TokenContext from "../Contexts/TokenContext";

export default function Home () {
    const { login } = useContext(LoginContext);
    const { member, setMember } = useContext(MemberContext);
    const { token } = useContext(TokenContext);
    const navigate = useNavigate();

    useEffect(() => {axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', login).then((e) => setMember(e.data))}, [])

    function cancelSubscription () {
        axios.delete('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', token).then(() => navigate("/subscriptions"));
    }

    return (
        <Container>
            <div>
                <Topo>
                    <img src={member.membership.image} alt={member.membership.name}/>
                    <Link to={`/users/${member.id}`}>
                        <ion-icon name="person-circle"></ion-icon>
                    </Link>
                </Topo>
                <h1>Olá, {member.name}</h1>
                <Perks>
                    {member.membership.perks.map((e) => <a href={e.link} key={e.id}>{e.title}</a>)}
                </Perks>
            </div>
            <div>
                <button onClick={() => navigate("/subscriptions")}>Mudar plano</button>
                <button onClick={cancelSubscription}>Cancelar plano</button>
            </div>
        </Container>
    )
}

const Container = styled.div`
    background-color: #0e0e13;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    font-size: 14px;
    color: white;
    justify-content: space-between;

&>div {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    align-items: center;
}

img {
    margin-top: 25px;
}

ion-icon {
    font-size: 40px;
    color: white;
}

h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 70px;
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

button:last-child {
    background-color: #FF4747;
}
`

const Topo = styled.div`
    height: 85px;
    width: 320px;
    margin-top: 22px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
`

const Perks = styled.div`
    display: flex;
    flex-direction: column;

a {
    background-color: #FF4791;
    color: white;
    border-radius: 8px;
    border: none;
    height: 52px;
    width: 300px;
    margin-top: 8px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}
`