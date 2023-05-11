import { useEffect } from "react"
export var categoryList = [{}]
const CategoryList = () => {
    useEffect(() => {
        const getCategs = async () => {
            const requestOptions = {
                method: "GET"
            }
            return await fetch("api/Category/",

                requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log("Data:", data)
                        categoryList = data
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getCategs()
    })
}
export default CategoryList