import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Context as BooksContext } from '../../context/BooksContext';
import "./table-styles.css";
import Table from "../../components/table-pagination/table";
export default function BookListPage() {

  const { state, fetchBooks } = useContext(BooksContext);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const tableHead = {
    image:"",
    title: "Titlu",
    author: "Autor",
    description: "descriere",
    category: "categorie",
    price: "pret",
  };

  const mapData = () => {
    let data = [];
    state.items.forEach((e) => {
    })
  }

  useEffect(() => {
    fetchBooks(page, itemsPerPage)
  }, [page]);


  return (
    <>
      <PageTitle title="Bibliotecă" />
      <Grid container spacing={4}>
        {state.items ?
          <Table
            tableHead={tableHead}
            requestPage={(page) => setPage(page)}
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
