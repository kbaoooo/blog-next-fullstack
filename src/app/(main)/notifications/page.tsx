"use client";

import { cn } from "@/lib/utils";
import {
  Bell,
  Check,
  CheckCheck,
  FileText,
  Filter,
  Heart,
  MessageCircle,
  Search,
  Settings,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Notification {
  id: string;
  type: "COMMENT" | "LIKE" | "FOLLOW" | "POST_PUBLISHED" | "SYSTEM";
  title: string;
  message: string;
  read: boolean;
  postId?: string;
  commentId?: string;
  createdAt: string;
  timeAgo: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "COMMENT",
      title: "Bình luận mới",
      message: "Nguyễn Văn A đã bình luận về bài viết 'MomentJS Tutorial'",
      read: false,
      postId: "momentjs-tutorial",
      commentId: "comment-1",
      createdAt: "2024-01-20T10:30:00Z",
      timeAgo: "5 phút trước",
    },
    {
      id: "2",
      type: "LIKE",
      title: "Lượt thích mới",
      message:
        "Trần Thị B và 3 người khác đã thích bài viết 'Understanding React Hooks'",
      read: false,
      postId: "react-hooks",
      createdAt: "2024-01-20T10:25:00Z",
      timeAgo: "10 phút trước",
    },
    {
      id: "3",
      type: "FOLLOW",
      title: "Follower mới",
      message: "Lê Văn C đã theo dõi blog của bạn",
      read: true,
      createdAt: "2024-01-20T09:30:00Z",
      timeAgo: "1 giờ trước",
    },
    {
      id: "4",
      type: "POST_PUBLISHED",
      title: "Bài viết được xuất bản",
      message:
        "Bài viết 'Understanding React Hooks' đã được xuất bản thành công",
      read: true,
      postId: "react-hooks",
      createdAt: "2024-01-20T08:00:00Z",
      timeAgo: "2 giờ trước",
    },
    {
      id: "5",
      type: "COMMENT",
      title: "Phản hồi bình luận",
      message:
        "Admin đã phản hồi bình luận của bạn trong 'JavaScript ES6 Features'",
      read: false,
      postId: "es6-features",
      commentId: "comment-5",
      createdAt: "2024-01-19T16:45:00Z",
      timeAgo: "18 giờ trước",
    },
    {
      id: "6",
      type: "SYSTEM",
      title: "Cập nhật bảo mật",
      message: "Tài khoản của bạn đã được đăng nhập từ thiết bị mới",
      read: true,
      createdAt: "2024-01-19T14:20:00Z",
      timeAgo: "20 giờ trước",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notification.read) ||
      (filter === "read" && notification.read);

    const matchesType =
      selectedType === "all" || notification.type === selectedType;

    const matchesSearch =
      searchQuery === "" ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesType && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "COMMENT":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "LIKE":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "FOLLOW":
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case "POST_PUBLISHED":
        return <FileText className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    setSelectedNotifications((prev) =>
      prev.filter((notifId) => notifId !== id)
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: false } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    setSelectedNotifications([]);
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    setSelectedNotifications((prev) =>
      prev.filter((notifId) => notifId !== id)
    );
  };

  const deleteSelected = () => {
    setNotifications((prev) =>
      prev.filter((notif) => !selectedNotifications.includes(notif.id))
    );
    setSelectedNotifications([]);
  };

  const markSelectedAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) =>
        selectedNotifications.includes(notif.id)
          ? { ...notif, read: true }
          : notif
      )
    );
    setSelectedNotifications([]);
  };

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id)
        ? prev.filter((notifId) => notifId !== id)
        : [...prev, id]
    );
  };

  const selectAllFiltered = () => {
    const filteredIds = filteredNotifications.map((n) => n.id);
    setSelectedNotifications(filteredIds);
  };

  const clearSelection = () => {
    setSelectedNotifications([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Thông báo</h1>
              <p className="text-muted-foreground">
                Quản lý tất cả thông báo của bạn ở đây
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-foreground">
                  Bạn có {unreadCount} thông báo chưa đọc
                </span>
              </div>
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Đánh dấu tất cả đã đọc
              </button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 mb-6">
          {/* Search and Filter Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm thông báo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex bg-background border border-border rounded-lg p-1">
                {[
                  { value: "all", label: "Tất cả" },
                  { value: "unread", label: "Chưa đọc" },
                  { value: "read", label: "Đã đọc" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setFilter(option.value as "all" | "unread" | "read")
                    }
                    className={cn(
                      "px-3 py-1 text-sm font-medium rounded transition-colors",
                      filter === option.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">Tất cả loại</option>
              <option value="COMMENT">Bình luận</option>
              <option value="LIKE">Lượt thích</option>
              <option value="FOLLOW">Theo dõi</option>
              <option value="POST_PUBLISHED">Bài viết</option>
              <option value="SYSTEM">Hệ thống</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-foreground">
                  {selectedNotifications.length} thông báo được chọn
                </span>
                <button
                  onClick={clearSelection}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Bỏ chọn tất cả
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={markSelectedAsRead}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span>Đánh dấu đã đọc</span>
                </button>
                <button
                  onClick={deleteSelected}
                  className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Xóa</span>
                </button>
              </div>
            </div>
          )}

          {filteredNotifications.length > 0 &&
            selectedNotifications.length === 0 && (
              <div className="flex items-center justify-end">
                <button
                  onClick={selectAllFiltered}
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Chọn tất cả ({filteredNotifications.length})
                </button>
              </div>
            )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-12 text-center">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery || filter !== "all" || selectedType !== "all"
                  ? "Không tìm thấy thông báo"
                  : "Chưa có thông báo nào"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery || filter !== "all" || selectedType !== "all"
                  ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                  : "Thông báo mới sẽ hiển thị ở đây"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "bg-card/50 backdrop-blur-sm rounded-2xl border transition-all duration-200 hover:shadow-lg group",
                  notification.read
                    ? "border-border hover:border-border/80"
                    : "border-primary/30 bg-primary/5 hover:border-primary/50",
                  selectedNotifications.includes(notification.id) &&
                    "ring-2 ring-primary/50"
                )}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Selection Checkbox */}
                    <button
                      onClick={() => toggleSelectNotification(notification.id)}
                      className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-1",
                        selectedNotifications.includes(notification.id)
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {selectedNotifications.includes(notification.id) && (
                        <Check className="w-3 h-3" />
                      )}
                    </button>

                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3
                              className={cn(
                                "font-semibold text-sm",
                                notification.read
                                  ? "text-muted-foreground"
                                  : "text-foreground"
                              )}
                            >
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>

                          <p
                            className={cn(
                              "text-sm mb-2 line-clamp-2",
                              notification.read
                                ? "text-muted-foreground"
                                : "text-foreground/90"
                            )}
                          >
                            {notification.message}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {notification.timeAgo}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read ? (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1.5 hover:bg-accent rounded-lg transition-colors"
                              title="Đánh dấu đã đọc"
                            >
                              <Check className="w-4 h-4 text-green-500" />
                            </button>
                          ) : (
                            <button
                              onClick={() => markAsUnread(notification.id)}
                              className="p-1.5 hover:bg-accent rounded-lg transition-colors"
                              title="Đánh dấu chưa đọc"
                            >
                              <Bell className="w-4 h-4 text-primary" />
                            </button>
                          )}

                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1.5 hover:bg-accent rounded-lg transition-colors"
                            title="Xóa thông báo"
                          >
                            <X className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                          </button>
                        </div>
                      </div>

                      {/* Action Links */}
                      {(notification.postId || notification.commentId) && (
                        <div className="mt-3 flex items-center space-x-3">
                          {notification.postId && (
                            <Link
                              href={`/blog/${notification.postId}`}
                              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                              Xem bài viết →
                            </Link>
                          )}
                          {notification.commentId && (
                            <Link
                              href={`/blog/${notification.postId}#comment-${notification.commentId}`}
                              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                              Xem bình luận →
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Settings Link */}
        <div className="mt-8 text-center">
          <Link
            href="/settings/notifications"
            className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Cài đặt thông báo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
