import {
    setItem,
    getItem,
    removeItem
} from "../storage";

const setClientList = (orderList) => {
    setItem("clientList", JSON.stringify(orderList));
}

const getClientList = () => {
    const list = getItem("clientList");
    return list ? JSON.parse(list) : [];
}

const removeClientList = () => {
    removeItem("clientList")
}

export {
    setClientList,
    getClientList,
    removeClientList
}