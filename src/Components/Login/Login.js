import React, { useState } from "react"
import { Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Login = ({ user, setUser }) => {
    const [errorMessages, setErrorMessages] = useState([])

    const login = async (event) => {
        event.preventDefault()

        var { email, password, remember } = document.forms[0]

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
                        setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole });
                        window.location.assign("/");
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
                            <Button className="btn" onClick={login} type="primary" htmlType="submit">
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                    {renderErrorMessage()}
                </>
            )}
        </>
    )
};
export default Login