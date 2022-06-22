import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Context as BooksContext } from '../../context/BooksContext';
import "./table-styles.css";
import Table from "../../components/table-pagination/table";
export default function BookListPage() {

  const { state, fetchBooks, searchBook } = useContext(BooksContext);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [queryUsed, setQueryUsed] = useState(false);
  let itemsPerPage = 3;
  const tableHead = {
    image: "",
    title: "Titlu",
    author: "Autor",
    description: "Descriere",
    category: "Categorie",
    price: "Pret",
  };

  const mapData = () => {
    let data = [];
    state.items.forEach((e) => {
    })
  }

  useEffect(() => {
    fetchBooks(page, itemsPerPage)
  }, [page]);

  useEffect(() => {

    console.log("useEffect:querry:", searchQuery);
    if (searchQuery !== '') {
      searchBook(searchQuery);
      itemsPerPage = state.totalItems;
      console.log("State after search:", state)
    } else {
      fetchBooks(page, itemsPerPage);
    }
  }, [searchQuery, queryUsed]);

  return (
    <>
      <PageTitle title="Bibliotecă" />
      <Grid container spacing={4}>
        {state.items ?
          <Table
            tableHead={tableHead}
            requestPage={(page) => setPage(page)}
            searchBook={(value) => { setSearchQuery(value); setQueryUsed(!queryUsed) }}
            countPerPage={itemsPerPage}
            totalItems={state.totalItems}
            items={state.items}
          />
          : null
        }
      </Grid>
    </>
  );
}
