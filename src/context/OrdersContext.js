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
        dispatch({ type: 'fetch_orders', payload: res.data })
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


export const { Provider, Context } = createDataContext(
    ordersReducer,
    { fetchOrders },
    []
)