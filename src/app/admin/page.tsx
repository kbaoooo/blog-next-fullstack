import { 
  BarChart3, 
  FileText, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Eye,
  Calendar,
  Clock,
  PlusCircle,
  TrendingDown
} from "lucide-react";
import Link from "next/link";

interface Stats {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

interface RecentPost {
  id: number;
  title: string;
  status: "published" | "draft";      
  views: number;
  comments: number;
  date: string;
}
interface RecentComment {
  id: number;
  author: string;
  content: string;
  post: string;
  time: string;
}

export default function AdminPage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const stats: Stats[] = [
    {
      title: "Tổng bài viết",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "Người dùng",
      value: "1,234",
      change: "+23%",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Lượt xem",
      value: "12,456",
      change: "+8%",
      changeType: "positive" as const,
      icon: Eye,
      color: "bg-purple-500"
    },
    {
      title: "Bình luận",
      value: "89",
      change: "-2%",
      changeType: "negative" as const,
      icon: MessageSquare,
      color: "bg-orange-500"
    }
  ];

  const recentPosts: RecentPost[] = [
    {
      id: 1,
      title: "Hướng dẫn tạo blog với Next.js 14",
      status: "published",
      views: 1234,
      comments: 12,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Tối ưu hiệu suất React với useMemo",
      status: "draft",
      views: 0,
      comments: 0,
      date: "2024-01-14"
    },
    {
      id: 3,
      title: "Thiết kế UI/UX hiện đại với Tailwind CSS",
      status: "published",
      views: 856,
      comments: 8,
      date: "2024-01-13"
    }
  ];

  const recentComments: RecentComment[] = [
    {
      id: 1,
      author: "Nguyễn Văn A",
      content: "Bài viết rất hữu ích, cảm ơn tác giả!",
      post: "Hướng dẫn tạo blog với Next.js 14",
      time: "2 giờ trước"
    },
    {
      id: 2,
      author: "Trần Thị B",
      content: "Có thể làm video tutorial được không ạ?",
      post: "Tối ưu hiệu suất React với useMemo",
      time: "5 giờ trước"
    },
    {
      id: 3,
      author: "Lê Văn C",
      content: "Code example rất dễ hiểu!",
      post: "Thiết kế UI/UX hiện đại với Tailwind CSS",
      time: "1 ngày trước"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary via-primary/80 to-purple-600 rounded-xl p-6 text-white shadow-lg shadow-primary/25">
        <h1 className="text-2xl font-bold mb-2">
          Chào mừng trở lại, Khanh Bao! 👋
        </h1>
        <p className="text-primary-foreground/80">
          Đây là tổng quan về blog của bạn hôm nay
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-black-300 rounded-xl p-6 border border-primary/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-white">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  {
                    stat.changeType === 'positive' ? (
                      <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1 text-red-400" />
                    )
                  }
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-400 ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-black-300 rounded-xl border border-primary/20 shadow-lg">
          <div className="p-6 border-b border-primary/20">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Bài viết gần đây
              </h2>
              <Link 
                href="/admin/posts"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-black-400/50 rounded-lg border border-primary/10">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/admin/posts/create"
                className="flex items-center justify-center w-full p-3 border-2 border-dashed border-primary/30 rounded-lg text-gray-400 hover:border-primary hover:text-primary transition-colors"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Tạo bài viết mới
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Comments */}
        <div className="bg-black-300 rounded-xl border border-primary/20 shadow-lg">
          <div className="p-6 border-b border-primary/20">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Bình luận gần đây
              </h2>
              <Link 
                href="/admin/comments"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="p-4 bg-black-400/50 rounded-lg border border-primary/10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white">
                      {comment.author}
                    </h3>
                    <span className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    {comment.content}
                  </p>
                  <p className="text-xs text-gray-400">
                    Trên bài: <span className="font-medium text-primary">{comment.post}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-black-300 rounded-xl p-6 border border-primary/20 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/posts/create"
            className="flex items-center p-4 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg hover:from-primary/30 hover:to-primary/20 transition-all duration-200"
          >
            <FileText className="h-8 w-8 text-primary mr-3" />
            <div>
              <h3 className="font-medium text-white">Tạo bài viết</h3>
              <p className="text-sm text-gray-400">Viết bài viết mới</p>
            </div>
          </Link>
          
          <Link
            href="/admin/users"
            className="flex items-center p-4 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-lg hover:from-green-500/30 hover:to-green-500/20 transition-all duration-200"
          >
            <Users className="h-8 w-8 text-green-400 mr-3" />
            <div>
              <h3 className="font-medium text-white">Quản lý người dùng</h3>
              <p className="text-sm text-gray-400">Xem danh sách người dùng</p>
            </div>
          </Link>
          
          <Link
            href="/admin/analytics"
            className="flex items-center p-4 bg-gradient-to-r from-purple-500/20 to-purple-500/10 border border-purple-500/30 rounded-lg hover:from-purple-500/30 hover:to-purple-500/20 transition-all duration-200"
          >
            <BarChart3 className="h-8 w-8 text-purple-400 mr-3" />
            <div>
              <h3 className="font-medium text-white">Xem thống kê</h3>
              <p className="text-sm text-gray-400">Phân tích dữ liệu</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}