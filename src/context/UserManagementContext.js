import booksApi from '../api/books';
import createDataContext from './createDataContext';

const userManagementReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_users':
            return action.payload
        case 'search_user':
            return action.payload
        default:
            return state
    }
}

const fetchUsers = dispatch => async (handleToggle, page, itemsPerPage, handleClose) => {
    try {
        const params = {
            itemsPerPage: itemsPerPage,
            page: page
        }
        handleToggle();
        const res = await booksApi.get('/users', { params })
        handleClose();
        console.log("res:", res.data)
        dispatch({ type: 'fetch_users', payload: res.data })
    } catch (err) {
        console.log("Error fetching users:", err)
    }
}

const searchUser = dispatch => async (email) => {
    const res = await booksApi.get('/searchUser', { params: { email } })
    dispatch({ type: 'searchBook', payload: res.data });
}

export const { Provider, Context } = createDataContext(
    userManagementReducer,
    { fetchUsers, searchUser },
    []
)