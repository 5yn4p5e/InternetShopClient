import { useEffect } from "react"
export var manufacturerList = [{}]
const ManufacturerList = () => {
    useEffect(() => {
        const getManufs = async () => {
            const requestOptions = {
                method: "GET"
            }
            return await fetch("api/Manufacturer/",

                requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log("Data:", data)
                        manufacturerList = data
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getManufs()
    })
}
export default ManufacturerList