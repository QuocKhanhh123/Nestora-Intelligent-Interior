import { useState } from 'react';
import { Link } from 'react-router-dom';

// Import images từ assets
import tintuc5Img from '../assets/images/AnhCat/tintuc-5.png';
import tintuc6Img from '../assets/images/AnhCat/tintuc-6.png';
import tintuc4Img from '../assets/images/AnhCat/tintuc-4.png';

// Dữ liệu tin tức
const newsData = [
    {
        id: 1,
        title: 'TUYỆT CHIÊU THIẾT KẾ CHUNG CƯ MINI 2 PHÒNG NGỦ SIÊU ĐẸP',
        desc: 'Độ tuổi khởi nghiệp và tự lập ngày càng trẻ hóa trong xã hội hiện đại thời nay, thế nên việc "thiết...',
        image: tintuc6Img,
        slug: 'tuyet-chieu-thiet-ke-chung-cu-mini-2-phong-ngu-sieu-dep'
    },
    {
        id: 2,
        title: '25+ MẪU GIƯỜNG NGỦ HỘC KÉO THÔNG MINH CHO CĂN PHÒNG BẠN',
        desc: 'Sự thật là chúng ta dành hết 1/3 cuộc đời chỉ để ngủ, vì thế việc tạo được một giấc ngủ ngon là một điều đặc biệ...',
        image: tintuc5Img,
        slug: '25-mau-giuong-ngu-hoc-keo-thong-minh'
    },
    {
        id: 3,
        title: 'NGẤT NGÂY VỚI TOP 10 MẪU NỘI THẤT CHUNG CƯ 1 PHÒNG NGỦ ĐẸP',
        desc: 'Những căn hộ chung cư mini, có diện tích nhỏ ngày càng trở nên nên ưa chuộng hơn trong cuộc sống hiện đại v...',
        image: tintuc4Img,
        slug: 'ngat-ngay-voi-top-10-mau-noi-that-chung-cu-1-phong-ngu-dep'
    },
    {
        id: 4,
        title: 'TUYỆT CHIÊU THIẾT KẾ CHUNG CƯ MINI 2 PHÒNG NGỦ SIÊU ĐẸP',
        desc: 'Độ tuổi khởi nghiệp và tự lập ngày càng trẻ hóa trong xã hội hiện đại thời nay, thế nên việc "thiết...',
        image: tintuc6Img,
        slug: 'tuyet-chieu-thiet-ke-chung-cu-mini-2-phong-ngu-sieu-dep-2'
    },
    {
        id: 5,
        title: 'NGẤT NGÂY VỚI TOP 10 MẪU NỘI THẤT CHUNG CƯ 1 PHÒNG NGỦ ĐẸP',
        desc: 'Những căn hộ chung cư mini, có diện tích nhỏ ngày càng trở nên nên ưa chuộng hơn trong cuộc sống hiện đại v...',
        image: tintuc4Img,
        slug: 'ngat-ngay-voi-top-10-mau-noi-that-chung-cu-1-phong-ngu-dep-2'
    },
    {
        id: 6,
        title: '25+ MẪU GIƯỜNG NGỦ HỘC KÉO THÔNG MINH CHO CĂN PHÒNG BẠN',
        desc: 'Sự thật là chúng ta dành hết 1/3 cuộc đời chỉ để ngủ, vì thế việc tạo được một giấc ngủ ngon là một điều đặc biệ...',
        image: tintuc5Img,
        slug: '25-mau-giuong-ngu-hoc-keo-thong-minh-2'
    },
];

const ITEMS_PER_PAGE = 6;

const NewsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán phân trang
    const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentNews = newsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bgc">
            {/* CONTENT */}
            <div className="container mx-auto px-4">
                <div className="box-news">
                    <h1 className="header-news">Tin tức</h1>

                    <div className="wrapper-news grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentNews.map((news) => (
                            <div key={news.id} className="new-item">
                                <div className="img">
                                    <img
                                        src={news.image}
                                        className="w-full"
                                        alt={news.title}
                                    />
                                </div>
                                <div className="title">
                                    <h4>
                                        <Link to={`/news/${news.slug}`}>{news.title}</Link>
                                    </h4>
                                    <p className="desc">{news.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination flex justify-center mt-8">
                            <ul className="flex gap-2">
                                {[...Array(totalPages)].map((_, index) => (
                                    <li
                                        key={index + 1}
                                        className={`px-4 py-2 cursor-pointer rounded ${currentPage === index + 1
                                                ? 'active bg-primary text-white'
                                                : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
