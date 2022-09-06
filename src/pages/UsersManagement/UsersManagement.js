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
import UserForm from "../../components/UserForm/UserForm";

export default function UsersManagement() {
    const { state, fetchUsers, searchUser, deleteUser } = useContext(UserManagementContext);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [queryUsed, setQueryUsed] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [itemDeleted, setItemDeleted] = useState(false);
    const [itemEdited, setItemEdited] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);
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
    }, [page, accountCreated]);

    useEffect(() => {
        fetchUsers(handleToggle, page, itemsPerPage, handleClose)
    }, [itemEdited]);

    useEffect(() => {
        if (state.items) {
            if (state.items.length === 1) {
                fetchUsers(handleToggle, page - 1, itemsPerPage, handleClose)
            }
        }
        fetchUsers(handleToggle, page, itemsPerPage, handleClose)
    }, [itemDeleted]);

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
    const handleModalConfirmOpen = () => {
        setModalConfirmOpen(true);
    };
    const handleModalConfirmClose = () => {
        setModalConfirmOpen(false);
    };
    const editUser = (id) => {
        setUserId(id);
        const findUser = state.items.find((t) => t._id === id);
        setUser(findUser);
        handleModalEditOpen();
    }
    const eraseUser = async () => {
        deleteUser(userId,handleToggle,itemDeleted, setItemDeleted, handleClose, handleModalConfirmClose);
        console.log("currentPage:", page)
      }

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

            <Modal
                open={modalEditOpen}
                onClose={handleModalEditClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className={classes.modalEditUser}>
                    <UserForm user={user} userId={userId} itemEdited={itemEdited} setItemEdited={setItemEdited} handleModalEditClose={handleModalEditClose} />
                </Box>
            </Modal>

            <Modal
                open={modalConfirmOpen}
                onClose={handleModalConfirmClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className={classes.modalDialog}>
                    <h2 id="parent-modal-title"> Esti sigur că vrei sa continui?</h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button className={classes.confirmButton} onClick={() => eraseUser()}>Confirmare</Button>
                        <Button className={classes.cancelButton} onClick={() => handleModalConfirmClose()}>Anulare</Button>
                    </div>
                </Box>
            </Modal>


            <Grid container spacing={4}>
                {state.items ?
                    <TableUsers
                        tableHead={tableHead}
                        requestPage={(page) => setPage(page)}
                        searchUser={(value) => { setSearchQuery(value); setQueryUsed(!queryUsed) }}
                        deleteUser={(id) => { setUserId(id); handleModalConfirmOpen(); }}
                        updateUser={(id) => { editUser(id) }}
                        countPerPage={itemsPerPage}
                        page={page}
                        totalItems={state.totalItems}
                        items={state.items}
                        accountCreated
                        setAccountCreated
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
