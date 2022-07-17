import booksApi from '../api/books'
import createDataContext from './createDataContext'

const ordersReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_orders':
            return action.payload
        case 'search_order':
            return action.payload
        case 'process_order':
            return action.payload
        case 'cancel_order':
            return action.payload
        default:
            return state
    }
}

// const fetchOrders = dispatch => async (handleToggle, handleClose) => {
//     try {
//         handleToggle();
//         const res = await booksApi.get('/orders')
//         handleClose();
//         dispatch({ type: 'fetch_orders', payload: res.data })
//     } catch (err) {
//         console.log("FetchOrdersDispatch", err)
//     }
// }

const fetchOrders = dispatch => async (handleToggle, page, itemsPerPage, handleClose) => {
    try {
        const params = {
            itemsPerPage: itemsPerPage,
            page: page
        }
        handleToggle();
        const res = await booksApi.get('/orders', { params })
        const totalItems = res.data.totalItems;
        const dataList = [];//€
        res.data.items.forEach((index) => {
            const item = Object.keys(index).
                filter((key) => !key.includes('_id') && !key.includes('_v')).
                reduce((entry, key) => {
                    return Object.assign(entry, { [key]: index[key] })
                }, {});
            dataList.push(item);
        })
        const orders = [];
        dataList.forEach((item) => {
            item.totalPrice = item.totalPrice + '€';
            orders.push(Object.values(item));
        })
        handleClose();
        dispatch({ type: 'fetch_orders', payload: { orders, totalItems } })
    } catch (err) {
        console.log("FetchOrdersDispatch", err)
    }
}

const searchOrder = dispatch => async (handleToggle, orderId, handleClose) => {
    try {
        handleToggle();
        const res = await booksApi.get('/searchOrder', { params: { orderId } })
        const totalItems = res.data.totalItems;
        const dataList = [];//€
        console.log()
        res.data.items.forEach((index) => {
            const item = Object.keys(index).
                filter((key) => !key.includes('_id') && !key.includes('_v')).
                reduce((entry, key) => {
                    return Object.assign(entry, { [key]: index[key] })
                }, {});
            dataList.push(item);
        })
        const orders = [];
        dataList.forEach((item) => {
            item.totalPrice = item.totalPrice + '€';
            orders.push(Object.values(item));
        })
        handleClose();
        dispatch({ type: 'search_order', payload: { orders, totalItems } })
    } catch (err) {
        dispatch({ tpye: 'search_order', payload: err.message })
        handleClose();
    }

}

const processOrder = dispatch => async (handleToggle, orderId, changeStatus, handleClose) => {
    try {
        handleToggle();
        await booksApi.post('/processOrder', { orderId });
        changeStatus();
        handleClose();
    } catch (err) {
        dispatch({ type: 'process_order', payload: err.message })
        handleClose();
    }
}


const cancelOrder = dispatch => async (handleToggle, orderId, changeStatus, handleClose) => {
    try {
        handleToggle();
        await booksApi.post('/cancelOrder', { orderId });
        changeStatus();
        handleClose();
    } catch (err) {
        dispatch({ type: 'cancel_order', payload: err.message })
        handleClose();
    }
}


export const { Provider, Context } = createDataContext(
    ordersReducer,
    { fetchOrders, searchOrder, processOrder, cancelOrder },
    []
)