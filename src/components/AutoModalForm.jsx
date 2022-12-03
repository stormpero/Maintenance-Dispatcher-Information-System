import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from "uuid";
import {FloatingLabel, Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const AutoModalForm = ({setEditOrderData, editOrderData, edit, add, ...props}) => {
    const [passport, setPassport] = useState("");
    const [carNumber, setCarNumber] = useState("");
    const [carModel, setCarModel] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [color, setColor] = useState("");
    const [CTC, setCTC] = useState("");

    useEffect(() => {
        if (editOrderData) {
            setPassport(editOrderData.passport);
            setCarNumber(editOrderData.carNumber);
            setCarModel(editOrderData.carModel);
            setReleaseYear(editOrderData.releaseYear);
            setColor(editOrderData.color);
            setCTC(editOrderData.CTC);
        }
    }, [editOrderData])

    const addOrder = () => {
        if (editOrderData) {
            let editOrderInfo = {...editOrderData};
            editOrderInfo.passport = passport;
            editOrderInfo.carNumber = carNumber;
            editOrderInfo.carModel = carModel;
            editOrderInfo.releaseYear = releaseYear;
            editOrderInfo.color = color;
            editOrderInfo.CTC = CTC;

            edit(editOrderInfo)
        } else {
            let order = {
                id: uuidv4(),
                passport,
                carNumber,
                carModel,
                releaseYear,
                color,
                CTC
            }
            add(order)
        }

        props.onHide()
        setEditOrderData(null)
    }

    const onModalExit = () => {
        setPassport("");
        setCarNumber("");
        setCarModel("");
        setReleaseYear("");
        setColor("");
        setCTC("");
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
                    Добавить Авто
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <FloatingLabel label="Паспорт" className="mb-3">
                            <Form.Control value={passport} onChange={(e) => setPassport(e.target.value)} placeholder="name@example.com" autoFocus/>
                        </FloatingLabel>
                        <FloatingLabel label="Гос.номер" className="mb-3">
                            <Form.Control value={carNumber} onChange={(e) => setCarNumber(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel label="Модель" className="mb-3">
                            <Form.Control value={carModel} onChange={(e) => setCarModel(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel label="Год выпуска" className="mb-3">
                            <Form.Control value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel label="Цвет" className="mb-3">
                            <Form.Control value={color} onChange={(e) => setColor(e.target.value)} placeholder="name@example.com"/>
                        </FloatingLabel>
                        <FloatingLabel label="СТС" className="mb-3">
                            <Form.Control value={CTC} onChange={(e) => setCTC(e.target.value)} placeholder="name@example.com"/>
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
