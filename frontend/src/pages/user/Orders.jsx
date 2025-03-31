import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"
import { useAuth } from "../../context/AuthProvider"
import OrderTable from "../../components/OrderTable"
import Spinner from "../../components/Spinner"

function Orders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const [auth] = useAuth()

    const getOrders = async () => {

        try {
            setLoading(true)

            const { data } = await axios.get("/api/v1/order/orders")

            if (data.success) {
                setOrders(data.orders)
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Failed to fetch orders")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (auth?.user) {
            getOrders()
        }
    }, [auth?.user])

    return (
        <>
            <Layout title={`Your Orders`}>
                <div className="flex">
                    <UserMenu />
                    {loading ? <Spinner /> : <div className="p-5 w-4/5">
                        <h1 className="text-3xl font-semibold">All orders</h1>
                        <div className="w-full mt-5">
                            <OrderTable orders={orders} />
                        </div>
                    </div>}
                </div>
            </Layout>
        </>
    )
}

export default Orders
