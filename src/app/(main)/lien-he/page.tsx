import {
  AtSign,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  User,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            Liên hệ với tôi
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tôi luôn sẵn sàng lắng nghe và kết nối với bạn. Hãy liên hệ để cùng
            nhau tạo ra những điều tuyệt vời!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Section */}
          <div className="space-y-8">
            <div className="bg-card border rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-primary" />
                Kết nối với tôi
              </h2>
              <div className="space-y-4">
                <a
                  href="mailto:nbaokhanh1243@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      nbaokhanh1243@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://web.facebook.com/?locale=vi_VN&_rdc=1&_rdr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="bg-blue-500/10 p-3 rounded-full group-hover:bg-blue-500/20 transition-colors">
                    <Facebook className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Facebook</h3>
                    <p className="text-sm text-muted-foreground">Khanh Bao</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="bg-pink-500/10 p-3 rounded-full group-hover:bg-pink-500/20 transition-colors">
                    <Instagram className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Instagram</h3>
                    <p className="text-sm text-muted-foreground">@khanh_bao</p>
                  </div>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="bg-black/10 dark:bg-white/10 p-3 rounded-full group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">TikTok</h3>
                    <p className="text-sm text-muted-foreground">@khanh_bao</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-3">
                Thời gian phản hồi
              </h3>
              <p className="text-sm text-muted-foreground">
                Tôi thường phản hồi email trong vòng 24 giờ và các tin nhắn khác
                trong vài giờ.
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-card border rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Send className="h-6 w-6 text-primary" />
              Gửi tin nhắn
            </h2>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Tên của bạn
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Nhập tên của bạn"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <AtSign className="h-4 w-4" />
                  Email của bạn
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Tin nhắn của bạn
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  rows={5}
                  placeholder="Chia sẻ suy nghĩ của bạn..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-primary/5 rounded-xl border border-primary/20">
          <h3 className="text-xl font-semibold text-primary mb-2">
            Bạn có dự án thú vị?
          </h3>
          <p className="text-muted-foreground">
            Hãy liên hệ với tôi để thảo luận về cách chúng ta có thể cùng nhau
            biến ý tưởng thành hiện thực!
          </p>
        </div>
      </div>
    </div>
  );
}
