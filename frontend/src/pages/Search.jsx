import SearchInput from "../components/form/SearchInput.jsx"
import Layout from "../components/Layout/Layout.jsx"
import { useSearch } from "../context/SearchProvider.jsx"

const Search = () => {

    // eslint-disable-next-line no-unused-vars
    const [queries, setQueries] = useSearch()

    return (
        <Layout title={"Search results"}>
            <div className="container w-full px-10 pb-5">
                <SearchInput />
                <div className="text-center">
                    <h1>Search results</h1>
                    <h6>{queries?.result.length < 1 ? "No product found" : `Found ${queries.result.length} product(s)`}</h6>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                        {queries.result.map((product) => (
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
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
