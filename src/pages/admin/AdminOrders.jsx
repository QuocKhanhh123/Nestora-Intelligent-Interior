import { useState } from 'react';
import {
    Search,
    Filter,
    Eye,
    Edit,
    MoreVertical,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    MapPin,
    Phone,
    Mail,
    User,
    Calendar
} from 'lucide-react';

// Order Detail Modal
const OrderDetailModal = ({ isOpen, onClose, order }) => {
    if (!isOpen || !order) return null;

    const orderItems = [
        { name: 'Mèo Anh lông ngắn Golden', quantity: 1, price: 15000000 },
        { name: 'Thức ăn cho mèo Royal Canin', quantity: 2, price: 500000 }
    ];

    const timeline = [
        { status: 'Đặt hàng', date: '20/01/2026 09:30', completed: true },
        { status: 'Xác nhận', date: '20/01/2026 10:15', completed: true },
        { status: 'Đang chuẩn bị', date: '20/01/2026 14:00', completed: true },
        { status: 'Đang giao', date: '21/01/2026 08:00', completed: order.status === 'shipping' || order.status === 'completed' },
        { status: 'Hoàn thành', date: order.status === 'completed' ? '22/01/2026 15:30' : '-', completed: order.status === 'completed' }
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-container order-detail-modal">
                <div className="modal-header">
                    <h2>Chi tiết đơn hàng #{order.id}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="order-detail-grid">
                        {/* Customer Info */}
                        <div className="detail-section">
                            <h3 className="section-title">
                                <User size={18} />
                                Thông tin khách hàng
                            </h3>
                            <div className="detail-content">
                                <div className="detail-row">
                                    <span className="label">Họ tên:</span>
                                    <span className="value">{order.customer}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">
                                        <Phone size={14} />
                                    </span>
                                    <span className="value">0987 654 321</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">
                                        <Mail size={14} />
                                    </span>
                                    <span className="value">customer@email.com</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">
                                        <MapPin size={14} />
                                    </span>
                                    <span className="value">123 Nguyễn Huệ, Quận 1, TP.HCM</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Status Timeline */}
                        <div className="detail-section">
                            <h3 className="section-title">
                                <Clock size={18} />
                                Trạng thái đơn hàng
                            </h3>
                            <div className="order-timeline">
                                {timeline.map((item, index) => (
                                    <div key={index} className={`timeline-item ${item.completed ? 'completed' : ''}`}>
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <span className="timeline-status">{item.status}</span>
                                            <span className="timeline-date">{item.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="detail-section full-width">
                        <h3 className="section-title">
                            <Package size={18} />
                            Sản phẩm đặt hàng
                        </h3>
                        <table className="order-items-table">
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price.toLocaleString('vi-VN')}đ</td>
                                        <td>{(item.quantity * item.price).toLocaleString('vi-VN')}đ</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3}>Tạm tính</td>
                                    <td>16,000,000đ</td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>Phí vận chuyển</td>
                                    <td>50,000đ</td>
                                </tr>
                                <tr className="total-row">
                                    <td colSpan={3}>Tổng cộng</td>
                                    <td>{order.amount}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        Đóng
                    </button>
                    <button className="btn-primary">
                        <Edit size={16} />
                        Cập nhật trạng thái
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminOrders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Sample orders data
    const orders = [
        {
            id: 'ORD-001',
            customer: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0987654321',
            items: 2,
            amount: '16,050,000đ',
            status: 'completed',
            paymentMethod: 'Chuyển khoản',
            date: '20/01/2026 09:30'
        },
        {
            id: 'ORD-002',
            customer: 'Trần Thị B',
            email: 'tranthib@email.com',
            phone: '0912345678',
            items: 1,
            amount: '12,500,000đ',
            status: 'pending',
            paymentMethod: 'COD',
            date: '19/01/2026 14:20'
        },
        {
            id: 'ORD-003',
            customer: 'Lê Văn C',
            email: 'levanc@email.com',
            phone: '0901234567',
            items: 1,
            amount: '18,000,000đ',
            status: 'processing',
            paymentMethod: 'Chuyển khoản',
            date: '19/01/2026 10:45'
        },
        {
            id: 'ORD-004',
            customer: 'Phạm Thị D',
            email: 'phamthid@email.com',
            phone: '0976543210',
            items: 3,
            amount: '35,500,000đ',
            status: 'shipping',
            paymentMethod: 'Ví điện tử',
            date: '18/01/2026 16:00'
        },
        {
            id: 'ORD-005',
            customer: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
            phone: '0965432109',
            items: 1,
            amount: '20,000,000đ',
            status: 'cancelled',
            paymentMethod: 'COD',
            date: '18/01/2026 11:30'
        },
        {
            id: 'ORD-006',
            customer: 'Vũ Thị F',
            email: 'vuthif@email.com',
            phone: '0954321098',
            items: 2,
            amount: '28,000,000đ',
            status: 'completed',
            paymentMethod: 'Chuyển khoản',
            date: '17/01/2026 09:15'
        }
    ];

    const getStatusIcon = (status) => {
        const icons = {
            pending: Clock,
            processing: Package,
            shipping: Truck,
            completed: CheckCircle,
            cancelled: XCircle
        };
        return icons[status] || Clock;
    };

    const getStatusClass = (status) => {
        const statusClasses = {
            pending: 'status-pending',
            processing: 'status-processing',
            shipping: 'status-shipping',
            completed: 'status-completed',
            cancelled: 'status-cancelled'
        };
        return statusClasses[status] || '';
    };

    const getStatusLabel = (status) => {
        const statusLabels = {
            pending: 'Chờ xử lý',
            processing: 'Đang chuẩn bị',
            shipping: 'Đang giao',
            completed: 'Hoàn thành',
            cancelled: 'Đã hủy'
        };
        return statusLabels[status] || status;
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Order stats
    const orderStats = [
        { label: 'Tổng đơn hàng', value: orders.length, icon: Package, color: 'blue' },
        { label: 'Chờ xử lý', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'yellow' },
        { label: 'Đang giao', value: orders.filter(o => o.status === 'shipping').length, icon: Truck, color: 'purple' },
        { label: 'Hoàn thành', value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle, color: 'green' }
    ];

    return (
        <div className="admin-orders">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-content">
                    <h1 className="page-title">Quản lý đơn hàng</h1>
                    <p className="page-subtitle">Theo dõi và quản lý tất cả đơn hàng của cửa hàng</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-outline">
                        <Download size={18} />
                        Xuất báo cáo
                    </button>
                </div>
            </div>

            {/* Order Stats */}
            <div className="order-stats-grid">
                {orderStats.map((stat, index) => (
                    <div key={index} className={`order-stat-card ${stat.color}`}>
                        <div className="stat-icon-wrapper">
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="filters-card">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mã đơn hoặc tên khách hàng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang chuẩn bị</option>
                        <option value="shipping">Đang giao</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="filter-date"
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="table-card">
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" className="checkbox" />
                                </th>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Số SP</th>
                                <th>Tổng tiền</th>
                                <th>Thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Ngày đặt</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.map((order) => {
                                const StatusIcon = getStatusIcon(order.status);
                                return (
                                    <tr key={order.id}>
                                        <td>
                                            <input type="checkbox" className="checkbox" />
                                        </td>
                                        <td className="order-id-cell">
                                            <span className="order-id">{order.id}</span>
                                        </td>
                                        <td>
                                            <div className="customer-cell">
                                                <div className="customer-avatar">
                                                    {order.customer.charAt(0)}
                                                </div>
                                                <div className="customer-info">
                                                    <span className="customer-name">{order.customer}</span>
                                                    <span className="customer-email">{order.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="items-cell">{order.items}</td>
                                        <td className="amount-cell">{order.amount}</td>
                                        <td className="payment-cell">{order.paymentMethod}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(order.status)}`}>
                                                <StatusIcon size={14} />
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </td>
                                        <td className="date-cell">{order.date}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="action-btn view"
                                                    title="Xem chi tiết"
                                                    onClick={() => handleViewOrder(order)}
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button className="action-btn edit" title="Cập nhật">
                                                    <Edit size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="table-pagination">
                    <div className="pagination-info">
                        Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredOrders.length)} trong tổng số {filteredOrders.length} đơn hàng
                    </div>
                    <div className="pagination-buttons">
                        <button
                            className="pagination-btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className="pagination-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Order Detail Modal */}
            <OrderDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                order={selectedOrder}
            />
        </div>
    );
};

export default AdminOrders;
