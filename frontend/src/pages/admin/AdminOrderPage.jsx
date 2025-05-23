import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

import Layout from "../../components/Layout/Layout"
import ProductTable from "../../components/ProductTable"
import AdminMenu from "../../components/Layout/AdminMenu"
import { useAuth } from "../../context/AuthProvider"
import Spinner from "../../components/Spinner"

function AdminOrderPage() {

    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(false)

    const [auth] = useAuth()

    const params = useParams()

    const getOrder = async () => {

        try {
            setLoading(true)

            const { data } = await axios.get(`/api/v1/order/order/${params.orderId}`)

            if (data.success) {
                setOrder(data.order)
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Failed to fetch order")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (auth?.user) {
            getOrder()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.user])

    return (
        <>
            <Layout title={`Order - ${order._id}`}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5 w-4/5">
                        {loading ? <Spinner /> : <>
                            <div className="w-full flex flex-wrap justify-between items-center">
                                <h1 className="text-3xl font-semibold">Order</h1>
                                <p className="text-md text-gray-600">Order Id - {order._id}</p>
                            </div>
                            <div className="w-full mt-5">
                                <ProductTable products={order.products} purpose="order" />
                            </div>
                        </>}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AdminOrderPage
