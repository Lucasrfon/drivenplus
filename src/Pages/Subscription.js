import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TokenContext from "../Contexts/TokenContext";
import MemberContext from "../Contexts/MemberContext";
import LoginContext from "../Contexts/LoginContext";
import close from "../Images/close.png";
import cash from "../Images/cash.png";
import clipBoard from "../Images/clipBoard.png";

export default function Subscription() {
    const { token } = useContext(TokenContext);
    const { setMember } = useContext(MemberContext);
    const { login } = useContext(LoginContext);
    const { idSubscription } = useParams();
    const [subscription, setSubscription] = useState([]);
    const [perks, setPerks] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const [buyerTicket, setBuyerTicket] = useState({name: "", card: "", cvv: "", valid: ""});
    const navigate = useNavigate();

    useEffect(() => {axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idSubscription}`, token).then(setStates)}, []);

    function setStates(e) {
        setSubscription(e.data);
        setPerks(e.data.perks);
    }

    function confirmation (event) {
        event.preventDefault();
        setConfirm(true);
    }

    function buySubscription () {
        axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions',
        {
            membershipId: subscription.id,
            cardName: buyerTicket.name,
            cardNumber: buyerTicket.card,
            securityNumber: buyerTicket.cvv,
            expirationDate: buyerTicket.valid
        }, token).then(prepareNavigate).catch(() => alert("Dados inválidos, favor verificar e tentar novamente."));
    }

    function prepareNavigate() {
        axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', login).then((e) => actuallyNavigate(e))
    }

    function actuallyNavigate(e) {
        setMember({...e.data});
        navigate("/home");
    }

    return (
        <Container>
            <div>
                <Link to="/subscriptions">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </Link>
            </div>
            <img src={subscription.image} alt={subscription.name} />
            <h1>{subscription.name}</h1>
            <Description>
                <h3><img src={clipBoard} alt="->" /> Benefícios:</h3>
                {perks.map((a, index) => 
                    <p key={a.id}>{index + 1}. {a.title === "Solicitar brindes" ? "Brindes exclusivos" : a.title}</p>
                )}
                <h3><img src={cash} alt="->" /> Preço:</h3>
                <p>R$ {subscription.price} cobrados mensalmente</p>
            </Description>
            <form onSubmit={confirmation}>
                <input placeholder="Nome impresso no cartão" value={buyerTicket.name} onChange={e => setBuyerTicket({...buyerTicket, name: e.target.value})} required />
                <input placeholder="Digitos do cartão" value={buyerTicket.card} onChange={e => setBuyerTicket({...buyerTicket, card: e.target.value})} required />
                <input placeholder="Código de segurança" value={buyerTicket.cvv} onChange={e => setBuyerTicket({...buyerTicket, cvv: e.target.value})} required />
                <input placeholder="Validade" value={buyerTicket.valid} onChange={e => setBuyerTicket({...buyerTicket, valid: e.target.value})} required />
                <button typeof="submit">ASSINAR</button>
            </form>
            {confirm ? 
                <Confirmation>
                    <img src={close} alt="X" onClick={() => setConfirm(false)} />
                    <div>
                        <p>Tem certeza que deseja</p>
                        <p>assinar o plano</p>
                        <p>{subscription.name} (R$ {subscription.price.replace(".", ",")})?</p>
                        <button onClick={() => setConfirm(false)}>Não</button>
                        <button onClick={buySubscription}>SIM</button>
                    </div>
                </Confirmation> : null}
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

div:first-child {
    width: 330px;
    height: 50px;
    position: relative;
    margin-top: 25px;
    margin-bottom: 35px;
}

ion-icon {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    font-size: 40px;
    font-weight: 700;
}

h1 {
    font-size: 32px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 30px;
}

h3 {
    font-size: 16px;
    margin-top: 12px;
    margin-bottom: 10px;
}

form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 45px;
    width: 300px;
}

input {
    margin-bottom: 8px;
    padding-left: 15px;
    height: 52px;
    width: 300px;
    border-radius: 8px;
    border: none;
}

input:nth-child(3), input:nth-child(4) {
    width: 145px;
    padding: 6px;
}

button {
    color: white;
    background-color: #FF4791;
    border-radius: 8px;
    border: none;
    height: 52px;
    width: 300px;
    margin-top: 4px;
    font-weight: 700;
}
`

const Description = styled.div`
    width: 300px;
`

const Confirmation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;

img {
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 25px;
    margin-top: 26px;
    margin-right: 20px;
}

div {
    width: 250px;
    height: 210px;
    background-color: white;
    color: black;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 30px 0px 0px 0px;
    text-align: center;
    border-radius: 12px;
    overflow: scroll;
}

button {
    margin-top: 50px;
    height: 52px;
    width: 95px;
    font-size: 14px;
}

button:nth-child(4) {
    background-color: #CECECE;
    font-weight: 400;
    margin: 50px 10px 0px 10px;
}
`