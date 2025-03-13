import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import chalk from "chalk"

import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"
import Table from "../../components/Table"
import CategoryForm from "../../components/form/CategoryForm.jsx"

function CreateCategory() {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("/api/v1/category/create-category", { name })

            if (response.data.success) {
                toast.success(`${response.data.category.name} is created`)
                getAllCategories()
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(chalk(`Error: ${error.message}`))
            toast.error("Something went wrong !")
        }
    }

    const getAllCategories = async () => {

        try {
            const response = await axios.get("/api/v1/category/categories")

            if (response.data.success) {
                setCategories(response.data.categories)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <>
            <Layout title={"Admin - Create Category"}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5 w-full h-[73vh] overflow-scroll no-scrollbar space-y-12">
                        <h1>Create Category</h1>
                        <div>
                            <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit} submitText="Create category" />
                        </div>
                        <Table data={categories} />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateCategory
