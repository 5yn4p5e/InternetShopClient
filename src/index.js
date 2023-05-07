import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProductDTO from "./Components/Product/Product"
import ProductCreate from "./Components/ProductCreate/ProductCreate"
import Layout from "./Components/Layout/Layout"
import Login from "./Components/Login/Login"
import Logoff from "./Components/Logoff/Logoff"
import Register from "./Components/Register/Register"
import CategoriesList from "./Components/CategoryList/CategoryList"
import ManufacturersList from "./Components/ManufacturerList/ManufacturerList"

const App = () => {
    const [products, setProducts] = useState([])
    const addProduct = (product) => setProducts([...products, product])
    const removeProduct = (removeId) => setProducts(products.filter(({ id }) => id
        !== removeId))
    const [user, setUser] = useState({ isAuthenticated: false, userName: "", userRole: "" })
    useEffect(() => {
        const getUser = async () => {
            return await fetch("api/account/isauthenticated")
                .then((response) => {
                    if (response.status === 401)
                    {
                        setUser({ isAuthenticated: false, userName: "", userRole: "" })
                    }
                    return response.json()
                })
                .then(
                    (data) => {
                        if (
                            typeof data !== "undefined" &&
                            typeof data.userName !== "undefined" &&
                            typeof data.userRole !== "undefined"
                        ) {
                            setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getUser()
    }, [setUser])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout user={user} />}>
                    <Route index element={<h3>Main page</h3>} />
                    <Route
                        path="/products"
                        element={
                            <>
                                <CategoriesList />
                                <ManufacturersList />
                                <ProductDTO
                                    products={products}
                                    setProducts={setProducts}
                                    removeProduct={removeProduct}
                                    user={user}
                                />
                            </>

                        }
                        />
                    <Route
                        path="/login"
                        element={<Login user={user} setUser={setUser} />}
                    />
                    <Route path="/logoff" element={<Logoff setUser={setUser} />} />
                    <Route
                        path="/register"
                        element={<Register user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/productCreate"
                        element={
                            <>
                                <CategoriesList />
                                <ManufacturersList />
                                <ProductCreate
                                    user={user}
                                    addProduct={addProduct}
                                />
                            </>

                        }
                    />
                    <Route path="*" element={<h3>404</h3>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <App />
)