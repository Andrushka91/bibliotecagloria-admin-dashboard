import booksApi from '../api/books'
import createDataContext from './createDataContext'

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_books':
            return action.payload
        case 'search_book':
            return action.payload
        case 'empty_cart':
            return action.payload
        default:
            return state
    }
}
const searchBook = dispatch => async (title) => {
    console.log("searchedTitle:", title);

    const res = await booksApi.get('/search', { params: { title } })
    console.log("Payload after search:",res.data)
    dispatch({ type: 'search_book', payload: res.data })

}

const fetchBooks = dispatch => async (page, itemsPerPage) => {
    try {
        const params = {
            itemsPerPage: itemsPerPage,
            page: page
        }
        const res = await booksApi.get('/books', { params })
        dispatch({ type: 'fetch_books', payload: res.data })
    } catch (err) {
        console.log("UseBookDispatchError:", err)
    }

}

const addBook = dispatch => async (name) => {
    await booksApi.post('/book', { name })
}

export const { Provider, Context } = createDataContext(
    bookReducer,
    { addBook, fetchBooks, searchBook },
    []
)