import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables({ data }) {

    function createData(_id, image, title, author, quantity, description, category) {
        return { _id, image, title, author, quantity, description, category };
    }

    const rows = [];
    data.map(({ _id, image, title, author, description, quantity, category }) => {
        rows.push(createData(_id, image, title, author, quantity, description, category));
    })
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="center">TITLU</StyledTableCell>
                        <StyledTableCell align="center">AUTOR</StyledTableCell>
                        <StyledTableCell align="center">CANTITATE</StyledTableCell>
                        <StyledTableCell align="center">DESCRIERE</StyledTableCell>
                        <StyledTableCell align="center">CATEGORIE</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row" style={{ width: '10%' }} >
                                <img style={{ width: 150 }} src={row.image} />
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.title}</StyledTableCell>
                            <StyledTableCell align="center">{row.author}</StyledTableCell>
                            <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                            <StyledTableCell align="center">{row.description}</StyledTableCell>
                            <StyledTableCell align="center">{row.category}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
