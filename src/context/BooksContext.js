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
        case 'add_book':
            return action.payload
        case 'update_book':
            return action.payload
        case 'delete_book':
            return action.payload
        default:
            return state
    }
}
const searchBook = dispatch => async (title) => {
    const res = await booksApi.get('/search', { params: { title } })
    console.log("Payload after search:", res.data)
    dispatch({ type: 'search_book', payload: res.data })
}

const fetchBooks = dispatch => async (handleToggle, page, itemsPerPage, handleClose) => {
    try {
        const params = {
            itemsPerPage: itemsPerPage,
            page: page
        }
        handleToggle();
        const res = await booksApi.get('/books', { params })
        console.log("res:", res.data)
        handleClose();

        dispatch({ type: 'fetch_books', payload: res.data })
    } catch (err) {
        console.log("UseBookDispatchError:", err)
    }
}

const addBook = dispatch => async (handleToggle, setSuccess, book, handleClose) => {
    try {
        handleToggle();
        await booksApi.post('/book', { ...book }).then(() => {
            dispatch({ type: 'add_book', payload: "Cartea " + book.title + " adăugată cu success" })
        })
        handleClose();
        setSuccess(true);
    } catch (err) {
        dispatch({ type: 'add_book', payload: err.message })
        handleClose();
    }
}

const updateBook = dispatch => async (handleToggle, book, itemEdited, setItemEdited, bookId, handleModalEditClose, handleClose) => {
    try {
        handleToggle();
        await booksApi.patch('/book', { ...book, bookId }).then((data) => {
            console.log("data:", data);
            console.log("itemEdited:", itemEdited)
            handleModalEditClose();
            handleClose();
            setItemEdited(!itemEdited);
            // dispatch({ type: 'delete_book', payload: data.data })
        });
    } catch (err) {
        dispatch({ type: 'update_book', payload: err.message })
        handleClose();
    }
}

const deleteBook = dispatch => async (handleToggle, bookId, handleClose, handleModalAlertClose, itemDeleted, setItemDeleted) => {
    try {
        handleToggle();
        await booksApi.delete('/book', { data: { bookId } });
        handleModalAlertClose();
        handleClose();
        setItemDeleted(!itemDeleted);
    } catch (err) {
        dispatch({ type: 'delete_book', payload: err.message })
        handleModalAlertClose();
        handleClose();
    }
}

export const { Provider, Context } = createDataContext(
    bookReducer,
    { addBook, fetchBooks, searchBook, updateBook, deleteBook },
    []
)