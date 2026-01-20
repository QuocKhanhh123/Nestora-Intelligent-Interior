import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Tag, Heart, Share2, Gift, Truck, Shield, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Import images
import sp1Img from '../assets/images/AnhCat/sp-1.png';
import sp2Img from '../assets/images/AnhCat/sp-2.png';
import sp3Img from '../assets/images/AnhCat/sp-3.png';

const CartPage = () => {
    const { user } = useAuth();

    // Sample cart data - in real app, this would come from context/state management
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Giường Châu Âu',
            description: 'Giường ngủ cao cấp phong cách Châu Âu',
            price: 8999000,
            quantity: 1,
            image: sp1Img,
            color: 'Nâu gỗ',
            size: 'King Size',
            sku: 'GCE-001',
            inStock: true,
            warranty: '24 tháng'
        },
        {
            id: 2,
            name: 'Tủ quần áo',
            description: 'Tủ quần áo 4 cánh gỗ tự nhiên',
            price: 12999000,
            quantity: 1,
            image: sp3Img,
            color: 'Trắng ngà',
            size: 'Lớn',
            sku: 'TQA-004',
            inStock: true,
            warranty: '36 tháng'
        },
        {
            id: 3,
            name: 'Bàn làm việc',
            description: 'Bàn làm việc gỗ công nghiệp cao cấp',
            price: 3999000,
            quantity: 2,
            image: sp2Img,
            color: 'Nâu đậm',
            size: '120x60cm',
            sku: 'BLV-012',
            inStock: true,
            warranty: '12 tháng'
        }
    ]);

    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const applyCoupon = () => {
        if (couponCode.toLowerCase() === 'nestora10') {
            setAppliedCoupon({ code: 'NESTORA10', discount: 10 });
        } else if (couponCode.toLowerCase() === 'freeship') {
            setAppliedCoupon({ code: 'FREESHIP', discount: 0, freeShip: true });
        } else {
            alert('Mã giảm giá không hợp lệ!');
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = appliedCoupon?.discount ? (subtotal * appliedCoupon.discount / 100) : 0;
    const shipping = subtotal > 10000000 || appliedCoupon?.freeShip ? 0 : 500000;
    const total = subtotal - discount + shipping;

    return (
        <div>
            {/* Cart Content */}
            <section className="py-12 bg-[#f8f8f8] min-h-screen">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gotham-Ultra, sans-serif' }}>
                            Giỏ hàng của bạn
                        </h1>
                        <p className="text-gray-500">
                            {cartItems.length > 0
                                ? `Bạn có ${cartItems.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm trong giỏ hàng`
                                : 'Giỏ hàng của bạn đang trống'
                            }
                        </p>
                    </div>

                    {/* Back to Products */}
                    <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#bd945f] transition-colors mb-6">
                        <ArrowLeft size={18} />
                        Tiếp tục mua sắm
                    </Link>

                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                            {/* Cart Items */}
                            <div className="space-y-4">
                                {/* Cart Header */}
                                <div className="bg-white p-4 shadow-sm hidden lg:grid grid-cols-[2.5fr_1fr_1fr_1fr_auto] gap-6 items-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    <span>Sản phẩm</span>
                                    <span className="text-center">Đơn giá</span>
                                    <span className="text-center">Số lượng</span>
                                    <span className="text-center">Thành tiền</span>
                                    <span className="w-10"></span>
                                </div>

                                {/* Cart Items List */}
                                {cartItems.map(item => (
                                    <div key={item.id} className="bg-white p-5 shadow-sm border border-gray-100">
                                        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr_1fr_1fr_auto] gap-6 items-start">
                                            {/* Product Info */}
                                            <div className="flex gap-5">
                                                <div className="w-28 h-28 bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <Link to={`/products/${item.id}`} className="font-semibold text-gray-800 hover:text-[#bd945f] transition-colors text-lg">
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>

                                                    {/* Product Attributes */}
                                                    <div className="flex flex-wrap gap-3 mt-3">
                                                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs text-gray-600">
                                                            Màu: <strong className="ml-1">{item.color}</strong>
                                                        </span>
                                                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs text-gray-600">
                                                            Size: <strong className="ml-1">{item.size}</strong>
                                                        </span>
                                                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs text-gray-600">
                                                            SKU: <strong className="ml-1">{item.sku}</strong>
                                                        </span>
                                                    </div>

                                                    {/* Stock & Warranty */}
                                                    <div className="flex items-center gap-4 mt-3">
                                                        {item.inStock ? (
                                                            <span className="text-xs text-green-600 flex items-center gap-1">
                                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                                Còn hàng
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-red-600 flex items-center gap-1">
                                                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                                Hết hàng
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                                            <Shield size={12} />
                                                            Bảo hành: {item.warranty}
                                                        </span>
                                                    </div>

                                                    {/* Quick Actions */}
                                                    <div className="flex items-center gap-3 mt-3">
                                                        <button className="text-xs text-gray-500 hover:text-[#bd945f] flex items-center gap-1 transition-colors">
                                                            <Heart size={14} />
                                                            Yêu thích
                                                        </button>
                                                        <button className="text-xs text-gray-500 hover:text-[#bd945f] flex items-center gap-1 transition-colors">
                                                            <Share2 size={14} />
                                                            Chia sẻ
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="text-center">
                                                <span className="md:hidden text-sm text-gray-500 mr-2">Đơn giá:</span>
                                                <span className="font-medium text-gray-800">{formatPrice(item.price)}</span>
                                            </div>

                                            {/* Quantity */}
                                            <div className="flex items-center justify-center">
                                                <span className="md:hidden text-sm text-gray-500 mr-2">Số lượng:</span>
                                                <div className="flex items-center border border-gray-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (!isNaN(val)) updateQuantity(item.id, val);
                                                        }}
                                                        className="w-12 h-8 text-center border-x border-gray-200 outline-none"
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Subtotal */}
                                            <div className="text-center">
                                                <span className="lg:hidden text-sm text-gray-500 mr-2">Thành tiền:</span>
                                                <span className="font-bold text-[#bd945f] text-lg">{formatPrice(item.price * item.quantity)}</span>
                                                {item.quantity > 1 && (
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {formatPrice(item.price)}/sản phẩm
                                                    </p>
                                                )}
                                            </div>

                                            {/* Remove */}
                                            <div className="flex flex-col items-center gap-2">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    title="Xóa sản phẩm"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Shipping Info Banner */}
                                <div className="bg-gradient-to-r from-[#2c2e53] to-[#3d4070] p-4 text-white">
                                    <div className="flex flex-wrap items-center justify-center gap-8">
                                        <div className="flex items-center gap-2">
                                            <Truck size={20} />
                                            <span className="text-sm">Miễn phí vận chuyển đơn từ 10 triệu</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RotateCcw size={20} />
                                            <span className="text-sm">Đổi trả trong 30 ngày</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Shield size={20} />
                                            <span className="text-sm">Bảo hành chính hãng</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Gift size={20} />
                                            <span className="text-sm">Quà tặng hấp dẫn</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="space-y-4">
                                {/* Coupon */}
                                <div className="bg-white p-6 shadow-sm">
                                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <Tag size={18} />
                                        Mã giảm giá
                                    </h3>
                                    {appliedCoupon ? (
                                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200">
                                            <div>
                                                <span className="font-medium text-green-700">{appliedCoupon.code}</span>
                                                <p className="text-sm text-green-600">
                                                    {appliedCoupon.discount ? `Giảm ${appliedCoupon.discount}%` : 'Miễn phí vận chuyển'}
                                                </p>
                                            </div>
                                            <button
                                                onClick={removeCoupon}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Nhập mã giảm giá"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                className="flex-1 px-4 py-2.5 border border-gray-200 focus:border-[#bd945f] focus:outline-none transition-colors"
                                            />
                                            <button
                                                onClick={applyCoupon}
                                                className="px-4 py-2.5 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                                            >
                                                Áp dụng
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Summary */}
                                <div className="bg-white p-6 shadow-sm">
                                    <h3 className="font-semibold text-gray-800 mb-4">Tóm tắt đơn hàng</h3>

                                    <div className="space-y-3 text-gray-600">
                                        <div className="flex justify-between">
                                            <span>Tạm tính ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>

                                        {discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Giảm giá</span>
                                                <span>-{formatPrice(discount)}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between">
                                            <span>Phí vận chuyển</span>
                                            <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
                                        </div>

                                        {subtotal < 10000000 && !appliedCoupon?.freeShip && (
                                            <p className="text-xs text-gray-500 italic">
                                                * Miễn phí vận chuyển cho đơn hàng từ 10.000.000 VNĐ
                                            </p>
                                        )}
                                    </div>

                                    <div className="border-t border-gray-100 mt-4 pt-4">
                                        <div className="flex justify-between items-center text-lg">
                                            <span className="font-medium">Tổng cộng</span>
                                            <strong className="text-[#bd945f] text-xl">{formatPrice(total)}</strong>
                                        </div>
                                    </div>

                                    <Link
                                        to="/checkout"
                                        className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-[#bd945f] text-white hover:bg-[#a67d4a] transition-colors"
                                    >
                                        <ShoppingBag size={18} />
                                        Tiến hành đặt hàng
                                    </Link>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        Bằng việc đặt hàng, bạn đồng ý với{' '}
                                        <Link to="/terms" className="text-[#bd945f] hover:underline">Điều khoản dịch vụ</Link>
                                        {' '}của chúng tôi
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty Cart */
                        <div className="bg-white shadow-sm p-16 text-center">
                            <ShoppingCart size={80} className="mx-auto text-gray-300 mb-6" />
                            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Giỏ hàng trống</h3>
                            <p className="text-gray-500 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-[#bd945f] text-white hover:bg-[#a67d4a] transition-colors"
                            >
                                <ShoppingBag size={18} />
                                Khám phá sản phẩm
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CartPage;
