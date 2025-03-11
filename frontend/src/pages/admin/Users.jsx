import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"

function Users() {
    return (
        <>
            <Layout title={"Admin - Users"}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5">
                        <h1>All Users</h1>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Users
