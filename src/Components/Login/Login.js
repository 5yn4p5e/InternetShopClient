import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Login = ({ user, setUser }) => {
    const [errorMessages, setErrorMessages] = useState([])
    const navigate = useNavigate()

    const login = async (event) => {
        event.preventDefault()

        var { email, password, remember } = document.forms[0]
        // console.log(email.value, password.value)

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                rememberMe: remember.checked,
            }),
        }
        return await fetch("api/account/login", requestOptions)
            .then((response) => {
                // console.log(response.status)
                response.status === 200 &&
                    setUser({ isAuthenticated: true, userName: "", userRole: "" })
                return response.json()
            })
            .then(
                (data) => {
                    console.log("Data:", data)
                    if (
                        typeof data !== "undefined" &&
                        typeof data.userName !== "undefined" &&
                        typeof data.userRole !== "undefined"
                    ) {
                        setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
                        navigate("/")
                    }
                    typeof data !== "undefined" &&
                        typeof data.error !== "undefined" &&
                        setErrorMessages(data.error)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    const renderErrorMessage = () =>
        errorMessages.map((error, index) => <div key={index}>{error}</div>)
    return (
            <>
            {user.isAuthenticated ? (
                <h3>Пользователь {user.userName} успешно вошел в систему</h3>
            ) : (
                <>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Электронная почта"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите свою почту!',
                                },
                            ]}
                        >
                        <Input name="email"/>
                        </Form.Item>

                        <Form.Item
                            label="Пароль"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите пароль!',
                                },
                            ]}
                        >
                        <Input.Password name="password"/>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                                }}
                        >
                            <Checkbox name="remember">Запомнить меня</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button onClick={login} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    {renderErrorMessage()}
                </>
            )}
        </>
    )
};
export default Login;


//const Login = ({ user, setUser }) => {
//    const [errorMessages, setErrorMessages] = useState([])
//    const navigate = useNavigate()

//    const login = async (event) => {
//        event.preventDefault()

//        var { email, password } = document.forms[0]
//        // console.log(email.value, password.value)

//        const requestOptions = {
//            method: "POST",
//            headers: { "Content-Type": "application/json" },
//            body: JSON.stringify({
//                email: email.value,
//                password: password.value,
//            }),
//        }
//        return await fetch("api/account/login", requestOptions)
//            .then((response) => {
//                // console.log(response.status)
//                response.status === 200 &&
//                    setUser({ isAuthenticated: true, userName: "", userRole: "" })
//                return response.json()
//            })
//            .then(
//                (data) => {
//                    console.log("Data:", data)
//                    if (
//                        typeof data !== "undefined" &&
//                        typeof data.userName !== "undefined" &&
//                        typeof data.userRole !== "undefined"
//                    ) {
//                        setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
//                        navigate("/")
//                    }
//                    typeof data !== "undefined" &&
//                        typeof data.error !== "undefined" &&
//                        setErrorMessages(data.error)
//                },
//                (error) => {
//                    console.log(error)
//                }
//            )
//    }

//    const renderErrorMessage = () =>
//        errorMessages.map((error, index) => <div key={index}>{error}</div>)

//    return (
//        <>
//            {user.isAuthenticated ? (
//                <h3>Пользователь {user.userName} успешно вошел в систему</h3>
//            ) : (
//                <>
//                    <h3>Вход</h3>
//                    <form onSubmit={login}>
//                        <label>Пользователь </label>
//                        <input type="text" name="email" placeholder="Логин" />
//                        <br />
//                        <label>Пароль </label>
//                        <input type="text" name="password" placeholder="Пароль" />
//                        <br />
//                        <button type="submit">Войти</button>
//                    </form>
//                    {renderErrorMessage()}
//                    </>

//            )}
//        </>
//    )
//}

//export default Login