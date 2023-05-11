import React from "react"
import {
    Button,
    Form,
    Input,
} from 'antd';
import { useState } from 'react';
import "./Style.css";

const ManufacturerCreate = ({ addMnaufacturer, user }) => {
    const [nameOfManufacturer, setNameOfManufacturer] = useState("");
    const [addressOfManufacturer, setAddressOfManufacturer] = useState("");
    const handleSubmit = () => {
        const newManufacturer =
        {
            name: nameOfManufacturer,
            address: addressOfManufacturer,
        }
        const createManufacturer = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newManufacturer),
            };
            const response = await fetch("api/Manufacturer", requestOptions);

            return await response.json().then((data) => {
                console.log(data)
                if (response.ok) {
                    addMnaufacturer(data)
                }
            },
                (error) => console.log(error))
        }
        createManufacturer()
    }
    return (
        <React.Fragment>
            {user.userRole == "admin" ? (
                <>
                    <h3 className="orangeColor">Добавление вендора</h3>
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
                            <label>Имя вендора:</label><br />
                            <Input className="orangeColor" onInput={e => setNameOfManufacturer(e.target.value)} />
                        </Form.Item>
                        <Form.Item className="orangeColor">
                            <label>Адрес вендора:</label><br />
                            <Input className="orangeColor" onInput={e => setAddressOfManufacturer(e.target.value)} />
                        </Form.Item>
                        <Button className="orangeColor" onClick={handleSubmit}>
                            Добавить нового вендора на сайт
                        </Button>
                    </Form>
                </>
            ) : (
                ""
            )}
        </React.Fragment >
    )
}
export default ManufacturerCreate