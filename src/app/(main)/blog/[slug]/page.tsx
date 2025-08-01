"use client";

import AuthorImage from "@/assets/images/author.jpg";
import FollowButton from "@/components/custom/follow-button";
// import NewsletterSignup from "@/components/custom/newsletter-signup";
import { BlogCardProps } from "@/utils/types";
import {
  BookOpen,
  BookOpenText,
  Clock,
  Eye,
  Flag,
  Heart,
  MessageCircle,
  Reply,
  Send,
  Share2,
  ThumbsUp,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BlogsContainer } from "../../components/blog-container";

// Types for comments
interface CommentAuthor {
  name: string;
  avatar: string;
  role: "ADMIN" | "GUEST" | "FOLLOWER";
}

interface CommentReply {
  id: string;
  author: CommentAuthor;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

interface Comment {
  id: string;
  author: CommentAuthor;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies: CommentReply[];
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params || { slug: "momentjs-tutorial" }; // eslint-disable-line @typescript-eslint/no-unused-vars
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(156);
  const [readingProgress, setReadingProgress] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "Nguyễn Văn A",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&facepad=2&w=32&h=32",
        role: "FOLLOWER",
      },
      content:
        "Bài viết rất hữu ích! Mình đã áp dụng MomentJS vào dự án và thấy rất tiện lợi. Cảm ơn tác giả đã chia sẻ kiến thức chi tiết.",
      timestamp: "2 giờ trước",
      likes: 5,
      liked: false,
      replies: [
        {
          id: "1-1",
          author: {
            name: "Khanh Bao",
            avatar: AuthorImage.src,
            role: "ADMIN",
          },
          content:
            "Cảm ơn bạn! Rất vui khi biết bài viết hữu ích. Nếu có thắc mắc gì thêm về MomentJS thì cứ comment nhé!",
          timestamp: "1 giờ trước",
          likes: 2,
          liked: false,
        },
      ],
    },
    {
      id: "2",
      author: {
        name: "Trần Thị B",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face&facepad=2&w=32&h=32",
        role: "GUEST",
      },
      content:
        "Có thể làm một bài về Day.js được không ạ? Nghe nói nó nhẹ hơn MomentJS.",
      timestamp: "4 giờ trước",
      likes: 3,
      liked: true,
      replies: [],
    },
    {
      id: "3",
      author: {
        name: "Lê Văn C",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&facepad=2&w=32&h=32",
        role: "FOLLOWER",
      },
      content:
        "Code examples rất dễ hiểu. Tuy nhiên mình gặp lỗi timezone khi deploy lên production, bạn có thể tư vấn không?",
      timestamp: "1 ngày trước",
      likes: 1,
      liked: false,
      replies: [],
    },
  ]);

  // Reading progress effect
  const updateReadingProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    setReadingProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  // Mock data for demonstration
  const blogPost = {
    title:
      "MomentJS Tutorial - Complete Guide for JavaScript Date Manipulation",
    content: `
# Introduction to MomentJS

MomentJS is a powerful JavaScript library for parsing, validating, manipulating, and formatting dates. In this comprehensive tutorial, we'll explore everything you need to know about working with dates in JavaScript using MomentJS.

## Why Use MomentJS?

JavaScript's native Date object can be challenging to work with, especially when dealing with:
- Date parsing and formatting
- Timezone handling
- Date arithmetic
- Localization

MomentJS solves these problems by providing a clean, intuitive API.

## Installation

You can install MomentJS via npm:

\`\`\`bash
npm install moment
\`\`\`

Or include it via CDN:

\`\`\`html
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
\`\`\`

## Basic Usage

### Creating Moment Objects

\`\`\`javascript
// Current date and time
const now = moment();

// From string
const date1 = moment('2023-12-25');
const date2 = moment('25/12/2023', 'DD/MM/YYYY');

// From array
const date3 = moment([2023, 11, 25]); // Month is 0-indexed
\`\`\`

### Formatting Dates

\`\`\`javascript
const now = moment();

console.log(now.format('YYYY-MM-DD')); // 2023-12-25
console.log(now.format('DD/MM/YYYY')); // 25/12/2023
console.log(now.format('MMMM Do YYYY, h:mm:ss a')); // December 25th 2023, 2:30:45 pm
\`\`\`

## Advanced Features

### Date Manipulation

MomentJS makes it easy to add or subtract time:

\`\`\`javascript
const date = moment('2023-12-25');

// Add time
const futureDate = date.clone().add(7, 'days');
const futureMonth = date.clone().add(1, 'month');

// Subtract time
const pastDate = date.clone().subtract(3, 'hours');
\`\`\`

### Relative Time

Display human-readable relative time:

\`\`\`javascript
const now = moment();
const pastDate = moment().subtract(2, 'hours');

console.log(pastDate.fromNow()); // "2 hours ago"
console.log(now.to(pastDate)); // "in 2 hours"
\`\`\`

## Best Practices

1. **Always clone** moment objects before manipulation
2. **Use specific formats** when parsing strings
3. **Consider timezone** implications
4. **Validate inputs** before processing

## Conclusion

MomentJS provides a robust solution for date manipulation in JavaScript. While newer alternatives like Day.js exist, MomentJS remains a popular choice for many developers due to its comprehensive feature set and extensive documentation.
        `,
    author: {
      name: "Khanh Bao",
      avatar: AuthorImage.src,
      bio: "Fullstack Developer - TypeScript Fan - NextJS - NestJS",
    },
    publishDate: "2023-12-25",
    readTime: "8 phút đọc",
    views: "2.5k",
    likes: 156,
    tags: ["JavaScript", "MomentJS", "Tutorial", "Developer"],
    category: "DEVELOPER",
  };

  const relatedPosts: BlogCardProps[] = [
    {
      title: "Understanding JavaScript Promises",
      description:
        "A deep dive into JavaScript promises and how to use them effectively.",
      imageUrl: "https://picsum.photos/640/360?random=1",
      views: 1200,
      date: "2023-11-15",
      slug: "js-promises",
    },
    {
      title: "Asynchronous Programming in JavaScript",
      description:
        "Exploring async/await and other async patterns in JavaScript.",
      imageUrl: "https://picsum.photos/640/360?random=2",
      views: 950,
      date: "2023-10-05",
      slug: "async-js",
    },
    {
      title: "JavaScript ES6 Features You Should Know",
      description:
        "An overview of essential ES6 features for modern JavaScript development.",
      imageUrl: "https://picsum.photos/640/360?random=3",
      views: 800,
      date: "2023-09-20",
      slug: "es6-features",
    },
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCommentLike = (
    commentId: string,
    isReply = false,
    replyId?: string
  ) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          if (isReply && replyId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      liked: !reply.liked,
                      likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                    }
                  : reply
              ),
            };
          } else {
            return {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            };
          }
        }
        return comment;
      })
    );
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Bạn",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face&facepad=2&w=32&h=32",
        role: "GUEST",
      },
      content: newComment,
      timestamp: "Vừa xong",
      likes: 0,
      liked: false,
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const reply: CommentReply = {
      id: `${commentId}-${Date.now()}`,
      author: {
        name: "Bạn",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face&facepad=2&w=32&h=32",
        role: "GUEST",
      },
      content: replyText,
      timestamp: "Vừa xong",
      likes: 0,
      liked: false,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-black/20 backdrop-blur-sm z-50 shadow-lg">
        <div
          className="h-full bg-primary transition-all duration-300 shadow-lg relative"
          style={{ width: `${readingProgress}%` }}
        >
          <div className="absolute inset-0 bg-primary/80 shadow-[0_0_10px_rgba(139,92,246,0.6)]"></div>
          <div className="absolute right-0 top-0 h-full w-1 bg-white/60 shadow-sm"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-3">
            <article className="bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border shadow-xl">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
                <div className="relative text-center z-10 px-6">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm mb-6 backdrop-blur-sm border border-primary/20 shadow-lg">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent uppercase tracking-wider">
                      {blogPost.category}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight max-w-4xl mx-auto">
                    {blogPost.title}
                  </h1>
                </div>
              </div>

              {/* Article Header */}
              <div className="p-6 md:p-8 border-b border-border">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        width={52}
                        height={52}
                        src={blogPost.author.avatar}
                        alt={blogPost.author.name}
                        className="w-12 h-12 rounded-full ring-2 ring-primary/30 shadow-lg object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {blogPost.author.name} - Tác giả
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {blogPost.author.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                        liked
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                          : "bg-card border border-border text-muted-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
                      />
                      <span className="font-medium">{likeCount}</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2.5 bg-card border border-border text-muted-foreground rounded-xl hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 transform">
                      <Share2 className="w-4 h-4" />
                      <span className="font-medium">Chia sẻ</span>
                    </button>
                    <FollowButton
                      isFollowing={false}
                      followerCount={1247}
                      variant="default"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-2 bg-accent/20 px-3 py-1.5 rounded-lg">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-medium">
                      {blogPost.views} lượt xem
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-accent/20 px-3 py-1.5 rounded-lg">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">25/12/2023</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-accent/20 px-3 py-1.5 rounded-lg">
                    <BookOpenText className="w-4 h-4 text-primary" />
                    <span className="font-medium">{blogPost.readTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg border border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 cursor-pointer font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8">
                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                  <div className="space-y-6 text-foreground leading-relaxed">
                    {blogPost.content.split("\n").map((line, index) => {
                      if (line.startsWith("# ")) {
                        return (
                          <h1
                            key={index}
                            className="text-3xl font-bold mt-12 mb-6 text-foreground first:mt-0 border-b border-border pb-4"
                          >
                            {line.slice(2)}
                          </h1>
                        );
                      } else if (line.startsWith("## ")) {
                        return (
                          <h2
                            key={index}
                            className="text-2xl font-semibold mt-10 mb-4 text-foreground"
                          >
                            {line.slice(3)}
                          </h2>
                        );
                      } else if (line.startsWith("### ")) {
                        return (
                          <h3
                            key={index}
                            className="text-xl font-semibold mt-8 mb-3 text-primary"
                          >
                            {line.slice(4)}
                          </h3>
                        );
                      } else if (line.startsWith("```")) {
                        const lang = line.slice(3);
                        return (
                          <div
                            key={index}
                            className="bg-card border border-border rounded-xl p-6 my-6 overflow-x-auto shadow-lg"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs text-primary font-semibold uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                                {lang || "code"}
                              </span>
                              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                Copy
                              </button>
                            </div>
                            <code className="text-sm text-foreground font-mono leading-relaxed">
                              {line.slice(3)}
                            </code>
                          </div>
                        );
                      } else if (line.startsWith("- ")) {
                        return (
                          <div
                            key={index}
                            className="flex items-start space-x-3 my-3"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground leading-relaxed">
                              {line.slice(2)}
                            </span>
                          </div>
                        );
                      } else if (line.trim() === "") {
                        return <div key={index} className="h-4" />;
                      } else if (line.trim() !== "") {
                        return (
                          <p
                            key={index}
                            className="mb-4 leading-relaxed text-muted-foreground"
                          >
                            {line}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border shadow-xl mt-8 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-foreground flex items-center">
                    <MessageCircle className="w-6 h-6 mr-3 text-primary" />
                    Bình luận ({comments.length})
                  </h2>
                </div>

                {/* Add Comment Form */}
                <div className="mb-8 p-6 bg-accent/10 rounded-xl border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..."
                        className="w-full p-4 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none min-h-[100px]"
                      />
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                          Hãy giữ lịch sự và tôn trọng trong bình luận
                        </p>
                        <button
                          onClick={handleSubmitComment}
                          disabled={!newComment.trim()}
                          className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                            newComment.trim()
                              ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                          }`}
                        >
                          <Send className="w-4 h-4" />
                          <span>Gửi bình luận</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="group">
                      <div className="flex items-start space-x-4 p-6 rounded-xl hover:bg-accent/5 transition-all duration-200">
                        <div className="flex-shrink-0">
                          <Image
                            width={40}
                            height={40}
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            className="w-10 h-10 rounded-full ring-2 ring-border group-hover:ring-primary/30 transition-all duration-200 object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-foreground">
                              {comment.author.name}
                            </h4>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                comment.author.role === "ADMIN"
                                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                                  : comment.author.role === "FOLLOWER"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                              }`}
                            >
                              {comment.author.role === "ADMIN"
                                ? "Tác giả"
                                : comment.author.role === "FOLLOWER"
                                ? "Follower"
                                : "Khách"}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {comment.timestamp}
                            </span>
                          </div>

                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {comment.content}
                          </p>

                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleCommentLike(comment.id)}
                              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                                comment.liked
                                  ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
                              }`}
                            >
                              <ThumbsUp
                                className={`w-4 h-4 ${
                                  comment.liked ? "fill-current" : ""
                                }`}
                              />
                              <span className="text-sm font-medium">
                                {comment.likes}
                              </span>
                            </button>

                            <button
                              onClick={() =>
                                setReplyingTo((prev) => {
                                  return prev === comment.id
                                    ? null
                                    : comment.id;
                                })
                              }
                              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200 ${
                                replyingTo === comment.id
                                  ? "text-white bg-accent"
                                  : ""
                              }`}
                            >
                              <Reply className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Trả lời
                              </span>
                            </button>

                            <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200">
                              <Flag className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Báo cáo
                              </span>
                            </button>
                          </div>

                          {/* Reply Form */}
                          {replyingTo === comment.id && (
                            <div className="mt-4 ml-6 p-4 bg-accent/10 rounded-xl border border-border">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <textarea
                                    value={replyText}
                                    onChange={(e) =>
                                      setReplyText(e.target.value)
                                    }
                                    placeholder={`Trả lời ${comment.author.name}...`}
                                    className="w-full p-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none min-h-[80px]"
                                  />
                                  <div className="flex items-center justify-end space-x-3 mt-3">
                                    <button
                                      onClick={() => setReplyingTo(null)}
                                      className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      Hủy
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleSubmitReply(comment.id)
                                      }
                                      disabled={!replyText.trim()}
                                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        replyText.trim()
                                          ? "bg-primary text-white hover:bg-primary/90"
                                          : "bg-muted text-muted-foreground cursor-not-allowed"
                                      }`}
                                    >
                                      <Send className="w-3 h-3" />
                                      <span>Trả lời</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="mt-6 ml-6 space-y-4">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="flex items-start space-x-4 p-4 bg-accent/5 rounded-xl border border-border"
                                >
                                  <div className="flex-shrink-0">
                                    <Image
                                      width={32}
                                      height={32}
                                      src={reply.author.avatar}
                                      alt={reply.author.name}
                                      className="w-8 h-8 rounded-full ring-1 ring-border object-cover"
                                    />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <h5 className="font-medium text-foreground text-sm">
                                        {reply.author.name}
                                      </h5>
                                      <div
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                          reply.author.role === "ADMIN"
                                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                                            : reply.author.role === "FOLLOWER"
                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                        }`}
                                      >
                                        {reply.author.role === "ADMIN"
                                          ? "Tác giả"
                                          : reply.author.role === "FOLLOWER"
                                          ? "Follower"
                                          : "Khách"}
                                      </div>
                                      <span className="text-xs text-muted-foreground">
                                        {reply.timestamp}
                                      </span>
                                    </div>

                                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                                      {reply.content}
                                    </p>

                                    <div className="flex items-center space-x-3">
                                      <button
                                        onClick={() =>
                                          handleCommentLike(
                                            comment.id,
                                            true,
                                            reply.id
                                          )
                                        }
                                        className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-all duration-200 ${
                                          reply.liked
                                            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                        }`}
                                      >
                                        <ThumbsUp
                                          className={`w-3 h-3 ${
                                            reply.liked ? "fill-current" : ""
                                          }`}
                                        />
                                        <span>{reply.likes}</span>
                                      </button>

                                      <button className="flex items-center space-x-1 px-2 py-1 rounded text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200">
                                        <Flag className="w-3 h-3" />
                                        <span>Báo cáo</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Comments */}
                {comments.length > 0 && (
                  <div className="text-center mt-8">
                    <button className="px-6 py-3 bg-accent/20 text-foreground rounded-xl hover:bg-accent/30 transition-all duration-200 font-medium">
                      Xem thêm bình luận
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Newsletter Signup */}
              {/* <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg">
                <NewsletterSignup
                  variant="compact"
                  placeholder="Email của bạn..."
                  showIcon={false}
                  className="space-y-4"
                />
              </div> */}

              {/* Table of Contents */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  Mục lục
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="#introduction"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center py-1 px-2 rounded hover:bg-primary/10"
                    >
                      Introduction to MomentJS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#why-use"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center py-1 px-2 rounded hover:bg-primary/10"
                    >
                      Why Use MomentJS?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#installation"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center py-1 px-2 rounded hover:bg-primary/10"
                    >
                      Installation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#basic-usage"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center py-1 px-2 rounded hover:bg-primary/10"
                    >
                      Basic Usage
                    </a>
                  </li>
                  <li>
                    <a
                      href="#advanced"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center py-1 px-2 rounded hover:bg-primary/10"
                    >
                      Advanced Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#best-practices"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center py-1 px-2 rounded hover:bg-primary/10"
                    >
                      Best Practices
                    </a>
                  </li>
                  <li>
                    <a
                      href="#conclusion"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center py-1 px-2 rounded hover:bg-primary/10"
                    >
                      Conclusion
                    </a>
                  </li>
                </ul>
              </div>

              {/* Related Posts */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Bài viết liên quan
                </h3>
                <BlogsContainer data={relatedPosts} layout="sidebar" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
