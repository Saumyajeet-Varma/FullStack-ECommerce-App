import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import chalk from "chalk"
import { Checkbox, Radio } from "antd"

import Layout from "../components/Layout/Layout"
import { prices } from "../utils/prices.js"

function Homepage() {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const getTotalProducts = async () => {

        try {
            const response = await axios.get("/api/v1/product/product-count")

            if (response.data.success) {
                setTotal(response.data.totalProducts)
            }
        }
        catch (error) {
            console.log(chalk(error))
            toast.error(error.message)
        }
    }

    const getAllCategories = async () => {

        try {
            const response = await axios.get("/api/v1/category/get-categories")

            if (response.data.success) {
                setCategories(response.data.categories)
            }
        }
        catch (error) {
            console.log(chalk(error))
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllCategories()
        getTotalProducts()
    }, [])

    const getAllProducts = async () => {

        try {
            setLoading(true)
            const response = await axios.get(`/api/v1/product/product-list/${page}`)

            if (response.data.success) {
                setProducts(response.data.products)
            }
        }
        catch (error) {
            console.log(chalk(`Error: ${error.message}`))
            toast.error("Something went wrong !")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (page === 1) {
            return
        }

        handleLoadMore()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const handleLoadMore = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/v1/product/product-list/${page}`)

            if (response.data.success) {
                setProducts([...products, ...response.data.products])
            }
        }
        catch (error) {
            console.log(chalk(`Error: ${error.message}`))
            toast.error("Something went wrong !")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!checked.length && !radio.length) {
            getAllProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, radio])

    useEffect(() => {
        if (checked.length || radio.length) {
            filterProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, radio])

    const handleFilter = (value, id) => {

        let all = [...checked]

        if (value) {
            all.push(id)
        }
        else {
            all = all.filter(el => el !== id)
        }

        setChecked(all)
    }

    const filterProducts = async () => {

        try {
            const response = await axios.post(`/api/v1/product/product-filter`, { checked, radio })

            if (response.data.success) {
                setProducts(response?.data?.products)
            }
        }
        catch (error) {
            console.log(chalk(error))
            toast.error(error.message)
        }
    }

    return (
        <>
            <Layout title={"Best offers - Ecommerce"}>
                <div className="flex">
                    <div className="w-1/5 py-5 px-5 bg-gray-100 space-y-4">
                        <div>
                            <h6 className="text-start px-5">Filter by category</h6>
                            <div className="flex flex-col items-start px-5 py-3">
                                {categories?.map(category => (
                                    <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>
                                        {category.name}
                                    </Checkbox>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h6 className="text-start px-5">Filter by price</h6>
                            <Radio.Group onChange={(e) => setRadio(e.target.value)} className="flex flex-col items-start px-5 py-3">
                                {prices.map(price => (
                                    <Radio key={price._id} value={price.array}>{price.name}</Radio>
                                ))}
                            </Radio.Group>
                        </div>
                        <div>
                            <button onClick={() => window.location.reload()} className="rounded-md w-full bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                                Reset filter
                            </button>
                        </div>
                    </div>
                    <div className="p-5 w-4/5">
                        <h1 className="text-center">Homepage</h1>
                        <div>
                            <h2>All Products</h2>
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                                {products.length ? (
                                    products.map((product) => (
                                        <div className="group relative p-4 bg-gray-100 rounded-lg -z-10" key={product._id}>
                                            <img
                                                alt="Product image"
                                                src={`/api/v1/product/get-product-image/${product._id}`}
                                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-60"
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
                                                <button className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                                                    More details
                                                </button>
                                                <button className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    ))) : (
                                    <p>No products</p>
                                )}
                            </div>
                            <div className="m-2 p-3">
                                {products && products.length < total && (
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        setPage(page + 1)
                                    }} className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                                        {loading ? "Loading..." : "Load more"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Homepage
