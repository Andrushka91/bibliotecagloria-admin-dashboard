import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { Context as UserManagementContext } from '../../context/UserManagementContext';
import PageTitle from "../PageTitle/PageTitle";
import Widget from "../Widget/Widget";
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@material-ui/core/Button';
import useStyles from "./style";
import Box from '@material-ui/core/Box'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function UserForm({ user, userId, itemEdited, setItemEdited, handleModalEditClose }) {
    const classes = useStyles();

    const { state, updateUser } = useContext(UserManagementContext);
    const [backDropOpen, setBackDropOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [validate, setValidate] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
    })

    useEffect(() => {
        const isEmpty = Object.values(user).every(x => x === null || x === '');
        if (!isEmpty) {
            setForm({
                name: user.name,
                email: user.email
            })
        }
    }, []);

    const errors =
    {
        name: 'Numele este obligatoriu.',
        email: 'Adresa de email este obligatorie.',
    }

    const submitUser = () => {
        const isEmpty = Object.values(form).some(x => x === null || x === '');
        console.log("isEmpty:", isEmpty);
        if (isEmpty) {
            setValidate(true);
        } else {
            setValidate(false);
            updateUser(form, userId, itemEdited, setItemEdited, handleBackDropToggle,handleBackDropClose,handleModalEditClose);
            // setTimeout(() => {
            //     setSuccess(false);
            //     handleModalEditClose = { handleModalEditClose };
            // }, "5000")
        }
    }

    const handleBackDropClose = () => {
        setBackDropOpen(false);
    };
    const handleBackDropToggle = () => {
        setBackDropOpen(!backDropOpen);
    };

    const errorMessage = Object.keys(form).map((fieldName, key) => {
        if (form[fieldName] == '' || form[fieldName] == 0) {
            return (
                <Box key={key} padding={1}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">{errors[fieldName]}</Alert>
                    </Stack>
                </Box>
            )
        }
    })

    const successMessage = () => {
        return (
            <Box padding={1}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">{state}</Alert>
                </Stack>
            </Box>
        )
    }

    function handleChange(evt) {
        const value = evt.target.value;
        setForm({
            ...form,
            [evt.target.name]: value
        });
    }

    return (
        <>
            <PageTitle title="Editare utilizator" />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid>
                <Widget disableWidgetMenu bodyClass={classes.tableOverflow}>
                    <Grid item xs={12} className={classes.horizontalContainer}>
                        <Grid style={{ padding: '20' }} className={classes.verticalContainer}>
                            <Box padding={1}>
                                <TextField
                                    label="Nume"
                                    variant="outlined"
                                    id="name"
                                    value={form.name}
                                    name="name"
                                    onChange={handleChange} />
                            </Box>
                            <Box padding={1}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    id="email"
                                    value={form.email}
                                    name="email"
                                    onChange={handleChange} />
                            </Box>
                            <br />
                            <br />
                            <Button
                                variant="contained"
                                component="label"
                                onClick={() => { submitUser() }}
                            >
                                Salvează
                            </Button>
                        </Grid>
                    </Grid>
                    {validate ? (
                        <Box padding={1}>
                            {errorMessage}
                        </Box>
                    ) : null}
                    {success ? (
                        <Box padding={1}>
                            {successMessage}
                        </Box>
                    ) : null}
                </Widget>
            </Grid>
        </>
    );
}
