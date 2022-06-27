import React, { useEffect, useState } from "react";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";

import './styles.css';

const Table = ({ tableHead, requestPage, searchBook, countPerPage, totalItems, items }) => {
    const [collection, setCollection] = useState(items);
    const [currentPage, setCurrentPage] = useState(1);
    const [disablePagination, setDisablePagination] = useState(false);
    let searchInput = React.createRef();

    useEffect(() => {
        setCollection(items);
    }, [items]);

    const searchData = (value) => {
        const query = value.toLowerCase();
        console.log("currentCollectionResult:", collection)
        console.log("querry:", query)
        // const data = collection.filter(item => item.title.toLowerCase().indexOf(query) > -1)
        if (query == '') {
            setDisablePagination(false);
        } else {
            setDisablePagination(true);
        }
        searchBook(query);
        setCollection(items);
        console.log("searchResult:", collection)
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
                return <td key={i}><img style={{ width: 100 }} src={source} /></td>;
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
            <td key={index}>{title}</td>
        ));
    };

    return (
        <>
            <div className="search">
                <input
                    placeholder="Căutare"
                    ref={searchInput}
                />
                <button onClick={() => searchData(searchInput.current.value)}>Caută</button>
            </div>
            <table>
                <thead>
                    <tr>{headRow()}</tr>
                </thead>
                <tbody className="trhover">{tableData()}</tbody>
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
