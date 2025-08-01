"use client";

import { Role } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import {
  Bell,
  Camera,
  LockIcon,
  Mail,
  Save,
  Settings,
  Upload,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import Avatar from "./avatar";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: Role;
    settings: {
      emailNewPosts: boolean; // Nhận email khi có bài viết mới
      notiNewPosts: boolean; // Nhận thông báo khi có bài viết mới
      notiCommentReplies: boolean; // Nhận thông báo khi có ai reply comment
      notiLikeComment: boolean; // Nhận thông báo khi có ai thích comment của mình
      notiComment: boolean; // Nhận thông báo bình luận mới (only for admin)
      notiSharePost: boolean; // Nhận thông báo khi có ai chia sẻ bài viết của mình(only for admin)
      notiLikePost: boolean; // Nhận thông báo khi có ai thích bài viết của mình(only for admin)
      notiFollow: boolean; // Nhận thông báo khi có người theo dõi mình(only for admin)
      browserNotifications: boolean; // Push notifications trên browser
      twoFactorEnabled: boolean; // Xác thực 2 yếu tố
    };
  };
}

export default function UserSettingsModal({
  isOpen,
  onClose,
  user,
}: UserSettingsModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState({
    // Notification Preferences (cho visitors/followers/admin)
    emailNewPosts: user?.settings?.emailNewPosts, // Nhận email khi có bài viết mới
    notiNewPosts: user?.settings?.notiNewPosts, // Nhận thông báo khi có bài viết mới
    notiCommentReplies: user?.settings?.notiCommentReplies, // Nhận thông báo khi có ai reply comment
    notiLikeComment: user?.settings?.notiLikeComment, // Nhận thông báo khi có ai thích comment của mình
    notiComment: user?.settings?.notiComment, // Nhận thông báo bình luận mới (only for admin)
    notiSharePost: user?.settings?.notiSharePost, // Nhận thông báo khi có ai chia sẻ bài viết của mình(only for admin)
    notiLikePost: user?.settings?.notiLikePost, // Nhận thông báo khi có ai thích bài viết của mình(only for admin)
    notiFollow: user?.settings?.notiFollow, // Nhận thông báo khi có người theo dõi mình(only for admin)
    browserNotifications: user?.settings?.browserNotifications, // Push notifications trên browser
    twoFactorEnabled: user?.settings?.twoFactorEnabled, // Xác thực 2 yếu tố

    // Personal Info
    name: user?.name,
    email: user?.email,
    avatarUrl: user?.avatar, // Avatar URL - use undefined instead of empty string
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File quá lớn. Vui lòng chọn file dưới 5MB");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings((prev) => ({
          ...prev,
          avatarUrl: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const removeAvatar = () => {
    setSettings((prev) => ({
      ...prev,
      avatarUrl: undefined,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onClose();
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Cài đặt tài khoản
              </h2>
              <p className="text-sm text-muted-foreground">
                Quản lý thông tin và tùy chọn thông báo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-[calc(90vh-200px)] overflow-y-auto">
          {/* Profile Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <User className="w-5 h-5 mr-2" />
              Thông tin cá nhân
            </h3>

            {/* Avatar Section */}
            <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
              <div className="relative">
                {/* Use Avatar component */}
                <Avatar
                  name={settings.name || user?.name || "User"}
                  avatarUrl={settings.avatarUrl}
                  size="xl"
                  className="border-2 border-border"
                />

                {/* Upload button overlay */}
                <button
                  onClick={handleAvatarUpload}
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity group"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1">
                <h4 className="font-medium text-foreground">Avatar</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Tải lên ảnh đại diện của bạn. Kích thước tối đa 5MB.
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAvatarUpload}
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors flex items-center space-x-1"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Tải lên</span>
                  </button>
                  {settings.avatarUrl && (
                    <button
                      onClick={removeAvatar}
                      className="px-3 py-1.5 border border-border text-muted-foreground rounded-md text-sm hover:bg-accent transition-colors"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {user?.role && (
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">Vai trò:</span>{" "}
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        : user.role === "FOLLOWER"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                    )}
                  >
                    {user.role === Role.ADMIN
                      ? "Quản trị viên"
                      : user.role === Role.FOLLOWER
                      ? "Người theo dõi"
                      : "Khách"}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Cài đặt thông báo
            </h3>

            {/* Post email */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    Nhận email khi có bài viết mới
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Nhận email khi có bài viết mới được đăng
                </p>
              </div>
              <button
                onClick={() => handleToggle("emailNewPosts")}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors",
                  settings.emailNewPosts
                    ? "bg-primary"
                    : "bg-gray-300 dark:bg-gray-600"
                )}
              >
                <div
                  className={cn(
                    "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                    settings.emailNewPosts ? "translate-x-6" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>

            <div className="space-y-4">
              {/* Email New Posts */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      Bài viết mới
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nhận thông báo khi có bài viết mới được đăng
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("notiNewPosts")}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    settings.notiNewPosts
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                      settings.notiNewPosts
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>

              {/* Comment Replies */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      Phản hồi comment
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nhận thông báo khi có ai trả lời comment của bạn
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("notiCommentReplies")}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    settings.notiCommentReplies
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                      settings.notiCommentReplies
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>

              {/* Like comment replies */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      Phản hồi bình luận
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nhận thông báo khi có ai trả lời bình luận của bạn
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("notiLikeComment")}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    settings.notiLikeComment
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                      settings.notiLikeComment
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>

              {/* Comment Notifications (only for admin) */}
              {user?.role === "ADMIN" && (
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        Bình luận mới{" "}
                        <span className="text-red-500">
                          (chỉ dành cho quản trị viên)
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Nhận thông báo khi có bình luận mới trên bài viết
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("notiComment")}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      settings.notiComment
                        ? "bg-primary"
                        : "bg-gray-300 dark:bg-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                        settings.notiComment
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>
              )}

              {/* Share Post Notifications (only for admin) */}
              {user?.role === "ADMIN" && (
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        Chia sẻ bài viết{" "}
                        <span className="text-red-500">
                          (chỉ dành cho quản trị viên)
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Nhận thông báo khi có ai chia sẻ bài viết của bạn
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("notiSharePost")}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      settings.notiSharePost
                        ? "bg-primary"
                        : "bg-gray-300 dark:bg-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                        settings.notiSharePost
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>
              )}

              {/* Like Post Notifications (only for admin) */}
              {user?.role === "ADMIN" && (
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        Thích bài viết{" "}
                        <span className="text-red-500">
                          (chỉ dành cho quản trị viên)
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Nhận thông báo khi có ai thích bài viết của bạn
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("notiLikePost")}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      settings.notiLikePost
                        ? "bg-primary"
                        : "bg-gray-300 dark:bg-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                        settings.notiLikePost
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>
              )}

              {/* Follow Notifications (only for admin) */}
              {user?.role === "ADMIN" && (
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        Theo dõi{" "}
                        <span className="text-red-500">
                          (chỉ dành cho quản trị viên)
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Nhận thông báo khi có người theo dõi bạn
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("notiFollow")}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      settings.notiFollow
                        ? "bg-primary"
                        : "bg-gray-300 dark:bg-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                        settings.notiFollow
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>
              )}

              {/* Browser Notifications */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      Thông báo trình duyệt
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Hiển thị thông báo push trên trình duyệt
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("browserNotifications")}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    settings.browserNotifications
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                      settings.browserNotifications
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <LockIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      Xác thực hai yếu tố
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Bảo vệ tài khoản của bạn bằng cách sử dụng xác thực hai yếu
                    tố
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("twoFactorEnabled")}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    settings.twoFactorEnabled
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                      settings.twoFactorEnabled
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/20">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={cn(
              "flex items-center space-x-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all",
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary/90"
            )}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isLoading ? "Đang lưu..." : "Lưu thay đổi"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
