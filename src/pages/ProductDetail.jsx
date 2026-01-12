import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, ChevronLeft, ChevronRight, Check, ArrowLeft } from 'lucide-react';

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
    { id: 1, name: 'Phòng khách', slug: 'phong-khach' },
    { id: 2, name: 'Phòng ngủ', slug: 'phong-ngu' },
    { id: 3, name: 'Phòng bếp', slug: 'phong-bep' },
    { id: 4, name: 'Phòng tắm', slug: 'phong-tam' },
    { id: 5, name: 'Trẻ em', slug: 'tre-em' },
    { id: 6, name: 'Văn phòng', slug: 'van-phong' },
    { id: 7, name: 'Cầu thang', slug: 'cau-thang' },
    { id: 8, name: 'Đèn trang trí', slug: 'den-trang-tri' },
];

// Products data
const allProducts = [
    {
        id: 1,
        name: 'Giường Châu Âu',
        desc: 'Size lớn, trắng sữa',
        price: 8999000,
        priceDisplay: '8,999,000',
        image: sp1Img,
        images: [sp1Img, sp2Img, sp3Img],
        categoryId: 2,
        sku: 'GCA-001',
        material: 'Gỗ sồi tự nhiên, sơn PU cao cấp',
        dimensions: '200cm x 180cm x 45cm',
        color: 'Trắng sữa',
        warranty: '24 tháng',
        stock: 15,
        description: `
            <p>Giường Châu Âu thiết kế sang trọng, hiện đại phù hợp với mọi không gian phòng ngủ. Sản phẩm được làm từ gỗ sồi tự nhiên 100%, đảm bảo độ bền và tính thẩm mỹ cao.</p>
            <h4>Đặc điểm nổi bật:</h4>
            <ul>
                <li>Chất liệu gỗ sồi tự nhiên cao cấp</li>
                <li>Thiết kế phong cách Châu Âu hiện đại</li>
                <li>Sơn PU chống trầy xước, chống ẩm mốc</li>
                <li>Kết cấu chắc chắn, chịu lực tốt</li>
                <li>Dễ dàng lắp đặt và vệ sinh</li>
            </ul>
        `
    },
    { id: 2, name: 'Bàn làm việc', desc: 'Size vừa, trắng nâu', price: 3999000, priceDisplay: '3,999,000', image: sp2Img, images: [sp2Img, sp1Img], categoryId: 6, sku: 'BLV-002', material: 'Gỗ MDF phủ melamine', dimensions: '120cm x 60cm x 75cm', color: 'Trắng nâu', warranty: '12 tháng', stock: 20, description: '<p>Bàn làm việc thiết kế đơn giản, tiện dụng cho không gian văn phòng và học tập.</p>' },
    { id: 3, name: 'Tủ quần áo', desc: '4 ngăn, trắng gỗ', price: 12999000, priceDisplay: '12,999,000', image: sp3Img, images: [sp3Img, sp4Img], categoryId: 2, sku: 'TQA-003', material: 'Gỗ công nghiệp MDF', dimensions: '180cm x 60cm x 200cm', color: 'Trắng gỗ', warranty: '24 tháng', stock: 8, description: '<p>Tủ quần áo 4 ngăn rộng rãi, đủ không gian cho cả gia đình.</p>' },
    { id: 4, name: 'Kệ để đồ', desc: '4 ngăn, trắng gỗ', price: 2499000, priceDisplay: '2,499,000', image: sp4Img, images: [sp4Img], categoryId: 1, sku: 'KDD-004', material: 'Gỗ MDF', dimensions: '80cm x 30cm x 150cm', color: 'Trắng gỗ', warranty: '12 tháng', stock: 25, description: '<p>Kệ để đồ đa năng, phù hợp mọi không gian.</p>' },
    { id: 5, name: 'Giường ngủ', desc: 'Size King, gỗ sồi', price: 15999000, priceDisplay: '15,999,000', image: giuongNguImg, images: [giuongNguImg, sp1Img], categoryId: 2, sku: 'GN-005', material: 'Gỗ sồi tự nhiên', dimensions: '220cm x 200cm x 50cm', color: 'Nâu gỗ', warranty: '36 tháng', stock: 5, description: '<p>Giường ngủ size King cao cấp, thiết kế sang trọng.</p>' },
    { id: 6, name: 'Tủ quần áo lớn', desc: '6 ngăn, gỗ tự nhiên', price: 18999000, priceDisplay: '18,999,000', image: tuQuanAoImg, images: [tuQuanAoImg], categoryId: 2, sku: 'TQAL-006', material: 'Gỗ tự nhiên', dimensions: '240cm x 60cm x 220cm', color: 'Nâu tự nhiên', warranty: '36 tháng', stock: 3, description: '<p>Tủ quần áo 6 ngăn siêu rộng cho gia đình lớn.</p>' },
    { id: 7, name: 'Kệ đầu giường', desc: '2 ngăn, trắng sữa', price: 1999000, priceDisplay: '1,999,000', image: keDauGiuongImg, images: [keDauGiuongImg], categoryId: 2, sku: 'KDG-007', material: 'Gỗ MDF', dimensions: '50cm x 40cm x 55cm', color: 'Trắng sữa', warranty: '12 tháng', stock: 30, description: '<p>Kệ đầu giường nhỏ gọn, tiện lợi.</p>' },
    { id: 8, name: 'Bàn uống nước', desc: 'Gỗ sồi, hiện đại', price: 4999000, priceDisplay: '4,999,000', image: banUongNuocImg, images: [banUongNuocImg], categoryId: 1, sku: 'BUN-008', material: 'Gỗ sồi', dimensions: '100cm x 50cm x 45cm', color: 'Nâu sồi', warranty: '18 tháng', stock: 12, description: '<p>Bàn uống nước phong cách hiện đại.</p>' },
    { id: 9, name: 'Ghế sofa', desc: 'Vải cao cấp, êm ái', price: 7999000, priceDisplay: '7,999,000', image: gheImg, images: [gheImg, phongKhachImg], categoryId: 1, sku: 'GS-009', material: 'Khung gỗ, bọc vải cao cấp', dimensions: '180cm x 80cm x 85cm', color: 'Xám', warranty: '24 tháng', stock: 7, description: '<p>Ghế sofa êm ái, thoải mái cho phòng khách.</p>' },
    { id: 10, name: 'Sofa phòng khách', desc: 'Da thật, sang trọng', price: 25999000, priceDisplay: '25,999,000', image: phongKhachImg, images: [phongKhachImg], categoryId: 1, sku: 'SPK-010', material: 'Da thật nhập khẩu', dimensions: '280cm x 90cm x 90cm', color: 'Nâu da', warranty: '36 tháng', stock: 2, description: '<p>Sofa da thật cao cấp, đẳng cấp phòng khách.</p>' },
    { id: 11, name: 'Bàn ăn gỗ sồi', desc: '6 người, gỗ tự nhiên', price: 12999000, priceDisplay: '12,999,000', image: phongBepImg, images: [phongBepImg], categoryId: 3, sku: 'BAGS-011', material: 'Gỗ sồi tự nhiên', dimensions: '160cm x 90cm x 75cm', color: 'Nâu sồi', warranty: '24 tháng', stock: 6, description: '<p>Bàn ăn 6 người gỗ sồi sang trọng.</p>' },
    { id: 12, name: 'Tủ lavabo', desc: 'Chống nước, hiện đại', price: 5999000, priceDisplay: '5,999,000', image: phongTamImg, images: [phongTamImg], categoryId: 4, sku: 'TL-012', material: 'Nhựa PVC chống nước', dimensions: '80cm x 50cm x 85cm', color: 'Trắng', warranty: '24 tháng', stock: 10, description: '<p>Tủ lavabo chống nước 100%, phù hợp phòng tắm.</p>' },
    { id: 13, name: 'Giường trẻ em', desc: 'An toàn, màu sắc', price: 6999000, priceDisplay: '6,999,000', image: treEmImg, images: [treEmImg], categoryId: 5, sku: 'GTE-013', material: 'Gỗ MDF an toàn', dimensions: '160cm x 80cm x 40cm', color: 'Nhiều màu', warranty: '18 tháng', stock: 15, description: '<p>Giường trẻ em an toàn, màu sắc sinh động.</p>' },
    { id: 14, name: 'Bàn học sinh', desc: 'Điều chỉnh chiều cao', price: 2999000, priceDisplay: '2,999,000', image: vanPhongImg, images: [vanPhongImg], categoryId: 6, sku: 'BHS-014', material: 'Thép + gỗ MDF', dimensions: '100cm x 60cm x 55-75cm', color: 'Trắng xanh', warranty: '12 tháng', stock: 22, description: '<p>Bàn học sinh điều chỉnh chiều cao linh hoạt.</p>' },
    { id: 15, name: 'Đèn chùm pha lê', desc: 'Sang trọng, hiện đại', price: 8999000, priceDisplay: '8,999,000', image: denTrangTriImg, images: [denTrangTriImg], categoryId: 8, sku: 'DCPL-015', material: 'Pha lê + Inox mạ vàng', dimensions: '60cm x 60cm x 80cm', color: 'Trong suốt', warranty: '12 tháng', stock: 8, description: '<p>Đèn chùm pha lê sang trọng cho không gian sống.</p>' },
    { id: 16, name: 'Lan can cầu thang', desc: 'Inox 304, bền đẹp', price: 15999000, priceDisplay: '15,999,000', image: cauThangImg, images: [cauThangImg], categoryId: 7, sku: 'LCCT-016', material: 'Inox 304', dimensions: 'Theo yêu cầu', color: 'Bạc inox', warranty: '60 tháng', stock: 50, description: '<p>Lan can cầu thang inox 304 bền đẹp theo thời gian.</p>' },
];

// Star Rating Component
const StarRating = ({ rating = 5, size = 16 }) => (
    <div className="star-rating">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={size}
                fill={i < rating ? "#bd945f" : "transparent"}
                color="#bd945f"
            />
        ))}
    </div>
);

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedImage, setSelectedImage] = useState(0);

    // Find product by id
    const product = allProducts.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="not-found-page">
                <div className="container mx-auto px-4 text-center py-20">
                    <h1>Sản phẩm không tồn tại</h1>
                    <p>Xin lỗi, sản phẩm bạn tìm kiếm không tồn tại.</p>
                    <Link to="/products" className="btn-back">Quay lại danh sách</Link>
                </div>
            </div>
        );
    }

    const category = categories.find(c => c.id === product.categoryId);
    const relatedProducts = allProducts.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

    const handleQuantityChange = (action) => {
        if (action === 'increase' && quantity < product.stock) {
            setQuantity(quantity + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="product-detail-page">
            {/* Banner */}
            <section className="page-banner">
                <img src={bannerSanPhamImg} alt="Chi tiết sản phẩm" className="banner-image" />
            </section>

            {/* Back Button */}
            <div className="back-nav container mx-auto px-4">
                <button onClick={() => navigate(-1)} className="btn-go-back">
                    <ArrowLeft size={18} />
                    Quay lại
                </button>
            </div>

            {/* Product Detail */}
            <section className="product-detail-content">
                <div className="container mx-auto px-4">
                    <div className="product-detail-grid">
                        {/* Product Images */}
                        <div className="product-images">
                            <div className="main-image">
                                <img src={product.images[selectedImage]} alt={product.name} />
                                {product.images.length > 1 && (
                                    <>
                                        <button className="img-nav prev" onClick={prevImage}>
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button className="img-nav next" onClick={nextImage}>
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>
                            {product.images.length > 1 && (
                                <div className="thumbnail-list">
                                    {product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <img src={img} alt={`${product.name} ${index + 1}`} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="product-info-detail">
                            <span className="product-category-tag">{category?.name}</span>
                            <h1 className="product-title">{product.name}</h1>

                            <div className="product-meta">
                                <StarRating rating={5} size={18} />
                                <span className="reviews">(12 đánh giá)</span>
                                <span className="sku">SKU: {product.sku}</span>
                            </div>

                            <div className="product-price-detail">
                                <span className="current-price">{product.priceDisplay} VNĐ</span>
                            </div>

                            <p className="product-short-desc">{product.desc}</p>

                            <div className="product-specs">
                                <div className="spec-item">
                                    <span className="spec-label">Chất liệu:</span>
                                    <span className="spec-value">{product.material}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Kích thước:</span>
                                    <span className="spec-value">{product.dimensions}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Màu sắc:</span>
                                    <span className="spec-value">{product.color}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Bảo hành:</span>
                                    <span className="spec-value">{product.warranty}</span>
                                </div>
                            </div>

                            <div className="stock-status">
                                {product.stock > 0 ? (
                                    <span className="in-stock">
                                        <Check size={16} /> Còn hàng ({product.stock} sản phẩm)
                                    </span>
                                ) : (
                                    <span className="out-stock">Hết hàng</span>
                                )}
                            </div>

                            <div className="product-actions">
                                <div className="quantity-selector">
                                    <button onClick={() => handleQuantityChange('decrease')}>
                                        <Minus size={18} />
                                    </button>
                                    <input type="text" value={quantity} readOnly />
                                    <button onClick={() => handleQuantityChange('increase')}>
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <button className="btn-add-cart">
                                    <ShoppingCart size={20} />
                                    Thêm vào giỏ
                                </button>
                                <button className="btn-wishlist">
                                    <Heart size={20} />
                                </button>
                                <button className="btn-share">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Tabs */}
                    <div className="product-tabs">
                        <div className="tabs-header">
                            <button
                                className={activeTab === 'description' ? 'active' : ''}
                                onClick={() => setActiveTab('description')}
                            >
                                Mô tả sản phẩm
                            </button>
                            <button
                                className={activeTab === 'reviews' ? 'active' : ''}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Đánh giá (12)
                            </button>
                            <button
                                className={activeTab === 'shipping' ? 'active' : ''}
                                onClick={() => setActiveTab('shipping')}
                            >
                                Vận chuyển
                            </button>
                        </div>
                        <div className="tabs-content">
                            {activeTab === 'description' && (
                                <div className="tab-pane" dangerouslySetInnerHTML={{ __html: product.description }} />
                            )}
                            {activeTab === 'reviews' && (
                                <div className="tab-pane">
                                    <div className="review-item">
                                        <div className="review-header">
                                            <strong>Nguyễn Văn A</strong>
                                            <StarRating rating={5} size={14} />
                                            <span className="review-date">12/01/2026</span>
                                        </div>
                                        <p>Sản phẩm rất đẹp, chất lượng tốt, giao hàng nhanh. Rất hài lòng!</p>
                                    </div>
                                    <div className="review-item">
                                        <div className="review-header">
                                            <strong>Trần Thị B</strong>
                                            <StarRating rating={4} size={14} />
                                            <span className="review-date">10/01/2026</span>
                                        </div>
                                        <p>Đóng gói cẩn thận, sản phẩm đúng như mô tả. Sẽ ủng hộ thêm.</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'shipping' && (
                                <div className="tab-pane">
                                    <h4>Chính sách vận chuyển</h4>
                                    <ul>
                                        <li>Miễn phí vận chuyển cho đơn hàng trên 5.000.000 VNĐ</li>
                                        <li>Giao hàng trong 3-5 ngày làm việc tại Hà Nội và TP.HCM</li>
                                        <li>Giao hàng trong 5-7 ngày làm việc tại các tỉnh thành khác</li>
                                        <li>Hỗ trợ lắp đặt miễn phí tại nhà</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="related-products">
                            <h2>Sản phẩm liên quan</h2>
                            <div className="related-grid">
                                {relatedProducts.map((item) => (
                                    <div key={item.id} className="product-card">
                                        <div className="product-image">
                                            <img src={item.image} alt={item.name} />
                                            <div className="product-overlay">
                                                <Link to={`/products/${item.id}`} className="btn-view">
                                                    Xem chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <h3 className="product-name">
                                                <Link to={`/products/${item.id}`}>{item.name}</Link>
                                            </h3>
                                            <StarRating rating={5} size={14} />
                                            <p className="product-price">
                                                <span>{item.priceDisplay}</span> VNĐ
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;
