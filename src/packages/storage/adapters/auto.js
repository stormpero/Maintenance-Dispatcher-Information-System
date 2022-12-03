import {
    setItem,
    getItem,
    removeItem
} from "../storage";

const setAutoList = (orderList) => {
    setItem("autoList", JSON.stringify(orderList));
}

const getAutoList = () => {
    const list = getItem("autoList");
    return list ? JSON.parse(list) : [];
}

const removeAutoList = () => {
    removeItem("autoList")
}

export {
    setAutoList,
    getAutoList,
    removeAutoList
}