import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

import Layout from "../components/Layout/Layout"
import Spinner from "../components/Spinner"
import { capitalizeString } from "../utils/capitalizeString.js"

const Category = () => {

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    const getCategoryProducts = async () => {

        try {
            setLoading(true)

            const response = await axios.get(`/api/v1/product/category-products/${params.slug}`)

            if (response.data.success) {
                setProducts(response.data.products)
                setCategory(response.data.category)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getCategoryProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.slug])

    return (
        <>
            <Layout>
                {loading ? <Spinner /> :
                    <div>
                        <div className="px-10 py-5">
                            <h1 className="text-3xl font-semibold">{capitalizeString(category?.name)}</h1>
                            <h6 className="text-xl text-gray-600">{products.length} product(s) found</h6>
                        </div>
                        {products.length ? (
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 px-10">
                                {products.length ? (
                                    products.map((product) => (
                                        <div className="group relative p-4 bg-gray-100 rounded-lg" key={product._id}>
                                            <img
                                                alt="Product image"
                                                src={`/api/v1/product/get-product-image/${product._id}`}
                                                className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-60"
                                            />
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                    <h3 className="text-sm text-gray-700">
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {product.name}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                            </div>
                                            <div className="w-full flex items-center justify-between mt-4">
                                                <button onClick={() => navigate(`/product/${product.slug}`)} className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 z-0">
                                                    More details
                                                </button>
                                                <button className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 z-0">
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    ))) : (
                                    <p>No products</p>
                                )}
                            </div>
                        ) : (
                            <p>No products in this category</p>
                        )}
                    </div>}
            </Layout>
        </>
    )
}

export default Category
