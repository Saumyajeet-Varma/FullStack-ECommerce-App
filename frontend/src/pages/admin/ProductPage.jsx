import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"
import ProductForm from "../../components/form/ProductForm"

function ProductPage() {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [image, setImage] = useState("")
    const [id, setId] = useState(null)

    const navigate = useNavigate()
    const params = useParams()

    const getProduct = async () => {

        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)

            if (data.success) {
                setName(data.product.name)
                setDescription(data.product.description)
                setPrice(data.product.price)
                setQuantity(data.product.quantity)
                setCategory(data.product.category?._id)
                setShipping(data.product.shipping)
                setId(data.product._id)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            productData.append("category", category)

            if (image instanceof File) {
                productData.append("image", image);
            }

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData)

            if (data.success) {
                toast.success(`Product is updated`)
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

    const handleDelete = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`)

            if (data.success) {
                toast.success(`Product is deleted`)
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
            <Layout title={"Admin - Create Product"}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5 w-full h-[73vh] overflow-scroll no-scrollbar">
                        <h1>Product</h1>
                        <div className="my-1 w-full">
                            <ProductForm update={true} submitText="Update product" handleSubmit={handleSubmit} handleDelete={handleDelete} categories={categories} name={name} description={description} category={category} price={price} quantity={quantity} image={image} shipping={shipping} setName={setName} setDescription={setDescription} setCategory={setCategory} setPrice={setPrice} setQuantity={setQuantity} setImage={setImage} setShipping={setShipping} id={id} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ProductPage
