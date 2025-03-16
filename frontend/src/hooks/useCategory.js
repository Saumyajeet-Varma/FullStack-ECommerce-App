import { useEffect, useState } from "react";
import axios from "axios";
import chalk from "chalk";

export default function useCategory() {

    const [categories, setCategories] = useState([])

    const getAllCategories = async () => {

        try {
            const response = await axios.get(`/api/v1/category/get-categories`)

            if (response.data.success) {
                setCategories(response.data.categories)
            }
        }
        catch (error) {
            console.log(chalk.red(error))
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return categories
}