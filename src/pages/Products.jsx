import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Search, Grid, List, Filter, X } from 'lucide-react';

// Import images
import bannerSanPhamImg from '../assets/images/AnhCat/banner-san-pham.png';
import phongKhachImg from '../assets/images/AnhCat/phong-khach.png';
import phongNguImg from '../assets/images/AnhCat/phong-ngu.png';
import phongBepImg from '../assets/images/AnhCat/phong-bep.png';
import phongTamImg from '../assets/images/AnhCat/phong-tam.png';
import treEmImg from '../assets/images/AnhCat/tre-em.png';
import vanPhongImg from '../assets/images/AnhCat/van-phong.png';
import cauThangImg from '../assets/images/AnhCat/cau-thang.png';
import denTrangTriImg from '../assets/images/AnhCat/den-trang-tri.png';
import sp1Img from '../assets/images/AnhCat/sp-1.png';
import sp2Img from '../assets/images/AnhCat/sp-2.png';
import sp3Img from '../assets/images/AnhCat/sp-3.png';
import sp4Img from '../assets/images/AnhCat/sp-4.png';
import giuongNguImg from '../assets/images/AnhCat/giuong-ngu.png';
import tuQuanAoImg from '../assets/images/AnhCat/tu-quan-ao.png';
import keDauGiuongImg from '../assets/images/AnhCat/ke-dau-giuong.png';
import banUongNuocImg from '../assets/images/AnhCat/phong-khach-ban-uong-nuoc.png';
import gheImg from '../assets/images/AnhCat/ghe.png';

// Categories data
const categories = [
    { id: 0, name: 'Tất cả', slug: 'all', image: null },
    { id: 1, name: 'Phòng khách', slug: 'phong-khach', image: phongKhachImg },
    { id: 2, name: 'Phòng ngủ', slug: 'phong-ngu', image: phongNguImg },
    { id: 3, name: 'Phòng bếp', slug: 'phong-bep', image: phongBepImg },
    { id: 4, name: 'Phòng tắm', slug: 'phong-tam', image: phongTamImg },
    { id: 5, name: 'Trẻ em', slug: 'tre-em', image: treEmImg },
    { id: 6, name: 'Văn phòng', slug: 'van-phong', image: vanPhongImg },
    { id: 7, name: 'Cầu thang', slug: 'cau-thang', image: cauThangImg },
    { id: 8, name: 'Đèn trang trí', slug: 'den-trang-tri', image: denTrangTriImg },
];

// Products data with category
const allProducts = [
    { id: 1, name: 'Giường Châu Âu', desc: 'Size lớn, trắng sữa', price: 8999000, priceDisplay: '8,999,000', image: sp1Img, categoryId: 2 },
    { id: 2, name: 'Bàn làm việc', desc: 'Size vừa, trắng nâu', price: 3999000, priceDisplay: '3,999,000', image: sp2Img, categoryId: 6 },
    { id: 3, name: 'Tủ quần áo', desc: '4 ngăn, trắng gỗ', price: 12999000, priceDisplay: '12,999,000', image: sp3Img, categoryId: 2 },
    { id: 4, name: 'Kệ để đồ', desc: '4 ngăn, trắng gỗ', price: 2499000, priceDisplay: '2,499,000', image: sp4Img, categoryId: 1 },
    { id: 5, name: 'Giường ngủ', desc: 'Size King, gỗ sồi', price: 15999000, priceDisplay: '15,999,000', image: giuongNguImg, categoryId: 2 },
    { id: 6, name: 'Tủ quần áo lớn', desc: '6 ngăn, gỗ tự nhiên', price: 18999000, priceDisplay: '18,999,000', image: tuQuanAoImg, categoryId: 2 },
    { id: 7, name: 'Kệ đầu giường', desc: '2 ngăn, trắng sữa', price: 1999000, priceDisplay: '1,999,000', image: keDauGiuongImg, categoryId: 2 },
    { id: 8, name: 'Bàn uống nước', desc: 'Gỗ sồi, hiện đại', price: 4999000, priceDisplay: '4,999,000', image: banUongNuocImg, categoryId: 1 },
    { id: 9, name: 'Ghế sofa', desc: 'Vải cao cấp, êm ái', price: 7999000, priceDisplay: '7,999,000', image: gheImg, categoryId: 1 },
    { id: 10, name: 'Sofa phòng khách', desc: 'Da thật, sang trọng', price: 25999000, priceDisplay: '25,999,000', image: phongKhachImg, categoryId: 1 },
    { id: 11, name: 'Bàn ăn gỗ sồi', desc: '6 người, gỗ tự nhiên', price: 12999000, priceDisplay: '12,999,000', image: phongBepImg, categoryId: 3 },
    { id: 12, name: 'Tủ lavabo', desc: 'Chống nước, hiện đại', price: 5999000, priceDisplay: '5,999,000', image: phongTamImg, categoryId: 4 },
    { id: 13, name: 'Giường trẻ em', desc: 'An toàn, màu sắc', price: 6999000, priceDisplay: '6,999,000', image: treEmImg, categoryId: 5 },
    { id: 14, name: 'Bàn học sinh', desc: 'Điều chỉnh chiều cao', price: 2999000, priceDisplay: '2,999,000', image: vanPhongImg, categoryId: 6 },
    { id: 15, name: 'Đèn chùm pha lê', desc: 'Sang trọng, hiện đại', price: 8999000, priceDisplay: '8,999,000', image: denTrangTriImg, categoryId: 8 },
    { id: 16, name: 'Lan can cầu thang', desc: 'Inox 304, bền đẹp', price: 15999000, priceDisplay: '15,999,000', image: cauThangImg, categoryId: 7 },
];

// Sort options
const sortOptions = [
    { value: 'default', label: 'Mặc định' },
    { value: 'price-asc', label: 'Giá: Thấp đến cao' },
    { value: 'price-desc', label: 'Giá: Cao đến thấp' },
    { value: 'name-asc', label: 'Tên: A-Z' },
    { value: 'name-desc', label: 'Tên: Z-A' },
];

// Star Rating Component
const StarRating = ({ rating = 5 }) => (
    <div className="product-rating">
        {[...Array(rating)].map((_, i) => (
            <Star key={i} size={14} fill="#bd945f" color="#bd945f" />
        ))}
    </div>
);

const ProductsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(
        parseInt(searchParams.get('category')) || 0
    );
    const [sortBy, setSortBy] = useState('default');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        // Filter by category
        if (selectedCategory !== 0) {
            result = result.filter(product => product.categoryId === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.desc.toLowerCase().includes(query)
            );
        }

        // Filter by price range
        if (priceRange.min) {
            result = result.filter(product => product.price >= parseInt(priceRange.min));
        }
        if (priceRange.max) {
            result = result.filter(product => product.price <= parseInt(priceRange.max));
        }

        // Sort products
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name, 'vi'));
                break;
            default:
                break;
        }

        return result;
    }, [selectedCategory, searchQuery, sortBy, priceRange]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === 0) {
            searchParams.delete('category');
        } else {
            searchParams.set('category', categoryId.toString());
        }
        setSearchParams(searchParams);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory(0);
        setSortBy('default');
        setPriceRange({ min: '', max: '' });
        setSearchParams({});
    };

    const hasActiveFilters = selectedCategory !== 0 || searchQuery || priceRange.min || priceRange.max;

    return (
        <div className="products-page">
            {/* Banner */}
            <section className="page-banner">
                <img src={bannerSanPhamImg} alt="Sản phẩm" className="banner-image" />
            </section>

            <div className="products-content container mx-auto px-4">
                <div className="products-layout">
                    {/* Sidebar Filters */}
                    <aside className={`products-sidebar ${showMobileFilter ? 'active' : ''}`}>
                        <div className="sidebar-header">
                            <h3>
                                <Filter size={18} />
                                Bộ lọc
                            </h3>
                            <button
                                className="sidebar-close"
                                onClick={() => setShowMobileFilter(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Search Box */}
                        <div className="filter-section">
                            <h4>Tìm kiếm</h4>
                            <form onSubmit={handleSearchSubmit} className="search-form">
                                <input
                                    type="text"
                                    placeholder="Tìm sản phẩm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit">
                                    <Search size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Categories */}
                        <div className="filter-section">
                            <h4>Danh mục</h4>
                            <ul className="category-list">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <button
                                            className={selectedCategory === category.id ? 'active' : ''}
                                            onClick={() => handleCategoryChange(category.id)}
                                        >
                                            {category.name}
                                            <span className="count">
                                                ({category.id === 0
                                                    ? allProducts.length
                                                    : allProducts.filter(p => p.categoryId === category.id).length
                                                })
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range */}
                        <div className="filter-section">
                            <h4>Khoảng giá</h4>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    placeholder="Từ"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Đến"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <button className="btn-clear-filters" onClick={clearFilters}>
                                <X size={16} />
                                Xóa bộ lọc
                            </button>
                        )}
                    </aside>

                    {/* Products Grid */}
                    <main className="products-main">
                        {/* Toolbar */}
                        <div className="products-toolbar">
                            <div className="toolbar-left">
                                <button
                                    className="btn-filter-mobile"
                                    onClick={() => setShowMobileFilter(true)}
                                >
                                    <Filter size={18} />
                                    Bộ lọc
                                </button>
                                <span className="results-count">
                                    Hiển thị {filteredProducts.length} sản phẩm
                                </span>
                            </div>
                            <div className="toolbar-right">
                                <div className="sort-select">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="view-toggle">
                                    <button
                                        className={viewMode === 'grid' ? 'active' : ''}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <Grid size={18} />
                                    </button>
                                    <button
                                        className={viewMode === 'list' ? 'active' : ''}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters Tags */}
                        {hasActiveFilters && (
                            <div className="active-filters">
                                {selectedCategory !== 0 && (
                                    <span className="filter-tag">
                                        {categories.find(c => c.id === selectedCategory)?.name}
                                        <button onClick={() => handleCategoryChange(0)}>
                                            <X size={14} />
                                        </button>
                                    </span>
                                )}
                                {searchQuery && (
                                    <span className="filter-tag">
                                        "{searchQuery}"
                                        <button onClick={() => setSearchQuery('')}>
                                            <X size={14} />
                                        </button>
                                    </span>
                                )}
                                {(priceRange.min || priceRange.max) && (
                                    <span className="filter-tag">
                                        {priceRange.min || '0'} - {priceRange.max || '∞'} VNĐ
                                        <button onClick={() => setPriceRange({ min: '', max: '' })}>
                                            <X size={14} />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Products Grid/List */}
                        {filteredProducts.length > 0 ? (
                            <div className={`products-grid ${viewMode}`}>
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="product-card">
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                            <div className="product-overlay">
                                                <Link to={`/products/${product.id}`} className="btn-view">
                                                    Xem chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <span className="product-category">
                                                {categories.find(c => c.id === product.categoryId)?.name}
                                            </span>
                                            <h3 className="product-name">
                                                <Link to={`/products/${product.id}`}>{product.name}</Link>
                                            </h3>
                                            <StarRating rating={5} />
                                            <p className="product-desc">{product.desc}</p>
                                            <p className="product-price">
                                                <span>{product.priceDisplay}</span> VNĐ
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-products">
                                <p>Không tìm thấy sản phẩm nào phù hợp.</p>
                                <button onClick={clearFilters}>Xóa bộ lọc</button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            <div
                className={`filter-overlay ${showMobileFilter ? 'active' : ''}`}
                onClick={() => setShowMobileFilter(false)}
            ></div>
        </div>
    );
};

export default ProductsPage;
