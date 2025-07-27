"use client";

import {
  Bell,
  Database,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  Palette,
  Save,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Khanh Bao Blog",
    siteDescription: "Blog về lập trình và công nghệ",
    siteUrl: "https://khanhbao.dev",
    adminEmail: "nbaokhanh1243@gmail.com",

    // Profile Settings
    fullName: "Nguyễn Bảo Khánh",
    username: "khanh_bao",
    email: "nbaokhanh1243@gmail.com",
    bio: "Full-stack Developer, Next.js enthusiast",

    // Security Settings
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,

    // Notifications - Admin specific
    emailNotifications: true, // Nhận email khi có comment mới
    newCommentNotifications: true, // Nhận email khi có bình luận mới
    newFollowerNotifications: true, // Nhận email khi có follower mới
    newUserNotifications: true, // Nhận email khi có user đăng ký
    systemAlerts: true, // Cảnh báo bảo mật và hệ thống

    // Blog Management
    commentModeration: "auto", // "auto" | "manual" | "disabled"
    autoPublishPosts: true,
    newsletterEnabled: true,
    maintenanceMode: false,

    // Theme
    theme: "dark",
    primaryColor: "#8B5CF6",

    // SEO
    metaTitle: "Khanh Bao Blog - Lập trình & Công nghệ",
    metaDescription:
      "Blog chia sẻ kiến thức về lập trình, Next.js, React và các công nghệ web hiện đại",
    googleAnalytics: "",
    facebookPixel: "",
  });

  const tabs = [
    { id: "general", label: "Tổng quan", icon: Settings },
    { id: "profile", label: "Hồ sơ", icon: User },
    { id: "security", label: "Bảo mật", icon: Lock },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "appearance", label: "Giao diện", icon: Palette },
    { id: "seo", label: "SEO", icon: Globe },
    { id: "integrations", label: "Tích hợp", icon: Database },
  ];

  const handleSave = () => {
    console.log("Saving settings...", settings);
    // Xử lý lưu cài đặt
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Thông tin chung
        </h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tên website
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleInputChange("siteName", e.target.value)}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mô tả website
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) =>
                handleInputChange("siteDescription", e.target.value)
              }
              rows={3}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL website
            </label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => handleInputChange("siteUrl", e.target.value)}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email quản trị
            </label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleInputChange("adminEmail", e.target.value)}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Thông tin cá nhân
        </h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              value={settings.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tên người dùng
            </label>
            <input
              type="text"
              value={settings.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tiểu sử
            </label>
            <textarea
              value={settings.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Đổi mật khẩu</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={settings.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className="w-full px-4 py-3 pr-12 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={settings.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className="w-full px-4 py-3 pr-12 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              value={settings.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Bảo mật nâng cao
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black-400/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-white">Xác thực hai yếu tố</h4>
                <p className="text-sm text-gray-400">
                  Tăng cường bảo mật tài khoản
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.twoFactorEnabled}
                onChange={(e) =>
                  handleInputChange("twoFactorEnabled", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Cài đặt thông báo
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black-400/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-white">Thông báo email</h4>
                <p className="text-sm text-gray-400">
                  Nhận thông báo qua email
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  handleInputChange("emailNotifications", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-black-400/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-white">
                  Email thông báo comment
                </h4>
                <p className="text-sm text-gray-400">
                  Nhận email khi có comment mới trên blog
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications && settings.newCommentNotifications}
                onChange={(e) =>
                  handleInputChange("newCommentNotifications", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-black-400/30 rounded-lg">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-white">Follower mới</h4>
                <p className="text-sm text-gray-400">
                  Nhận email khi có người theo dõi blog
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications && settings.newFollowerNotifications}
                onChange={(e) =>
                  handleInputChange("newFollowerNotifications", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-black-400/30 rounded-lg">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-white">Người dùng mới</h4>
                <p className="text-sm text-gray-400">
                  Nhận email khi có người đăng ký tài khoản mới
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications && settings.newUserNotifications}
                onChange={(e) =>
                  handleInputChange("newUserNotifications", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-black-400/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-white">Cảnh báo hệ thống</h4>
                <p className="text-sm text-gray-400">
                  Thông báo bảo mật và hoạt động quan trọng
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.systemAlerts}
                onChange={(e) =>
                  handleInputChange("systemAlerts", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-black-400/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-white">Moderation Comments</h4>
                <p className="text-sm text-gray-400">
                  Tự động duyệt comment hay cần duyệt thủ công
                </p>
              </div>
            </div>
            <select
              value={settings.commentModeration}
              onChange={(e) =>
                handleInputChange("commentModeration", e.target.value)
              }
              className="px-3 py-2 bg-black-300 text-white rounded-lg border border-gray-600 focus:border-primary focus:outline-none"
            >
              <option value="auto">Tự động duyệt</option>
              <option value="manual">Duyệt thủ công</option>
              <option value="disabled">Tắt comment</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSEOTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Cài đặt SEO</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={settings.metaTitle}
              onChange={(e) => handleInputChange("metaTitle", e.target.value)}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Meta Description
            </label>
            <textarea
              value={settings.metaDescription}
              onChange={(e) =>
                handleInputChange("metaDescription", e.target.value)
              }
              rows={3}
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Google Analytics ID
            </label>
            <input
              type="text"
              value={settings.googleAnalytics}
              onChange={(e) =>
                handleInputChange("googleAnalytics", e.target.value)
              }
              placeholder="G-XXXXXXXXXX"
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Facebook Pixel ID
            </label>
            <input
              type="text"
              value={settings.facebookPixel}
              onChange={(e) =>
                handleInputChange("facebookPixel", e.target.value)
              }
              placeholder="123456789012345"
              className="w-full px-4 py-3 bg-black-400 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralTab();
      case "profile":
        return renderProfileTab();
      case "security":
        return renderSecurityTab();
      case "notifications":
        return renderNotificationsTab();
      case "seo":
        return renderSEOTab();
      default:
        return renderGeneralTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Cài đặt</h1>
          <p className="text-gray-400">Quản lý cài đặt hệ thống và tài khoản</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg shadow-primary/25"
        >
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-black-300 rounded-lg border border-primary/20 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-gray-400 hover:text-white hover:bg-black-400/50"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-black-300 rounded-lg border border-primary/20 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
