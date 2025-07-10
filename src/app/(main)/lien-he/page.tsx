export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between bg-background px-4 py-8">
        <h1 className="text-3xl font-bold">Liên hệ</h1>
        <p className="mt-4 text-lg">Bạn có thể liên hệ với tôi qua các kênh sau:</p>
        <ul className="mt-4 list-disc pl-5">
            <li>Email: <a href="mailto:nbaokhanh1243@gmail.com" className="text-blue-500 hover:underline">
                khanh bao
            </a>
            </li>
            <li>Facebook: <a href="https://web.facebook.com/?locale=vi_VN&_rdc=1&_rdr#" className="text-blue-500 hover:underline">
                Khanh Bao
            </a>
            </li>
            <li>Instagram: <a href="https://instagram.com" className="text-blue-500 hover:underline">
                Khanh Bao
            </a>
            </li>
            <li>Tiktok: <a href="https://tiktok.com" className="text-blue-500 hover:underline">
                Khanh Bao
            </a>
            </li>
        </ul>
        <p className="mt-4 text-lg">Hoặc bạn có thể gửi tin nhắn trực tiếp qua form dưới đây:</p>
        <form className="mt-4 w-full max-w-md">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên của bạn</label>
                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập tên của bạn" required />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email của bạn</label>
                <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập email của bạn" required />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tin nhắn của bạn</label>
                <textarea className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows="4" placeholder="Nhập tin nhắn của bạn" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Gửi tin nhắn
            </button>
        </form>
        </div>
    );
}