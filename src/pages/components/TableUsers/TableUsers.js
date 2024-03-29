import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import SearchBar from "material-ui-search-bar";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useStyles from "./styles";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SignUp from '../SignUp/SignUp'

const TableUsers = ({ tableHead, requestPage, searchUser, deleteUser, updateUser, countPerPage, page, totalItems, items, accountCreated, setAccountCreated }) => {
    const [collection, setCollection] = useState(items);
    const [currentPage, setCurrentPage] = useState(page);
    const [disablePagination, setDisablePagination] = useState(false);
    const [openModalAddAccount, setOpenModalAddAccount] = useState(false);
    const [userAdded, setUserAdded] = useState(false);
    var classes = useStyles();


    useEffect(() => {
        setCollection(items);
    }, [items]);

    useEffect(() => {
        setCollection(items);
    }, [userAdded]);

    const searchData = (value) => {
        console.log("value:", value);
        const query = value.toLowerCase();
        // const data = collection.filter(item => item.title.toLowerCase().indexOf(query) > -1)
        if (query === '') {
            setDisablePagination(false);
        } else {
            setDisablePagination(true);
        }
        searchUser(query);
        setCollection(items);
    }

    const updatePage = p => {
        setCurrentPage(p);
        requestPage(p);
    };

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            if (keyD === '_id') {
                return <td key={i}>
                    <EditIcon style={{ cursor: 'pointer' }} onClick={() => { updateUser(key[keyD]) }} />
                    <br />
                    <br />
                    {localStorage.getItem('userId') !== key[keyD] ?
                        <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => { deleteUser(key[keyD]) }} />
                        :  <DeleteIcon style={{ color: '#b2b2b2' }} /> 
                    }
                </td>;
            }
            return <td key={i}>{key[keyD]}</td>;
        });
        return <tr key={index}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        return Object.values(tableHead).map((title, index) => (
            <td key={index} style={{ fontSize: 16 }}>{title}</td>
        ));
    };

    const handleOpenModalAddAccount = () => {
        setOpenModalAddAccount(true);
    }

    const handleCloseModalAddAccount = () => {
        setOpenModalAddAccount(false);
    }

    return (
        <>
            <Modal
                open={openModalAddAccount}
                onClose={handleCloseModalAddAccount}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className={classes.modalAddAccount}>
                    <SignUp handleCloseModalAddAccount={handleCloseModalAddAccount} accountCreated setAccountCreated />
                </Box>
            </Modal>

            <div style={{ display: 'flex', position: 'relative', width: '100%', margin: '0 auto', justifyContent: 'space-between' }} >
                <SearchBar
                    placeholder="Caută după email"
                    onRequestSearch={(value) => searchData(value)}
                />
                <Button
                    className={classes.confirmButton}
                    variant="contained"
                    onClick={() => { handleOpenModalAddAccount() }}
                >
                    Creare cont Admin
                </Button>
            </div>


            <table>
                <thead style={{ color: "white", fontWeight: 'bold', fontSize: 22 }}>
                    <tr>{headRow()}</tr>
                </thead>
                <tbody id="tableRow" className="trhover">{tableData()}</tbody>
            </table>
            {
                !disablePagination ?
                    (<Pagination
                        pageSize={countPerPage}
                        onChange={updatePage}
                        current={currentPage}
                        total={totalItems}
                    />)
                    : null
            }
        </>
    );
};
export default TableUsers;
