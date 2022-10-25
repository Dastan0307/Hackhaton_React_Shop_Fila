import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContextProvider';
import { useCart } from '../../contexts/CartConctextProvider';
import { styled } from '@mui/material/styles';
// imports mui 
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ item }) {
    const navigate = useNavigate();

    const { deleteProduct } = useProducts();
    const { addProductToCart } = useCart();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  ///////////////////


  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [like, setLIke] = React.useState(false);
  let count = 0;


  return (
    <Card sx={{ 
      maxWidth: 345, 
      margin: 5
      }}>
        <CardHeader

        action={
          <IconButton aria-label="settings" onClick={handleOpenUserMenu}> 
            <MoreVertIcon />
          </IconButton> 
        }
        title={item.name}
        subheader="Online Shopping"
      />
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}MenuItem
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                <MenuItem key={item.id} onClick={handleCloseUserMenu} className="menu">
                <Typography textAlign="center" onClick={() => navigate(`/details/${item.id}`)} className='productCardDetails'>Details</Typography><br />
                <Typography textAlign="center" onClick={() => navigate(`/edit/${item.id}`)} className='productCardUpdate'>Update</Typography><br />
                <Typography textAlign="center" onClick={() => deleteProduct(item.id)} className='productCardDelete'>Delete</Typography><br />
                <Typography textAlign="center" onClick={() => addProductToCart(item)} className='productCardCart'>Add To Cart</Typography><br />
                </MenuItem>
            </Menu>
      <CardMedia 
        component="img"
        height="194"
        image={item.picture}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <>Price: {item.price}<strong>₽</strong></><br /><br />
          <>Brend: {item.brend}</><br />
          <>Size: {item.size}</><br />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => setLIke(!like)}>
          <p>{like ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteIcon  />}</p><p>{like ? count + 1 : count}</p>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <h6>Model: {item.model}</h6>
            <strong>Mobile number: (+996) 777 77 77 77</strong>
            <strong>Our Website:  <a href="https://www.fila.com/" className='filsLink'>www.fila.com/</a></strong>
          </Typography>
          <Typography paragraph>Coments...</Typography>
          <Typography paragraph></Typography>
          <Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            >
          </Box>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}