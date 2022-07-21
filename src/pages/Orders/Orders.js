import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Context as OrdersContext } from '../../context/OrdersContext';
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "./Widget";
import DataTable from "../components/TableOrderBooks/CustomizedTables";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { borderColor } from "@mui/system";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  header: {
    alignItems: 'center'
  }
}))

export default function Orders() {
  const { state, fetchOrders, searchOrder, processOrder, cancelOrder } = useContext(OrdersContext);
  const [orderBooks, setOrderBooks] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [statusChanged, setStatusChanged] = useState(false);
  const [searchText, setSearchText] = useState('');
  const classes = useStyles();
  var itemsPerPage = 5;

  // useEffect(() => {
  //   fetchData(1);
  // }, []);

  useEffect(() => {
    fetchData(page);
  }, [statusChanged]);

  const fetchData = (page) => {
    fetchOrders(handleToggle, page, itemsPerPage, handleClose);
    console.log("state:", state)
  }

  const getOrderBooks = orderId => {
    console.log('state.orders:', state.orders)
    const order = state.orders.find((e) => e[0] == orderId)
    console.log("order:", order)
    const tableData = [];
    order[5].forEach((index) => {
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
  const changeStatus = () => {
    setStatusChanged(!statusChanged);
  }

  const orderCancelation = () => {
    console.log("orderId:", orderId);
    cancelOrder(handleToggle, orderId, changeStatus, handleClose);

  };

  const orderProcess = () => {
    processOrder(handleToggle, orderId, changeStatus, handleClose);
  }

  const searchByOrderId = (searchByOrderId) => {
    console.log("searchByOrderId:", searchByOrderId)
    if (searchByOrderId !== null) {
      searchOrder(handleToggle, searchByOrderId, handleClose);
    } else {
      fetchData(page);
    }
  }

  const options = {
    filter: false,
    viewColumns: false,
    search: true,
    searchText: searchText,
    onSearchChange: (searchText) => {
      setSearchText(searchText)
    },
    searchTextControlled: true,
    selectableRows: 'none',
    responsive: 'standard',
    serverSide: true,
    rowsPerPage: itemsPerPage,
    rowsPerPageOptions: [],
    setRowProps: row => {
      // return {
      //   style: { cursor: 'pointer' }
      // };
      if (row[4] === "anulată") {
        return {
          style: {
            background: 'rgba(247, 46, 85, 0.8)',
            cursor: 'pointer'
          }
        };
      }
      if (row[4] === "procesată") {
        return {
          style: {
            background: 'rgba(103, 220, 89, 0.8)',
            cursor: 'pointer'
          }
        };
      }
      if (row[4] === "în procesare") {
        return {
          style: {
            cursor: 'pointer'
          }
        };
      }
    },
    sortOrder: {},
    count: state.totalItems,
    selectableRowsOnClick: false,
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changePage':
          fetchData(tableState.page + 1);
        case 'onColumnViewChange':
          // case 'search':
          // searchByOrderId(searchText);
          break;
        default:
      }
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
        filter: true,
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
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={4} style={{ color: 'white', padding: 16, fontFamily: 'sans-serif', fontWeight: 'normal' }}>
            {columnMeta.name}
          </th>
        )
      }
    },
    {
      name: "STARE",
      options: {
        filter: true,
        customHeadRender: (columnMeta, updateDirection) => (
          <th key={5} style={{ color: 'white', padding: 16, fontFamily: 'sans-serif', fontWeight: 'normal' }}>
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
          <div onKeyPress={(e) => e.key === 'Enter' && searchByOrderId(searchText)}>
            <MUIDataTable
              data={state.orders}
              columns={columns}
              options={options}
            />
          </div>
        </Grid>
        {orderBooks.length ? (
          <Grid item xs={12}>
            <Widget disableWidgetMenu
              processOrder={orderProcess}
              orderCancelation={orderCancelation}
              title={orderId}
              bodyClass={classes.tableOverflow}>
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
