export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-sm">© {new Date().getFullYear()} Developed by <span className="font-bold text-blue-400">Khanh Bao</span>. All rights reserved.</p>
                <p className="text-xs mt-2">Follow me on 
                    <a href="https://tiktok.com" className="text-blue-400 hover:underline ml-1">Tiktok</a>, 
                    <a href="https://web.facebook.com/kbao2607/?locale=vi_VN" className="text-blue-400 hover:underline ml-1">Facebook</a>, 
                    <a href="https://www.instagram.com/_kbaooo_/" className="text-blue-400 hover:underline ml-1">Instagram</a>
                </p>
            </div>
        </footer>
    )
}
