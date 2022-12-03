import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

export const Requests = () => {
    const [requests, setRequests] = useState([
        {
            number: "+7(913)637-26-35",
            name: "Кирилл",
        },
        {
            number: "+7(928)368-19-68",
            name: "Василий",
        },
        {
            number: "+7(921)632-21-92",
            name: "Артём",
        }])

    const onBtnClick = (num) => {
        setRequests(requests.filter(el => el.number !== num))
    }

    return (
        <div>
            <h2 className="text-center mt-5">Активные заявки</h2>
            <div className="d-flex justify-content-center">
                <div className="m-3 w-75" style={{backgroundColor: "darkgray"}}>
                    {requests.map(el =>
                        <div className="d-flex justify-content-between m-2 align-items-center" style={{border: "2px solid black", backgroundColor: "lightgrey"}}>
                            <div className="m-2">{el.number} {el.name}</div>
                            <div className="d-flex justify-content-center p-2">
                                <Button className="m-1" variant="success" onClick={e => onBtnClick(el.number)}>Принять</Button>
                                <Button className="m-1" variant="danger" onClick={e => onBtnClick(el.number)}>Отклонить</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
