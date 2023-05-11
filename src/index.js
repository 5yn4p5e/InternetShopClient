import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import CategoryList from "./Components/CategoryList/CategoryList"
import ManufacturerList from "./Components/ManufacturerList/ManufacturerList"
import Category from "./Components/Category/Category"
import Manufacturer from "./Components/Manufacturer/Manufacturer"
import ProductDTO from "./Components/Product/Product"
import CategoryCreate from "./Components/CategoryCreate/CategoryCreate"
import ManufacturerCreate from "./Components/ManufacturerCreate/ManufacturerCreate"
import ProductCreate from "./Components/ProductCreate/ProductCreate"
import Layout from "./Components/Layout/Layout"
import Login from "./Components/Login/Login"
import Logoff from "./Components/Logoff/Logoff"
import Register from "./Components/Register/Register"

const App = () => {
    const [entities, setEntities] = useState([])
    const addEntity = (entity) => setEntities([...entities, entity])
    const removeEntity = (removeId) => setEntities(entities.filter(({ id }) => id
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
                <Route path="/"
                    element={<Layout user={user} setUser={setUser} />}>
                    <Route index element={<h3 className="orangeColor">Main page</h3>} />
                    <Route
                        path="/products"
                        element={
                            <>
                                <CategoryList />
                                <ManufacturerList />
                                <ProductDTO
                                    products={entities}
                                    setProducts={setEntities}
                                    removeProduct={removeEntity}
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
                                <CategoryList />
                                <ManufacturerList />
                                <ProductCreate
                                    addProduct={addEntity}
                                    user={user}
                                />
                            </>

                        }
                    />
                    <Route
                        path="/categories"
                        element={
                            <>
                                <Category
                                    categories={entities}
                                    setCategories={setEntities}
                                    removeCategory={removeEntity}
                                    user={user}
                                />
                            </>

                        }
                    />
                    <Route
                        path="/categoryCreate"
                        element={
                            <>
                                <CategoryCreate
                                    addCategory={addEntity}
                                    user={user}
                                />
                            </>

                        }
                    />
                    <Route
                        path="/manufacturers"
                        element={
                            <>
                                <Manufacturer
                                    manufacturers={entities}
                                    setManufacturers={setEntities}
                                    removeManufacturer={removeEntity}
                                    user={user}
                                />
                            </>

                        }
                    />
                    <Route
                        path="/manufacturerCreate"
                        element={
                            <>
                                <ManufacturerCreate
                                    addManufacturer={addEntity}
                                    user={user}
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