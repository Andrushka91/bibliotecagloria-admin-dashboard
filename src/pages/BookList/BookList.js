import React, { useCallback, useContext, useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Context as BooksContext } from '../../context/BooksContext';
import "./table-styles.css";
import useStyles from "./styles";
import Table from "../../components/table-pagination/table";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@material-ui/core/Box'
import Modal from '@mui/material/Modal';
import BookForm from "../../components/BookForm/BookForm";

export default function BookListPage() {
  const { state, fetchBooks, searchBook, deleteBook } = useContext(BooksContext);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [queryUsed, setQueryUsed] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState();
  const [open, setOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalAlertOpen, setModalAlertOpen] = useState(false);
  const [itemDeleted, setItemDeleted] = useState(false);
  const [itemEdited, setItemEdited] = useState(false);
  const classes = useStyles();
  let itemsPerPage = 3;

  const tableHead = {
    image: '',
    title: 'TITLU',
    author: 'AUTOR',
    description: 'DESCRIERE',
    category: 'CATEGORIE',
    quantity: 'CANTITATE',
    price: 'PREȚ',
    '_id': 'EDITARE',
  };

  useEffect(() => {
    fetchBooks(handleToggle, page, itemsPerPage, handleClose)
  }, [page]);

  useEffect(() => {
    if (state.items) {
      if (state.items.length === 1) {
        fetchBooks(handleToggle, page - 1, itemsPerPage, handleClose)
      }
    }
    fetchBooks(handleToggle, page, itemsPerPage, handleClose)
  }, [itemDeleted, itemEdited]);

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

  const handleModalAlertOpen = () => {
    setModalAlertOpen(true);
  };
  const handleModalAlertClose = () => {
    setModalAlertOpen(false);
  };

  const editBook = (id) => {
    setBookId(id);
    const findBook = state.items.find((t) => t._id === id);
    setBook(findBook);

    handleModalEditOpen();
    // updateBook(handleToggle, id, itemsPerPage, handleClose)
  }

  const eraseBook = async () => {
    deleteBook(handleToggle, bookId, handleClose, handleModalAlertClose, itemDeleted, setItemDeleted);
    console.log("currentPage:", page)
  }

  return (
    <>
      <Modal
        open={modalEditOpen}
        onClose={handleModalEditClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={classes.modal}>
          <BookForm book={book} bookId={bookId} itemEdited={itemEdited} setItemEdited={setItemEdited} handleModalEditClose={handleModalEditClose} />
        </Box>
      </Modal>
      <Modal
        open={modalAlertOpen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={classes.modalDialog}>
          <h2 id="parent-modal-title"> Esti sigur că vrei sa continui?</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button className={classes.confirmButton} onClick={() => eraseBook()}>Confirmare</Button>
            <Button className={classes.cancelButton} onClick={() => handleModalAlertClose()}>Anulare</Button>
          </div>
        </Box>
      </Modal>
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
            deleteBook={(id) => { setBookId(id); handleModalAlertOpen(); }}
            updateBook={(id) => { editBook(id) }}
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
