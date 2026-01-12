import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Facebook, Twitter, Share2 } from 'lucide-react';

// Import images
import tintuc5Img from '../assets/images/AnhCat/tintuc-5.png';
import tintuc6Img from '../assets/images/AnhCat/tintuc-6.png';
import tintuc4Img from '../assets/images/AnhCat/tintuc-4.png';

// News data
const newsData = [
    {
        id: 1,
        title: 'TUYỆT CHIÊU THIẾT KẾ CHUNG CƯ MINI 2 PHÒNG NGỦ SIÊU ĐẸP',
        desc: 'Độ tuổi khởi nghiệp và tự lập ngày càng trẻ hóa trong xã hội hiện đại thời nay, thế nên việc "thiết kế" một không gian sống nhỏ gọn nhưng đầy đủ tiện nghi là điều cần thiết.',
        image: tintuc6Img,
        slug: 'tuyet-chieu-thiet-ke-chung-cu-mini-2-phong-ngu-sieu-dep',
        author: 'Admin',
        date: '12/01/2026',
        category: 'Thiết kế nội thất',
        content: `
            <p>Độ tuổi khởi nghiệp và tự lập ngày càng trẻ hóa trong xã hội hiện đại thời nay, thế nên việc "thiết kế" một không gian sống nhỏ gọn nhưng đầy đủ tiện nghi là điều cần thiết. Chung cư mini 2 phòng ngủ đang trở thành lựa chọn hàng đầu của nhiều bạn trẻ và gia đình nhỏ.</p>
            
            <h3>1. Tối ưu hóa không gian</h3>
            <p>Với diện tích hạn chế, việc tối ưu hóa không gian là yếu tố then chốt. Bạn nên sử dụng các đồ nội thất đa năng như giường có ngăn kéo, bàn gấp, kệ treo tường để tiết kiệm diện tích sàn.</p>
            
            <h3>2. Chọn màu sắc phù hợp</h3>
            <p>Màu sáng như trắng, be, xám nhạt sẽ giúp không gian trông rộng rãi hơn. Bạn có thể điểm xuyết bằng các màu sắc nổi bật ở những chi tiết nhỏ như gối, tranh treo tường.</p>
            
            <h3>3. Ánh sáng tự nhiên</h3>
            <p>Tận dụng tối đa ánh sáng tự nhiên bằng cách sử dụng rèm mỏng, gương lớn để phản chiếu ánh sáng và tạo cảm giác không gian mở.</p>
            
            <h3>4. Phân chia không gian hợp lý</h3>
            <p>Sử dụng kệ sách, vách ngăn nhẹ hoặc rèm để phân chia các khu vực chức năng mà không làm mất đi sự thông thoáng của căn hộ.</p>
            
            <h3>5. Lựa chọn nội thất thông minh</h3>
            <p>Đầu tư vào những món đồ nội thất chất lượng, thiết kế thông minh sẽ giúp bạn tận dụng tối đa không gian nhỏ hẹp mà vẫn đảm bảo tính thẩm mỹ và tiện nghi.</p>
        `
    },
    {
        id: 2,
        title: '25+ MẪU GIƯỜNG NGỦ HỘC KÉO THÔNG MINH CHO CĂN PHÒNG BẠN',
        desc: 'Sự thật là chúng ta dành hết 1/3 cuộc đời chỉ để ngủ, vì thế việc tạo được một giấc ngủ ngon là một điều đặc biệt quan trọng.',
        image: tintuc5Img,
        slug: '25-mau-giuong-ngu-hoc-keo-thong-minh',
        author: 'Admin',
        date: '10/01/2026',
        category: 'Nội thất phòng ngủ',
        content: `
            <p>Sự thật là chúng ta dành hết 1/3 cuộc đời chỉ để ngủ, vì thế việc tạo được một giấc ngủ ngon là một điều đặc biệt quan trọng. Giường ngủ có hộc kéo không chỉ giúp bạn có giấc ngủ thoải mái mà còn tận dụng tối đa không gian lưu trữ.</p>
            
            <h3>Ưu điểm của giường hộc kéo</h3>
            <ul>
                <li>Tiết kiệm không gian: Tận dụng phần dưới giường để lưu trữ</li>
                <li>Gọn gàng: Cất giữ chăn, ga, gối, quần áo một cách ngăn nắp</li>
                <li>Đa dạng thiết kế: Phù hợp với mọi phong cách nội thất</li>
                <li>Dễ vệ sinh: Không có khoảng trống dưới giường để bụi bẩn tích tụ</li>
            </ul>
            
            <h3>Các mẫu giường hộc kéo phổ biến</h3>
            <p>Hiện nay trên thị trường có rất nhiều mẫu giường hộc kéo với đa dạng kiểu dáng, màu sắc và chất liệu. Từ giường đơn cho phòng nhỏ đến giường đôi size King cho không gian rộng rãi.</p>
        `
    },
    {
        id: 3,
        title: 'NGẤT NGÂY VỚI TOP 10 MẪU NỘI THẤT CHUNG CƯ 1 PHÒNG NGỦ ĐẸP',
        desc: 'Những căn hộ chung cư mini, có diện tích nhỏ ngày càng trở nên nên ưa chuộng hơn trong cuộc sống hiện đại.',
        image: tintuc4Img,
        slug: 'ngat-ngay-voi-top-10-mau-noi-that-chung-cu-1-phong-ngu-dep',
        author: 'Admin',
        date: '08/01/2026',
        category: 'Thiết kế nội thất',
        content: `
            <p>Những căn hộ chung cư mini, có diện tích nhỏ ngày càng trở nên ưa chuộng hơn trong cuộc sống hiện đại. Với chi phí hợp lý và vị trí thuận tiện, căn hộ 1 phòng ngủ là lựa chọn lý tưởng cho người độc thân hoặc cặp đôi mới cưới.</p>
            
            <h3>Xu hướng thiết kế nội thất chung cư 1 phòng ngủ</h3>
            <p>Phong cách tối giản (Minimalist) đang là xu hướng chủ đạo với đường nét đơn giản, màu sắc trung tính và chất liệu tự nhiên.</p>
            
            <h3>Bí quyết thiết kế không gian nhỏ</h3>
            <ul>
                <li>Sử dụng gương để tạo cảm giác rộng rãi</li>
                <li>Chọn đồ nội thất đa chức năng</li>
                <li>Tận dụng không gian theo chiều dọc</li>
                <li>Sử dụng màu sáng làm tông chủ đạo</li>
            </ul>
        `
    },
    {
        id: 4,
        title: 'TUYỆT CHIÊU THIẾT KẾ CHUNG CƯ MINI 2 PHÒNG NGỦ SIÊU ĐẸP',
        desc: 'Độ tuổi khởi nghiệp và tự lập ngày càng trẻ hóa trong xã hội hiện đại thời nay.',
        image: tintuc6Img,
        slug: 'tuyet-chieu-thiet-ke-chung-cu-mini-2-phong-ngu-sieu-dep-2',
        author: 'Admin',
        date: '05/01/2026',
        category: 'Thiết kế nội thất',
        content: `<p>Nội dung chi tiết về thiết kế chung cư mini 2 phòng ngủ...</p>`
    },
    {
        id: 5,
        title: 'NGẤT NGÂY VỚI TOP 10 MẪU NỘI THẤT CHUNG CƯ 1 PHÒNG NGỦ ĐẸP',
        desc: 'Những căn hộ chung cư mini, có diện tích nhỏ ngày càng trở nên ưa chuộng hơn.',
        image: tintuc4Img,
        slug: 'ngat-ngay-voi-top-10-mau-noi-that-chung-cu-1-phong-ngu-dep-2',
        author: 'Admin',
        date: '03/01/2026',
        category: 'Thiết kế nội thất',
        content: `<p>Nội dung chi tiết về mẫu nội thất chung cư 1 phòng ngủ...</p>`
    },
    {
        id: 6,
        title: '25+ MẪU GIƯỜNG NGỦ HỘC KÉO THÔNG MINH CHO CĂN PHÒNG BẠN',
        desc: 'Sự thật là chúng ta dành hết 1/3 cuộc đời chỉ để ngủ.',
        image: tintuc5Img,
        slug: '25-mau-giuong-ngu-hoc-keo-thong-minh-2',
        author: 'Admin',
        date: '01/01/2026',
        category: 'Nội thất phòng ngủ',
        content: `<p>Nội dung chi tiết về mẫu giường ngủ hộc kéo...</p>`
    },
];

const NewsDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find news by slug
    const news = newsData.find(n => n.slug === slug);

    if (!news) {
        return (
            <div className="not-found-page">
                <div className="container mx-auto px-4 text-center py-20">
                    <h1>Bài viết không tồn tại</h1>
                    <p>Xin lỗi, bài viết bạn tìm kiếm không tồn tại.</p>
                    <Link to="/news" className="btn-back">Quay lại tin tức</Link>
                </div>
            </div>
        );
    }

    // Get related news (same category, exclude current)
    const relatedNews = newsData
        .filter(n => n.category === news.category && n.slug !== news.slug)
        .slice(0, 3);

    // Get recent news (exclude current)
    const recentNews = newsData
        .filter(n => n.slug !== news.slug)
        .slice(0, 5);

    return (
        <div className="news-detail-page">
            {/* Back Button */}
            <div className="back-nav container mx-auto px-4">
                <button onClick={() => navigate(-1)} className="btn-go-back">
                    <ArrowLeft size={18} />
                    Quay lại
                </button>
            </div>

            {/* News Content */}
            <section className="news-detail-content">
                <div className="container mx-auto px-4">
                    <div className="news-detail-layout">
                        {/* Main Content */}
                        <article className="news-article">
                            <div className="article-header">
                                <span className="article-category">{news.category}</span>
                                <h1 className="article-title">{news.title}</h1>
                                <div className="article-meta">
                                    <span className="meta-item">
                                        <User size={16} />
                                        {news.author}
                                    </span>
                                    <span className="meta-item">
                                        <Calendar size={16} />
                                        {news.date}
                                    </span>
                                </div>
                            </div>

                            <div className="article-featured-image">
                                <img src={news.image} alt={news.title} />
                            </div>

                            <div
                                className="article-content"
                                dangerouslySetInnerHTML={{ __html: news.content }}
                            />

                            {/* Share Buttons */}
                            <div className="article-share">
                                <span>Chia sẻ:</span>
                                <div className="share-buttons">
                                    <button className="share-btn facebook">
                                        <Facebook size={18} />
                                    </button>
                                    <button className="share-btn twitter">
                                        <Twitter size={18} />
                                    </button>
                                    <button className="share-btn copy">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="article-nav">
                                <Link to="/news" className="btn-back-news">
                                    <ArrowLeft size={18} />
                                    Quay lại tin tức
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="news-sidebar">
                            {/* Recent Posts */}
                            <div className="sidebar-widget">
                                <h3 className="widget-title">Bài viết gần đây</h3>
                                <ul className="recent-posts">
                                    {recentNews.map((item) => (
                                        <li key={item.id} className="recent-post-item">
                                            <Link to={`/news/${item.slug}`}>
                                                <div className="post-thumb">
                                                    <img src={item.image} alt={item.title} />
                                                </div>
                                                <div className="post-info">
                                                    <h4>{item.title}</h4>
                                                    <span className="post-date">
                                                        <Calendar size={12} />
                                                        {item.date}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Categories */}
                            <div className="sidebar-widget">
                                <h3 className="widget-title">Danh mục</h3>
                                <ul className="category-links">
                                    <li><Link to="/news">Thiết kế nội thất</Link></li>
                                    <li><Link to="/news">Nội thất phòng ngủ</Link></li>
                                    <li><Link to="/news">Nội thất phòng khách</Link></li>
                                    <li><Link to="/news">Xu hướng nội thất</Link></li>
                                    <li><Link to="/news">Mẹo trang trí</Link></li>
                                </ul>
                            </div>
                        </aside>
                    </div>

                    {/* Related News */}
                    {relatedNews.length > 0 && (
                        <div className="related-news">
                            <h2>Bài viết liên quan</h2>
                            <div className="related-news-grid">
                                {relatedNews.map((item) => (
                                    <div key={item.id} className="news-card">
                                        <div className="news-image">
                                            <img src={item.image} alt={item.title} />
                                            <Link to={`/news/${item.slug}`} className="news-overlay">
                                                <span>Đọc thêm</span>
                                            </Link>
                                        </div>
                                        <div className="news-info">
                                            <span className="news-date">
                                                <Calendar size={14} />
                                                {item.date}
                                            </span>
                                            <h3>
                                                <Link to={`/news/${item.slug}`}>{item.title}</Link>
                                            </h3>
                                            <p>{item.desc}</p>
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

export default NewsDetailPage;
