import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context as UserManagementContext } from '../../context/UserManagementContext';
import { Grid, Button } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./table-styles.css";
import useStyles from "./styles";
import TableUsers from './../components/TableUsers/TableUsers'
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@material-ui/core/Box'
import Modal from '@mui/material/Modal';
import BookForm from "../../components/BookForm/BookForm";

export default function UsersManagement() {
    const { state, fetchUsers, searchUser } = useContext(UserManagementContext);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [queryUsed, setQueryUsed] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalAlertOpen, setModalAlertOpen] = useState(false);
    const [itemDeleted, setItemDeleted] = useState(false);
    const [itemEdited, setItemEdited] = useState(false);
    const classes = useStyles();
    let itemsPerPage = 3;

    const tableHead = {
        name: 'NUME',
        email: 'EMAIL',
        userType: 'ROL',
        '_id': 'EDITARE',
    };
    useEffect(() => {
        fetchUsers(handleToggle, page, itemsPerPage, handleClose)
    }, [page]);

    useEffect(() => {
        if (state.items) {
            if (state.items.length === 1) {
                fetchUsers(handleToggle, page - 1, itemsPerPage, handleClose)
            }
        }
         fetchUsers(handleToggle, page, itemsPerPage, handleClose)
    }, [itemDeleted, itemEdited]);

    useEffect(() => {
        if (searchQuery !== '') {
            searchUser(searchQuery);
            itemsPerPage = state.totalItems;
            console.log("State after search:", state)
        } else {
             fetchUsers(handleToggle, page, itemsPerPage, handleClose);
        }
    }, [searchQuery, queryUsed]);

    const successMessage = () => {
        return (
            <Box padding={1}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">{alertMessage}</Alert>
                </Stack>
            </Box>
        )
    }d
    const editUser = (id) => {
        setUserId(id);
        const findUser = state.items.find((t) => t._id === id);
        setUser(findUser);
        handleModalEditOpen();
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleModalEditOpen = () => {
        setModalEditOpen(true);
    };
    const handleModalEditClose = () => {
        setModalEditOpen(false);
    };

    const handleModalAlertOpen = () => {
        setModalAlertOpen(true);
    };
    const handleModalAlertClose = () => {
        setModalAlertOpen(false);
    };

    return (
        <>
            <PageTitle title="Utilizatori" />
            <br />
            <br />
            <br />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={4}>
                {state.items ?
                    <TableUsers
                        tableHead={tableHead}
                        requestPage={(page) => setPage(page)}
                        searchUser={(value) => { setSearchQuery(value); setQueryUsed(!queryUsed) }}
                        deleteUser={(id) => { setUserId(id); handleModalAlertOpen(); }}
                        updateUser={(id) => { editUser(id) }}
                        countPerPage={itemsPerPage}
                        page={page}
                        totalItems={state.totalItems}
                        items={state.items}
                    />
                    : null
                }
                {alertMessage ? (
                    <Box padding={1}>
                        {successMessage}
                    </Box>
                ) : null}
            </Grid>
        </>
    );
}
