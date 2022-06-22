import booksApi from '../api/books'
import createDataContext from './createDataContext'

const ordersReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_orders':
            return action.payload
        case 'search_book':
            return action.payload
        case 'empty_cart':
            return action.payload
        default:
            return state
    }
}

const fetchOrders = dispatch => async () => {
    try {
        const res = await booksApi.get('/orders')
        const dataList = [];
        res.data.forEach((index) => {
            const item = Object.keys(index).
                filter((key) => !key.includes('_id') && !key.includes('books') && !key.includes('_v')).
                reduce((entry, key) => { return Object.assign(entry, { [key]: index[key] }) }, {});
            dataList.push(item);
        })
        // console.log("DATAList-disp:", dataList);
        const dispatchData = [];
        dataList.forEach((item) => {
            dispatchData.push(Object.values(item));
        })
        console.log("DATALIST-distach-DATA:", dispatchData)
        dispatch({ type: 'fetch_orders', payload: dispatchData})
    } catch (err) {
        console.log("FetchOrdersDispatch", err)
    }

}

const searchOrder = dispatch => async (title) => {
    console.log("searchedTitle:", title);

    const res = await booksApi.get('/search', { params: { title } })
    console.log("Payload after search:", res.data)
    dispatch({ type: 'search_book', payload: res.data })

}

const addBook = dispatch => async (name) => {
    await booksApi.post('/book', { name })
}

export const { Provider, Context } = createDataContext(
    ordersReducer,
    { addBook, fetchOrders },
    []
)