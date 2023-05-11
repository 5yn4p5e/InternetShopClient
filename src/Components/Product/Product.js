import React, { useEffect } from "react"
import { categoryList } from "../CategoryList/CategoryList"
import { manufacturerList } from "../ManufacturerList/ManufacturerList"
import {
    Button,
    Checkbox,
    Form,
    Input,
    InputNumber,
    Select,
    Tabs,
    Modal
} from 'antd';
import { EditOutlined, EllipsisOutlined, ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import {  Card, List } from 'antd';
import "./Style.css";
import { useState } from 'react';
const { Meta } = Card;
const ProductDTO = ({ products, setProducts, removeProduct, user }) => {
    useEffect(() => {
        const getProducts = async () => {
            const requestOptions = {
                method: "GET"
            }
            return await fetch("api/Product",

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

    const getCustomList = (baseEntities) => {
        return(
        <React.Fragment><List className="list"
            grid={{
                gutter: 20,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5,
                xxl: 8,
            }}
            dataSource={baseEntities}
            renderItem={(baseEntity) => (
                <List.Item className="listItem">
                    <Card
                        key={baseEntity.id} id={baseEntity.id}
                        className="card"
                        cover={
                            <img className="image"
                                alt="Изображения нет"
                                src={baseEntity.image}
                            />
                        }
                        actions={user.userRole == "admin" ? (
                            [
                                <EllipsisOutlined onClick={() => showInfoModal(
                                    baseEntity.name, baseEntity.categoryName,
                                    baseEntity.manufacturerName, baseEntity.price
                                )} className="icon" />,
                                <EditOutlined onClick={() => showEditModal(
                                    baseEntity.id, baseEntity.name, baseEntity.categoryId,
                                    baseEntity.categoryName, baseEntity.manufacturerId,
                                    baseEntity.manufacturerName, baseEntity.price, baseEntity.image
                                )} className="icon" />,
                                <DeleteOutlined onClick={() => showDeleteModal(baseEntity.id)} className="icon" />,
                            ]
                        ) : (
                            [
                                <EllipsisOutlined onClick={() => showInfoModal(
                                    baseEntity.name, baseEntity.categoryName,
                                    baseEntity.manufacturerName, baseEntity.price
                                )} className="icon" />,
                                <ShoppingCartOutlined className="icon" />,
                            ]
                        )}
                    >
                        <Meta className="meta" title={baseEntity.manufacturerName} />
                        <Meta className="meta" title={baseEntity.price} />
                    </Card>
                </List.Item>
            )}
            /></React.Fragment>
        )
    }
    const getTabs = (categId, nameOfCateg, baseEntities) => {
        let initialTabItems = [];
        initialTabItems.push({
            key: 0,
            label: "Все вендоры",
            children: getCustomList(baseEntities),
        });

        manufacturerList.map(({ id, name }) => {
            let productsOnTabs = [];
            productsOnTabs = baseEntities.filter((baseEntity) => baseEntity.manufacturerId == id)
            initialTabItems.push(
                {
                    key: id,
                    label: name,
                    children: getCustomList(productsOnTabs),
                }
            )
        });
        return (
            {
                key: categId,
                label: nameOfCateg,
                children: <React.Fragment><Tabs tabPosition="left" defaultActiveKey="0"
                    items={initialTabItems} /></React.Fragment>,
            }
        )
    }
    let externalTabItems = [];
    externalTabItems.push(getTabs(0, "Все категории", products));
    categoryList.map(({ id, name }) => {
        let productsOnTabs = [];
        productsOnTabs = products.filter((product) => product.categoryId == id)
        externalTabItems.push(getTabs(id, name, productsOnTabs));
    });

    const [prId, setPrId] = useState(-1);
    const [nameOfProduct, setNameOfProduct] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [manufId, setManufId] = useState("");
    const [manufName, setManufName] = useState("");
    const [price, setPrice] = useState(-1);
    const [linkOfImage, setLinkOfImage] = useState("");

    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const showInfoModal = (name, catName, manufName, price) => {
        setNameOfProduct(name);
        setCategoryName(catName);
        setManufName(manufName);
        setPrice(price);
        setIsModalInfoOpen(true);
    };
    const handleInfoCancel = () => {
        setNameOfProduct("");
        setCategoryName("");
        setManufName("");
        setPrice(-1);
        setIsModalInfoOpen(false);
    };

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);    
    const showEditModal = (id, name, catId, catName, manufId, manufName, priceProd, imageLink) => {
        setPrId(id);
        setNameOfProduct(name);
        setCategoryId(catId);
        setCategoryName(catName);
        setManufId(manufId);
        setManufName(manufName);
        setPrice(priceProd);
        setLinkOfImage(imageLink);
        setIsModalEditOpen(true);
    };

    const [isModalApproveEditOpen, setIsModalApproveEditOpen] = useState(false);
    const showApproveEditModal = () => {
        setIsModalApproveEditOpen(true);
    }
    const handleEditItemCancel = () => {
        setPrId(-1);
        setNameOfProduct("");
        setCategoryId(-1);
        setCategoryName("");
        setManufId(-1);
        setManufName("");
        setPrice(-1);
        setLinkOfImage("");
        setComponentEditDisabled(true);
        setIsModalApproveEditOpen(false);
    }
    const handleEditItemSubmit = async () => {
        setComponentEditDisabled(true);
        setIsModalApproveEditOpen(false);
        setIsModalEditOpen(false);
        const productDTO =
        {
            id: prId,
            name: nameOfProduct,
            categoryId: categoryId,
            manufacturerId: manufId,
            price: price,
            image: linkOfImage,
        }
        const requestOptions =
        {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(productDTO),
        }
        const response = await fetch(`api/Product/${prId}`, requestOptions);
        return await response.json()
            .then((data) => {
                console.log(data)
                if (response.ok) {
                    setProducts(data)
                }
                setPrId(-1);
                setNameOfProduct("");
                setCategoryId(-1);
                setCategoryName("");
                setManufId(-1);
                setManufName("");
                setPrice(-1);
                setLinkOfImage("");
            }, (error) => console.log(error))
    }

    const handleEditCancel = () => {
        setPrId(-1);
        setNameOfProduct("");
        setCategoryId(-1);
        setCategoryName("");
        setManufId(-1);
        setManufName("");
        setPrice(-1);
        setLinkOfImage("");
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
        return await fetch(`api/Product/${deletionId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeProduct(deletionId);
                }
                setDeletionId(-1);
            }, (error) => console.log(error))
    }
    const [componentEditDisabled, setComponentEditDisabled] = useState(true);

    return (
        <React.Fragment>
            <h3 className="orangeColor">Список товаров</h3>
            <Tabs defaultActiveKey="0" items={externalTabItems}/>

            <Modal
                title="Подробная информация о товаре"
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
                            <span>Имя товара: {nameOfProduct}</span>
                        </Form.Item>
                        <Form.Item disabled="true">
                            <span>Категория: {categoryName}</span>
                        </Form.Item>
                        <Form.Item disabled="true">
                            <span>Производитель: {manufName}</span>
                        </Form.Item>
                        <Form.Item disabled="true">
                            <span>Цена: {price} руб.</span>
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
                            <label>Имя товара:</label><br />
                            <Input onInput={e => setNameOfProduct(e.target.value)} value={nameOfProduct}/>
                        </Form.Item>
                        <Form.Item>
                            <label>Имя категории:</label><br />
                            <Select onChange={setCategoryId} value={categoryId}>
                                {categoryList.map(({ id, name }) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <label>Имя производителя:</label><br />
                            <Select onChange={setManufId} value={manufId}>
                                {manufacturerList.map(({ id, name }) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <label>Цена товара (в рублях): </label><br/>
                            <InputNumber onChange={setPrice} min={1} max={9999999} value={price} />
                        </Form.Item>
                        <Form.Item>
                            <label>Ссылка на изображение (в интернете):</label><br />
                            <Input onInput={e => setLinkOfImage(e.target.value)} value={linkOfImage} />
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
                <p>Вы точно хотите изменить параметры данного товара на сайте?</p>
            </Modal>

            <Modal
                title="Подтвердите действие!"
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
                <p>Вы точно хотите удалить данный товар с сайта?</p>
            </Modal>
        </React.Fragment>
    )
}
export default ProductDTO