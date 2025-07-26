import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Users, 
  MessageSquare, 
  FileText,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";

export default function AnalyticsPage() {
  // Mock data - trong thực tế sẽ fetch từ API
  const overviewStats = [
    { 
      label: "Tổng lượt xem", 
      value: "12,456", 
      change: "+12.5%", 
      changeType: "positive" as const, 
      icon: Eye,
      color: "text-blue-400"
    },
    { 
      label: "Người dùng duy nhất", 
      value: "8,234", 
      change: "+8.2%", 
      changeType: "positive" as const, 
      icon: Users,
      color: "text-green-400"
    },
    { 
      label: "Tổng bình luận", 
      value: "1,234", 
      change: "-2.1%", 
      changeType: "negative" as const, 
      icon: MessageSquare,
      color: "text-purple-400"
    },
    { 
      label: "Bài viết mới", 
      value: "24", 
      change: "+15.3%", 
      changeType: "positive" as const, 
      icon: FileText,
      color: "text-yellow-400"
    }
  ];

  const topPosts = [
    { title: "Hướng dẫn tạo blog với Next.js 14", views: 2456, comments: 45 },
    { title: "Tối ưu hiệu suất React với useMemo", views: 1893, comments: 32 },
    { title: "Thiết kế UI/UX hiện đại với Tailwind CSS", views: 1567, comments: 28 },
    { title: "Database Design Pattern với Prisma ORM", views: 1234, comments: 19 },
    { title: "Authentication với NextAuth.js", views: 987, comments: 15 }
  ];

  const trafficSources = [
    { source: "Google Search", visitors: 4532, percentage: 45.2 },
    { source: "Direct", visitors: 2891, percentage: 28.9 },
    { source: "Social Media", visitors: 1456, percentage: 14.6 },
    { source: "Referral", visitors: 789, percentage: 7.9 },
    { source: "Email", visitors: 332, percentage: 3.4 }
  ];

  const deviceStats = [
    { device: "Desktop", count: 5643, icon: Monitor, color: "text-blue-400" },
    { device: "Mobile", count: 3891, icon: Smartphone, color: "text-green-400" },
    { device: "Tablet", count: 922, icon: Tablet, color: "text-purple-400" }
  ];

  const recentActivity = [
    { action: "Bài viết mới được xuất bản", post: "Hướng dẫn tạo blog với Next.js 14", time: "2 giờ trước" },
    { action: "Bình luận mới", post: "Tối ưu hiệu suất React với useMemo", time: "3 giờ trước" },
    { action: "Người dùng mới đăng ký", post: "nguyenvana@example.com", time: "5 giờ trước" },
    { action: "Bài viết được cập nhật", post: "Thiết kế UI/UX hiện đại với Tailwind CSS", time: "1 ngày trước" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Thống kê & Phân tích</h1>
          <p className="text-gray-400">Theo dõi hiệu suất và tương tác của blog</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
            <option value="7">7 ngày qua</option>
            <option value="30">30 ngày qua</option>
            <option value="90">90 ngày qua</option>
            <option value="365">1 năm qua</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-black-300 rounded-lg p-6 border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Chart Placeholder */}
        <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Lượt truy cập theo thời gian
          </h3>
          <div className="h-64 bg-black-400/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Biểu đồ lượt truy cập</p>
              <p className="text-sm text-gray-500">Tích hợp với Google Analytics</p>
            </div>
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Bài viết phổ biến nhất
          </h3>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black-400/30 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm mb-1">{post.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {post.comments}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Nguồn truy cập
          </h3>
          <div className="space-y-3">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{source.source}</span>
                    <span className="text-sm text-gray-400">{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-black-400 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{source.visitors.toLocaleString()} lượt</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Stats */}
        <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Monitor className="h-5 w-5 text-primary" />
            Thiết bị truy cập
          </h3>
          <div className="space-y-4">
            {deviceStats.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black-400/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <device.icon className={`h-5 w-5 ${device.color}`} />
                  <span className="text-white">{device.device}</span>
                </div>
                <span className="text-gray-300 font-medium">{device.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-primary/20">
            <div className="text-center">
              <p className="text-sm text-gray-400">Tổng lượt truy cập</p>
              <p className="text-2xl font-bold text-white">
                {deviceStats.reduce((sum, device) => sum + device.count, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Hoạt động gần đây
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-3">
                <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-400 mb-1">{activity.post}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Chỉ số hiệu suất
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">2.3s</div>
            <div className="text-sm text-gray-400">Thời gian tải trang</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">94%</div>
            <div className="text-sm text-gray-400">PageSpeed Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">3.2%</div>
            <div className="text-sm text-gray-400">Tỷ lệ thoát</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">4:32</div>
            <div className="text-sm text-gray-400">Thời gian ở lại</div>
          </div>
        </div>
      </div>
    </div>
  );
}
