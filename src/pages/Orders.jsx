import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, ChevronRight, Search, Filter, Calendar, Truck, CheckCircle, XCircle, Clock, ArrowLeft, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Import images
import bannerSanPhamImg from '../assets/images/AnhCat/banner-san-pham.png';
import sp1Img from '../assets/images/AnhCat/sp-1.png';
import sp2Img from '../assets/images/AnhCat/sp-2.png';
import sp3Img from '../assets/images/AnhCat/sp-3.png';

const OrdersPage = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Sample orders data
    const orders = [
        {
            id: 'ORD-001',
            date: '2026-01-15',
            status: 'completed',
            total: 25998000,
            items: [
                { id: 1, name: 'Giường Châu Âu', price: 8999000, quantity: 1, image: sp1Img },
                { id: 2, name: 'Tủ quần áo', price: 12999000, quantity: 1, image: sp3Img },
                { id: 3, name: 'Bàn làm việc', price: 3999000, quantity: 1, image: sp2Img }
            ],
            shippingAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
            paymentMethod: 'Chuyển khoản ngân hàng'
        },
        {
            id: 'ORD-002',
            date: '2026-01-18',
            status: 'shipping',
            total: 15999000,
            items: [
                { id: 4, name: 'Giường ngủ Size King', price: 15999000, quantity: 1, image: sp1Img }
            ],
            shippingAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
            paymentMethod: 'COD - Thanh toán khi nhận hàng'
        },
        {
            id: 'ORD-003',
            date: '2026-01-19',
            status: 'pending',
            total: 4999000,
            items: [
                { id: 5, name: 'Bàn uống nước', price: 4999000, quantity: 1, image: sp2Img }
            ],
            shippingAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
            paymentMethod: 'Ví điện tử MoMo'
        },
        {
            id: 'ORD-004',
            date: '2025-12-20',
            status: 'cancelled',
            total: 7999000,
            items: [
                { id: 6, name: 'Ghế sofa', price: 7999000, quantity: 1, image: sp3Img }
            ],
            shippingAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
            paymentMethod: 'Thẻ tín dụng'
        }
    ];

    const getStatusInfo = (status) => {
        const statusMap = {
            pending: { label: 'Chờ xử lý', bgColor: 'bg-amber-100', textColor: 'text-amber-600', icon: Clock },
            processing: { label: 'Đang xử lý', bgColor: 'bg-blue-100', textColor: 'text-blue-600', icon: Package },
            shipping: { label: 'Đang giao', bgColor: 'bg-cyan-100', textColor: 'text-cyan-600', icon: Truck },
            completed: { label: 'Hoàn thành', bgColor: 'bg-green-100', textColor: 'text-green-600', icon: CheckCircle },
            cancelled: { label: 'Đã hủy', bgColor: 'bg-red-100', textColor: 'text-red-600', icon: XCircle }
        };
        return statusMap[status] || statusMap.pending;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = [
        { status: 'pending', label: 'Chờ xử lý', icon: Clock, gradient: 'from-amber-400 to-amber-500' },
        { status: 'shipping', label: 'Đang giao', icon: Truck, gradient: 'from-cyan-400 to-cyan-500' },
        { status: 'completed', label: 'Hoàn thành', icon: CheckCircle, gradient: 'from-green-400 to-green-500' },
        { status: 'cancelled', label: 'Đã hủy', icon: XCircle, gradient: 'from-red-400 to-red-500' }
    ];

    return (
        <div>
            {/* Banner */}
            <section className="relative h-[300px] overflow-hidden">
                <img src={bannerSanPhamImg} alt="Đơn hàng của tôi" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-white text-4xl font-bold mb-4" style={{ fontFamily: 'Gotham-Ultra, sans-serif' }}>
                            Đơn hàng của tôi
                        </h1>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <Link to="/" className="hover:text-[#bd945f] transition-colors">Trang chủ</Link>
                            <ChevronRight size={16} />
                            <Link to="/profile" className="hover:text-[#bd945f] transition-colors">Tài khoản</Link>
                            <ChevronRight size={16} />
                            <span className="text-[#bd945f]">Đơn hàng</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Orders Content */}
            <section className="py-12 bg-[#f8f8f8]">
                <div className="container mx-auto px-4">
                    {/* Back to Profile */}
                    <Link to="/profile" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#bd945f] transition-colors mb-8">
                        <ArrowLeft size={18} />
                        Quay lại tài khoản
                    </Link>

                    {/* Order Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map(stat => {
                            const StatIcon = stat.icon;
                            const count = orders.filter(o => o.status === stat.status).length;
                            return (
                                <div key={stat.status} className="bg-white p-5 shadow-sm flex items-center gap-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white`}>
                                        <StatIcon size={24} />
                                    </div>
                                    <div>
                                        <span className="text-2xl font-bold text-gray-800">{count}</span>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex-1 flex items-center bg-white border border-gray-200 px-4">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo mã đơn hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 px-3 py-3 border-none outline-none bg-transparent"
                            />
                        </div>
                        <div className="flex items-center bg-white border border-gray-200 px-4">
                            <Filter size={18} className="text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-3 border-none outline-none bg-transparent min-w-[180px]"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="pending">Chờ xử lý</option>
                                <option value="processing">Đang xử lý</option>
                                <option value="shipping">Đang giao</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Đã hủy</option>
                            </select>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-6">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => {
                                const statusInfo = getStatusInfo(order.status);
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <div key={order.id} className="bg-white shadow-sm overflow-hidden">
                                        {/* Order Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100 gap-3">
                                            <div className="flex items-center gap-4">
                                                <h3 className="font-semibold text-gray-800">{order.id}</h3>
                                                <span className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Calendar size={14} />
                                                    {formatDate(order.date)}
                                                </span>
                                            </div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                                                <StatusIcon size={14} />
                                                {statusInfo.label}
                                            </span>
                                        </div>

                                        {/* Order Items */}
                                        <div className="p-6">
                                            {order.items.slice(0, 2).map(item => (
                                                <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-b-0">
                                                    <div className="w-16 h-16 overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                                                        <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                                                    </div>
                                                    <div className="font-semibold text-[#bd945f]">
                                                        {formatPrice(item.price)}
                                                    </div>
                                                </div>
                                            ))}
                                            {order.items.length > 2 && (
                                                <p className="text-center text-sm text-gray-500 pt-3">
                                                    + {order.items.length - 2} sản phẩm khác
                                                </p>
                                            )}
                                        </div>

                                        {/* Order Footer */}
                                        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100 gap-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <span>Tổng tiền:</span>
                                                <strong className="text-lg text-[#bd945f]">{formatPrice(order.total)}</strong>
                                            </div>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-[#bd945f] text-white hover:bg-[#a67d4a] transition-colors"
                                            >
                                                <Eye size={16} />
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="bg-white shadow-sm p-16 text-center">
                                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy đơn hàng</h3>
                                <p className="text-gray-500 mb-6">Bạn chưa có đơn hàng nào hoặc không tìm thấy đơn hàng phù hợp</p>
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#bd945f] text-white hover:bg-[#a67d4a] transition-colors"
                                >
                                    Mua sắm ngay
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedOrder(null)}
                >
                    <div
                        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Chi tiết đơn hàng {selectedOrder.id}</h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {/* Order Timeline */}
                            <div className="flex justify-between items-start mb-8 relative">
                                <div className="absolute top-4 left-8 right-8 h-0.5 bg-gray-200"></div>
                                {[
                                    { status: 'pending', label: 'Đặt hàng', icon: Clock },
                                    { status: 'processing', label: 'Xử lý', icon: Package },
                                    { status: 'shipping', label: 'Vận chuyển', icon: Truck },
                                    { status: 'completed', label: 'Hoàn thành', icon: CheckCircle }
                                ].map((step, index) => {
                                    const isActive = ['pending', 'processing', 'shipping', 'completed'].indexOf(selectedOrder.status) >= index;
                                    const StepIcon = step.icon;
                                    return (
                                        <div key={step.status} className="flex flex-col items-center relative z-10">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-[#bd945f] text-white' : 'bg-gray-200 text-gray-400'}`}>
                                                <StepIcon size={16} />
                                            </div>
                                            <span className={`text-xs mt-2 ${isActive ? 'text-[#bd945f] font-medium' : 'text-gray-400'}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Order Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-gray-50">
                                    <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Thông tin giao hàng</h4>
                                    <p className="text-sm text-gray-600 mb-1"><strong>Địa chỉ:</strong> {selectedOrder.shippingAddress}</p>
                                    <p className="text-sm text-gray-600 mb-1"><strong>Người nhận:</strong> {user?.name || 'Nguyễn Văn A'}</p>
                                    <p className="text-sm text-gray-600"><strong>SĐT:</strong> {user?.phone || '0987654321'}</p>
                                </div>
                                <div className="p-4 bg-gray-50">
                                    <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Thông tin thanh toán</h4>
                                    <p className="text-sm text-gray-600 mb-1"><strong>Phương thức:</strong> {selectedOrder.paymentMethod}</p>
                                    <p className="text-sm text-gray-600"><strong>Ngày đặt:</strong> {formatDate(selectedOrder.date)}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-800 mb-3">Sản phẩm đã đặt</h4>
                                {selectedOrder.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100">
                                        <div className="w-12 h-12 overflow-hidden bg-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-medium text-gray-800">{item.name}</h5>
                                            <span className="text-sm text-gray-500">x{item.quantity}</span>
                                        </div>
                                        <div className="font-semibold text-gray-800">
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 p-4">
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Tạm tính</span>
                                    <span>{formatPrice(selectedOrder.total)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className="flex justify-between py-2 pt-3 border-t border-gray-200 text-lg">
                                    <span className="font-medium">Tổng cộng</span>
                                    <strong className="text-[#bd945f]">{formatPrice(selectedOrder.total)}</strong>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
                            {selectedOrder.status === 'pending' && (
                                <button className="px-5 py-2.5 border border-red-500 text-red-500 hover:bg-red-50 transition-colors">
                                    Hủy đơn hàng
                                </button>
                            )}
                            {selectedOrder.status === 'completed' && (
                                <button className="px-5 py-2.5 bg-[#bd945f] text-white hover:bg-[#a67d4a] transition-colors">
                                    Mua lại
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
