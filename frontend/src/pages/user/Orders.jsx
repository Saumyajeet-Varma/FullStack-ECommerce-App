import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"
import { useAuth } from "../../context/AuthProvider"
import OrderTable from "../../components/OrderTable"

function Orders() {

    const [orders, setOrders] = useState([])

    const [auth] = useAuth()

    const getOrders = async () => {

        try {
            const { data } = await axios.get("/api/v1/auth/orders")

            if (data.success) {
                setOrders(data.orders)
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Failed to fetch orders")
        }
    }

    useEffect(() => {
        if (auth?.user) {
            getOrders()
        }
    }, [auth?.user])

    return (
        <>
            <Layout title={"User - Orders"}>
                <div className="flex">
                    <UserMenu />
                    <div className="p-5 w-4/5">
                        <h1 className="text-3xl font-semibold">All orders</h1>
                        <div className="w-full mt-5">
                            <OrderTable orders={orders} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Orders
