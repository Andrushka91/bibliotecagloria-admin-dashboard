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

const updateUser = () => async (user, userId, itemEdited, setItemEdited,
    handleBackDropToggle, handleBackDropClose, handleModalEditClose) => {
    try {
        handleBackDropToggle();
        await booksApi.patch('/user', { ...user, userId }).then(() => {
            handleBackDropClose();
            handleModalEditClose();
            setItemEdited(!itemEdited);
        })
    } catch (err) {
        console.log("Error upating user: " + err.message)
    }
}

const deleteUser = () => async (userId, handleToggle, itemDeleted, setItemDeleted, handleClose, handleModalConfirmClose) => {
    try {
        handleToggle();
        await booksApi.delete('/user', { data: { userId } }).then(() => {
            setItemDeleted(!itemDeleted);
            handleClose();
            handleModalConfirmClose();
        })
    } catch (err) {
        console.log("Error deleting user: " + err.message);
    }
}

export const { Provider, Context } = createDataContext(
    userManagementReducer,
    { fetchUsers, searchUser, updateUser, deleteUser },
    []
)