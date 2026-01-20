import { useState } from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    Image as ImageIcon,
    Package,
    ShoppingCart,
    Grid,
    List
} from 'lucide-react';

// Product Form Modal
const ProductFormModal = ({ isOpen, onClose, product, onSave }) => {
    const [formData, setFormData] = useState(product || {
        name: '',
        category: '',
        price: '',
        stock: '',
        status: 'active',
        description: '',
        image: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container product-modal">
                <div className="modal-header">
                    <h2>{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Hình ảnh sản phẩm</label>
                            <div className="image-upload-area">
                                <ImageIcon size={48} />
                                <p>Kéo thả hoặc click để tải ảnh</p>
                                <input type="file" accept="image/*" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Tên sản phẩm *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nhập tên sản phẩm"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Danh mục *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="">Chọn danh mục</option>
                                <option value="Sofa">Sofa</option>
                                <option value="Giường">Giường</option>
                                <option value="Bàn">Bàn</option>
                                <option value="Tủ">Tủ</option>
                                <option value="Ghế">Ghế</option>
                                <option value="Kệ">Kệ</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Giá bán (VNĐ) *</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="Nhập giá bán"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Số lượng tồn kho *</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                placeholder="Nhập số lượng"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="active">Đang bán</option>
                                <option value="inactive">Ngừng bán</option>
                                <option value="out_of_stock">Hết hàng</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Chất liệu</label>
                            <select
                                value={formData.material}
                                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                            >
                                <option value="">Chọn chất liệu</option>
                                <option value="wood">Gỗ tự nhiên</option>
                                <option value="mdf">Gỗ công nghiệp</option>
                                <option value="fabric">Vải</option>
                                <option value="leather">Da</option>
                                <option value="metal">Kim loại</option>
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <label>Mô tả sản phẩm</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Nhập mô tả chi tiết sản phẩm..."
                                rows={4}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit" className="btn-primary">
                            {product ? 'Cập nhật' : 'Thêm sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container delete-modal">
                <div className="modal-header">
                    <h2>Xác nhận xóa</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="delete-warning">
                        <Trash2 size={48} />
                        <p>Bạn có chắc chắn muốn xóa sản phẩm <strong>"{productName}"</strong>?</p>
                        <span>Hành động này không thể hoàn tác.</span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        Hủy
                    </button>
                    <button className="btn-danger" onClick={onConfirm}>
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

// Product Card Component
const ProductCard = ({ product, onEdit, onDelete, onView, formatPrice, getStatusClass, getStatusLabel }) => {
    return (
        <div className="product-card">
            <div className="product-card-image">
                <img src={product.image} alt={product.name} />
                <div className={`product-card-status ${getStatusClass(product.status)}`}>
                    {getStatusLabel(product.status)}
                </div>
            </div>
            <div className="product-card-content">
                <span className="product-card-category">{product.category}</span>
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-description">{product.description}</p>
                <div className="product-card-price">{formatPrice(product.price)}</div>
                <div className="product-card-stats">
                    <div className="stat-item">
                        <Package size={14} />
                        <span>Kho: <strong className={product.stock === 0 ? 'out-of-stock' : product.stock <= 5 ? 'low-stock' : ''}>{product.stock}</strong></span>
                    </div>
                    <div className="stat-item">
                        <ShoppingCart size={14} />
                        <span>Đã bán: <strong>{product.sold}</strong></span>
                    </div>
                </div>
            </div>
            <div className="product-card-actions">
                <button className="card-action-btn view" onClick={() => onView(product)} title="Xem chi tiết">
                    <Eye size={16} />
                </button>
                <button className="card-action-btn edit" onClick={() => onEdit(product)} title="Chỉnh sửa">
                    <Edit size={16} />
                </button>
                <button className="card-action-btn delete" onClick={() => onDelete(product)} title="Xóa">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

const AdminProducts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Sample products data - Furniture items
    const products = [
        {
            id: 1,
            name: 'Sofa góc L cao cấp Milano',
            category: 'Sofa',
            price: 25000000,
            stock: 12,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
            sold: 45,
            description: 'Sofa góc chữ L thiết kế hiện đại, chất liệu vải cao cấp'
        },
        {
            id: 2,
            name: 'Giường ngủ gỗ sồi Nordic',
            category: 'Giường',
            price: 18000000,
            stock: 8,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
            sold: 32,
            description: 'Giường ngủ gỗ sồi tự nhiên phong cách Bắc Âu'
        },
        {
            id: 3,
            name: 'Bàn ăn mặt đá marble',
            category: 'Bàn',
            price: 15000000,
            stock: 0,
            status: 'out_of_stock',
            image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400',
            sold: 28,
            description: 'Bàn ăn 6 người mặt đá marble cao cấp'
        },
        {
            id: 4,
            name: 'Tủ quần áo 3 cánh Vintage',
            category: 'Tủ',
            price: 22000000,
            stock: 5,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400',
            sold: 18,
            description: 'Tủ quần áo 3 cánh gỗ công nghiệp phong cách cổ điển'
        },
        {
            id: 5,
            name: 'Ghế văn phòng ergonomic Pro',
            category: 'Ghế',
            price: 8500000,
            stock: 25,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
            sold: 67,
            description: 'Ghế văn phòng công thái học hỗ trợ lưng'
        },
        {
            id: 6,
            name: 'Kệ tivi gỗ óc chó Luxury',
            category: 'Kệ',
            price: 12000000,
            stock: 3,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400',
            sold: 21,
            description: 'Kệ tivi gỗ óc chó nhập khẩu thiết kế sang trọng'
        },
        {
            id: 7,
            name: 'Sofa đơn thư giãn Comfort',
            category: 'Sofa',
            price: 9500000,
            stock: 15,
            status: 'active',
            image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
            sold: 54,
            description: 'Sofa đơn thư giãn có chức năng ngả lưng'
        },
        {
            id: 8,
            name: 'Bàn làm việc gỗ tự nhiên',
            category: 'Bàn',
            price: 6800000,
            stock: 0,
            status: 'out_of_stock',
            image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400',
            sold: 89,
            description: 'Bàn làm việc gỗ thông tự nhiên phong cách tối giản'
        },
        {
            id: 9,
            name: 'Giường tầng trẻ em Rainbow',
            category: 'Giường',
            price: 14500000,
            stock: 6,
            status: 'inactive',
            image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400',
            sold: 12,
            description: 'Giường tầng cho bé thiết kế an toàn, màu sắc tươi sáng'
        }
    ];

    const getStatusClass = (status) => {
        const statusClasses = {
            active: 'status-active',
            inactive: 'status-inactive',
            out_of_stock: 'status-out-of-stock'
        };
        return statusClasses[status] || '';
    };

    const getStatusLabel = (status) => {
        const statusLabels = {
            active: 'Đang bán',
            inactive: 'Ngừng bán',
            out_of_stock: 'Hết hàng'
        };
        return statusLabels[status] || status;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsFormModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsFormModalOpen(true);
    };

    const handleViewProduct = (product) => {
        // View product detail logic
        console.log('View product:', product);
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        // Delete logic here
        console.log('Deleting product:', productToDelete);
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const handleSaveProduct = (productData) => {
        console.log('Saving product:', productData);
        // Save logic here
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesStatus = !statusFilter || product.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const itemsPerPage = 9; // 3 cards per row x 3 rows
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="admin-products">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-content">
                    <h1 className="page-title">Quản lý sản phẩm</h1>
                    <p className="page-subtitle">Quản lý tất cả sản phẩm nội thất trong cửa hàng</p>
                </div>
                <div className="page-header-actions">
                    <button className="btn-outline">
                        <Download size={18} />
                        Xuất Excel
                    </button>
                    <button className="btn-primary" onClick={handleAddProduct}>
                        <Plus size={18} />
                        Thêm sản phẩm
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-card">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Tất cả danh mục</option>
                        <option value="Sofa">Sofa</option>
                        <option value="Giường">Giường</option>
                        <option value="Bàn">Bàn</option>
                        <option value="Tủ">Tủ</option>
                        <option value="Ghế">Ghế</option>
                        <option value="Kệ">Kệ</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Đang bán</option>
                        <option value="inactive">Ngừng bán</option>
                        <option value="out_of_stock">Hết hàng</option>
                    </select>
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            title="Xem dạng lưới"
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            title="Xem dạng danh sách"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {paginatedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteClick}
                        onView={handleViewProduct}
                        formatPrice={formatPrice}
                        getStatusClass={getStatusClass}
                        getStatusLabel={getStatusLabel}
                    />
                ))}
            </div>

            {/* Empty State */}
            {paginatedProducts.length === 0 && (
                <div className="empty-state">
                    <Package size={64} />
                    <h3>Không tìm thấy sản phẩm</h3>
                    <p>Thử thay đổi bộ lọc hoặc thêm sản phẩm mới</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="products-pagination">
                    <div className="pagination-info">
                        Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} trong tổng số {filteredProducts.length} sản phẩm
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
            )}

            {/* Modals */}
            <ProductFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                product={selectedProduct}
                onSave={handleSaveProduct}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                productName={productToDelete?.name}
            />
        </div>
    );
};

export default AdminProducts;
