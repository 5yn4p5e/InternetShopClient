import React from "react"
import { categoryList } from "../CategoryList/CategoryList"
import { manufacturerList } from "../ManufacturerList/ManufacturerList"
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import "./Style.css";
import { useState } from 'react';

const ProductCreate = ({ addProduct, user }) => {
    const [nameOfProduct, setNameOfProduct] = useState("");
    const [categoryId, setCategoryId] = useState(-1);
    const [manufId, setManufId] = useState(-1);
    const [price, setPrice] = useState(-1);
    const [linkOfImage, setLinkOfImage] = useState("");

    const handleSubmit = () => {
        const productDTO =
        {
            name: nameOfProduct,
            categoryId: categoryId,
            manufacturerId: manufId,
            price: price,
            image: linkOfImage,
        }
        const createProduct = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(productDTO),
            };
            const response = await fetch("api/Product", requestOptions);

            return await response.json().then((data) => {
                console.log(data)
                if (response.ok) {
                        addProduct(data);
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
                    <h3 className="orangeColor">Создание нового товара</h3>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item className="orangeColor">
                            <label>Имя товара:</label><br />
                            <Input className="orangeColor" onInput={e => setNameOfProduct(e.target.value)} />
                        </Form.Item>
                        <Form.Item className="orangeColor">
                            <label>Имя категории:</label><br />
                            <Select className="orangeColor" onChange={setCategoryId}>
                                {categoryList.map(({ id, name }) => (
                                    <option className="orangeColor" key={id} value={id}>{name}</option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item className="orangeColor">
                            <label>Имя производителя:</label><br />
                            <Select className="orangeColor" onChange={setManufId}>
                                {manufacturerList.map(({ id, name }) => (
                                    <option className="orangeColor" key={id} value={id}>{name}</option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item className="orangeColor">
                            <label>Цена товара (в рублях): </label><br />
                            <InputNumber className="orangeColor" onChange={setPrice} min={1} max={9999999} defaultValue={-1} />
                        </Form.Item>
                        <Form.Item className="orangeColor">
                            <label>Ссылка на изображение (в интернете):</label><br />
                            <Input className="orangeColor" onInput={e => setLinkOfImage(e.target.value)} />
                        </Form.Item>
                        <Button className="orangeColor" onClick={handleSubmit}>
                            Добавить новый товар на сайт
                        </Button>
                    </Form>
                </>
                ) : (
                    ""
            )}
        </React.Fragment >
    )
}
export default ProductCreate