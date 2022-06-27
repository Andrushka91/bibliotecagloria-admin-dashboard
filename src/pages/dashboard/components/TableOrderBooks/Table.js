import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell style={{textAlign: 'center'}} key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ _id, image, title, author, description, quantity, category }) => (
          <TableRow key={_id}>
            <TableCell style={{ width: '10%' }} ><img style={{ width: 150 }} src={`data:image/png;base64,${image}`} /></TableCell>
            <TableCell style={{textAlign: 'center'}}>{title}</TableCell>
            <TableCell style={{textAlign: 'center'}}>{author}</TableCell>
            <TableCell style={{textAlign: 'center'}}>{quantity}</TableCell>
            <TableCell style={{textAlign: 'center'}}>{description}</TableCell>
            <TableCell style={{textAlign: 'center'}}>{category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
