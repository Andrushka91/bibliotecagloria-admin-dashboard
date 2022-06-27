import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Context as OrdersContext } from '../../context/OrdersContext';

import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/TableOrderBooks/Table";




const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  header: {
    alignItems: 'center'
  }
}))

export default function Orders() {

  const { state, fetchOrders } = useContext(OrdersContext);
  const [ordersData, setOrdersData] = useState([]);
  const [orderBooks, setOrderBooks] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const dataList = [];
    state.forEach((index) => {
      const item = Object.keys(index).
        filter((key) => !key.includes('_id') && !key.includes('books') && !key.includes('_v')).
        reduce((entry, key) => { return Object.assign(entry, { [key]: index[key] }) }, {});
      dataList.push(item);
    })
    const dispatchData = [];
    dataList.forEach((item) => {
      dispatchData.push(Object.values(item));
    })
    setOrdersData(dispatchData);
  }, [state]);

  const getOrderBooks = orderId => {
    const order = state.find((t) => t.orderId === orderId)
    console.log("order:", order)
    // console.log("order.books:",...order.books)
    const tableData = [];
    order['books'].forEach((index) => {
      const item = Object.keys(index).
        filter((key) => !key.includes('price') && !key.includes('_v')).
        reduce((entry, key) => { return Object.assign(entry, { [key]: index[key] }) }, {});
      tableData.push(item);
    })
    setOrderBooks(tableData);
    console.log("orderBooks:", orderBooks);
  }

  // const options = {
  //   filter: true,
  //   selectableRows: true,
  //   filterType: "dropdown",
  //   responsive: "stacked",
  //   rowsPerPage: 10,
  //   onRowsSelect: (rowsSelected, allRows) => {
  //     console.log(rowsSelected, allRows);
  //   },
  //   onRowsDelete: rowsDeleted => {
  //     console.log(rowsDeleted, "were deleted!");
  //   },
  //   onChangePage: numberRows => {
  //     console.log(numberRows);
  //   },
  //   onSearchChange: searchText => {
  //     console.log(searchText);
  //   },
  //   onColumnSortChange: (column, direction) => {
  //     console.log(column, direction);
  //   },
  //   onColumnViewChange: (column, action) => {
  //     console.log(column, action);
  //   },
  //   onFilterChange: (column, filters) => {
  //     console.log(column, filters);
  //   },
  //   onCellClick: (cellIndex, rowIndex) => {
  //     console.log("hey-ive been clicked:", cellIndex, rowIndex);
  //   }
  // };
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Comenzi" />
      <Grid container spacing={4}>
        <Grid item xs={12} >
          <MUIDataTable
            title="Listă comenzi"
            data={ordersData}
            columns={["Nr comandă", "Nume", "Email", "Total", {
              label: "Acțiuni",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <button onClick={() => {
                      console.log(tableMeta.rowData[0])
                      getOrderBooks(tableMeta.rowData[0]);
                    }}>
                      Detalii
                    </button>
                  )
                }
              }
            }]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>

        {
          orderBooks.length ?
            (
              <Grid item xs={12}>
                <Widget title="Lista de cărți din comandă" disableWidgetMenu bodyClass={classes.tableOverflow}>
                  <Table data={orderBooks} />
                </Widget>
              </Grid>
            )
            : null
        }
      </Grid>
    </>
  );
}
