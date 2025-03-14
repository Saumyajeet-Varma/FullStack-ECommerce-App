import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import chalk from "chalk"

import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu"

function Products() {

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {

        try {
            const response = await axios.get("/api/v1/product/get-products")

            if (response.data.success) {
                setProducts(response.data.products)
            }
        }
        catch (error) {
            console.log(chalk(error))
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <Layout title={"Admin - Products"}>
                <div className="flex">
                    <AdminMenu />
                    <div className="p-5 w-full h-[73vh] overflow-scroll no-scrollbar">
                        <h1>All products</h1>
                        <div>
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {products.map((product) => (
                                    <a href={`/dashboard/admin/product/${product.slug}`} key={product._id}>
                                        <div className="group relative">
                                            <img
                                                alt="Product image"
                                                src={`/api/v1/product/get-product-image/${product._id}`}
                                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80"
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
