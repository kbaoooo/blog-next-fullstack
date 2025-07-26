import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  User,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function PostsPage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const posts = [
    {
      id: 1,
      title: "Hướng dẫn tạo blog với Next.js 14",
      author: "Khanh Bao",
      status: "published",
      views: 1234,
      comments: 12,
      date: "2024-01-15",
      category: "Tutorial",
      featured: true
    },
    {
      id: 2,
      title: "Tối ưu hiệu suất React với useMemo và useCallback",
      author: "Khanh Bao",
      status: "draft",
      views: 0,
      comments: 0,
      date: "2024-01-14",
      category: "React",
      featured: false
    },
    {
      id: 3,
      title: "Thiết kế UI/UX hiện đại với Tailwind CSS",
      author: "Khanh Bao",
      status: "published",
      views: 856,
      comments: 8,
      date: "2024-01-13",
      category: "Design",
      featured: true
    },
    {
      id: 4,
      title: "Database Design Pattern với Prisma ORM",
      author: "Khanh Bao",
      status: "scheduled",
      views: 0,
      comments: 0,
      date: "2024-01-20",
      category: "Database",
      featured: false
    }
  ];

  const stats = [
    { label: "Tổng bài viết", value: "24", icon: FileText, color: "text-blue-400" },
    { label: "Đã xuất bản", value: "18", icon: Eye, color: "text-green-400" },
    { label: "Bản nháp", value: "4", icon: Edit, color: "text-yellow-400" },
    { label: "Đã lên lịch", value: "2", icon: Calendar, color: "text-purple-400" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'scheduled':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Đã xuất bản';
      case 'draft':
        return 'Bản nháp';
      case 'scheduled':
        return 'Đã lên lịch';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quản lý bài viết</h1>
          <p className="text-gray-400">Tạo, chỉnh sửa và quản lý nội dung blog</p>
        </div>
        <Link
          href="/admin/posts/create"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg shadow-primary/25"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo bài viết mới
        </Link>
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
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-10 pr-4 py-2 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
              <option value="">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
              <option value="scheduled">Đã lên lịch</option>
            </select>
            <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
              <option value="">Tất cả danh mục</option>
              <option value="tutorial">Tutorial</option>
              <option value="react">React</option>
              <option value="design">Design</option>
              <option value="database">Database</option>
            </select>
            <button className="flex items-center px-3 py-2 bg-primary/20 border border-primary/30 rounded-lg text-primary hover:bg-primary/30 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </button>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-black-300 rounded-lg border border-primary/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black-400/50 border-b border-primary/20">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Tiêu đề</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Trạng thái</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Danh mục</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Lượt xem</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Bình luận</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Ngày</th>
                <th className="text-right p-4 text-sm font-medium text-gray-300">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-black-400/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {post.featured && (
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      )}
                      <div>
                        <h3 className="font-medium text-white hover:text-primary cursor-pointer">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(post.status)}`}>
                      {getStatusText(post.status)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-300">{post.category}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <MessageSquare className="h-3 w-3" />
                      {post.comments}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-yellow-400 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-primary/20">
          <div className="text-sm text-gray-400">
            Hiển thị 1-4 của 24 bài viết
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
    </div>
  );
}
