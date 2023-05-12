import React from "react"
import { Outlet, Link } from "react-router-dom"
import "./Style.css"
import { Layout as LayoutAntd, Menu, Avatar, Dropdown, Button, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Header, Content, Footer } = LayoutAntd;
/**
 * 
 * @param {User} user Авторизованный на момент попадания на страницу пользователь
 * @param {User} setUser Метод для изменения пользователя на странице
 * @returns Макет страницы сайта
 */
const Layout = ({ user, setUser }) => {
    let dropdownItems;
    let layoutItems;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const logoff = async (event) => {
        setIsModalOpen(false);
        event.preventDefault()

        const requestOptions = {
            method: "POST",
        }
        return await fetch("api/account/logoff", requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    setUser({ isAuthenticated: false, userName: "" });
                }
                window.location.assign("/");
            })
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    if (user.isAuthenticated) {
        dropdownItems = [
            {
                label: <Link onClick={showModal}>Выход</Link>,
                key: '1',
            },
        ];
    }
    else {
        dropdownItems = [
            {
                label: <a href="/login">Войти в систему</a>,
                key: '1',
            },
            {
                type: 'divider',
            },
            {
                label: <a href="/register">Зарегистрироваться</a>,
                key: '2',
            },
        ];
    }

    if (user.userRole == "admin") {
        layoutItems = [
            {
                label: <Link to="/">Главная</Link>,
                key: "1",
            },
            {
                label: <Link to="/products">Товары</Link>,
                key: "2",
            },
            {
                label: <Link to="/productCreate">Создание товара</Link>,
                key: "3",
            },
            {
                label: <Link to="/categories">Категории</Link>,
                key: "4",
            },
            {
                label: <Link to="/categoryCreate">Создание категории</Link>,
                key: "5",
            },
            {
                label: <Link to="/manufacturers">Вендоры</Link>,
                key: "6",
            },
            {
                label: <Link to="/manufacturerCreate">Создание вендора</Link>,
                key: "7",
            },
        ];
    }
    else {
        layoutItems = [
            {
                label: <Link to="/">Главная</Link>,
                key: "1",
            },
            {
                label: <Link to="/products">Товары</Link>,
                key: "2",
            },
        ];
    }
    return (
        <>
            <LayoutAntd className="layout" >
                <Header className="header">
                    <div
                        style={{
                            float: "right",
                            color: "#fff",
                        }}
                    >
                        {user.userRole == "admin" ? (
                            <Avatar style={{ backgroundColor: "#cc6600", marginRight: "5px" }} shape="square" icon={<UserOutlined />} />
                        ) : (
                            <Avatar style={{ backgroundColor: "#cc6600", marginRight: "5px" }} icon={<UserOutlined />} />
                        )}
                        <Dropdown className="dropdown"
                            menu={{
                                items: dropdownItems                              
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                {user.isAuthenticated ? (
                                    <span>{user.userName}</span>
                                ) : (
                                    <span>Гость</span>
                                )}
                            </a>
                        </Dropdown>
                    </div>
                <Menu
                    style={{
                        color: "#fff",
                    }}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={layoutItems}
                />
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <div className="site-layout-content">
                    <Outlet />
                </div>
            </Content>
            <Modal
                title="Выход"
                open={isModalOpen}
                onOk={logoff}
                onCancel={handleCancel}
                footer={[
                    <Button onClick={logoff}>
                        Да
                    </Button>,
                    <Button onClick={handleCancel}>
                        Нет
                    </Button>
                ]}
            >
                <p>Вы действительно хотите выйти?</p>
            </Modal>
            <Footer className="footer">
                InernetShop Neveykin ©2023
            </Footer>
            </LayoutAntd>
        </>
    );
};
export default Layout;