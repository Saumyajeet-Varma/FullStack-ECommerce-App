import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import chalk from "chalk"

import Layout from "../components/Layout/Layout"
import Spinner from "../components/Spinner"

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const [similarProductLoading, setSimilarProductLoading] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.slug])

    const getProduct = async () => {

        try {
            const response = await axios.get(`/api/v1/product/get-product/${params.slug}`)

            if (response.data.success) {
                setProduct(response.data.product)
                getSimilarProducts(response.data.product.category._id, response.data.product._id)
            }
        }
        catch (error) {
            console.log(chalk.red(error))
            toast.error(error.message)
        }
    }

    const getSimilarProducts = async (categoryId, productId) => {

        try {
            setSimilarProductLoading(true)

            const response = await axios.get(`/api/v1/product/similar-products/${categoryId}/${productId}`)

            if (response.data.success) {
                setSimilarProducts(response.data.products)
            }
        }
        catch (error) {
            console.log(chalk.red(error))
            toast.error(error.message)
        }
        finally {
            setSimilarProductLoading(false)
        }
    }

    return (
        <Layout>
            <div className="w-full px-20 py-5">
                <div className="flex w-full p-5 items-center bg-gray-100 gap-10 rounded-lg">
                    <div className="w-1/3 flex justify-end items-center">
                        <img
                            src={`/api/v1/product/get-product-image/${product._id}`}
                            alt={product.name}
                            className="aspect-square rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-60 lg:w-60"
                        />
                    </div>
                    <div className="w-2/3">
                        <h1 className="text-2xl font-bold mb-5">Product details</h1>
                        <h4 className="text-lg"><span className="font-semibold">Name</span>: {product.name}</h4>
                        <h4 className="text-lg"><span className="font-semibold">Description</span>: {product.description}</h4>
                        <h4 className="text-lg"><span className="font-semibold">Price</span>: ${product.price}</h4>
                        {/* <h4 className="text-lg"><span className="font-semibold">Category</span>: {product.category.name}</h4> */}
                        <button className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 z-0 mt-5">
                            Add to cart
                        </button>
                    </div>
                </div>
                {similarProductLoading ? <Spinner /> : (similarProducts.length > 0 ? (<div className="mt-10">
                    <h1 className="text-2xl font-bold mb-5">Similar products</h1>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                        {similarProducts.map((product) => (
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
                        ))}
                    </div>
                </div>) : (<></>))}
            </div>
        </Layout>
    )
}

export default ProductDetails
