import {
  webDevelopment,
  backend,
  fullstackDevelopment,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  threejs,
  socialMediaPlatform,
  tomatoRestaurant,
  tinamusic,
  blog,
  lmsSample,
  frontend,
} from "@/assets/images";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: webDevelopment,
  },
  {
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Full Stack Developer",
    icon: fullstackDevelopment,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Web Developer",
    company_name: "Freelance / Personal Projects",
    icon: webDevelopment, // thay bằng icon bạn chọn
    iconBg: "#383E56",
    date: "2021 - Present",
    points: [
      "Thiết kế và phát triển các trang web tĩnh và động bằng HTML, CSS, JavaScript.",
      "Tối ưu hiệu suất giao diện và đảm bảo khả năng tương thích đa trình duyệt.",
      "Thực hiện responsive layout phù hợp trên desktop và thiết bị di động.",
      "Triển khai dự án cá nhân lên các nền tảng như Vercel, Netlify.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Freelance / Personal Projects",
    icon: frontend,
    iconBg: "#E6DEDD",
    date: "2022 - Present",
    points: [
      "Xây dựng giao diện người dùng hiện đại bằng React.js và Next.js.",
      "Sử dụng Tailwind CSS, SCSS, và component libraries để tối ưu UI.",
      "Tích hợp API và xử lý dữ liệu bất đồng bộ với Axios và React Query.",
      "Cải thiện UX thông qua animation và quản lý state hiệu quả bằng Redux/Zustand.",
    ],
  },
  {
    title: "Backend Developer",
    company_name: "Freelance / Personal Projects",
    icon: backend,
    iconBg: "#383E56",
    date: "2022 - Present",
    points: [
      "Thiết kế API RESTful và gRPC với NestJS và Express.",
      "Làm việc với PostgreSQL, Prisma ORM và Redis để xử lý dữ liệu hiệu quả.",
      "Áp dụng xác thực và phân quyền với JWT, OAuth2.",
      "Triển khai backend trên môi trường Docker và giám sát log hệ thống.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Freelance / Personal Projects",
    icon: fullstackDevelopment,
    iconBg: "#E6DEDD",
    date: "2023 - Present",
    points: [
      "Xây dựng hệ thống học trực tuyến (LMS) với kiến trúc microservice.",
      "Tích hợp frontend (Next.js) với backend (NestJS) thông qua gRPC.",
      "Quản lý người dùng, khóa học, bài học và tiến độ học tập.",
      "Triển khai CI/CD và theo dõi lỗi qua các công cụ như Docker, GitHub Actions.",
    ],
  },
];


const testimonials = [
  {
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    name: "Phzhi",
    designation: "CFO",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    name: "Phuong Nhi",
    designation: "COO",
    company: "Meta Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    name: "Phuong Ziu",
    designation: "CTO",
    company: "Google",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Social Media PLatform",
    description:
      "Đây là một nền tảng mạng xã hội hiện đại cho phép người dùng đăng bài, theo dõi nhau và trò chuyện trực tuyến theo thời gian thực. Giao diện thân thiện, tối ưu cho trải nghiệm kết nối và tương tác cộng đồng.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "postgres",
        color: "pink-text-gradient",
      },
    ],
    image: socialMediaPlatform,
    source_code_link: "https://github.com/kbaoooo?tab=repositories",
  },
  {
    name: "Tomato Restaurant",
    description:
      "Tomato là nền tảng đặt món ăn trực tuyến và giao diện dễ sử dụng. Tomato giúp bạn dễ dàng lựa chọn và thưởng thức những món ăn yêu thích mọi lúc, mọi nơi.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "nodejs",
        color: "pink-text-gradient",
      },
    ],
    image: tomatoRestaurant,
    source_code_link: "https://github.com/kbaoooo?tab=repositories",
  },
  {
    name: "Tina Music CMS",
    description:
      "Tina Music CMS giúp bạn theo dõi hoạt động người dùng một cách trực quan và sinh động. Từ số lượng tài khoản đến thiết bị truy cập – mọi dữ liệu đều nằm trong tầm tay.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "dashboard",
        color: "pink-text-gradient",
      },
    ],
    image: tinamusic,
    source_code_link: "https://github.com/kbaoooo?tab=repositories",
  },
  {
    name: "Blog cá nhân/Portfolio",
    description:
      "Đây là blog cá nhân và portfolio của tôi, nơi tổng hợp các dự án web cùng bài viết liên quan lập trình. Giao diện được thiết kế đậm chất công nghệ, phù hợp với phong cách developer.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "nodejs",
        color: "pink-text-gradient",
      },
    ],
    image: blog,
    source_code_link: "https://github.com/kbaoooo?tab=repositories",
  },
  {
    name: "LMS microservice - Học trực tuyến /  (UI chưa hoàn thiện)",
    description:
      "Hệ thống LMS được xây dựng theo kiến trúc microservice, hỗ trợ quản lý khóa học, bài học, người dùng và tiến trình học tập. Thiết kế linh hoạt, dễ mở rộng, phù hợp cho nền tảng học trực tuyến hiện đại.",
    tags: [
      {
        name: "nestjs",
        color: "blue-text-gradient",
      },
      {
        name: "postgres",
        color: "green-text-gradient",
      },
      {
        name: "nx repo",
        color: "pink-text-gradient",
      },
    ],
    image: lmsSample,
    source_code_link: "https://github.com/kbaoooo?tab=repositories",
  },
];

export { services, technologies, experiences, testimonials, projects };

// global constants for the application
export default {
  VI: "vi",
  EN: "en",
  MOBILE_WIDTH: 768,
};
