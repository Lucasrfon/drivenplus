import { useContext } from "react"
import TokenContext from "../Contexts/TokenContext"

export default function Subscriptions () {
    const { token } = useContext(TokenContext);

    return (
        <>
            subscriptions
        </>
    )
}