import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"

function CreateProduct() {
    return (
        <>
            <Layout title={"Admin - Create Product"}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5">
                        <h1>Create Product</h1>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateProduct
