import Layout from "../components/Layout/Layout"
import useCategory from "../hooks/useCategory"

const Categories = () => {

    const categories = useCategory()

    return (
        <Layout>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-1">
                    <ul role="list" className="grid gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-y-4 xl:col-span-2">
                        {categories.map((category, index) => (
                            <a key={index} href={`/categories/${category.slug}`}>
                                <li className="bg-gray-100 p-5 hover:bg-gray-200">
                                    <div className="flex items-center gap-x-6">
                                        <h1 className="text-2xl text-gray-400">{index + 1 < 10 ? `0${index + 1}` : index + 1}</h1>
                                        <div>
                                            <h3 className="text-base/7 font-semibold tracking-tight text-gray-700">{category.name}</h3>
                                        </div>
                                    </div>
                                </li>
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default Categories
