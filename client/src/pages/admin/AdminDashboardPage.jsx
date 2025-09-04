import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const dashboardStats = [
    {
      title: 'Total Products',
      value: '25+',
      icon: <CategoryIcon sx={{ fontSize: 40, color: 'var(--primary-royal-blue)' }} />,
      color: 'var(--primary-royal-blue)'
    },
    {
      title: 'Industries Served',
      value: '8+',
      icon: <BusinessIcon sx={{ fontSize: 40, color: 'var(--secondary-safety-yellow)' }} />,
      color: 'var(--secondary-safety-yellow)'
    },
    {
      title: 'Active Requests',
      value: '12',
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      color: '#4CAF50'
    },
    {
      title: 'Registered Users',
      value: '150+',
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#FF5722' }} />,
      color: '#FF5722'
    }
  ];

  return (
    <Box sx={{ 
      maxWidth: 'var(--container-max-width)', 
      mx: 'auto',
      p: { xs: 2, md: 4 }
    }}>
      {/* Header Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        p: 4,
        backgroundColor: 'var(--white)',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <DashboardIcon sx={{ fontSize: 48, color: 'var(--primary-royal-blue)', mr: 2 }} />
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold',
            color: 'var(--primary-royal-blue)'
          }}>
            Admin Dashboard
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ 
          color: 'var(--medium-gray)',
          maxWidth: 600,
          mx: 'auto'
        }}>
          Welcome to the Firman Safety Admin Panel. Manage your products, industries, customer requests, and user accounts from this centralized dashboard.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
        {dashboardStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%',
              textAlign: 'center',
              p: 3,
              backgroundColor: 'var(--white)',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }
            }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold',
                  color: stat.color,
                  mb: 1
                }}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'var(--medium-gray)',
                  fontWeight: 'medium'
                }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ 
        p: 4,
        backgroundColor: 'var(--white)',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h5" sx={{ 
          mb: 3,
          fontWeight: 'bold',
          color: 'var(--primary-royal-blue)',
          textAlign: 'center'
        }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box onClick={() => navigate('/admin/products')} sx={{ 
              p: 3,
              border: '2px solid var(--light-gray)',
              borderRadius: '8px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'var(--primary-royal-blue)',
                backgroundColor: 'rgba(10, 61, 98, 0.05)'
              }
            }}>
              <CategoryIcon sx={{ fontSize: 48, color: 'var(--primary-royal-blue)', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                Manage Products
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--medium-gray)' }}>
                Add, edit, or remove products from your catalog
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box onClick={() => navigate('/admin/requests')} sx={{ 
              p: 3,
              border: '2px solid var(--light-gray)',
              borderRadius: '8px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'var(--secondary-safety-yellow)',
                backgroundColor: 'rgba(255, 193, 7, 0.05)'
              }
            }}>
              <AssignmentIcon sx={{ fontSize: 48, color: 'var(--secondary-safety-yellow)', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                Review Requests
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--medium-gray)' }}>
                Process customer quote requests and update status
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminDashboardPage;
