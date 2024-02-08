import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import logo from "../../assets/profcio__All.png"
import { jwtDecode } from 'jwt-decode';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import blankImage from '../../assets/blankprofile.png'
import { base_url } from '../../constants/constants';
const pages = ['Home', 'Services', 'Employees'];
const settings = [];


function ResponsiveNavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userId , setUserId] = useState('');
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [isLoggedIn, setisLoggedIn] = useState(false)


  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setUserId(decode.user_id);
      setisLoggedIn(!!localStorage.getItem('token'));
    }
  }, [token]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login")

  }
  const handleLogin = () => {
    navigate("/login")
  }

  const toProfile = () => {
    navigate(`/userprofile`)
  }
  const toBookings = () => {
    navigate(`/booking_list`)
  }
  const toChat = () => {
    navigate('/chat')
  }
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


  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }} className='placeholder-opacity-70' >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/'>
            <img src={logo} alt="logo" color='green' width="150" height="100" />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: 'rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          ></Typography>

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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link to={'/'}
                className='font-roboto-mono text-white '
                style={{ fontSize: '20px' }}>
                Home</Link>
            </Button>



            <Button sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link
                to={'/employeelist/'}
                className='font-roboto-mono text-white  '
                style={{ fontSize: '20px' }}
              >
                employees
              </Link>
            </Button>

          </Box>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <img alt="img" src={blankImage}
                  className='rounded-full w-12' />
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
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>

                </MenuItem>
              ))}

              <Button
                onClick={isLoggedIn ? handleLogout : handleLogin}
                className="bg-blue-gray-100 text-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-600"
              >{isLoggedIn ? 'Logout' : 'Login'}
              </Button>
              {isLoggedIn && <span> <br />

                <Button
                  onClick={toProfile}
                  className="bg-green-500 text-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-600"
                >Userprofile
                </Button>
                <br />
                <Button
                  onClick={toBookings}
                  className="bg-green-500 text-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-600"
                >My Bookings
                </Button> 
                <br />
                <Button
                  onClick={toChat}
                  className="bg-green-500 text-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-600"
                  >Chat
                </Button>
                </span>}

            </Menu>
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  );
}
export default ResponsiveNavBar