import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './styles/admin.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Layout components
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import AdminLayout from './components/layout/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import NewsPage from './pages/New';
import NewsDetailPage from './pages/NewsDetail';
import AboutPage from './pages/About';
import PartnerPage from './pages/Partner';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import ProfilePage from './pages/Profile';
import OrdersPage from './pages/Orders';
import CartPage from './pages/Cart';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProfile from './pages/admin/AdminProfile';

// Layout wrapper for main site
const Layout = ({ children }) => {
  return (
    <div id="main-content" className="wrap">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Site Routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/news" element={<Layout><NewsPage /></Layout>} />
          <Route path="/news/:slug" element={<Layout><NewsDetailPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/partners" element={<Layout><PartnerPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/products/:id" element={<Layout><ProductDetailPage /></Layout>} />
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/orders" element={<Layout><OrdersPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
