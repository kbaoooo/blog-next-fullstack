"use client";

import { 
  ImageIcon, 
  Upload, 
  Search, 
  Grid, 
  List, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Download,
  Eye,
  Copy,
  FolderPlus,
  Calendar,
  FileImage
} from "lucide-react";
import { useState } from "react";

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  // Mock data - trong thực tế sẽ fetch từ database
  const images = [
    {
      id: 1,
      name: "hero-banner.jpg",
      url: "/images/hero-banner.jpg",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15",
      type: "image/jpeg",
      used: true
    },
    {
      id: 2,
      name: "profile-photo.png",
      url: "/images/profile-photo.png",
      size: "850 KB",
      dimensions: "500x500",
      uploadDate: "2024-01-14",
      type: "image/png",
      used: false
    },
    {
      id: 3,
      name: "tutorial-screenshot.jpg",
      url: "/images/tutorial-screenshot.jpg",
      size: "1.2 MB",
      dimensions: "1600x900",
      uploadDate: "2024-01-13",
      type: "image/jpeg",
      used: true
    },
    {
      id: 4,
      name: "code-example.png",
      url: "/images/code-example.png",
      size: "750 KB",
      dimensions: "1200x800",
      uploadDate: "2024-01-12",
      type: "image/png",
      used: true
    },
    {
      id: 5,
      name: "blog-thumbnail.jpg",
      url: "/images/blog-thumbnail.jpg",
      size: "950 KB",
      dimensions: "800x600",
      uploadDate: "2024-01-11",
      type: "image/jpeg",
      used: false
    },
    {
      id: 6,
      name: "tech-stack.svg",
      url: "/images/tech-stack.svg",
      size: "45 KB",
      dimensions: "400x300",
      uploadDate: "2024-01-10",
      type: "image/svg+xml",
      used: true
    }
  ];

  const stats = [
    { label: "Tổng số ảnh", value: "156", icon: ImageIcon, color: "text-blue-400" },
    { label: "Dung lượng sử dụng", value: "2.4 GB", icon: FileImage, color: "text-green-400" },
    { label: "Ảnh được sử dụng", value: "89", color: "text-purple-400" },
    { label: "Ảnh chưa dùng", value: "67", color: "text-yellow-400" }
  ];

  const toggleImageSelection = (imageId: number) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const selectAllImages = () => {
    setSelectedImages(selectedImages.length === images.length ? [] : images.map(img => img.id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('svg')) return '🎨';
    if (type.includes('png')) return '🖼️';
    if (type.includes('jpeg') || type.includes('jpg')) return '📸';
    return '🖼️';
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // Thông báo copy thành công
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Thư viện ảnh</h1>
          <p className="text-gray-400">Quản lý hình ảnh và tài nguyên media</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
            <FolderPlus className="h-4 w-4 mr-2" />
            Tạo thư mục
          </button>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg shadow-primary/25">
            <Upload className="h-4 w-4 mr-2" />
            Tải ảnh lên
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
              {stat.icon && <stat.icon className={`h-6 w-6 ${stat.color}`} />}
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Controls */}
      <div className="bg-black-300 rounded-lg p-4 border border-primary/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 sm:flex-none sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm ảnh..."
                className="w-full pl-10 pr-4 py-2 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
              <option value="">Tất cả định dạng</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="svg">SVG</option>
              <option value="gif">GIF</option>
            </select>
            <select className="px-3 py-2 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary">
              <option value="">Tất cả trạng thái</option>
              <option value="used">Đã sử dụng</option>
              <option value="unused">Chưa sử dụng</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedImages.length > 0 && (
              <div className="flex items-center gap-2 mr-4">
                <span className="text-sm text-gray-400">
                  Đã chọn {selectedImages.length} ảnh
                </span>
                <button className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
            
            <div className="flex bg-black-400 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "list" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-black-300 rounded-lg border-2 border-dashed border-primary/30 p-8 text-center hover:border-primary transition-colors cursor-pointer">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Kéo thả ảnh vào đây</h3>
        <p className="text-gray-400 mb-4">hoặc click để chọn file từ máy tính</p>
        <button className="px-6 py-2 bg-primary/20 border border-primary/30 text-primary rounded-lg hover:bg-primary/30 transition-colors">
          Chọn file
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Hỗ trợ: JPG, PNG, GIF, SVG (tối đa 10MB)
        </p>
      </div>

      {/* Images Grid/List */}
      <div className="bg-black-300 rounded-lg border border-primary/20">
        {/* Select All Header */}
        <div className="p-4 border-b border-primary/20">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedImages.length === images.length}
              onChange={selectAllImages}
              className="w-4 h-4 text-primary bg-black-400 border-primary/30 rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-gray-300">
              Chọn tất cả ({images.length} ảnh)
            </span>
          </label>
        </div>

        {viewMode === "grid" ? (
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {images.map((image) => (
                <div key={image.id} className="group relative">
                  <div className="relative aspect-square bg-black-400 rounded-lg overflow-hidden">
                    {/* Placeholder for image */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl">{getFileIcon(image.type)}</span>
                    </div>
                    
                    {/* Selection Checkbox */}
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(image.id)}
                        onChange={() => toggleImageSelection(image.id)}
                        className="w-4 h-4 text-primary bg-black-400 border-primary/30 rounded focus:ring-primary focus:ring-2"
                      />
                    </div>

                    {/* Usage Badge */}
                    {image.used && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                          Đã dùng
                        </span>
                      </div>
                    )}

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button 
                        onClick={() => copyImageUrl(image.url)}
                        className="p-2 bg-black-600 text-white rounded-lg hover:bg-black-500 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-black-600 text-white rounded-lg hover:bg-black-500 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-black-600 text-white rounded-lg hover:bg-black-500 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-white truncate">{image.name}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                      <span>{image.size}</span>
                      <span>{image.dimensions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-primary/10">
            {images.map((image) => (
              <div key={image.id} className="p-4 hover:bg-black-400/30 transition-colors">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(image.id)}
                    onChange={() => toggleImageSelection(image.id)}
                    className="w-4 h-4 text-primary bg-black-400 border-primary/30 rounded focus:ring-primary focus:ring-2"
                  />
                  
                  <div className="w-12 h-12 bg-black-400 rounded-lg flex items-center justify-center">
                    <span className="text-xl">{getFileIcon(image.type)}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{image.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{image.size}</span>
                      <span>{image.dimensions}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {image.uploadDate}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        image.used 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {image.used ? 'Đã sử dụng' : 'Chưa sử dụng'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => copyImageUrl(image.url)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-primary/20">
          <div className="text-sm text-gray-400">
            Hiển thị 1-6 của 156 ảnh
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
