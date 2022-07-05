import React, { useEffect, useState } from "react";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import SearchBar from "material-ui-search-bar";
import './styles.css';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

const Table = ({ tableHead, requestPage, searchBook, countPerPage, page, totalItems, items, deleteBook }) => {
    const [collection, setCollection] = useState(items);
    const [currentPage, setCurrentPage] = useState(page);
    const [disablePagination, setDisablePagination] = useState(false);


    useEffect(() => {
        setCollection(items);
    }, [items]);

    const searchData = (value) => {
        const query = value.toLowerCase();
        // const data = collection.filter(item => item.title.toLowerCase().indexOf(query) > -1)
        if (query == '') {
            setDisablePagination(false);
        } else {
            setDisablePagination(true);
        }
        searchBook(query);
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
            if (keyD == 'image') {
                const source = key[keyD];
                return <td key={i} style={{ textAlign: 'left', width: 100 }}><img style={{ width: 100 }} src={source} /></td>;
            }
            if (keyD == '_id') {
                return <td key={i}><ClearIcon style={{ cursor: 'pointer' }} onClick={() => { deleteBook(key[keyD]) }} /></td>;
            }
            if (keyD == 'price') {
                return <td key={i}>{key[keyD] + '€'} </td>;
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
                onRequestSearch={(value) => searchData(value)}
            />
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
export default Table;
