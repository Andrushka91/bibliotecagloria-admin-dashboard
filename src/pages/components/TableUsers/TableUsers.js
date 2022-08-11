import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import "rc-pagination/assets/index.css";
import './styles.css';
import Pagination from "rc-pagination";
import SearchBar from "material-ui-search-bar";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TableUsers = ({ tableHead, requestPage, searchUser, deleteUser, updateUser, countPerPage, page, totalItems, items }) => {
    const [collection, setCollection] = useState(items);
    const [currentPage, setCurrentPage] = useState(page);
    const [disablePagination, setDisablePagination] = useState(false);

    useEffect(() => {
        setCollection(items);
    }, [items]);

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
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => { deleteUser(key[keyD]) }} />
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
    return (
        <>
            <SearchBar
                placeholder="Caută după email"
                onRequestSearch={(value) => searchData(value)}
            />

            <Button style={{ marginLeft: 10, marginTop: 4 }} variant="contained">Adaugă admin</Button>

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
