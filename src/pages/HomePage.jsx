import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Import images từ assets
import bannerImg from '../assets/images/AnhCat/banner.png';
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
import moneyImg from '../assets/images/AnhCat/money.png';
import productImg from '../assets/images/AnhCat/product.png';
import medalImg from '../assets/images/AnhCat/medal.png';
import open24hImg from '../assets/images/AnhCat/open-24-h.png';
import tintuc0Img from '../assets/images/AnhCat/tintuc-0.png';
import tintuc1Img from '../assets/images/AnhCat/tintuc-1.png';
import tintuc2Img from '../assets/images/AnhCat/tintuc-2.png';
import tintuc3Img from '../assets/images/AnhCat/tintuc-3.png';
import tintuc4Img from '../assets/images/AnhCat/tintuc-4.png';
import tt0Img from '../assets/images/AnhCat/tt-0.png';
import tt1Img from '../assets/images/AnhCat/tt-1.png';
import tt2Img from '../assets/images/AnhCat/tt-2.png';
import tt3Img from '../assets/images/AnhCat/tt-3.png';
import vinpearlImg from '../assets/images/vinpearl.png';
import muongthanhImg from '../assets/images/muongthanh.png';
import sheratonImg from '../assets/images/sheraton.png';
import tchImg from '../assets/images/tch.png';
import marvellaImg from '../assets/images/marvella.png';
import gheImg from '../assets/images/AnhCat/ghe.png';
import lienheBgImg from '../assets/images/AnhCat/lienhe-bg.jpg';

const categories = [
    { id: 1, name: 'PHÒNG KHÁCH', image: phongKhachImg },
    { id: 2, name: 'PHÒNG NGỦ', image: phongNguImg },
    { id: 3, name: 'PHÒNG BẾP', image: phongBepImg },
    { id: 4, name: 'PHÒNG TẮM', image: phongTamImg },
    { id: 5, name: 'TRẺ EM', image: treEmImg },
    { id: 6, name: 'VĂN PHÒNG', image: vanPhongImg },
    { id: 7, name: 'CẦU THANG', image: cauThangImg },
    { id: 8, name: 'ĐÈN TRANG TRÍ', image: denTrangTriImg },
];

const products = [
    { id: 1, name: 'Giường Châu Âu', desc: '(Size lớn, trắng sữa)', price: '8,999,000', image: sp1Img },
    { id: 2, name: 'Bàn làm việc', desc: '(Size vừa, trắng nâu)', price: '3,999,000', image: sp2Img },
    { id: 3, name: 'Tủ quần áo', desc: '(4 ngăn, trắng gỗ)', price: '12,999,000', image: sp3Img },
    { id: 4, name: 'Kệ để đồ', desc: '(4 ngăn, trắng gỗ)', price: '2,499,000', image: sp4Img },
    { id: 5, name: 'Giường ngủ', desc: '(Size King, gỗ sồi)', price: '15,999,000', image: giuongNguImg },
    { id: 6, name: 'Tủ quần áo lớn', desc: '(6 ngăn, gỗ tự nhiên)', price: '18,999,000', image: tuQuanAoImg },
    { id: 7, name: 'Kệ đầu giường', desc: '(2 ngăn, trắng sữa)', price: '1,999,000', image: keDauGiuongImg },
    { id: 8, name: 'Bàn uống nước', desc: '(Gỗ sồi, hiện đại)', price: '4,999,000', image: banUongNuocImg },
];

const reasons = [
    { id: 1, title: 'Chính sách giá', desc: 'Tốt nhất và công khai giá trên website', icon: moneyImg },
    { id: 2, title: 'Sản xuất', desc: 'Trực tiếp sản xuất bởi đội ngũ nhân viên hàng đầu', icon: productImg },
    { id: 3, title: 'Chất lượng', desc: 'Cam kết chất lượng sản phẩm và tốc độ thi công', icon: medalImg },
    { id: 4, title: 'Bảo hành', desc: 'Dịch vụ bảo hành tốt nhất khu vực', icon: open24hImg },
];

const news = [
    {
        id: 1,
        title: 'Cách chọn Sofa cho phòng khách nhà bạn thêm phần sang trọng',
        desc: 'Độ tuổi khởi nghiệp và tự lập ngày càng trẻ hóa trong xã hội hiện đại thời nay...',
        image: tt0Img,
        featured: true,
    },
    {
        id: 2,
        title: 'Trang trí phòng khách cho thêm năng động',
        desc: 'Sự thật là chúng ta dành hết 1/3 cuộc đời chỉ để ngủ...',
        image: tt1Img,
    },
    {
        id: 3,
        title: 'Cập nhật xu hướng phòng khách phong cách tối giản',
        desc: 'Sự thật là chúng ta dành hết 1/3 cuộc đời chỉ để ngủ...',
        image: tt2Img,
    },
    {
        id: 4,
        title: 'Cách sắp xếp vị trí bàn ăn và nhà bếp một cách rộng rãi',
        desc: 'Sự thật là chúng ta dành hết 1/3 cuộc đời chỉ để ngủ...',
        image: tt3Img,
    },
];

const partners = [
    { id: 1, name: 'Vinpearl', image: vinpearlImg },
    { id: 2, name: 'Mường Thanh', image: muongthanhImg },
    { id: 3, name: 'Sheraton', image: sheratonImg },
    { id: 4, name: 'TCH', image: tchImg },
    { id: 5, name: 'Marvella', image: marvellaImg },
];

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [contactEmail, setContactEmail] = useState('');

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % 3);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + 3) % 3);
    };

    // Product carousel functions
    const nextProduct = () => {
        setCurrentProductIndex((prev) => (prev + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    // Get visible products (4 at a time, wrap around)
    const getVisibleProducts = () => {
        const visibleProducts = [];
        for (let i = 0; i < 4; i++) {
            const index = (currentProductIndex + i) % products.length;
            visibleProducts.push(products[index]);
        }
        return visibleProducts;
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        console.log('Contact:', contactEmail);
        setContactEmail('');
    };

    // Star rating component
    const StarRating = ({ rating = 5 }) => (
        <p className="vote">
            {[...Array(rating)].map((_, i) => (
                <span key={i}>
                    <Star size={14} fill="#bd945f" color="#bd945f" />
                </span>
            ))}
        </p>
    );

    return (
        <div className="wrap">
            {/* BANNER */}
            <section className="banner">
                <div className="relative overflow-hidden">
                    <div className="carousel-inner">
                        {[0, 1, 2].map((index) => (
                            <div
                                key={index}
                                className={`carousel-item ${currentSlide === index ? 'active block' : 'hidden'}`}
                            >
                                <img src={bannerImg} className="block w-full" alt="Banner" />
                                <div className="content-box-banner">
                                    <h2 className="text-uppercase header-banner">
                                        THẾ GIỚI NỘI THẤT SỐ 1 VIỆT NAM <br />
                                        <span>Nestora</span>
                                    </h2>
                                    <div className="sapo-banner">
                                        <p>
                                            Sứ mệnh của chúng tôi là kết hợp hài hòa giữa ý tưởng và mong muốn của khách hàng,
                                            đem lại những phút giây thư giãn tuyệt vời bên gia đình và những người thân yêu.
                                        </p>
                                    </div>
                                    <Link to="/contact" className="text-uppercase btn-banner">
                                        Liên hệ ngay
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORIES & HOT PRODUCTS */}
            <div className="content-wrap container mx-auto px-4">
                {/* Categories */}
                <section className="categories">
                    {categories.map((category) => (
                        <div key={category.id} className="category-item">
                            <Link to={`/products?category=${category.id}`}>
                                <div className="category-img">
                                    <img src={category.image} alt={category.name} className="img-cate" />
                                </div>
                                <p>{category.name}</p>
                            </Link>
                        </div>
                    ))}
                </section>

                {/* Hot Products */}
                <section className="hot-product-wrap">
                    <h2 className="header-prd">Sản phẩm nổi bật</h2>

                    <div className="relative">
                        {/* Prev Button */}
                        <button
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                            onClick={prevProduct}
                        >
                            <ChevronLeft size={24} className="text-gray-600" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {getVisibleProducts().map((product) => (
                                <div key={product.id} className="product">
                                    <div className="img">
                                        <img src={product.image} alt={product.name} className="w-full" />
                                    </div>
                                    <div className="info">
                                        <p className="name">
                                            <Link to={`/products/${product.id}`}>{product.name}</Link>
                                        </p>
                                        <StarRating rating={5} />
                                        <p className="desc">{product.desc}</p>
                                        <p className="price">
                                            <span>{product.price}</span> VNĐ
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                            onClick={nextProduct}
                        >
                            <ChevronRight size={24} className="text-gray-600" />
                        </button>
                    </div>
                </section>
            </div>

            {/* ABOUT US */}
            <section className="about-us" style={{ backgroundImage: `url(${tintuc0Img})` }}>
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="header-abt">Về chúng tôi</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="img h-full">
                            <img
                                src={tintuc0Img}
                                alt="NỘI THẤT NESTORA UY TÍN SONG HÀNH CHẤT LƯỢNG"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="content h-full">
                            <h3>NỘI THẤT NESTORA UY TÍN SONG HÀNH CHẤT LƯỢNG</h3>
                            <div>
                                <p>
                                    Nội thất Nestora chúng tôi tự hào là đứa con tinh thần ra đời sau hơn 30 năm
                                    hoạt động trong lĩnh vực kinh doanh đồ gỗ nội thất với thương hiệu ĐỒ GỖ NESTORA nổi tiếng.
                                </p>
                                <p>
                                    Tài nguyên của chúng tôi là đội ngũ kiến trúc sư tốt nghiệp ĐH Kiến Trúc Hà Nội
                                    với nhiều năm kinh nghiệm, luôn tràn đầy nhiệt huyết và sức sáng tạo của tuổi trẻ.
                                    Thế mạnh của chúng tôi là sở hữu xưởng nội thất hơn 10.000m2 tại Hà Nội sản xuất
                                    đa dạng các sản phẩm với giá cả luôn cạnh tranh.
                                </p>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <img alt="giới thiệu" src={tintuc1Img} className="w-1/4" />
                                <img alt="giới thiệu" src={tintuc2Img} className="w-1/4" />
                                <img alt="giới thiệu" src={tintuc3Img} className="w-1/4" />
                                <img alt="giới thiệu" src={tintuc4Img} className="w-1/4" />
                            </div>
                        </div>
                    </div>

                    <br /><br />
                    <h2 className="header-abt">Tại sao nên chọn Nestora?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reasons.map((reason) => (
                            <div key={reason.id} className="reason-index-item flex">
                                <div className="img">
                                    <img src={reason.icon} alt={reason.title} />
                                </div>
                                <div className="content">
                                    <h3 className="title">{reason.title}</h3>
                                    <p className="desc">{reason.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEWS */}
            <section className="news">
                <div className="container mx-auto px-4">
                    <h2 className="header-news">Tin tức</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Featured News */}
                        <div className="lg:col-span-7">
                            {news.filter(n => n.featured).map((item) => (
                                <div key={item.id} className="box">
                                    <div className="img">
                                        <img src={item.image} alt={item.title} className="w-full" />
                                    </div>
                                    <div className="news-content">
                                        <p className="title">
                                            <Link to={`/news/${item.id}`}>{item.title}</Link>
                                        </p>
                                        <div className="desc">
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* News List */}
                        <div className="lg:col-span-5">
                            <ul>
                                {news.filter(n => !n.featured).map((item) => (
                                    <li key={item.id} className="flex mb-4">
                                        <div className="img">
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className="content">
                                            <p className="title">
                                                <Link to={`/news/${item.id}`}>{item.title}</Link>
                                            </p>
                                            <div className="desc sub-news-content">{item.desc}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <Link to="/news" className="see-more">
                                    Xem thêm <ArrowRight size={16} className="inline ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PARTNER */}
            <section className="partner">
                <div className="container mx-auto px-4">
                    <h2 className="header-ptn">Đối tác</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {partners.map((partner) => (
                            <div key={partner.id} className="ptn-item">
                                <div className="img">
                                    <img src={partner.image} alt={partner.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section className="contact contact-index" style={{ backgroundImage: `url(${lienheBgImg})` }}>
                <span>
                    <img src={gheImg} alt="Trải nghiệm cùng Nestora" />
                </span>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="title">
                                Trải nghiệm dịch vụ <br />
                                <strong>cùng Nestora ngay</strong>
                            </h2>
                        </div>
                        <div>
                            <p className="mb-1 text-white">Thông tin liên hệ</p>
                            <form onSubmit={handleContactSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Email/Số điện thoại"
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                />
                                <button type="submit" className="savePhone">
                                    Gửi
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
