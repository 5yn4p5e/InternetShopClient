﻿import { useEffect } from "react"
export let categoriesList = [ { } ]
const CategoryList = () => {
    useEffect(() => {
        const getCategories = async () => {
            const requestOptions = {
                method: "GET"
            }
            return await fetch("api/Category/",

                requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log("Data:", data)
                        categoriesList = data
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getCategories()
    })
}
export default CategoryList