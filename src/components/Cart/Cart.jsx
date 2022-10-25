import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';
import { useCart } from '../../contexts/CartConctextProvider';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Cart() {
    const { getCart, cart, changeProductCount, deleteProductCart } = useCart();

    React.useEffect(() => {
        getCart();
    }, []);

    function cartCleaner(){
        localStorage.removeItem('cart');
        getCart();
    };
    


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Picture</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Brend</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Sub Price</TableCell>
            <TableCell align="right">---</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.products.map((row) => (
            <TableRow
              key={row.item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                  <img src={row.item.picture} alt="" width="50" />
              </TableCell>
              <TableCell align="right">
                  {row.item.name}
              </TableCell>
              <TableCell align="right">
                  {row.item.brend}
              </TableCell>
              <TableCell align="right">
                  {row.item.price}
              </TableCell>
              <TableCell align="right">
                  <TextField type="number" value={row.count} onChange={e => changeProductCount(e.target.value, row.item.id)} />
              </TableCell>
              <TableCell align="right">
                  {row.subPrice}
              </TableCell>
              <TableCell align="right">
                  <Button color="error" variant="contained" onClick={() => deleteProductCart(row.item.id)}>Delete From Cart</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="h6" component="div">
          Total price: {cart?.totalPrice}
          <Button onClick={cartCleaner} variant="contained" color="warning">BUY NOW</Button>
      </Typography>
    </TableContainer>
  );
}