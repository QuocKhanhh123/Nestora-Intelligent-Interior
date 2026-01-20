import { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Calendar,
    Eye,
    Sofa,
    Bed,
    Lamp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// ===== DATA FOR FURNITURE STORE =====
const revenueData = [
    { month: 'T1', revenue: 125, orders: 45 },
    { month: 'T2', revenue: 148, orders: 52 },
    { month: 'T3', revenue: 132, orders: 48 },
    { month: 'T4', revenue: 189, orders: 67 },
    { month: 'T5', revenue: 195, orders: 71 },
    { month: 'T6', revenue: 172, orders: 58 },
    { month: 'T7', revenue: 218, orders: 78 },
    { month: 'T8', revenue: 196, orders: 69 },
    { month: 'T9', revenue: 241, orders: 85 },
    { month: 'T10', revenue: 225, orders: 79 },
    { month: 'T11', revenue: 278, orders: 96 },
    { month: 'T12', revenue: 310, orders: 112 }
];

const categoryData = [
    { name: 'Sofa & Ghế', value: 35, color: '#bd945f' },
    { name: 'Giường & Nệm', value: 28, color: '#2c2e53' },
    { name: 'Bàn & Tủ', value: 22, color: '#6366f1' },
    { name: 'Đèn trang trí', value: 10, color: '#22c55e' },
    { name: 'Phụ kiện', value: 5, color: '#f59e0b' }
];

const weeklyData = [
    { day: 'T2', visitors: 1200, sales: 45 },
    { day: 'T3', visitors: 1450, sales: 52 },
    { day: 'T4', visitors: 1380, sales: 48 },
    { day: 'T5', visitors: 1520, sales: 56 },
    { day: 'T6', visitors: 1680, sales: 62 },
    { day: 'T7', visitors: 2100, sales: 78 },
    { day: 'CN', visitors: 1890, sales: 71 }
];

const recentOrders = [
    { id: 'ORD-001', customer: 'Nguyễn Văn A', product: 'Sofa góc L cao cấp', amount: '35,500,000đ', status: 'completed', date: '20/01/2026' },
    { id: 'ORD-002', customer: 'Trần Thị B', product: 'Giường ngủ King Size', amount: '28,000,000đ', status: 'pending', date: '19/01/2026' },
    { id: 'ORD-003', customer: 'Lê Văn C', product: 'Bộ bàn ăn 6 ghế', amount: '18,500,000đ', status: 'processing', date: '19/01/2026' },
    { id: 'ORD-004', customer: 'Phạm Thị D', product: 'Tủ quần áo 4 cánh', amount: '22,000,000đ', status: 'completed', date: '18/01/2026' },
    { id: 'ORD-005', customer: 'Hoàng Văn E', product: 'Đèn chùm phòng khách', amount: '8,500,000đ', status: 'cancelled', date: '18/01/2026' }
];

const topProducts = [
    { name: 'Sofa góc L Nordic', sales: 156, revenue: '5,460,000,000đ', trend: '+12%', image: '/images/products/sofa-1.jpg' },
    { name: 'Giường ngủ Luxe', sales: 128, revenue: '3,584,000,000đ', trend: '+8%', image: '/images/products/bed-1.jpg' },
    { name: 'Bàn ăn Oak Wood', sales: 95, revenue: '1,425,000,000đ', trend: '+15%', image: '/images/products/table-1.jpg' },
    { name: 'Tủ TV hiện đại', sales: 87, revenue: '1,131,000,000đ', trend: '+5%', image: '/images/products/cabinet-1.jpg' }
];

// Chart configurations
const chartConfig = {
    revenue: { label: 'Doanh thu', color: '#bd945f' },
    orders: { label: 'Đơn hàng', color: '#2c2e53' },
    visitors: { label: 'Lượt truy cập', color: '#6366f1' },
    sales: { label: 'Đơn hàng', color: '#22c55e' }
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white px-3 py-2 shadow border border-gray-200">
                <p className="text-sm font-medium text-gray-800 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-xs" style={{ color: entry.color }}>
                        {entry.name}: {entry.value.toLocaleString()}{entry.dataKey === 'revenue' ? ' triệu' : ''}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// Stat Card Component
const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
    <div className="bg-white border border-gray-200 p-5">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-1">{value}</h3>
            </div>
            <div className={`p-2.5 ${color}`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className={`text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-500'}`}>
                {change}
            </span>
            <span className="text-xs text-gray-400">vs tháng trước</span>
        </div>
    </div>
);

// Recent Orders Table
const RecentOrdersTable = ({ orders }) => {
    const getStatusClass = (status) => {
        const classes = {
            completed: 'bg-green-100 text-green-700',
            pending: 'bg-yellow-100 text-yellow-700',
            processing: 'bg-blue-100 text-blue-700',
            cancelled: 'bg-red-100 text-red-700'
        };
        return classes[status] || 'bg-gray-100 text-gray-700';
    };

    const getStatusLabel = (status) => {
        const labels = {
            completed: 'Hoàn thành',
            pending: 'Chờ xử lý',
            processing: 'Đang xử lý',
            cancelled: 'Đã hủy'
        };
        return labels[status] || status;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Mã đơn</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Khách hàng</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Sản phẩm</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Số tiền</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Trạng thái</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Ngày đặt</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4">
                                <span className="font-medium text-[#bd945f]">{order.id}</span>
                            </td>
                            <td className="py-4 px-4 text-gray-700">{order.customer}</td>
                            <td className="py-4 px-4 text-gray-600 max-w-[200px] truncate">{order.product}</td>
                            <td className="py-4 px-4 font-semibold text-gray-900">{order.amount}</td>
                            <td className="py-4 px-4">
                                <span className={`inline-block px-2 py-0.5 text-xs font-medium ${getStatusClass(order.status)}`}>
                                    {getStatusLabel(order.status)}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-gray-500">{order.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Top Products Component
const TopProductsList = ({ products }) => (
    <div className="divide-y divide-gray-100">
        {products.map((product, index) => (
            <div key={index} className="flex items-center gap-3 py-3">
                <span className="w-6 text-center text-sm font-medium text-gray-400">#{index + 1}</span>
                <div className="w-12 h-12 bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <Sofa size={20} className="text-gray-400" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} đã bán</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                    <span className="text-xs text-green-600">{product.trend}</span>
                </div>
            </div>
        ))}
    </div>
);

const AdminDashboard = () => {
    const [dateRange, setDateRange] = useState('month');

    const stats = [
        {
            title: 'Tổng doanh thu',
            value: '2.85 tỷ',
            change: '+12.5%',
            changeType: 'increase',
            icon: DollarSign,
            color: 'bg-[#bd945f]'
        },
        {
            title: 'Đơn hàng',
            value: '1,234',
            change: '+8.2%',
            changeType: 'increase',
            icon: ShoppingCart,
            color: 'bg-[#2c2e53]'
        },
        {
            title: 'Khách hàng',
            value: '856',
            change: '+15.3%',
            changeType: 'increase',
            icon: Users,
            color: 'bg-emerald-600'
        },
        {
            title: 'Sản phẩm',
            value: '324',
            change: '+5.8%',
            changeType: 'increase',
            icon: Package,
            color: 'bg-violet-600'
        }
    ];

    return (
        <div className="admin-dashboard p-6 bg-[#f8f8f8] min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Tổng quan</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Thống kê hoạt động kinh doanh</p>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="text-sm text-gray-600 bg-white border border-gray-200 px-3 py-1.5 focus:outline-none"
                    >
                        <option value="week">Tuần này</option>
                        <option value="month">Tháng này</option>
                        <option value="quarter">Quý này</option>
                        <option value="year">Năm nay</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">Doanh thu theo tháng</CardTitle>
                                <CardDescription className="text-gray-500">Thống kê doanh thu và đơn hàng năm 2026</CardDescription>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 bg-[#bd945f]"></div>
                                    <span className="text-gray-500">Doanh thu</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 bg-[#2c2e53]"></div>
                                    <span className="text-gray-500">Đơn hàng</span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="revenue" name="Doanh thu" fill="#bd945f" radius={[2, 2, 0, 0]} maxBarSize={32} />
                                    <Bar dataKey="orders" name="Đơn hàng" fill="#2c2e53" radius={[2, 2, 0, 0]} maxBarSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-gray-900">Phân bố danh mục</CardTitle>
                        <CardDescription className="text-gray-500">Tỷ lệ sản phẩm theo danh mục</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-100">
                                                        <p className="font-medium">{payload[0].name}</p>
                                                        <p className="text-sm text-gray-600">{payload[0].value}%</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                        <div className="grid grid-cols-2 gap-1.5 mt-3">
                            {categoryData.map((item, index) => (
                                <div key={index} className="flex items-center gap-1.5">
                                    <div className="w-2 h-2" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-xs text-gray-600 truncate">{item.name}</span>
                                    <span className="text-xs text-gray-500 ml-auto">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* Visitors & Sales Trend */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">Lượt truy cập & Đơn hàng</CardTitle>
                                <CardDescription className="text-gray-500">Thống kê tuần này</CardDescription>
                            </div>
                            <span className="text-sm text-green-600">+23.5%</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="visitors"
                                        name="Lượt truy cập"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorVisitors)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        name="Đơn hàng"
                                        stroke="#22c55e"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorSales)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Top Products */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">Sản phẩm bán chạy</CardTitle>
                                <CardDescription className="text-gray-500">Top sản phẩm theo doanh số</CardDescription>
                            </div>
                            <button className="text-xs text-[#bd945f] hover:underline">Xem tất cả</button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <TopProductsList products={topProducts} />
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base font-medium text-gray-900">Đơn hàng gần đây</CardTitle>
                        </div>
                        <button className="text-xs text-[#bd945f] hover:underline">Xem tất cả</button>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <RecentOrdersTable orders={recentOrders} />
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
