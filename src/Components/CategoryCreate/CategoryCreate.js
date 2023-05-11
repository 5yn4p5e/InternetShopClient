import React from "react"
import {
    Button,
    Form,
    Input,
} from 'antd';
import { useState } from 'react';
import "./Style.css";

const CategoryCreate = ({ addCategory, user }) => {
    const [nameOfCategory, setNameOfCategory] = useState("");

    const handleSubmit = () => {
        const newCategory =
        {
            name: nameOfCategory,
        }
        const createCategory = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newCategory),
            };
            const response = await fetch("api/Category", requestOptions);

            return await response.json().then((data) => {
                console.log(data)
                if (response.ok) {
                    addCategory(data)
                }
            },
                (error) => console.log(error))
        }
        createCategory()
    }
    return (
        <React.Fragment>
            {user.userRole == "admin" ? (
                <>
                    <h3 className="orangeColor">Создание новой категории</h3>
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
                            <label>Имя категории:</label><br />
                            <Input className="orangeColor" onInput={e => setNameOfCategory(e.target.value)} />
                        </Form.Item>
                        <Button className="orangeColor" onClick={handleSubmit}>
                            Добавить новую категорию на сайт
                        </Button>
                    </Form>
                </>
            ) : (
                ""
            )}
        </React.Fragment >
    )
}
export default CategoryCreate