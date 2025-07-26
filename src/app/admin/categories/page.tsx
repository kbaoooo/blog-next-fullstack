"use client";

import { 
  Tag, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  MoreHorizontal,
  Hash,
  TrendingUp,
  PaletteIcon
} from "lucide-react";
import { useState } from "react";

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<"categories" | "tags">("categories");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data cho categories
  const categories = [
    {
      id: 1,
      name: "Lập trình",
      slug: "lap-trinh",
      description: "Các bài viết về lập trình và phát triển phần mềm",
      postCount: 45,
      color: "#3B82F6",
      parentId: null,
      createdAt: "2024-01-15",
      isActive: true
    },
    {
      id: 2,
      name: "JavaScript",
      slug: "javascript",
      description: "Các bài viết về JavaScript và framework JS",
      postCount: 23,
      color: "#F59E0B",
      parentId: 1,
      createdAt: "2024-01-16",
      isActive: true
    },
    {
      id: 3,
      name: "React",
      slug: "react",
      description: "Hướng dẫn và tips về React",
      postCount: 18,
      color: "#06B6D4",
      parentId: 2,
      createdAt: "2024-01-17",
      isActive: true
    },
    {
      id: 4,
      name: "Thiết kế",
      slug: "thiet-ke",
      description: "UI/UX Design và web design",
      postCount: 12,
      color: "#EC4899",
      parentId: null,
      createdAt: "2024-01-18",
      isActive: true
    },
    {
      id: 5,
      name: "DevOps",
      slug: "devops",
      description: "Deployment, CI/CD, Docker",
      postCount: 8,
      color: "#10B981",
      parentId: null,
      createdAt: "2024-01-19",
      isActive: false
    }
  ];

  // Mock data cho tags
  const tags = [
    { id: 1, name: "nextjs", postCount: 35, color: "#000000" },
    { id: 2, name: "typescript", postCount: 28, color: "#3178C6" },
    { id: 3, name: "tailwindcss", postCount: 22, color: "#06B6D4" },
    { id: 4, name: "tutorial", postCount: 19, color: "#F59E0B" },
    { id: 5, name: "hooks", postCount: 15, color: "#61DAFB" },
    { id: 6, name: "performance", postCount: 12, color: "#EF4444" },
    { id: 7, name: "api", postCount: 10, color: "#10B981" },
    { id: 8, name: "database", postCount: 8, color: "#8B5CF6" },
    { id: 9, name: "authentication", postCount: 7, color: "#F97316" },
    { id: 10, name: "deployment", postCount: 5, color: "#6366F1" }
  ];

  const stats = [
    { 
      label: "Tổng categories", 
      value: categories.length.toString(), 
      icon: Tag, 
      color: "text-blue-400" 
    },
    { 
      label: "Tổng tags", 
      value: tags.length.toString(), 
      icon: Hash, 
      color: "text-green-400" 
    },
    { 
      label: "Bài viết có category", 
      value: categories.reduce((sum, cat) => sum + cat.postCount, 0).toString(), 
      color: "text-purple-400" 
    },
    { 
      label: "Category phổ biến nhất", 
      value: categories.sort((a, b) => b.postCount - a.postCount)[0]?.name || "N/A", 
      color: "text-yellow-400" 
    }
  ];

  const getCategoryLevel = (categoryId: number, level = 0): number => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category || !category.parentId) return level;
    return getCategoryLevel(category.parentId, level + 1);
  };

  const renderCategoryRow = (category: typeof categories[0]) => {
    const level = getCategoryLevel(category.id);
    
    return (
      <tr key={category.id} className="hover:bg-black-400/30 transition-colors">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3" style={{ paddingLeft: `${level * 20}px` }}>
            <div 
              className="w-4 h-4 rounded-full border-2"
              style={{ backgroundColor: category.color, borderColor: category.color }}
            />
            <div>
              <div className="font-medium text-white">{category.name}</div>
              <div className="text-sm text-gray-400">/{category.slug}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <p className="text-gray-300 max-w-xs truncate">{category.description}</p>
        </td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/20 text-primary border border-primary/30">
            {category.postCount} bài viết
          </span>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            category.isActive 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {category.isActive ? 'Hoạt động' : 'Tạm dừng'}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-400">
          {category.createdAt}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-primary transition-colors">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-primary transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Categories & Tags</h1>
          <p className="text-gray-400">Quản lý danh mục và thẻ bài viết</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg shadow-primary/25"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo mới
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
              {stat.icon && <stat.icon className={`h-6 w-6 ${stat.color}`} />}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-black-300 rounded-lg border border-primary/20">
        <div className="border-b border-primary/20">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "categories"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Tag className="h-4 w-4 inline mr-2" />
              Categories ({categories.length})
            </button>
            <button
              onClick={() => setActiveTab("tags")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "tags"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Hash className="h-4 w-4 inline mr-2" />
              Tags ({tags.length})
            </button>
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-primary/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Tìm kiếm ${activeTab === "categories" ? "categories" : "tags"}...`}
                className="w-full pl-10 pr-4 py-2 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            {activeTab === "categories" && (
              <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
                <option value="">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Tạm dừng</option>
              </select>
            )}
            <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
              <option value="">Sắp xếp</option>
              <option value="name">Theo tên</option>
              <option value="posts">Số bài viết</option>
              <option value="date">Ngày tạo</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {activeTab === "categories" ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bài viết
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {categories
                  .filter(cat => !cat.parentId)
                  .map(category => [
                    renderCategoryRow(category),
                    ...categories
                      .filter(cat => cat.parentId === category.id)
                      .map(subCategory => renderCategoryRow(subCategory))
                  ]).flat()}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tags.map((tag) => (
                <div key={tag.id} className="bg-black-400 rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-colors group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      <Hash className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                        <Edit className="h-3 w-3" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-white mb-2">{tag.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{tag.postCount} bài viết</span>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-primary/20">
          <div className="text-sm text-gray-400">
            Hiển thị 1-10 của {activeTab === "categories" ? categories.length : tags.length} {activeTab}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-400 hover:text-white border border-primary/20 rounded hover:border-primary transition-colors">
              Trước
            </button>
            <button className="px-3 py-1 text-sm bg-primary text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-400 hover:text-white border border-primary/20 rounded hover:border-primary transition-colors">
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black-300 rounded-lg border border-primary/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-primary/20">
              <h2 className="text-xl font-bold text-white">
                Tạo {activeTab === "categories" ? "Category" : "Tag"} mới
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tên {activeTab === "categories" ? "category" : "tag"}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder={`Nhập tên ${activeTab}...`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Slug tự động từ tên..."
                />
              </div>

              {activeTab === "categories" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mô tả
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Mô tả category..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category cha
                    </label>
                    <select className="w-full px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
                      <option value="">Không có (Category gốc)</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <PaletteIcon className="h-4 w-4 inline mr-1" />
                  Màu sắc
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    defaultValue="#8B5CF6"
                    className="w-12 h-10 rounded border border-primary/20 bg-black-400"
                  />
                  <input
                    type="text"
                    defaultValue="#8B5CF6"
                    className="flex-1 px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 p-6 border-t border-primary/20">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200">
                Tạo mới
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
