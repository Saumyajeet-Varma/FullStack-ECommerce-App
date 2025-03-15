import axios from "axios"
import chalk from "chalk"
import { useNavigate } from 'react-router-dom'
import { useSearch } from "../../context/SearchProvider"

const SearchInput = () => {

    const [queries, setQueries] = useSearch()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get(`/api/v1/product/search/${queries.keyword}`)

            if (response.data.success) {
                setQueries({ ...queries, result: response.data.result })
                navigate("/search")
            }
        }
        catch (error) {
            console.log(chalk.red(error))
        }
    }

    return (
        <>
            <form className="flex w-full border-2 rounded-full my-5 pr-5 outline-none text-gray-600" role="search" onSubmit={handleSubmit}>
                <input className="py-2 px-5 rounded-full flex-grow focus:outline-none focus:ring-0 focus:border-transparent" type="search" placeholder="Search" aria-label="Search" value={queries.keywords} onChange={(e) => setQueries({ ...queries, keyword: e.target.value })} />
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </form>
        </>
    )
}

export default SearchInput
