import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const monthlySales = [
  { month: 'Jan', revenue: 1200, orders: 32 },
  { month: 'Feb', revenue: 1800, orders: 44 },
  { month: 'Mar', revenue: 1500, orders: 38 },
  { month: 'Apr', revenue: 2200, orders: 52 },
  { month: 'May', revenue: 2600, orders: 61 },
  { month: 'Jun', revenue: 2000, orders: 49 },
  { month: 'Jul', revenue: 3000, orders: 72 },
  { month: 'Aug', revenue: 3400, orders: 79 },
  { month: 'Sep', revenue: 2800, orders: 64 },
  { month: 'Oct', revenue: 3600, orders: 83 },
  { month: 'Nov', revenue: 4100, orders: 92 },
  { month: 'Dec', revenue: 4800, orders: 110 },
];

const categoryBreakdown = [
  { name: 'Extinguishers', value: 45 },
  { name: 'Alarms', value: 25 },
  { name: 'Hoses', value: 15 },
  { name: 'Accessories', value: 15 },
];

const userGrowth = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 160 },
  { month: 'Mar', users: 200 },
  { month: 'Apr', users: 240 },
  { month: 'May', users: 300 },
  { month: 'Jun', users: 360 },
  { month: 'Jul', users: 420 },
  { month: 'Aug', users: 510 },
  { month: 'Sep', users: 590 },
  { month: 'Oct', users: 690 },
  { month: 'Nov', users: 810 },
  { month: 'Dec', users: 950 },
];

const COLORS = ['#0A3D62', '#FFC107', '#4CAF50', '#FF5722'];

const AnalyticsPage = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          backgroundColor: 'var(--white)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: 'var(--primary-royal-blue)' }}
        >
          Analytics Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--medium-gray)', mt: 1 }}>
          Sales, products, and users overview
        </Typography>
      </Box>

      {/* Charts Grid */}
      <Grid container spacing={0} justifyContent="space-around" sx={{ px: { xs: 0, md: '5%' }, rowGap: 3 }}>
        {/* Chart 1 */}
        <Grid item xs={12} md={6} sx={{ flex: { md: '0 0 40% !important' }, maxWidth: { md: '40% !important' } }}>
          <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Revenue vs Orders
            </Typography>
            <Box sx={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#0A3D62" fill="#0A3D62" fillOpacity={0.1} />
                  <Line type="monotone" dataKey="revenue" stroke="#0A3D62" strokeWidth={2} name="Revenue ($)" />
                  <Line type="monotone" dataKey="orders" stroke="#FFC107" strokeWidth={2} name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Chart 2 */}
        <Grid item xs={12} md={6} sx={{ flex: { md: '0 0 40% !important' }, maxWidth: { md: '40% !important' } }}>
          <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Sales by Category
            </Typography>
            <Box sx={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryBreakdown} dataKey="value" nameKey="name" outerRadius={100} label>
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Chart 3 */}
        <Grid item xs={12} md={6} sx={{ flex: { md: '0 0 40% !important' }, maxWidth: { md: '40% !important' } }}>
          <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              New Users Growth
            </Typography>
            <Box sx={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="#4CAF50" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Chart 4 */}
        <Grid item xs={12} md={6} sx={{ flex: { md: '0 0 40% !important' }, maxWidth: { md: '40% !important' } }}>
          <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Orders per Month
            </Typography>
            <Box sx={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySales} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#FFC107" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
