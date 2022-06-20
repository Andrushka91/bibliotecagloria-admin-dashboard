import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import React, { useEffect, useState } from "react";



const Table = ({ tableHead, requestPage, countPerPage, totalItems, items }) => {
    const [collection, setCollection] = useState(items);
    const [value, setValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const searchData = React.useRef(
        throttle(val => {
            const query = val.toLowerCase();
            const data = items.filter(item => item.title.toLowerCase().indexOf(query) > -1)
            setCollection(data);
            console.log("search:", data)
        }, 400)
    );

    useEffect(() => {
        if (!value) {
            updatePage(1);
        } else {
            searchData.current(value);
        }
    }, [value]);

    useEffect(() => {
        setCollection(items);
    }, [items]);

    const updatePage = p => {
        setCurrentPage(p);
        requestPage(p);
    };

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            if (key[keyD].data) {
                const source = "data:image/png;base64," + key[keyD].data + "";
                return <td key={i}><img style={{ width: 100 }} src={source} /></td>;
            }
            return <td key={i}>{key[keyD]}</td>;
        });
        console.log("columndata:", columnData)
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
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>{headRow()}</tr>
                </thead>
                <tbody className="trhover">{tableData()}</tbody>
            </table>
            <Pagination
                pageSize={countPerPage}
                onChange={updatePage}
                current={currentPage}
                total={totalItems}
            />
        </>
    );
};
export default Table;
