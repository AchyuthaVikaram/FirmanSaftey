import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import IndustriesPage from './pages/IndustriesPage';
import IndustryDetailPage from './pages/IndustryDetailPage';
import CertificationsPage from './pages/CertificationsPage';
import ContactUsPage from './pages/ContactUsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import GetQuotePage from './pages/GetQuotePage';
import SearchPage from './pages/SearchPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageProductsPage from './pages/admin/ManageProductsPage';
import ManageIndustriesPage from './pages/admin/ManageIndustriesPage';
import ManageRequestsPage from './pages/admin/ManageRequestsPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <div className="app-container">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/industries/:industryId" element={<IndustryDetailPage />} />
                <Route path="/certifications" element={<CertificationsPage />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:postId" element={<BlogPostPage />} />
                <Route path="/get-a-quote" element={<GetQuotePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Admin Routes */}
                <Route path="/admin">
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="products" element={<ManageProductsPage />} />
                  <Route path="industries" element={<ManageIndustriesPage />} />
                  <Route path="requests" element={<ManageRequestsPage />} />
                  <Route path="users" element={<ManageUsersPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                </Route>
              </Routes>
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
