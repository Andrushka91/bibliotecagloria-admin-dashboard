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

export default function AddBook() {
  const classes = useStyles();

  const { addBook } = useContext(BooksContext);
  const [validate, setValidate] = useState(false);
  const [state, setState] = useState({
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
    const isEmpty = Object.values(state).some(x => x === null || x === '');
    console.log("isEmpty:", isEmpty)
    if (isEmpty) {
      setValidate(true);
      console.log("Some of them empty:fill the fields pls", state)
    } else {
      setValidate(false);
      console.log("notEmpty-gj", state);
       
        addBook(state);
     

    }
  }

  const errorMessage = Object.keys(state).map((fieldName, key) => {
    if (state[fieldName] == '' || state[fieldName] == 0) {
      return (
        <Box key={key} padding={1}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{errors[fieldName]}</Alert>
          </Stack>
        </Box>
      )
    }
  })

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
    console.log("name:", evt.target.name)
    console.log("value:", evt.target.value)
    if (evt.target.name == 'image') {
      const image = evt.target.files[0];
      console.log("img:", image)
      getBase64(image, (result) => {
        setState({
          ...state,
          [evt.target.name]: result
        });
      });

    } else {
      setState({
        ...state,
        [evt.target.name]: value
      });
    }
  }

  function deleteImage() {
    setState({
      ...state,
      image: ""
    });
    const input = document.querySelector('#imageInput');
    input.value = '';
    console.log("deleteImage:->state", state)
  }

  const categories = [{ id: 0, name: 'FAMILIE' }, { id: 1, name: 'SPIRITUALITATE' }, { id: 2, name: 'SANATATE' }];
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
      <Grid container spacing={2}>
        <Widget disableWidgetMenu bodyClass={classes.tableOverflow}>
          <Grid style={{ padding: 25 }} item xs={12} className={classes.horizontalContainer}>
            <Grid className={classes.verticalContainer}>
              <Box padding={1}>
                <TextField
                  label="Titlu"
                  variant="outlined"
                  value={state.title}
                  name="title"
                  onChange={handleChange} />
              </Box>

              <Box padding={1}>
                <TextField
                  id="outlined-basic"
                  label="Autor"
                  name="author"
                  variant="outlined"
                  value={state.author}
                  onChange={handleChange} />
              </Box>
              <Box padding={1}>
                {state.image && (
                  <div>
                    <img alt="not fount" width={"100px"} src={state.image} />
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
                  id="outlined-basic"
                  label="Cantitate"
                  variant="outlined"
                  name="quantity"
                  value={state.quantity}
                  onChange={handleChange} />
              </Box>
              <Box padding={1}>
                <TextField
                  id="outlined-basic"
                  label="Preț"
                  variant="outlined"
                  name="price"
                  value={state.price}
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
                  value={state.category}
                  onChange={handleChange}
                >
                  {selectItems}
                </TextField>
              </Box>

              <Box padding={1} >
                <TextField
                  id="outlined-multiline-static"
                  label="Descriere"
                  name="description"
                  multiline
                  rows={4}
                  style={{ width: 400 }}
                  value={state.descriere}
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
        </Widget>
      </Grid>
    </>
  );
}
