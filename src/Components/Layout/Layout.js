import React from "react"
import { Outlet, Link } from "react-router-dom"
import "./Style.css"
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
const { Header, Content, Footer } = LayoutAntd;
const Layout = ({ user }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <LayoutAntd className="layout">
            <Header>
                <div
                    style={{
                        float: "right",
                        color: "rgba(255, 255, 255, 0.65)",
                    }}
                >
                    {user.isAuthenticated ? (
                        <strong>{user.userName}</strong>
                    ) : (
                        <strong>Гость</strong>
                    )}
                </div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['3']}
                    items={[
                        {
                            label: <Link to="/">Главная</Link>,
                            key: "1",
                        },
                        {
                            label: <Link to="/register">Регистрация</Link>,
                            key: "2",
                        },
                        {
                            label: <Link to="/products">Товары</Link>,
                            key: "3",
                        },
                        {
                            label: <Link to="/login">Вход</Link>,
                            key: "4",
                        },
                        {
                            label: <Link to="/logoff">Выход</Link>,
                            key: "5",
                        }
                    ]}
                />
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    {/*<Breadcrumb.Item>Главная</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>Регистрация</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>Товары</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>Вход</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>Выход</Breadcrumb.Item>*/}
                </Breadcrumb>
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                InernetShop Neveykin ©2023
            </Footer>
        </LayoutAntd>
    );
};
export default Layout;