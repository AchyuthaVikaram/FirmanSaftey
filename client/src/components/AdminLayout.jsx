import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
    { name: 'Manage Products', path: '/admin/products', icon: <CategoryIcon /> },
    { name: 'Manage Industries', path: '/admin/industries', icon: <BusinessIcon /> },
    { name: 'Manage Requests', path: '/admin/requests', icon: <AssignmentIcon /> },
    { name: 'Manage Users', path: '/admin/users', icon: <PeopleIcon /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <AnalyticsIcon /> },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const desktopNav = (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {adminNavItems.map((item) => (
        <Button
          key={item.name}
          component={Link}
          to={item.path}
          startIcon={item.icon}
          sx={{
            color: isActiveRoute(item.path) ? 'var(--secondary-safety-yellow)' : 'var(--white)',
            backgroundColor: isActiveRoute(item.path) ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
            border: isActiveRoute(item.path) ? '1px solid var(--secondary-safety-yellow)' : '1px solid transparent',
            borderRadius: '8px',
            px: 2,
            py: 1,
            mx: 0.5,
            fontWeight: isActiveRoute(item.path) ? 'bold' : 'normal',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--secondary-safety-yellow)',
              borderColor: 'var(--secondary-safety-yellow)',
            },
            transition: 'all 0.3s ease',
            textTransform: 'none',
            fontSize: '0.9rem',
            minWidth: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );

  const mobileNav = (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box', 
          width: 280,
          backgroundColor: 'var(--primary-dark-blue)',
          color: 'var(--white)'
        },
      }}
    >
      <Box onClick={handleDrawerToggle} sx={{ overflow: 'auto', p: 2 }}>
        <Typography variant="h6" sx={{ my: 2, textAlign: 'center', color: 'var(--secondary-safety-yellow)' }}>
          Admin Menu
        </Typography>
        <List>
          {adminNavItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton 
                component={Link} 
                to={item.path}
                sx={{
                  color: isActiveRoute(item.path) ? 'var(--secondary-safety-yellow)' : 'var(--white)',
                  backgroundColor: isActiveRoute(item.path) ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                  borderRadius: '8px',
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--secondary-safety-yellow)',
                  },
                }}
              >
                <Box sx={{ mr: 1 }}>{item.icon}</Box>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Admin Top Navigation Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'var(--primary-dark-blue)',
          color: 'var(--white)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          py: 1
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold',
            color: 'var(--secondary-safety-yellow)',
            display: { xs: 'none', sm: 'block' }
          }}>
            Admin Dashboard
          </Typography>
          
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold',
            color: 'var(--secondary-safety-yellow)',
            display: { xs: 'block', sm: 'none' }
          }}>
            Admin
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {desktopNav}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ 
              display: { md: 'none' },
              color: 'var(--white)'
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      {mobileNav}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          backgroundColor: 'var(--light-gray)',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
