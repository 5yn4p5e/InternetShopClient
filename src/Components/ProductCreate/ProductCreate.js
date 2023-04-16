import React from "react"
import { categoriesList } from "../CategoryList/CategoryList"
import { manufacturersList } from  "../ManufacturerList/ManufacturerList"
const ProductCreate = ({ addProduct, user }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const nameOfProduct = e.target.elements.nameOfProduct.value
        const categoryId = e.target.elements.category.value
        const manufId = e.target.elements.manufacturer.value
        const price = e.target.elements.price.value
        const linkOfImage = e.target.elements.image.value
        const productDTO =
        {
            name: nameOfProduct,
            categoryId: categoryId,
            manufacturerId: manufId,
            price: price,
            image: linkOfImage
        }
        const createProduct = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(productDTO)
            };
            const response = await fetch("api/Product/", requestOptions);

            return await response.json().then((data) => {
                    console.log(data)
                    if (response.ok) {
                        addProduct(data)
                    }
                },
                    (error) => console.log(error))
        }
        createProduct()
    }
    return (
        <React.Fragment>
            {user.userRole == "admin" ? (
                <>
                    <h3>Создание нового товара</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="nameOfProduct" placeholder="Имя товара:" /><br />

                        <label>Укажите категорию товара:</label>
                        <select name="category">
                            {categoriesList.map(({ id, name }) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select><br />

                        <label>Укажите производителя:</label> 
                        <select name="manufacturer">
                            {manufacturersList.map(({ id, name }) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select><br />

                        <input type="number" step="1" min="1" name="price" placeholder="Цена:" /><br />

                        <input type="text" name="image" placeholder="Ссылка на изображение:" /><br />

                        <button type="submit">Создать</button>
                    </form>
                </>
                ) : (
                    ""
            )}
        </React.Fragment >
    )
}
export default ProductCreate