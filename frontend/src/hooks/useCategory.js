import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {

    const [categories, setCategories] = useState([])

    const getAllCategories = async () => {

        try {
            const { data } = await axios.get(`/api/v1/category/get-categories`)

            if (data.success) {
                setCategories(data.categories)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return categories
}