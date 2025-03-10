/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";

export default function UnauthorizedSpinner({ path = "login" }) {

    const [count, setCount] = useState(3)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount((count) => --count)
        }, 1000)

        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })

        return () => clearInterval(intervalId)
    }, [count, navigate, location, path])

    return (
        <Layout>
            <div className="h-[73.5vh] w-full flex flex-col justify-center items-center">
                <h1 className="font-semibold text-gray-500">Redirecting you in {count} second</h1>
                <div className="flex justify-center items-center h-16">
                    <div className="w-8 h-8 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
                </div>
            </div>
        </Layout>
    );
}
