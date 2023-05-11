import React, { useEffect } from "react"
import {
    Button,
    Checkbox,
    Form,
    Input,
    Modal
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, List } from 'antd';
import { useState } from 'react';
import "./Style.css";

const { Meta } = Card;
const Manufacturer = ({ manufacturers, setManufacturers, removeManufacturer, user }) => {
    useEffect(() => {
        const getManufacturers = async () => {
            const requestOptions = {
                method: "GET"
            }
            return await fetch("api/Manufacturer",

                requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log("Data:", data)
                        setManufacturers(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getManufacturers()
    }, [setManufacturers])

    const [manufId, setManufId] = useState(-1);
    const [nameOfManufacturer, setNameOfManufacturer] = useState("");
    const [addressOfManufacturer, setAddressOfManufacturer] = useState("");

    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const showInfoModal = (id, name, address) => {
        setManufId(id);
        setNameOfManufacturer(name);
        setAddressOfManufacturer(address);
        setIsModalInfoOpen(true);
    };
    const handleInfoCancel = () => {
        setManufId(-1);
        setNameOfManufacturer("");
        setAddressOfManufacturer("");
        setIsModalInfoOpen(false);
    };

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const showEditModal = (id, name, address) => {
        setManufId(id);
        setNameOfManufacturer(name);
        setAddressOfManufacturer(address);
        setIsModalEditOpen(true);
    };

    const [isModalApproveEditOpen, setIsModalApproveEditOpen] = useState(false);
    const showApproveEditModal = () => {
        setIsModalApproveEditOpen(true);
    }
    const handleEditItemCancel = () => {
        setManufId(-1);
        setNameOfManufacturer("");
        setAddressOfManufacturer("");
        setComponentEditDisabled(true);
        setIsModalApproveEditOpen(false);
    }
    const handleEditItemSubmit = async () => {
        setComponentEditDisabled(true);
        setIsModalApproveEditOpen(false);
        setIsModalEditOpen(false);
        const manuf =
        {
            id: manufId,
            name: nameOfManufacturer,
            address: nameOfManufacturer,
        }
        const requestOptions =
        {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(manuf),
        }
        const response = await fetch(`api/Manufacturer/${manufId}`, requestOptions);
        return await response.json()
            .then((data) => {
                console.log(data)
                if (response.ok) {
                    setManufacturers(data)
                }
                setManufId(-1);
                setNameOfManufacturer("");
                setAddressOfManufacturer("");
            }, (error) => console.log(error))
    }

    const handleEditCancel = () => {
        setManufId(-1);
        setNameOfManufacturer("");
        setComponentEditDisabled(true);
        setIsModalEditOpen(false);
    };

    const [deletionId, setDeletionId] = useState(-1);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const showDeleteModal = (value) => {
        setDeletionId(value);
        setIsModalDeleteOpen(true);
    };
    const handleDeleteItemCancel = () => {
        setDeletionId(-1);
        setIsModalDeleteOpen(false);
    };

    const handleDeleteItemSubmit = async () => {
        setIsModalDeleteOpen(false);
        const requestOptions =
        {
            method: "DELETE"
        }
        return await fetch(`api/Manufacturer/${deletionId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeManufacturer(deletionId);
                }
                setDeletionId(-1);
            }, (error) => console.log(error))
    }
    const [componentEditDisabled, setComponentEditDisabled] = useState(true);


    return (
        <React.Fragment>
            {user.userRole == "admin" ? (
                <>
                    <h3 className="orangeColor">Список вендора</h3>
                    <List className="list"
                        grid={{
                            gutter: 20,
                            xs: 2,
                            sm: 2,
                            md: 4,
                            lg: 6,
                            xl: 8,
                            xxl: 10,
                        }}
                        dataSource={manufacturers}
                        renderItem={(manufacturer) => (
                            <List.Item className="listItem">
                                <Card
                                    key={manufacturer.id} id={manufacturer.id}
                                    className="card"
                                    actions=
                                    {[
                                        <EditOutlined onClick={() => showEditModal(manufacturer.id, manufacturer.name, manufacturer.address)} className="icon" />,
                                        <DeleteOutlined onClick={() => showDeleteModal(manufacturer.id)} className="icon" />,
                                    ]}
                                >
                                    <Meta className="meta" title={manufacturer.id} />
                                    <Meta onClick={() => showInfoModal(manufacturer.id, manufacturer.name, manufacturer.address)} className="meta" title={manufacturer.name} />
                                    <Meta onClick={() => showInfoModal(manufacturer.id, manufacturer.name, manufacturer.address)} className="meta" title={manufacturer.address} />
                                </Card>
                            </List.Item>
                        )}
                    />

                    <Modal
                        title="Подробная информация о вендоре"
                        open={isModalInfoOpen}
                        onCancel={handleInfoCancel}
                        footer={[
                            <Button onClick={handleInfoCancel}>
                                Закрыть
                            </Button>
                        ]}
                    >
                        <>
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
                                <br />
                                <Form.Item disabled="true">
                                    <span>Идентификатор категории: {manufId}</span>
                                </Form.Item>
                                <Form.Item disabled="true">
                                    <span>Имя вендора: {nameOfManufacturer}</span>
                                </Form.Item>
                                <Form.Item disabled="true">
                                    <span>Адрес вендора: {addressOfManufacturer}</span>
                                </Form.Item>
                            </Form>
                        </>
                    </Modal>

                    <Modal
                        title="Окно редактирования вендора"
                        open={isModalEditOpen}
                        onOk={showApproveEditModal}
                        onCancel={handleEditCancel}
                        footer={[
                            <Button onClick={showApproveEditModal} disabled={componentEditDisabled}>
                                Подтвердить редактирование
                            </Button>,
                            <Button onClick={handleEditCancel}>
                                Отменить действие
                            </Button>
                        ]}
                    >
                        <>
                            <br />
                            <Checkbox
                                checked={componentEditDisabled}
                                onChange={(e) => setComponentEditDisabled(e.target.checked)}
                            >
                                Доступность редактирования
                            </Checkbox>
                            <br /><br />
                            <Form
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="horizontal"
                                disabled={componentEditDisabled}
                                style={{
                                    maxWidth: 600,
                                }}
                            >
                                <Form.Item>
                                    <label>Имя вендора:</label><br />
                                    <Input onInput={e => setNameOfManufacturer(e.target.value)} value={nameOfManufacturer} />
                                </Form.Item>
                                <Form.Item>
                                    <label>Адрес вендора:</label><br />
                                    <Input onInput={e => setAddressOfManufacturer(e.target.value)} value={addressOfManufacturer} />
                                </Form.Item>
                            </Form>
                        </>
                    </Modal>

                    <Modal
                        title="Подтвердите действие!"
                        open={isModalApproveEditOpen}
                        onOk={handleEditItemSubmit}
                        onCancel={handleEditItemCancel}
                        footer={[
                            <Button onClick={handleEditItemSubmit}>
                                Да, я осознаю все последствия
                            </Button>,
                            <Button onClick={handleEditItemCancel}>
                                Нет, я передумал
                            </Button>
                        ]}
                    >
                        <p>Вы точно хотите переименовать данную категорию на сайте?</p>
                    </Modal>

                    <Modal
                        title="УДАЛЕНИЕ СПРАВОЧНИКА"
                        open={isModalDeleteOpen}
                        onOk={handleDeleteItemSubmit}
                        onCancel={handleDeleteItemCancel}
                        footer={[
                            <Button onClick={handleDeleteItemSubmit}>
                                Да, я осознаю все последствия
                            </Button>,
                            <Button onClick={handleDeleteItemCancel}>
                                Нет, я передумал
                            </Button>
                        ]}
                    >
                        <p>Удалив справочник, пропадут все связанные с ним товары. Вы уверены?</p>
                    </Modal>
                </>
            ) : (
                ""
            )}
        </React.Fragment>
    )
}
export default Manufacturer