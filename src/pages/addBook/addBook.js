import React, { useState, useEffect, useContext } from "react";
import { Grid, Input, InputLabel, FormHelperText, } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Context as BooksContext } from '../../context/BooksContext';
import Upload from 'material-ui-upload/Upload';
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/TableOrderBooks/Table";
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@material-ui/core/Button';
import { List } from '@mui/material';
import useStyles from "../addBook/style";
import Box from '@material-ui/core/Box'

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


export default function AddBook() {
  const classes = useStyles();

  const { state, addBook } = useContext(BooksContext);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validate, setValidate] = useState(false);
  const [form, setForm] = useState({
    image: "",
    title: "",
    author: "",
    description: "",
    category: "",
    price: '',
    quantity: '',
  })
  const errors =
  {
    image: 'Coperta este obligatorie.',
    title: 'Titlul este obligatoriu.',
    author: 'Autorul este obligatoriu.',
    description: 'Descrierea este obligatorie.',
    category: 'Categoria este obligatorie.',
    price: 'Prețul este obligatoriu.',
    quantity: 'Cantitatea este obligatorie.'
  }

  const uploadBook = () => {
    const isEmpty = Object.values(form).some(x => x === null || x === '');
    console.log("isEmpty:", isEmpty)
    if (isEmpty) {
      setValidate(true);
    } else {
      setValidate(false);
      addBook((value) => handleToggle(value), (value) => setSuccess(value), form, (value) => handleClose(value));

      setTimeout(() => {
        setSuccess(false);
        // clearForm();
        setForm({
          image: '',
          title: '',
          author: '',
          description: '',
          category: '',
          price: '',
          quantity: '',
        });
        document.querySelector('#imageInput').value = '';
      }, "5000")
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
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

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name == 'image') {
      const image = evt.target.files[0];
      getBase64(image, (result) => {
        setForm({
          ...form,
          [evt.target.name]: result
        });
      });

    } else {
      setForm({
        ...form,
        [evt.target.name]: value
      });
    }
  }

  function deleteImage() {
    setForm({
      ...form,
      image: ""
    });
    const input = document.querySelector('#imageInput');
    input.value = '';
  }

  const categories = [{ id: 0, name: 'Familie' }, { id: 1, name: 'Spiritualitate' }, { id: 2, name: 'Sănătate' }];
  const selectItems = categories.map(category => (
    <MenuItem key={category.id}
      value={category.name}
    >
      {category.name}
    </MenuItem>
  ))

  return (
    <>
      <PageTitle title="Adăugare carte" />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Widget disableWidgetMenu bodyClass={classes.tableOverflow}>
          <Grid style={{ padding: 25 }} item xs={12} className={classes.horizontalContainer}>
            <Grid className={classes.verticalContainer}>
              <Box padding={1}>
                <TextField
                  label="Titlu"
                  variant="outlined"
                  id="title"
                  value={form.title}
                  name="title"
                  onChange={handleChange} />
              </Box>

              <Box padding={1}>
                <TextField
                  label="Autor"
                  variant="outlined"
                  id="author"
                  name="author"
                  value={form.author}
                  onChange={handleChange} />
              </Box>
              <Box padding={1}>
                {form.image && (
                  <div>
                    <img alt="not fount" width={"100px"} src={form.image} />
                    <br />
                    <Button
                      variant="contained"
                      component="label"
                      onClick={() => deleteImage()}>Elimină</Button>
                  </div>
                )}
                <br />
                <Button
                  variant="contained"
                  component="label"
                  name="image"
                >
                  <input
                    type="file"
                    name="image"
                    id="imageInput"
                    hidden
                    onChange={handleChange}
                  />
                  Alege coperta
                </Button>
                <br />
                <br />
                <Button
                  variant="contained"
                  component="label"
                  onClick={() => { uploadBook() }}
                >
                  Salvează
                </Button>
              </Box>
            </Grid>
            <Grid item className={classes.verticalContainer}>
              <Box padding={1}>
                <TextField
                  label="Cantitate"
                  variant="outlined"
                  id="quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange} />
              </Box>
              <Box padding={1}>
                <TextField
                  id="price"
                  label="Preț"
                  variant="outlined"
                  name="price"
                  value={form.price}
                  onChange={handleChange} />
              </Box>
            </Grid>
            <Grid item className={classes.horizontalContainer}>
              <Box padding={1}>
                <TextField
                  style={{ width: 209 }}
                  variant="outlined"
                  select
                  name="category"
                  label="categorie"
                  id="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {selectItems}
                </TextField>
              </Box>
              <Box padding={1} >
                <TextField
                  id="description"
                  label="Descriere"
                  name="description"
                  multiline
                  rows={4}
                  style={{ width: 400 }}
                  value={form.description}
                  onChange={handleChange}
                />
              </Box>
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
