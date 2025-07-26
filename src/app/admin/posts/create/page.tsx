"use client";

import { 
  Save, 
  Eye, 
  ArrowLeft, 
  ImageIcon, 
  Bold, 
  Italic, 
  Link as LinkIcon,
  List,
  ListOrdered,
  Code,
  Quote,
  Tag,
  Globe
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [scheduledDate, setScheduledDate] = useState("");
  const [featured, setFeatured] = useState(false);

  const handleSave = () => {
    // Xử lý lưu bài viết
    console.log("Saving post...");
  };

  const handlePreview = () => {
    // Xử lý xem trước bài viết
    console.log("Preview post...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Tạo bài viết mới</h1>
            <p className="text-gray-400">Viết nội dung cho blog của bạn</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePreview}
            className="flex items-center px-4 py-2 bg-black-400 border border-primary/30 text-gray-300 rounded-lg hover:bg-black-300 hover:text-white transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            Xem trước
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg shadow-primary/25"
          >
            <Save className="h-4 w-4 mr-2" />
            Lưu bài viết
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tiêu đề bài viết
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề bài viết..."
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-lg"
            />
          </div>

          {/* Content Editor */}
          <div className="bg-black-300 rounded-lg border border-primary/20">
            <div className="border-b border-primary/20 p-4">
              <div className="flex items-center gap-2 flex-wrap">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-black-400 rounded transition-colors">
                  <Bold className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-black-400 rounded transition-colors">
                  <Italic className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-primary/20 mx-2"></div>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-black-400 rounded transition-colors">
                  <LinkIcon className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-black-400 rounded transition-colors">
                  <ImageIcon className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-primary/20 mx-2"></div>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-black-400 rounded transition-colors">
                  <List className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-black-400 rounded transition-colors">
                  <ListOrdered className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-primary/20 mx-2"></div>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-black-400 rounded transition-colors">
                  <Code className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-black-400 rounded transition-colors">
                  <Quote className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Bắt đầu viết nội dung bài viết của bạn..."
                className="w-full h-96 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Cài đặt SEO
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Description
                </label>
                <textarea
                  placeholder="Mô tả ngắn gọn về bài viết (160 ký tự)"
                  className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  placeholder="url-cua-bai-viet"
                  className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold text-white mb-4">Xuất bản</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Trạng thái
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                >
                  <option value="draft">Bản nháp</option>
                  <option value="published">Xuất bản ngay</option>
                  <option value="scheduled">Lên lịch xuất bản</option>
                </select>
              </div>

              {status === "scheduled" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ngày xuất bản
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-primary bg-black-400 border-primary/30 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="featured" className="text-sm text-gray-300">
                  Bài viết nổi bật
                </label>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Danh mục
            </h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="">Chọn danh mục</option>
              <option value="tutorial">Tutorial</option>
              <option value="react">React</option>
              <option value="nextjs">Next.js</option>
              <option value="design">Design</option>
              <option value="database">Database</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          {/* Tags */}
          <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Nhập tags, phân cách bằng dấu phẩy"
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <p className="text-xs text-gray-400 mt-2">
              Ví dụ: react, javascript, tutorial
            </p>
          </div>

          {/* Featured Image */}
          <div className="bg-black-300 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Ảnh đại diện
            </h3>
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">
                Kéo thả ảnh vào đây hoặc click để chọn
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF tối đa 5MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
