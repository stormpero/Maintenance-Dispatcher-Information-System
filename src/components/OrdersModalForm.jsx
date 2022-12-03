import React, {useEffect, useState} from 'react';
import {FloatingLabel, Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from 'uuid';


export const OrdersModalForm = ({setEditOrderData, editOrderData, edit, add, ...props}) => {
    const [orderFIO, setOrderFIO] = useState("");
    const [orderCarNumber, setOrderCarNumber] = useState("");
    const [orderCarModel, setOrderCarModel] = useState("");
    const [repairType, setRepairType] = useState("");

    useEffect(() => {
        if (editOrderData) {
            setOrderFIO(editOrderData.FIO);
            setOrderCarNumber(editOrderData.carNumber);
            setOrderCarModel(editOrderData.carModel);
            setRepairType(editOrderData.repairType);
        }
    }, [editOrderData])

    const addOrder = () => {
        if (editOrderData) {
            let editOrderInfo = {...editOrderData};
            editOrderInfo.FIO = orderFIO;
            editOrderInfo.carNumber = orderCarNumber;
            editOrderInfo.carModel = orderCarModel;
            editOrderInfo.repairType = repairType;

            edit(editOrderInfo)
        } else {
            let order = {
                id: uuidv4(),
                number: `N-${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 20)}`,
                FIO: orderFIO,
                carNumber: orderCarNumber,
                carModel: orderCarModel,
                repairType: repairType
            }
            add(order)
        }

        props.onHide()
        setEditOrderData(null)
        setOrderFIO("")
        setOrderCarNumber("")
        setOrderCarModel("")
        setRepairType("")
    }

    const onModalExit = () => {
        setOrderFIO("")
        setOrderCarNumber("")
        setOrderCarModel("")
        setRepairType("")
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
                    Добавить заказ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <FloatingLabel label="ФИО" className="mb-3">
                            <Form.Control value={orderFIO} onChange={(e) => setOrderFIO(e.target.value)} placeholder="name@example.com" autoFocus/>
                        </FloatingLabel>
                        <FloatingLabel label="Гос.номер" className="mb-3">
                            <Form.Control value={orderCarNumber} onChange={(e) => setOrderCarNumber(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel label="Марка Авто" className="mb-3">
                            <Form.Control value={orderCarModel} onChange={(e) => setOrderCarModel(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel label="Вид ремонта" className="mb-3">
                            <Form.Control value={repairType} onChange={(e) => setRepairType(e.target.value)} placeholder="name@example.com"/>
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
