import React, { useEffect } from "react"
import "./Style.css"
const ProductDTO = ({ products, setProducts, removeProduct, user }) => {
    useEffect(() => {
        const getProducts = async () => {
            const requestOptions = {
                method: "GET"
            }
            return await fetch("api/Product/",

                requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log("Data:", data)
                        setProducts(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getProducts()
    }, [setProducts])

    const deleteItem = async ({ id }) => {
        const requestOptions =
        {
            method: "DELETE"
        }
        return await fetch("api/Product/${id}", requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeProduct(id);
                }
            }, (error) => console.log(error))
    }

    return (
        <React.Fragment>
            <h3>Список товаров</h3>
            {products.map(
                (
                    {
                        id,
                        name,
                        categoryName,
                        manufacturerName,
                        price,
                        image
                    }
                ) => (
                <div className="Product" key={id} id={id}>
                    <strong > {id}:
                        <img src={image}></img>,
                        {name},
                        {categoryName},
                        {manufacturerName},
                        {price}
                        {user.userRole == "admin" ? (
                            <button onClick={() => deleteItem({
                                id
                            })}>Удалить</button>
                        ) : (
                            ""
                        )}
                    </strong>
                </div>
                ))}
        </React.Fragment>
    )
}
export default ProductDTO