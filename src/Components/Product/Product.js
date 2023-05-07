import React, { useEffect } from "react"
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import "./Style.css"
const { Meta } = Card;
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

    let actionsItems;
    if (user.userRole == "admin") {
        actionsItems = [
            <EditOutlined className="icon" />,
            <DeleteOutlined className="icon" />,
        ];
    }
    else {
        actionsItems = [
            <ShoppingCartOutlined className="icon" />,
        ];
    }

    return (
        <React.Fragment>
            <h3>Список товаров</h3>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
                <Breadcrumb.Item>Регистрация</Breadcrumb.Item>
                <Breadcrumb.Item>Товары</Breadcrumb.Item>
                <Breadcrumb.Item>Вход</Breadcrumb.Item>
                <Breadcrumb.Item>Выход</Breadcrumb.Item>
            </Breadcrumb>
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
                <Card
                    className="card"
                    cover={
                        <img
                            alt="Изображения нет"
                            src={image}
                        />
                    }
                    actions={actionsItems}
                >
                    <Meta title={categoryName} />
                    <Meta title={name} />
                    <Meta title={manufacturerName} />
                    <Meta title={price} />
                </Card>
                //<div className="Product" key={id} id={id}>
                //    <strong > {id}:
                //        <img src={image}></img>,
                //        {name},
                //        {categoryName},
                //        {manufacturerName},
                //        {price}
                //        {user.userRole == "admin" ? (
                //            <button onClick={() => deleteItem({
                //                id
                //            })}>Удалить</button>
                //        ) : (
                //            ""
                //        )}
                //    </strong>
                //</div>
                ))}
        </React.Fragment>
    )
}
export default ProductDTO