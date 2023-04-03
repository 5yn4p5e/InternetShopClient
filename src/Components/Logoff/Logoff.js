import React from "react"
import { useNavigate } from "react-router-dom"

const Logoff = ({ setUser }) => {
    const navigate = useNavigate()

    const logoff = async (event) => {
        event.preventDefault()

        const requestOptions = {
            method: "POST",
        }
        return await fetch("api/account/logoff", requestOptions)
            .then((response) => {
                response.status === 200 &&
                    setUser({ isAuthenticated: false, userName: "" })

                response.status === 401 && navigate("/login")
            })
    }

    return (
        <>
            <p></p>
            <form onSubmit={logoff}>
                <button type="submit">Выход</button>
            </form>
        </>
    )
}

export default Logoff