/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import axios from "axios"

import { useAuth } from "../../context/AuthProvider"
import UnauthorizedSpinner from "../UnauthorizedSpinner"

function Private() {

    const [ok, setOk] = useState(false)

    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const response = await axios.get('/api/v1/auth/userAuth')
            response.data ? setOk(true) : setOk(false)
        }

        if (auth?.token) {
            authCheck()
        }
    }, [auth?.token])

    return ok ? <Outlet /> : <UnauthorizedSpinner />;
}

export default Private
