/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SearchContext = createContext()

const SearchProvider = ({ children }) => {

    const [queries, setQueries] = useState({ keyword: "", result: [] })

    return (
        <>
            <SearchContext.Provider value={[queries, setQueries]}>
                {children}
            </SearchContext.Provider>
        </>
    );
}

// Custom hook
const useSearch = () => useContext(SearchContext)

// eslint-disable-next-line react-refresh/only-export-components
export { SearchProvider, useSearch }