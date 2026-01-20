import { useState } from 'react';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    ShoppingBag,
    Ban,
    CheckCircle
} from 'lucide-react';

// User Detail Modal
const UserDetailModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container user-detail-modal">
                <div className="modal-header">
                    <h2>Thông tin người dùng</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="user-profile-header">
                        <div className="user-avatar-large">
                            <img src={user.avatar || '/images/avatar-placeholder.jpg'} alt={user.name} />
                        </div>
                        <div className="user-profile-info">
                            <h3>{user.name}</h3>
                            <span className={`role-badge ${user.role}`}>{user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</span>
                            <span className={`status-badge ${user.status}`}>
                                {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                            </span>
                        </div>
                    </div>

                    <div className="user-details-grid">
                        <div className="detail-item">
                            <Mail size={18} />
                            <div>
                                <span className="label">Email</span>
                                <span className="value">{user.email}</span>
                            </div>
                        </div>
                        <div className="detail-item">
                            <Phone size={18} />
                            <div>
                                <span className="label">Số điện thoại</span>
                                <span className="value">{user.phone}</span>
                            </div>
                        </div>
                        <div className="detail-item">
                            <MapPin size={18} />
                            <div>
                                <span className="label">Địa chỉ</span>
                                <span className="value">{user.address || 'Chưa cập nhật'}</span>
                            </div>
                        </div>
                        <div className="detail-item">
                            <Calendar size={18} />
                            <div>
                                <span className="label">Ngày đăng ký</span>
                                <span className="value">{user.joinDate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="user-stats-row">
                        <div className="user-stat">
                            <ShoppingBag size={24} />
                            <div>
                                <span className="stat-value">{user.orders}</span>
                                <span className="stat-label">Đơn hàng</span>
                            </div>
                        </div>
                        <div className="user-stat">
                            <span className="stat-value">{user.totalSpent}</span>
                            <span className="stat-label">Tổng chi tiêu</span>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        Đóng
                    </button>
                    <button className="btn-primary">
                        <Edit size={16} />
                        Chỉnh sửa
                    </button>
                </div>
            </div>
        </div>
    );
};

// User Form Modal
const UserFormModal = ({ isOpen, onClose, user, onSave }) => {
    const [formData, setFormData] = useState(user || {
        name: '',
        email: '',
        phone: '',
        role: 'customer',
        status: 'active',
        address: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container user-form-modal">
                <div className="modal-header">
                    <h2>{user ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Họ và tên *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Nhập email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại *</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Vai trò</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="customer">Khách hàng</option>
                                <option value="admin">Quản trị viên</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="active">Hoạt động</option>
                                <option value="blocked">Bị khóa</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Nhập địa chỉ"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit" className="btn-primary">
                            {user ? 'Cập nhật' : 'Thêm người dùng'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Sample users data
    const users = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0987654321',
            role: 'customer',
            status: 'active',
            orders: 5,
            totalSpent: '75,000,000đ',
            joinDate: '15/06/2025',
            address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
            avatar: '/images/AnhCat/cat1.jpg'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            phone: '0912345678',
            role: 'customer',
            status: 'active',
            orders: 3,
            totalSpent: '45,000,000đ',
            joinDate: '20/07/2025',
            address: '456 Lê Lợi, Quận 3, TP.HCM',
            avatar: null
        },
        {
            id: 3,
            name: 'Admin Nestora',
            email: 'admin@nestora.vn',
            phone: '0901234567',
            role: 'admin',
            status: 'active',
            orders: 0,
            totalSpent: '0đ',
            joinDate: '01/01/2025',
            address: 'Văn phòng Nestora',
            avatar: null
        },
        {
            id: 4,
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            phone: '0976543210',
            role: 'customer',
            status: 'blocked',
            orders: 1,
            totalSpent: '15,000,000đ',
            joinDate: '10/08/2025',
            address: '789 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
            avatar: null
        },
        {
            id: 5,
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
            phone: '0965432109',
            role: 'customer',
            status: 'active',
            orders: 8,
            totalSpent: '120,000,000đ',
            joinDate: '05/05/2025',
            address: '321 Võ Văn Tần, Quận 3, TP.HCM',
            avatar: null
        },
        {
            id: 6,
            name: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
            phone: '0954321098',
            role: 'customer',
            status: 'active',
            orders: 2,
            totalSpent: '30,000,000đ',
            joinDate: '25/09/2025',
            address: '654 Cách Mạng Tháng 8, Quận 10, TP.HCM',
            avatar: null
        }
    ];

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsDetailModalOpen(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsFormModalOpen(true);
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsFormModalOpen(true);
    };

    const handleSaveUser = (userData) => {
        console.log('Saving user:', userData);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesStatus = !statusFilter || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // User stats
    const userStats = [
        { label: 'Tổng người dùng', value: users.length, icon: User, color: 'blue' },
        { label: 'Khách hàng', value: users.filter(u => u.role === 'customer').length, icon: ShoppingBag, color: 'green' },
        { label: 'Quản trị viên', value: users.filter(u => u.role === 'admin').length, icon: Shield, color: 'purple' },
        { label: 'Bị khóa', value: users.filter(u => u.status === 'blocked').length, icon: Ban, color: 'red' }
    ];

    return (
        <div className="admin-users">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-content">
                    <h1 className="page-title">Quản lý người dùng</h1>
                    <p className="page-subtitle">Quản lý tất cả tài khoản người dùng trong hệ thống</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-outline">
                        <Download size={18} />
                        Xuất danh sách
                    </button>
                    <button className="btn-primary" onClick={handleAddUser}>
                        <Plus size={18} />
                        Thêm người dùng
                    </button>
                </div>
            </div>

            {/* User Stats */}
            <div className="user-stats-grid">
                {userStats.map((stat, index) => (
                    <div key={index} className={`user-stat-card ${stat.color}`}>
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
                        placeholder="Tìm kiếm theo tên hoặc email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Tất cả vai trò</option>
                        <option value="customer">Khách hàng</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Hoạt động</option>
                        <option value="blocked">Bị khóa</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="table-card">
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" className="checkbox" />
                                </th>
                                <th>Người dùng</th>
                                <th>Số điện thoại</th>
                                <th>Vai trò</th>
                                <th>Đơn hàng</th>
                                <th>Tổng chi tiêu</th>
                                <th>Trạng thái</th>
                                <th>Ngày đăng ký</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <input type="checkbox" className="checkbox" />
                                    </td>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-avatar">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt={user.name} />
                                                ) : (
                                                    <span>{user.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="user-info">
                                                <span className="user-name">{user.name}</span>
                                                <span className="user-email">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <span className={`role-badge ${user.role}`}>
                                            {user.role === 'admin' ? (
                                                <>
                                                    <Shield size={14} />
                                                    Quản trị viên
                                                </>
                                            ) : (
                                                <>
                                                    <User size={14} />
                                                    Khách hàng
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="orders-cell">{user.orders}</td>
                                    <td className="spent-cell">{user.totalSpent}</td>
                                    <td>
                                        <span className={`status-badge ${user.status === 'active' ? 'status-active' : 'status-blocked'}`}>
                                            {user.status === 'active' ? (
                                                <>
                                                    <CheckCircle size={14} />
                                                    Hoạt động
                                                </>
                                            ) : (
                                                <>
                                                    <Ban size={14} />
                                                    Bị khóa
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="date-cell">{user.joinDate}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn view"
                                                title="Xem chi tiết"
                                                onClick={() => handleViewUser(user)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                className="action-btn edit"
                                                title="Chỉnh sửa"
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="action-btn delete"
                                                title="Xóa"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="table-pagination">
                    <div className="pagination-info">
                        Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} trong tổng số {filteredUsers.length} người dùng
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

            {/* Modals */}
            <UserDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                user={selectedUser}
            />
            <UserFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                user={selectedUser}
                onSave={handleSaveUser}
            />
        </div>
    );
};

export default AdminUsers;
