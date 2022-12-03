import React, {useCallback, useEffect, useState} from 'react';
import {auto} from "../packages/storage";
import {v4 as uuidv4} from "uuid";
import {Col, Form, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {AutoModalForm} from "../components/AutoModalForm";

export const Auto = () => {
    const [autoList, setAutoList] = useState([]);
    const [autoListFilter, setAutoListFilter] = useState([]);


    const [autoNumber, setAutoNumber] = useState("");
    const [clientPassport, setClientPassport] = useState("");


    const [modalShow, setModalShow] = useState(false);
    const [editOrderData, setEditOrderData] = useState(null)

    useEffect(() => {
        let list = auto.getAutoList()
        setAutoList(list);
        setAutoListFilter(list);
    }, [])

    useEffect(() => {
        if (autoList.length)
            auto.setAutoList(autoList);
        setAutoListFilter(autoList)
    }, [autoList])

    const addOrder = (data) => {
        setAutoList([...autoList, data]);
    }

    const editOrder = (data) => {
        let index = autoList.findIndex(x => x.id === data.id)
        let tempOrderList = [...autoList]
        tempOrderList[index] = data;
        setAutoList(tempOrderList)
    }

    const showEditInfo = (id) => {
        let order = autoList.find(x => x.id === id);
        setEditOrderData(order);
        setModalShow(true);
    }

    const deleteOrder = useCallback((id) => {
        setAutoList(prevList => prevList.filter(el => el.id !== id))
    }, [])

    const testData = () => {
        const randomData = [
            {
                id: uuidv4(),
                passport: "4262 648177",
                carNumber: "В584ТТ65",
                carModel: "Citroen C3 Pluriel",
                releaseYear: "2014",
                color: "Белый",
                CTC: "9304 989051",
            },
            {
                id: uuidv4(),
                passport: "4372 390192",
                carNumber: "Р363ОК87",
                carModel: "Volvo XC70",
                releaseYear: "2017",
                color: "Красный",
                CTC: "9203 912851",
            },
        ]

        setAutoList([...autoList, randomData[Math.floor(Math.random()*randomData.length)]]);
    }

    const findOrder = () => {
        let result = [...autoList];

        if (autoNumber !== "") {
            result = result.filter(el => el.carNumber.includes(autoNumber))
        }
        if (clientPassport !== "") {
            result = result.filter(el => el.passport.includes(clientPassport))
        }
        setAutoListFilter(result)
    }

    const resetSearch = () => {
        setAutoNumber("")
        setClientPassport("")
        setAutoListFilter(autoList)
    }

    return (
        <div>
            <h2 className="text-center mt-5">Автомобили</h2>
            <div className="mt-4 d-flex justify-content-center">
                <Form>
                    <Row>
                        <Col>
                            <Button style={{marginLeft: "15px", width: "80%"}} variant="primary" onClick={() => setModalShow(true)}>
                                Добавить авто
                            </Button>
                        </Col>
                        <Col>
                            <Form.Control value={autoNumber} onChange={(e) => setAutoNumber(e.target.value)} placeholder="Гос. номер" />
                        </Col>
                        <Col>
                            <Form.Control value={clientPassport} onChange={(e) => setClientPassport(e.target.value)} placeholder="Паспорт" />
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={findOrder}>
                                Поиск
                            </Button>
                            <Button style={{marginLeft: "10px"}} variant="secondary" onClick={resetSearch}>
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
                        <th>Паспорт</th>
                        <th>Гос.номер</th>
                        <th>Модель</th>
                        <th>Год выпуска</th>
                        <th>Цвет</th>
                        <th>СТС</th>
                        <th>Управление</th>
                     </tr>
                    </thead>
                    <tbody>
                    {autoListFilter.map(order =>
                        <tr key={order.id}>
                            <td>{order.passport}</td>
                            <td>{order.carNumber}</td>
                            <td>{order.carModel}</td>
                            <td>{order.releaseYear}</td>
                            <td>{order.color}</td>
                            <td>{order.CTC}</td>
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
            <AutoModalForm setEditOrderData={setEditOrderData} editOrderData={editOrderData} edit={editOrder} add={addOrder} show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
    );
};
