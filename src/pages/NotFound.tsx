import { Compass, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-b from-slate-50 to-blue-50/50 p-4">
      <div className="w-full max-w-lg text-center space-y-8">

        {/* --- Illustration --- */}
        <div className="relative inline-block">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full" />

          <div className="relative bg-white p-6 rounded-3xl shadow-xl shadow-blue-100/50 border border-white">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <Compass size={64} className="text-blue-600 animate-pulse" strokeWidth={1.5} />
            </div>

            {/* Decorative badge */}
            <div className="absolute -bottom-3 -right-3 bg-white px-3 py-1 rounded-full shadow-md border border-slate-100 text-xs font-bold text-slate-800">
              Error 404
            </div>
          </div>
        </div>

        {/* --- Content --- */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Bạn đã đi lạc hướng?
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến một địa chỉ mới.
          </p>
        </div>

        {/* --- Actions --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Go Home Button */}
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            <Home size={18} />
            Quay về Dashboard
          </Link>

          {/* Go Back Button (Dùng window.history.back() hoặc link về trang trước) */}
          {/* Lưu ý: Trong Next.js App Router, nút back thường cần Client Component. 
              Ở đây tôi để link về trang tra cứu như một gợi ý thay thế an toàn */}
          
        </div>

        {/* --- Footer Branding --- */}
        <div className="pt-8 border-t border-slate-200/60 w-2/3 mx-auto">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            UniOrien System
          </p>
        </div>
      </div>
    </div>
  )
}