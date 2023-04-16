import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, Modal } from 'antd';
import { useState } from 'react';
const Logoff = ({ setUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();        
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
                response.status === 200 &&
                    setUser({ isAuthenticated: false, userName: "" })

                response.status === 401 && navigate("/login")
            })
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Выйти
            </Button>
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
        </>
    );
};
export default Logoff

//const Logoff = ({ setUser }) => {
//    const navigate = useNavigate()

//    const logoff = async (event) => {
//        event.preventDefault()

//        const requestOptions = {
//            method: "POST",
//        }
//        return await fetch("api/account/logoff", requestOptions)
//            .then((response) => {
//                response.status === 200 &&
//                    setUser({ isAuthenticated: false, userName: "" })

//                response.status === 401 && navigate("/login")
//            })
//    }

//    return (
//        <>
//            <p></p>
//            <form onSubmit={logoff}>
//                <button type="submit">Выход</button>
//            </form>
//        </>
//    )
//}

//export default Logoff