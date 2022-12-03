import {
    setItem,
    getItem,
    removeItem
} from "../storage";

const setOrderList = (orderList) => {
    setItem("orderList", JSON.stringify(orderList));
}

const getOrderList = () => {
    const list = getItem("orderList");
    return list ? JSON.parse(list) : [];
}

const removeOrderList = () => {
    removeItem("orderList")
}

export {
    setOrderList,
    getOrderList,
    removeOrderList
}