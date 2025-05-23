import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"

function Products() {

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {

        try {
            const { data } = await axios.get("/api/v1/product/get-products")

            if (data.success) {
                setProducts(data.products)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <Layout title={"Products"}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5 w-full h-[73vh] overflow-scroll no-scrollbar">
                        <h1 className="text-3xl font-semibold">All products</h1>
                        <div>
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                                {products.map((product) => (
                                    <a href={`/dashboard/admin/product/${product.slug}`} key={product._id}>
                                        <div className="group relative p-4 bg-gray-200 rounded-lg">
                                            <img
                                                alt="Product image"
                                                src={`/api/v1/product/get-product-image/${product._id}`}
                                                className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-60"
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
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Products
