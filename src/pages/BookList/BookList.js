import React, { useCallback, useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Context as BooksContext } from '../../context/BooksContext';
import "./table-styles.css";
import Table from "../../components/table-pagination/table";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@material-ui/core/Box'

export default function BookListPage() {
  const { state, fetchBooks, searchBook, deleteBook } = useContext(BooksContext);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [queryUsed, setQueryUsed] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [open, setOpen] = useState(false);

  let itemsPerPage = 3;

  const tableHead = {
    image: "",
    title: "TITLU",
    author: "AUTOR",
    description: "DESCRIERE",
    category: "CATEGORIE",
    quantity:'CANTITATE',
    price: "PREȚ",
    '_id': ''
  };

  const successMessage = () => {
    return (
      <Box padding={1}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">{alertMessage}</Alert>
        </Stack>
      </Box>
    )
  }

  useEffect(() => {
    if (state.items !== undefined) {
      if (state.items.length === 0) {
        fetchBooks(handleToggle, page - 1, itemsPerPage, handleClose)
      }
    }
    fetchBooks(handleToggle, page, itemsPerPage, handleClose)


  }, [page, state.totalItems]);



  useEffect(() => {
    console.log("useEffect:querry:", searchQuery);
    if (searchQuery !== '') {
      searchBook(searchQuery);
      itemsPerPage = state.totalItems;
      console.log("State after search:", state)
    } else {
      fetchBooks(handleToggle, page, itemsPerPage, handleClose);
    }
  }, [searchQuery, queryUsed]);



  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const pageRefreshAfterDelete = () => {
    // if (state.length < itemsPerPage) {
    //   setPage(page - 1);
    // }
  }

  return (
    <>
      <PageTitle title="Listă cărți" />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={4}>
        {state.items ?
          <Table
            tableHead={tableHead}
            requestPage={(page) => setPage(page)}
            searchBook={(value) => { setSearchQuery(value); setQueryUsed(!queryUsed) }}
            deleteBook={(id) => { deleteBook(handleToggle, id, itemsPerPage, handleClose) }}
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
