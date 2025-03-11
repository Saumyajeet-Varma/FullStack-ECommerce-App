import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"

function Orders() {
    return (
        <>
            <Layout title={"User - Orders"}>
                <div className="flex">
                    <UserMenu />
                    <div className="p-5">
                        <h1>Orders</h1>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Orders
