import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  User,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

export default function CommentsPage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const comments = [
    {
      id: 1,
      author: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      content: "Bài viết rất hữu ích, cảm ơn tác giả! Tôi đã học được nhiều điều mới từ bài viết này.",
      post: "Hướng dẫn tạo blog với Next.js 14",
      postSlug: "huong-dan-tao-blog-voi-nextjs-14",
      status: "approved",
      date: "2024-01-15 14:30",
      replies: 2,
      likes: 5
    },
    {
      id: 2,
      author: "Trần Thị B",
      email: "tranthib@example.com",
      content: "Có thể làm video tutorial được không ạ? Mình muốn xem demo trực quan hơn.",
      post: "Tối ưu hiệu suất React với useMemo",
      postSlug: "toi-uu-hieu-suat-react-voi-usememo",
      status: "pending",
      date: "2024-01-14 16:45",
      replies: 0,
      likes: 2
    },
    {
      id: 3,
      author: "Lê Văn C",
      email: "levanc@example.com",
      content: "Code example rất dễ hiểu! Tuy nhiên tôi gặp lỗi ở phần này...",
      post: "Thiết kế UI/UX hiện đại với Tailwind CSS",
      postSlug: "thiet-ke-ui-ux-hien-dai-voi-tailwind-css",
      status: "approved",
      date: "2024-01-13 10:20",
      replies: 1,
      likes: 3
    },
    {
      id: 4,
      author: "Anonymous User",
      email: "spam@example.com",
      content: "This is spam content with promotional links...",
      post: "Database Design Pattern với Prisma ORM",
      postSlug: "database-design-pattern-voi-prisma-orm",
      status: "spam",
      date: "2024-01-12 22:15",
      replies: 0,
      likes: 0
    }
  ];

  const stats = [
    { label: "Tổng bình luận", value: "1,234", icon: MessageSquare, color: "text-blue-400" },
    { label: "Đã duyệt", value: "1,180", icon: CheckCircle, color: "text-green-400" },
    { label: "Chờ duyệt", value: "45", icon: Clock, color: "text-yellow-400" },
    { label: "Spam", value: "9", icon: AlertTriangle, color: "text-red-400" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'spam':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'pending':
        return 'Chờ duyệt';
      case 'spam':
        return 'Spam';
      case 'rejected':
        return 'Từ chối';
      default:
        return 'Không xác định';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'spam':
        return AlertTriangle;
      case 'rejected':
        return XCircle;
      default:
        return MessageSquare;
    }
  };

  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quản lý bình luận</h1>
          <p className="text-gray-400">Duyệt và quản lý bình luận từ người đọc</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
            <CheckCircle className="h-4 w-4 mr-2" />
            Duyệt hàng loạt
          </button>
          <button className="flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa spam
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-black-300 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-black-300 rounded-lg p-4 border border-primary/20">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bình luận..."
              className="w-full pl-10 pr-4 py-2 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
              <option value="">Tất cả trạng thái</option>
              <option value="approved">Đã duyệt</option>
              <option value="pending">Chờ duyệt</option>
              <option value="spam">Spam</option>
              <option value="rejected">Từ chối</option>
            </select>
            <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
              <option value="">Tất cả bài viết</option>
              <option value="post1">Hướng dẫn tạo blog với Next.js 14</option>
              <option value="post2">Tối ưu hiệu suất React với useMemo</option>
              <option value="post3">Thiết kế UI/UX hiện đại với Tailwind CSS</option>
            </select>
            <button className="flex items-center px-3 py-2 bg-primary/20 border border-primary/30 rounded-lg text-primary hover:bg-primary/30 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => {
          const StatusIcon = getStatusIcon(comment.status);
          return (
            <div key={comment.id} className="bg-black-300 rounded-lg p-6 border border-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-10 w-10 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {generateInitials(comment.author)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-white">{comment.author}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(comment.status)}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {getStatusText(comment.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {comment.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">
                      {truncateContent(comment.content, 150)}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <Link 
                        href={`/blog/${comment.postSlug}`}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {comment.post}
                      </Link>
                      <span className="text-gray-400">
                        {comment.replies} phản hồi
                      </span>
                      <span className="text-gray-400">
                        {comment.likes} lượt thích
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {comment.status === 'pending' && (
                    <>
                      <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded transition-colors">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                        <XCircle className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Hiển thị 1-4 của 1,234 bình luận
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm text-gray-400 hover:text-white border border-primary/20 rounded hover:border-primary transition-colors">
            Trước
          </button>
          <button className="px-3 py-1 text-sm bg-primary text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-400 hover:text-white border border-primary/20 rounded hover:border-primary transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm text-gray-400 hover:text-white border border-primary/20 rounded hover:border-primary transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-sm text-gray-400 hover:text-white border border-primary/20 rounded hover:border-primary transition-colors">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
