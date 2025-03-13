import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import chalk from "chalk"
import { Modal } from 'antd';

import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"
import CategoryTable from "../../components/CategoryTable.jsx"
import CategoryForm from "../../components/form/CategoryForm.jsx"

function CreateCategory() {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`/api/v1/category/create-category`, { name })

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

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })

            if (response.data.success) {
                toast.success(`${updatedName} is updated`)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
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

    const handleDelete = async (id) => {

        try {
            const response = await axios.delete(`/api/v1/category/delete-category/${id}`)

            if (response.data.success) {
                toast.success(`${response.data.message}`)
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
                        <CategoryTable data={categories} setVisible={setVisible} setUpdatedName={setUpdatedName} setSelected={setSelected} handleDelete={handleDelete} />
                    </div>
                    <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} submitText="Update category" />
                    </Modal>
                </div>
            </Layout>
        </>
    )
}

export default CreateCategory
