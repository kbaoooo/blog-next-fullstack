'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Eye, Heart, Share2, BookOpen, ArrowLeft, ArrowRight, Home, Moon, Sun, BookOpenText } from 'lucide-react';
import { BlogsContainer } from '../../page';
import { BlogCardProps } from '@/utils/types';
import Image from 'next/image';
import AuthorImage from '@/assets/images/author.jpg'

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params || { slug: 'momentjs-tutorial' };
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(156);

    // Mock data for demonstration
    const blogPost = {
        title: "MomentJS Tutorial - Complete Guide for JavaScript Date Manipulation",
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
            bio: "Fullstack Developer - TypeScript Fan - NextJS - NestJS"
        },
        publishDate: "2023-12-25",
        readTime: "8 phút đọc",
        views: "2.5k",
        likes: 156,
        tags: ["JavaScript", "MomentJS", "Tutorial", "Developer"],
        category: "DEVELOPER"
    };

    const relatedPosts: BlogCardProps[] = [
        {
            title: "Understanding JavaScript Promises",
            description: "A deep dive into JavaScript promises and how to use them effectively.",
            imageUrl: "https://picsum.photos/640/360?random=1",
            views: 1200,
            date: "2023-11-15",
            slug: "js-promises"
        },
        {
            title: "Asynchronous Programming in JavaScript",
            description: "Exploring async/await and other async patterns in JavaScript.",
            imageUrl: "https://picsum.photos/640/360?random=2",
            views: 950,
            date: "2023-10-05",
            slug: "async-js"
        },
        {
            title: "JavaScript ES6 Features You Should Know",
            description: "An overview of essential ES6 features for modern JavaScript development.",
            imageUrl: "https://picsum.photos/640/360?random=3",
            views: 800,
            date: "2023-09-20",
            slug: "es6-features"
        }
    ];

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
    };


    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        <article className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50">
                            {/* Hero Image */}
                            <div className="relative h-64 md:h-80 bg-gradient-to-r from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="relative text-center z-10">
                                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-600/20 rounded-full text-purple-300 text-sm mb-4 backdrop-blur-sm border border-purple-500/30">
                                        <BookOpen className="w-4 h-4" />
                                        <span className="text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent uppercase tracking-wider">{blogPost.category}</span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 px-4 leading-tight">
                                        {blogPost.title}
                                    </h1>
                                </div>
                            </div>
                            
                            {/* Article Header */}
                            <div className="p-6 md:p-8 border-b border-gray-700/50">
                                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            width={48}
                                            height={48} 
                                            src={blogPost.author.avatar} 
                                            alt={blogPost.author.name}
                                            className="w-12 h-12 rounded-full ring-2 ring-purple-500/30"
                                        />
                                        <div>
                                            <p className="font-semibold text-white">{blogPost.author.name} - Tác giả</p>
                                            <p className="text-sm text-gray-400">{blogPost.author.bio}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-4">
                                        <button 
                                            onClick={handleLike}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                                liked 
                                                    ? 'bg-red-600 text-white' 
                                                    : 'bg-gray-700/50 text-gray-300 hover:bg-red-600/20 hover:text-red-400'
                                            }`}
                                        >
                                            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                                            <span>{likeCount}</span>
                                        </button>
                                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 transition-colors">
                                            <Share2 className="w-4 h-4" />
                                            <span>Chia sẻ</span>
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
                                    <div className="flex items-center space-x-2">
                                        <Eye className="w-4 h-4" />
                                        <span>{blogPost.views} lượt xem</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span>25/12/2023</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <BookOpenText className="w-4 h-4" />
                                        <span>{blogPost.readTime}</span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                    {blogPost.tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full border border-purple-500/30 hover:bg-purple-500/30 hover:text-white transition-colors cursor-pointer"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Article Content */}
                            <div className="p-6 md:p-8">
                                <div className="prose prose-lg prose-invert max-w-none">
                                    <div className="space-y-6 text-gray-300 leading-relaxed">
                                        {blogPost.content.split('\n').map((line, index) => {
                                            if (line.startsWith('# ')) {
                                                return <h1 key={index} className="text-3xl font-bold mt-12 mb-6 text-white first:mt-0">{line.slice(2)}</h1>;
                                            } else if (line.startsWith('## ')) {
                                                return <h2 key={index} className="text-2xl font-semibold mt-10 mb-4 text-white">{line.slice(3)}</h2>;
                                            } else if (line.startsWith('### ')) {
                                                return <h3 key={index} className="text-xl font-semibold mt-8 mb-3 text-purple-300">{line.slice(4)}</h3>;
                                            } else if (line.startsWith('```')) {
                                                const lang = line.slice(3);
                                                return (
                                                    <div key={index} className="bg-gray-900/80 border border-gray-700/50 rounded-lg p-4 my-6 overflow-x-auto">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs text-purple-400 font-medium">{lang || 'code'}</span>
                                                        </div>
                                                        <code className="text-sm text-gray-100 font-mono">{line.slice(3)}</code>
                                                    </div>
                                                );
                                            } else if (line.startsWith('- ')) {
                                                return (
                                                    <div key={index} className="flex items-start space-x-3 my-2">
                                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                                        <span>{line.slice(2)}</span>
                                                    </div>
                                                );
                                            } else if (line.trim() === '') {
                                                return <div key={index} className="h-4" />;
                                            } else if (line.trim() !== '') {
                                                return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </main>
                    
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="space-y-6 sticky top-24">
                            {/* Author Info */}
                            {/* <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                                <h3 className="text-lg font-semibold mb-4 text-white">Về tác giả</h3>
                                <div className="text-center">
                                    <Image
                                        width={80}
                                        height={80} 
                                        src={blogPost.author.avatar} 
                                        alt={blogPost.author.name}
                                        className="w-20 h-20 rounded-full mx-auto mb-4 ring-2 ring-purple-500/30"
                                    />
                                    <h4 className="font-semibold text-white mb-2">{blogPost.author.name}</h4>
                                    <p className="text-sm text-gray-400 mb-4">{blogPost.author.bio}</p>
                                </div>
                            </div> */}
                            
                            {/* Table of Contents */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                                <h3 className="text-lg font-semibold mb-4 text-white">Mục lục</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#introduction" className="text-purple-400 hover:text-purple-300 transition-colors">Introduction to MomentJS</a></li>
                                    <li><a href="#why-use" className="text-purple-400 hover:text-purple-300 transition-colors">Why Use MomentJS?</a></li>
                                    <li><a href="#installation" className="text-purple-400 hover:text-purple-300 transition-colors">Installation</a></li>
                                    <li><a href="#basic-usage" className="text-purple-400 hover:text-purple-300 transition-colors">Basic Usage</a></li>
                                    <li><a href="#advanced" className="text-purple-400 hover:text-purple-300 transition-colors">Advanced Features</a></li>
                                    <li><a href="#best-practices" className="text-purple-400 hover:text-purple-300 transition-colors">Best Practices</a></li>
                                    <li><a href="#conclusion" className="text-purple-400 hover:text-purple-300 transition-colors">Conclusion</a></li>
                                </ul>
                            </div>
                            
                            {/* Related Posts */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                                <h3 className="text-lg font-semibold mb-4 text-white">Bài viết liên quan</h3>
                                <BlogsContainer data={relatedPosts} layout='sidebar' />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}