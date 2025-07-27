"use client";

import { cn } from "@/lib/utils";
import {
  Bell,
  Check,
  FileText,
  Heart,
  MessageCircle,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  type: "COMMENT" | "LIKE" | "FOLLOW" | "POST_PUBLISHED" | "SYSTEM";
  title: string;
  message: string;
  read: boolean;
  postId?: string;
  commentId?: string;
  createdAt: string;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "COMMENT",
      title: "Bình luận mới",
      message: "Nguyễn Văn A đã bình luận về bài viết 'MomentJS Tutorial'",
      read: false,
      postId: "momentjs-tutorial",
      commentId: "comment-1",
      createdAt: "5 phút trước",
    },
    {
      id: "2",
      type: "LIKE",
      title: "Lượt thích mới",
      message: "Trần Thị B và 3 người khác đã thích bài viết của bạn",
      read: false,
      postId: "nextjs-guide",
      createdAt: "10 phút trước",
    },
    {
      id: "3",
      type: "FOLLOW",
      title: "Follower mới",
      message: "Lê Văn C đã theo dõi blog của bạn",
      read: true,
      createdAt: "1 giờ trước",
    },
    {
      id: "4",
      type: "POST_PUBLISHED",
      title: "Bài viết mới được xuất bản",
      message:
        "Bài viết 'Understanding React Hooks' đã được xuất bản thành công",
      read: true,
      postId: "react-hooks",
      createdAt: "2 giờ trước",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "COMMENT":
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "LIKE":
        return <Heart className="w-4 h-4 text-red-500" />;
      case "FOLLOW":
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case "POST_PUBLISHED":
        return <FileText className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Click outside to close
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest("[data-notification-dropdown]")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="relative p-2 rounded-full">
        <Bell className="w-5 h-5 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative" data-notification-dropdown>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2 rounded-full transition-all duration-200 hover:bg-accent",
          isOpen ? "bg-accent" : ""
        )}
      >
        <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Thông báo {unreadCount > 0 && `(${unreadCount})`}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Đánh dấu tất cả đã đọc
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Không có thông báo nào</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 hover:bg-accent/50 transition-colors cursor-pointer border-l-4",
                      notification.read
                        ? "border-l-transparent"
                        : "border-l-primary bg-primary/5"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p
                              className={cn(
                                "text-sm font-medium",
                                notification.read
                                  ? "text-muted-foreground"
                                  : "text-foreground"
                              )}
                            >
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.createdAt}
                            </p>
                          </div>

                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="p-1 hover:bg-accent rounded"
                                title="Đánh dấu đã đọc"
                              >
                                <Check className="w-3 h-3 text-green-500" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="p-1 hover:bg-accent rounded"
                              title="Xóa thông báo"
                            >
                              <X className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-border p-3">
              <Link
                href="/notifications"
                className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors block"
              >
                Xem tất cả thông báo
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
