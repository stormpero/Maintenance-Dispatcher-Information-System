import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from "uuid";
import {FloatingLabel, Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const ClientModalForm = ({setEditOrderData, editOrderData, edit, add, ...props}) => {
    const [FIO, setFIO] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passport, setPassport] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (editOrderData) {
            setFIO(editOrderData.FIO);
            setPhoneNumber(editOrderData.phoneNumber);
            setPassport(editOrderData.passport);
            setBirthdate(editOrderData.birthdate.split(".").reverse().join('-'));
            setAddress(editOrderData.address);
        }
    }, [editOrderData])

    const addOrder = () => {
        if (editOrderData) {
            let editOrderInfo = {...editOrderData};
            editOrderInfo.FIO = FIO;
            editOrderInfo.phoneNumber = phoneNumber;
            editOrderInfo.passport = passport;
            editOrderInfo.birthdate = birthdate.split("-").reverse().join(".");
            editOrderInfo.address = address;

            edit(editOrderInfo)
        } else {
            let order = {
                id: uuidv4(),
                FIO: FIO,
                phoneNumber: phoneNumber,
                passport: passport,
                birthdate: birthdate.split("-").reverse().join("."),
                address: address
            }
            add(order)
        }

        props.onHide()
        setEditOrderData(null)
    }

    const onModalExit = () => {
        setFIO("")
        setPhoneNumber("")
        setPassport("")
        setBirthdate("")
        setAddress("")
    }

    return (
        <Modal
            onExit={onModalExit}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить клиента
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <FloatingLabel label="ФИО" className="mb-3">
                            <Form.Control value={FIO} onChange={(e) => setFIO(e.target.value)} placeholder="name@example.com" autoFocus/>
                        </FloatingLabel>
                        <FloatingLabel label="Телефон" className="mb-3">
                            <Form.Control value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel label="Паспорт" className="mb-3">
                            <Form.Control value={passport} onChange={(e) => setPassport(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel label="Дата Рождения" className="mb-3">
                            <Form.Control type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel label="Адрес" className="mb-3">
                            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="secondary">Закрыть</Button>
                <Button variant="success" onClick={addOrder}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
};
