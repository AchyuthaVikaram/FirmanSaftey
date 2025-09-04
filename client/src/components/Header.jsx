import React, { useState } from 'react';
import '../styles/Header.css';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, TextField, InputAdornment, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import FirmanLogo from '../assets/images/fireman_logo.png'; // Import your logo
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { getItemCount, clearCart, isAuthenticated } = useCart();
  const { user, logout, isAdmin } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear search term after submission
    }
  };

  const handleLogout = () => {
    clearCart(); // Clear cart before logout
    logout();
    navigate('/login'); // Redirect to login page after logout
    handleDrawerToggle(); // Close mobile drawer on logout
  };

  const navItems = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Products', path: '/products' },
    { name: 'Industries', path: '/industries' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Get a Quote', path: '/get-a-quote' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} className="mobile-nav-drawer">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} sx={{ my: 2, mr: 2 }}>
        <img src={FirmanLogo} alt="Firman Safety Logo" className="header-logo-image" />
      </Link>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Button component={Link} to={item.path} sx={{ width: '100%' }} className="mobile-nav-button">
              <ListItemText primary={item.name} />
            </Button>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <form onSubmit={handleSearchSubmit} style={{ width: '100%', padding: '8px 16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </ListItem>
        <ListItem disablePadding>
          <Button component={Link} to="/cart" sx={{ width: '100%' }} className="mobile-nav-button">
            <Badge badgeContent={isAuthenticated ? getItemCount() : 0} color="secondary">
              <ShoppingCartIcon />
            </Badge>
            <ListItemText primary="Cart" sx={{ ml: 1 }} />
          </Button>
        </ListItem>

        {user ? (
          <>
            {isAdmin && (
              <ListItem disablePadding>
                <Button component={Link} to="/admin/dashboard" sx={{ width: '100%' }} className="mobile-nav-button">
                  <DashboardIcon />
                  <ListItemText primary="Admin Dashboard" sx={{ ml: 1 }} />
                </Button>
              </ListItem>
            )}
            <ListItem disablePadding>
              <Button component={Link} to="/profile" sx={{ width: '100%' }} className="mobile-nav-button">
                <AccountCircleIcon />
                <ListItemText primary="Profile" sx={{ ml: 1 }} />
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button onClick={handleLogout} sx={{ width: '100%' }} className="mobile-nav-button">
                <LogoutIcon />
                <ListItemText primary="Logout" sx={{ ml: 1 }} />
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <Button component={Link} to="/login" sx={{ width: '100%' }} className="mobile-nav-button">
                <ListItemText primary="Login" />
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button component={Link} to="/register" sx={{ width: '100%' }} className="mobile-nav-button">
                <ListItemText primary="Register" />
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ bgcolor: 'var(--white)' }} className="header-app-bar">
      <Toolbar className="header-toolbar">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="header-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} sx={{ mr: 4 }}>
            <img src={FirmanLogo} alt="Firman Safety Logo" className="header-logo-image" />
          </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} className="header-nav-links">
          {navItems.map((item) => (
            <Button key={item.name} color="inherit" className="nav-button" component={Link} to={item.path}
              sx={{
                color: 'var(--dark-text)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light hover effect
                  color: 'var(--primary-royal-blue)',
                },
                mx: 0.5, // Add some horizontal margin between nav items
              }}>
              {item.name}
            </Button>
          ))}

          {isAdmin && (
            <Button color="inherit" className="nav-button" component={Link} to="/admin/dashboard"
              sx={{
                color: 'var(--dark-text)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  color: 'var(--primary-royal-blue)',
                },
                mx: 0.5,
              }}>
              <DashboardIcon sx={{ mr: 0.5 }} /> Admin
            </Button>
          )}

          <form onSubmit={handleSearchSubmit} className="header-search-form">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" aria-label="search" sx={{ color: 'var(--primary-royal-blue)' }}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                ml: 2,
                mr: 1,
                '& .MuiOutlinedInput-root': { color: 'var(--dark-text)', fieldset: { borderColor: 'var(--primary-royal-blue)' } },
                '& .MuiInputBase-input': { color: 'var(--dark-text)' },
                '& .MuiInputLabel-root': { color: 'var(--dark-text)' },
              }}
            />
          </form>
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={isAuthenticated ? getItemCount() : 0} color="secondary">
              <ShoppingCartIcon sx={{ color: 'var(--dark-text)' }} />
            </Badge>
          </IconButton>

          {user ? (
            <>
              <Button color="inherit" className="nav-button" component={Link} to="/profile"
                sx={{
                  color: 'var(--dark-text)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: 'var(--primary-royal-blue)',
                  },
                  mx: 0.5,
                }}>
                <AccountCircleIcon sx={{ mr: 0.5 }} /> Profile
              </Button>
              <Button color="inherit" className="nav-button" onClick={handleLogout}
                sx={{
                  color: 'var(--dark-text)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: 'var(--primary-royal-blue)',
                  },
                  mx: 0.5,
                }}>
                <LogoutIcon sx={{ mr: 0.5 }} /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" className="nav-button" component={Link} to="/login"
                sx={{
                  color: 'var(--dark-text)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: 'var(--primary-royal-blue)',
                  },
                  mx: 0.5,
                }}>
                Login
              </Button>
              <Button color="inherit" className="nav-button" component={Link} to="/register"
                sx={{
                  color: 'var(--dark-text)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: 'var(--primary-royal-blue)',
                  },
                  mx: 0.5,
                }}>
                Register
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }} className="mobile-menu-container">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 0, ml: 'auto', color: 'var(--dark-text)' }} /* Adjust margin to create space */
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </AppBar>
  );
};

export default Header;
