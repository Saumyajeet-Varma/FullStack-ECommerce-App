import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"

function CreateCategory() {
    return (
        <>
            <Layout title={"Admin - Create Category"}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5">
                        <h1>Create Category</h1>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateCategory
