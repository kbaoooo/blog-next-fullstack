import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Mail,
  Calendar,
  Shield,
  UserCheck,
  UserX,
  Crown
} from "lucide-react";

export default function UsersPage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const users = [
    {
      id: 1,
      name: "Khanh Bao",
      email: "nbaokhanh1243@gmail.com",
      role: "admin",
      status: "active",
      joinDate: "2024-01-01",
      lastActive: "2024-01-15",
      posts: 24,
      avatar: null
    },
    {
      id: 2,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      role: "editor",
      status: "active",
      joinDate: "2024-01-05",
      lastActive: "2024-01-14",
      posts: 8,
      avatar: null
    },
    {
      id: 3,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      role: "subscriber",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-13",
      posts: 0,
      avatar: null
    },
    {
      id: 4,
      name: "Lê Văn C",
      email: "levanc@example.com",
      role: "subscriber",
      status: "inactive",
      joinDate: "2024-01-08",
      lastActive: "2024-01-12",
      posts: 0,
      avatar: null
    }
  ];

  const stats = [
    { label: "Tổng người dùng", value: "1,234", icon: Users, color: "text-blue-400" },
    { label: "Quản trị viên", value: "2", icon: Crown, color: "text-yellow-400" },
    { label: "Biên tập viên", value: "8", icon: Shield, color: "text-green-400" },
    { label: "Người theo dõi", value: "1,224", icon: UserCheck, color: "text-purple-400" }
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'editor':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'subscriber':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'editor':
        return 'Biên tập viên';
      case 'subscriber':
        return 'Người theo dõi';
      default:
        return 'Không xác định';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Crown;
      case 'editor':
        return Shield;
      case 'subscriber':
        return UserCheck;
      default:
        return Users;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'banned':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'inactive':
        return 'Không hoạt động';
      case 'banned':
        return 'Bị cấm';
      default:
        return 'Không xác định';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quản lý người dùng</h1>
          <p className="text-gray-400">Quản lý tài khoản và quyền hạn người dùng</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg shadow-primary/25">
          <Plus className="h-4 w-4 mr-2" />
          Thêm người dùng
        </button>
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
              placeholder="Tìm kiếm người dùng..."
              className="w-full pl-10 pr-4 py-2 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
              <option value="">Tất cả vai trò</option>
              <option value="admin">Quản trị viên</option>
              <option value="editor">Biên tập viên</option>
              <option value="subscriber">Người theo dõi</option>
            </select>
            <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
              <option value="">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="banned">Bị cấm</option>
            </select>
            <button className="flex items-center px-3 py-2 bg-primary/20 border border-primary/30 rounded-lg text-primary hover:bg-primary/30 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-black-300 rounded-lg border border-primary/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black-400/50 border-b border-primary/20">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Người dùng</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Vai trò</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Trạng thái</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Bài viết</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Ngày tham gia</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Hoạt động cuối</th>
                <th className="text-right p-4 text-sm font-medium text-gray-300">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {users.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <tr key={user.id} className="hover:bg-black-400/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {generateInitials(user.name)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{user.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <RoleIcon className="h-4 w-4 text-gray-400" />
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}>
                          {getRoleText(user.role)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-300">{user.posts}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-gray-300">
                        <Calendar className="h-3 w-3" />
                        {user.joinDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-300">{user.lastActive}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-yellow-400 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        {user.status === 'active' ? (
                          <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                            <UserX className="h-4 w-4" />
                          </button>
                        ) : (
                          <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                            <UserCheck className="h-4 w-4" />
                          </button>
                        )}
                        <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
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
        <div className="flex items-center justify-between p-4 border-t border-primary/20">
          <div className="text-sm text-gray-400">
            Hiển thị 1-4 của 1,234 người dùng
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
