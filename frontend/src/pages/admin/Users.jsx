import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"

function Users() {
    return (
        <>
            <Layout>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5">
                        <h1>Users</h1>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Users
