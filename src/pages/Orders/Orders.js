import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Context as OrdersContext } from '../../context/OrdersContext';
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "./Widget";
import DataTable from "../dashboard/components/TableOrderBooks/CustomizedTables";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';



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
  const [orderId, setOrderId] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetchOrders(handleToggle, handleClose);
  }, []);

  useEffect(() => {
    const dataList = [];//€
    state.forEach((index) => {
      const item = Object.keys(index).
        filter((key) => !key.includes('_id') && !key.includes('books') && !key.includes('_v')).
        reduce((entry, key) => {
          return Object.assign(entry, { [key]: index[key] })
        }, {});
      dataList.push(item);
    })
    const dispatchData = [];
    dataList.forEach((item) => {
      item.totalPrice = item.totalPrice + '€';
      dispatchData.push(Object.values(item));
    })
    setOrdersData(dispatchData);
  }, [state]);

  const getOrderBooks = orderId => {
    const order = state.find((t) => t.orderId === orderId)
    const tableData = [];
    order['books'].forEach((index) => {
      const item = Object.keys(index).
        filter((key) => !key.includes('price') && !key.includes('_v')).
        reduce((entry, key) => { return Object.assign(entry, { [key]: index[key] }) }, {});
      tableData.push(item);
    })
    setOrderBooks(tableData);
    setOrderId(orderId);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const options = {
    filter: true,
    selectableRows: 'none',
    filterType: "dropdown",
    responsive: "standard",
    rowsPerPage: 10,
    selectableRowsOnClick: false,
    onRowSelectionChange: (rowsSelected, allRows) => {
      console.log(rowsSelected);
      // getOrderBooks(rowsSelected[0]);

    },

    // onRowsDelete: rowsDeleted => {
    //   console.log(rowsDeleted, "were deleted!");
    // },
    // onChangePage: numberRows => {
    //   console.log(numberRows);
    // },
    // onSearchChange: searchText => {
    //   console.log(searchText);
    // },
    // onColumnSortChange: (column, direction) => {
    //   console.log(column, direction);
    // },
    // onColumnViewChange: (column, action) => {
    //   console.log(column, action);
    // },
    // onFilterChange: (column, filters) => {
    //   console.log(column, filters);
    // },
    // onCellClick: (cellIndex, rowIndex) => {
    //   console.log("hey-ive been clicked:", cellIndex, rowIndex);
    // },
    onRowClick: (rowData, rowState) => {
      console.log(rowData[0], rowState);
      getOrderBooks(rowData[0]);
    },
  };

  //columns={["Nr comandă", "Nume", "Email", "Total"]}
  const columns = [
    {
      name: "NR COMANDA",
      options: {
        filter: true,
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={1} style={{ color: 'white', padding: 16, fontFamily: 'sans-serif', fontWeight: 'normal' }} >
            {columnMeta.name}
          </th>
        )
      }
    },
    {
      name: "NUME",
      options: {
        filter: true,
        sortDirection: 'asc',
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={2} style={{ color: 'white', padding: 16, fontFamily: 'sans-serif', fontWeight: 'normal' }}>
            {columnMeta.name}
          </th>
        )
      }
    },
    {
      name: "EMAIL",
      options: {
        filter: false,
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={3} style={{ color: 'white', padding: 16, fontFamily: 'sans-serif', fontWeight: 'normal' }}>
            {columnMeta.name}
          </th>
        )
      }
    },
    {
      name: "TOTAL",
      options: {
        filter: true,
        sort: false,
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={4} style={{ color: 'white', padding: 16, fontFamily: 'sans-serif', fontWeight: 'normal' }}>
            {columnMeta.name}
          </th>
        )
      }
    }

  ];

  return (
    <>
      <PageTitle title="Comenzi" />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MUIDataTable
            data={ordersData}
            columns={columns}
            options={
              options
            }
          />
        </Grid>

        {
          orderBooks.length ?
            (
              <Grid item xs={12}>
                <Widget title={orderId} bodyClass={classes.tableOverflow}>
                  <DataTable data={orderBooks} />
                </Widget>
              </Grid>
            )
            : null
        }
      </Grid>
    </>
  );
}
