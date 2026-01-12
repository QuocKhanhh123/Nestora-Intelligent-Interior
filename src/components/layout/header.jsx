import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';

// Logo Component
const Logo = () => (
    <div className="logo-brand">
        <span className="logo-icon">N</span>
        <span className="logo-text">estora</span>
    </div>
);

const Header = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Handle scroll for fixed header
    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { path: '/', label: 'Trang chủ' },
        { path: '/about', label: 'Giới thiệu' },
        { path: '/products', label: 'Sản phẩm' },
        { path: '/news', label: 'Tin tức' },
        { path: '/partners', label: 'Đối tác' },
        { path: '/contact', label: 'Liên hệ' },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className={isFixed ? 'fixed' : ''}>
                <nav className="container mx-auto px-4 flex justify-between items-center">
                    <div className="logo">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>

                    <div className={`menu ${isMobileMenuOpen ? 'active' : ''}`} data-show="0">
                        <div className="flex h-full justify-center items-center">
                            <ul>
                                {menuItems.map((item) => (
                                    <li
                                        key={item.path}
                                        className={location.pathname === item.path ? 'active' : ''}
                                    >
                                        <Link to={item.path}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Auth Buttons */}
                            <div className="auth-buttons">
                                <Link to="/login" className="btn-login">
                                    <LogIn size={16} />
                                    <span>Đăng nhập</span>
                                </Link>
                                <Link to="/register" className="btn-register">
                                    <User size={16} />
                                    <span>Đăng ký</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            className={`res-menu block lg:hidden ${isMobileMenuOpen ? 'active' : ''}`}
                            onClick={toggleMobileMenu}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
