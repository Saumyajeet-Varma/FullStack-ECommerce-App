import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"

function CreateProduct() {
    return (
        <>
            <Layout title={"Admin - Create Product"}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5 w-full h-[73vh] overflow-scroll no-scrollbar">
                        <h1>Create Product</h1>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateProduct
