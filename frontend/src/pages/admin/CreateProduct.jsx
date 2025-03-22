import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"
import ProductForm from "../../components/form/ProductForm"
import { useNavigate } from "react-router-dom"

function CreateProduct() {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()

    const getAllCategories = async () => {

        try {
            const { data } = await axios.get(`/api/v1/category/get-categories`)

            if (data.success) {
                setCategories(data.categories)
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
            const productData = new FormData()

            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("image", image)
            productData.append("category", category)

            const { data } = await axios.post(`/api/v1/product/create-product`, productData)

            if (data.success) {
                toast.success(`Product is created`)
                navigate("/dashboard/admin/products")
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Something went wrong !")
        }
    }

    return (
        <>
            <Layout title={"Create product"}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5 w-full h-[73vh] overflow-scroll no-scrollbar">
                        <h1 className="text-3xl font-semibold">Create Product</h1>
                        <div className="my-1 w-full">
                            <ProductForm submitText="Create product" handleSubmit={handleSubmit} categories={categories} name={name} description={description} category={category} price={price} quantity={quantity} image={image} shipping={shipping} setName={setName} setDescription={setDescription} setCategory={setCategory} setPrice={setPrice} setQuantity={setQuantity} setImage={setImage} setShipping={setShipping} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateProduct
