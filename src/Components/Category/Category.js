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

/**
 * 
 * @param {Categories} categories Список категорий
 * @param {Categories} setCategories Метод изменения списка категорий
 * @param {Category} removeCategory Метод удаления списка категорий
 * @param {User} user Авторизованный на момент попадания на страницу пользователь
 * @returns Страница /categories, заполненная категориями с возможностью редактирования для администратора
 */
const Category = ({ categories, setCategories, removeCategory, user }) => {
    useEffect(() => {
        const getCategories = async () => {
            const requestOptions = {
                method: "GET"
            }
            return await fetch("api/Category",

                requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log("Data:", data)
                        setCategories(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getCategories()
    }, [setCategories])

    const [categId, setCategId] = useState(-1);
    const [nameOfCategory, setNameOfCategory] = useState("");

    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const showInfoModal = (id, name) => {
        setCategId(id);
        setNameOfCategory(name);
        setIsModalInfoOpen(true);
    };
    const handleInfoCancel = () => {
        setCategId(-1);
        setNameOfCategory("");
        setIsModalInfoOpen(false);
    };

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const showEditModal = (id, name) => {
        setCategId(id);
        setNameOfCategory(name);
        setIsModalEditOpen(true);
    };

    const [isModalApproveEditOpen, setIsModalApproveEditOpen] = useState(false);
    const showApproveEditModal = () => {
        setIsModalApproveEditOpen(true);
    }
    const handleEditItemCancel = () => {
        setComponentEditDisabled(true);
        setIsModalApproveEditOpen(false);
    }
    const handleEditItemSubmit = async () => {
        setComponentEditDisabled(true);
        setIsModalApproveEditOpen(false);
        setIsModalEditOpen(false);
        const categ =
        {
            id: categId,
            name: nameOfCategory,
        }
        const requestOptions =
        {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(categ),
        }
        const response = await fetch(`api/Category/${categId}`, requestOptions);
        return await response.json()
            .then((data) => {
                console.log(data)
                if (response.ok) {
                    setCategories(data)
                }
                setCategId(-1);
                setNameOfCategory("");
            }, (error) => console.log(error))
    }

    const handleEditCancel = () => {
        setCategId(-1);
        setNameOfCategory("");
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
        return await fetch(`api/Category/${deletionId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeCategory(deletionId);
                }
                setDeletionId(-1);
            }, (error) => console.log(error))
    }
    const [componentEditDisabled, setComponentEditDisabled] = useState(true);


    return (
        <React.Fragment>
            {user.userRole == "admin" ? (
                <>
                    <h3 className="orangeColor">Список категорий</h3>
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
                        dataSource={categories}
                        renderItem={(category) => (
                            <List.Item className="listItem">
                                <Card
                                    key={category.id} id={category.id}
                                    className="card"
                                    actions=
                                    {[
                                        <EditOutlined onClick={() => showEditModal(category.id, category.name)} className="icon" />,
                                        <DeleteOutlined onClick={() => showDeleteModal(category.id)} className="icon" />,
                                    ]}
                                >
                                    <Meta className="meta" title={category.id} />
                                    <Meta onClick={() => showInfoModal(category.id, category.name)} className="meta" title={category.name} />
                                </Card>
                            </List.Item>
                        )}
                    />

                    <Modal
                        title="Подробная информация о категории"
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
                                    <span>Идентификатор категории: {categId}</span>
                                </Form.Item>
                                <Form.Item disabled="true">
                                    <span>Название категории: {nameOfCategory}</span>
                                </Form.Item>
                            </Form>
                        </>
                    </Modal>

                    <Modal
                        title="Окно редактирования товара"
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
                                    <label>Имя категории:</label><br />
                                    <Input onInput={e => setNameOfCategory(e.target.value)} value={nameOfCategory} />
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
            ): (
                    ""
                )}
        </React.Fragment>
    )
}
export default Category