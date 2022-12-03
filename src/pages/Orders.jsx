import React, {useCallback, useEffect, useState} from 'react';
import {Col, Form, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {orders} from "../packages/storage";
import { v4 as uuidv4 } from 'uuid';
import {OrdersModalForm} from "../components/OrdersModalForm";


export const Orders = () => {
    const [orderList, setOrderList] = useState([]);
    const [orderListFilter, setOrderListFilter] = useState([]);


    const [orderNumber, setOrderNumber] = useState("");
    const [orderFIO, setOrderFIO] = useState("");
    const [orderCarNumber, setOrderCarNumber] = useState("");


    const [modalShow, setModalShow] = useState(false);
    const [editOrderData, setEditOrderData] = useState(null)

    useEffect(() => {
        let list = orders.getOrderList();
        setOrderList(list);
        setOrderListFilter(list);
    }, [])

    useEffect(() => {
        if (orderList.length)
            orders.setOrderList(orderList);
            setOrderListFilter(orderList)
    }, [orderList])

    const addOrder = (data) => {
        setOrderList([...orderList, data]);
    }

    const editOrder = (data) => {
        let index = orderList.findIndex(x => x.id === data.id)
        let tempOrderList = [...orderList]
        tempOrderList[index] = data;
        setOrderList(tempOrderList)
    }

    const showEditInfo = (id) => {
        let order = orderList.find(x => x.id === id);
        setEditOrderData(order);
        setModalShow(true);
    }

    const deleteOrder = useCallback((id) => {
        setOrderList(prevList => prevList.filter(el => el.id !== id))
    }, [])

    const testData = () => {
        const randomData = [
            {
                id: uuidv4(),
                number: `N-${Math.floor(Math.random() * 35)}`,
                FIO: "Коллеров Валерий Никитович",
                carNumber: "В584ТТ65",
                carModel: "Citroen C3 Pluriel",
                status: "Завершен",
                dateStart: "10.11.2022",
                dateEnd: "11.11.2022",
                repairType: "ТО"
            },
            {
                id: uuidv4(),
                number: `N-${Math.floor(Math.random() * 35)}`,
                FIO: "Шереметьев Вячеслав Васильевич",
                carNumber: "Р363ОК87",
                carModel: "Volvo XC70",
                status: "В работе",
                dateStart: "13.11.2022",
                dateEnd: "",
                repairType: "ТО"
            },
        ]

        setOrderList([...orderList, randomData[Math.floor(Math.random()*randomData.length)]]);
    }

    const findOrder = () => {
        let result = [...orderList];

        if (orderNumber !== "") {
            result = result.filter(el => ('' + el.number).includes(orderNumber))
        }
        if (orderFIO !== "") {
            result = result.filter(el => el.FIO.includes(orderFIO))
        }
        if (orderCarNumber !== "") {
            result = result.filter(el => el.carNumber.includes(orderCarNumber))
        }
        setOrderListFilter(result)
    }

    const resetSearch = () => {
        setOrderNumber("")
        setOrderFIO("")
        setOrderCarNumber("")
        setOrderListFilter(orderList)
    }

    return (
        <div>
            <h2 className="text-center mt-5">Заказы</h2>
            <div className="mt-4 d-flex justify-content-center">
                <Form>
                    <Row>
                        <Col>
                            <Button style={{marginLeft: "15px", width: "90%"}} variant="primary" onClick={() => setModalShow(true)}>
                                Добавить заказ
                            </Button>
                        </Col>
                        <Col>
                            <Form.Control value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="Номер заказа" />
                        </Col>
                        <Col>
                            <Form.Control value={orderFIO} onChange={(e) => setOrderFIO(e.target.value)} placeholder="ФИО" />
                        </Col>
                        <Col>
                            <Form.Control value={orderCarNumber} onChange={(e) => setOrderCarNumber(e.target.value)} placeholder="Гос. номер" />
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
                        <th>Номер заказа</th>
                        <th>ФИО Клиента</th>
                        <th>Гос.номер</th>
                        <th>Марка Авто</th>
                        <th>Статус</th>
                        <th>Время нач. ремонта</th>
                        <th>Время оконч. ремонта</th>
                        <th>Вид ремонта</th>
                        <th>Управление</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderListFilter.map(order =>
                    <tr key={order.id}>
                        <td>{order.number}</td>
                        <td>{order.FIO}</td>
                        <td>{order.carNumber}</td>
                        <td>{order.carModel}</td>
                        <td>{order.status}</td>
                        <td>{order.dateStart}</td>
                        <td>{order.dateEnd}</td>
                        <td>{order.repairType}</td>
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
            <OrdersModalForm setEditOrderData={setEditOrderData} editOrderData={editOrderData} edit={editOrder} add={addOrder} show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
    );
};
