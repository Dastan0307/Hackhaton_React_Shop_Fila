import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ImageListItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


// Свои importы
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';

const pages = [
    {
        type: 'Home',
        path: '/'
    },
    {
        type: 'Products',
        path: '/products'
    },
    {
        type: 'Admin',
        path: '/admin'
    },
    {
        type: 'Cart',
        path: '/cart'
    }
];
// Содаем свой обЪект с нашими страницами
const settings = [
    {
        type: 'Register',
        path: '/register'
    },
    {
        type: 'Login',
        path: '/login'
    }
];

// Добавляем новый фон на Navbar
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#80d8ff'
        },
    },
});


const ResponsiveAppBar = () => {


    // custom
    const navigate = useNavigate();
    const { user, picture, checkAuth, logout } = useAuth();

    React.useEffect(() => {
        if(localStorage.getItem("token")){
            checkAuth();
        };
    }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    // check User 
    const name = JSON.parse(localStorage.getItem('username'));


  return (
    //Чтобы наш стиль добавился всё наш код оборачиваем на ThemeProvider
    <ThemeProvider theme={lightTheme}>
        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                {/* Свой логатип */}
                <ImageListItem sx={{ width: 100, height: 400 }} cols={3} rowHeight={164}>
                    <img src="https://cdn.shopify.com/s/files/1/0271/3973/5629/files/logo_619x.png?v=1614347840" />
                </ImageListItem>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page.type} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={() => navigate(page.path)}>{page.type}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    key={page.type}
                    onClick={() => navigate(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.type}
                </Button>
                ))}
            </Box>

            <Typography sx={{ color: '#0b1f3f', fontWeight: 600}}>{name ? (<>{name}</>) : ''}</Typography>
            <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={picture} alt={user[1]} />
                </IconButton>
                </Tooltip>
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
                {settings.map((setting) => (
                    <MenuItem key={setting.type} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => navigate(setting.path)}>{setting.type}</Typography>
                    </MenuItem>
                ))}
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={logout}>Logout</Typography>
                </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;


