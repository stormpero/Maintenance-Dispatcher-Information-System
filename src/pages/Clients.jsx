import React, {useCallback, useEffect, useState} from 'react';
import {clients} from "../packages/storage";
import {v4 as uuidv4} from "uuid";
import {Col, Form, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {ClientModalForm} from "../components/ClientModalForm";

export const Clients = () => {
    const [clientList, setClientList] = useState([]);
    const [orderClientFilter, setClientListFilter] = useState([]);


    const [clientFIO, setClientFIO] = useState("");
    const [clientPassport, setClientPassport] = useState("");


    const [modalShow, setModalShow] = useState(false);
    const [editOrderData, setEditOrderData] = useState(null)

    useEffect(() => {
        let list = clients.getClientList();
        setClientList(list);
        setClientListFilter(list);
    }, [])

    useEffect(() => {
        if (clientList.length)
            clients.setClientList(clientList);
        setClientListFilter(clientList)
    }, [clientList])

    const addOrder = (data) => {
        setClientList([...clientList, data]);
    }

    const editOrder = (data) => {
        let index = clientList.findIndex(x => x.id === data.id)
        let tempOrderList = [...clientList]
        tempOrderList[index] = data;
        setClientList(tempOrderList)
    }

    const showEditInfo = (id) => {
        let order = clientList.find(x => x.id === id);
        setEditOrderData(order);
        setModalShow(true);
    }

    const deleteOrder = useCallback((id) => {
        setClientList(prevList => prevList.filter(el => el.id !== id))
    }, [])

    const testData = () => {
        const randomData = [
            {
                id: uuidv4(),
                FIO: "Коллеров Валерий Никитович",
                phoneNumber: "+7 (934) 797-29-85",
                passport: "4262 648177",
                birthdate: "14.12.1963",
                address: "Россия, г. Астрахань, Полевой пер., д. 18 кв.143",
            },
            {
                id: uuidv4(),
                FIO: "Шереметьев Вячеслав Васильевич",
                phoneNumber: "+7 (927) 695-17-69",
                passport: "4372 390192",
                birthdate: "02.05.1969",
                address: "Россия, г. Чебоксары, Садовая ул., д. 17 кв.28",
            },
        ]

        setClientList([...clientList, randomData[Math.floor(Math.random()*randomData.length)]]);
    }

    const findOrder = () => {
        let result = [...clientList];

        if (clientFIO !== "") {
            result = result.filter(el => el.FIO.includes(clientFIO))
        }
        if (clientPassport !== "") {
            result = result.filter(el => el.passport.includes(clientPassport))
        }
        setClientListFilter(result)
    }

    const resetSearch = () => {
        setClientFIO("")
        setClientPassport("")
        setClientListFilter(clientList)
    }

    return (
        <div>
            <h2 className="text-center mt-5">Клиенты</h2>
            <div className="mt-4 d-flex justify-content-center">
                <Form>
                    <Row>
                        <Col>
                            <Button style={{marginLeft: "15px", width: "90%"}} variant="primary" onClick={() => setModalShow(true)}>
                                Добавить клиента
                            </Button>
                        </Col>
                        <Col>
                            <Form.Control value={clientFIO} onChange={(e) => setClientFIO(e.target.value)} placeholder="ФИО" />
                        </Col>
                        <Col>
                            <Form.Control value={clientPassport} onChange={(e) => setClientPassport(e.target.value)} placeholder="Паспорт" />
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={findOrder}>
                                Поиск
                            </Button>
                            <Button style={{marginLeft: "15px"}} variant="secondary" onClick={resetSearch}>
                                Сбросить
                            </Button>
                        </Col>
                        {/*<Col>*/}
                        {/*    <Button style={{marginLeft: "15px"}} variant="secondary" onClick={testData}>*/}
                        {/*        Добавить тест*/}
                        {/*    </Button>*/}
                        {/*</Col>*/}
                    </Row>
                </Form>
            </div>
            <div  className="d-flex justify-content-center mt-4">
                <Table striped bordered hover className="w-75 text-center">
                    <thead>
                    <tr className="text-center">
                        <th>ФИО</th>
                        <th>Телефон</th>
                        <th>Паспорт</th>
                        <th>Дата Рождения</th>
                        <th>Адрес</th>
                        <th>Управление</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderClientFilter.map(order =>
                        <tr key={order.id}>
                            <td>{order.FIO}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.passport}</td>
                            <td>{order.birthdate}</td>
                            <td>{order.address}</td>
                            <td>
                                <Button variant="primary" onClick={() => showEditInfo(order.id)} size="sm">
                                    Редактировать
                                </Button>
                                <Button style={{marginLeft: "5px"}} variant="danger" onClick={() => deleteOrder(order.id)} size="sm">
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
            <ClientModalForm setEditOrderData={setEditOrderData} editOrderData={editOrderData} edit={editOrder} add={addOrder} show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
    );
};
