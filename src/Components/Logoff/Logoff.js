import React from "react"
import { Button, Modal } from 'antd';
import { useState } from 'react';
const Logoff = ({ setUser }) => {
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