import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Layout components
import Header from './components/layout/header';
import Footer from './components/layout/footer';

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

// Layout wrapper
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
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/partners" element={<PartnerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
