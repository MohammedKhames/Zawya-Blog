import { Link } from "react-router-dom";
import apiResponse from "../../response";

export default function Footer() {
  const { siteInfo, categories } = apiResponse;

  return (
    <footer className="border-t border-white/5 bg-black pt-20 pb-8 mt-20 w-full font-sans">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-right">
          
          {/* Logo Column (Naturally Rightmost in RTL) */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center transform transition-transform duration-300 shadow-[0_0_20px_rgba(255,165,0,0.3)]">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h2.5l1.5-2h8l1.5 2H20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white">{siteInfo.name}</h2>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              مدونة متخصصة في فن التصوير الفوتوغرافي.
              نشارك معكم أسرار المحترفين ونصائح عملية
              لتطوير مهاراتكم.
            </p>
            
            <div className="flex gap-3">
              {Object.entries(siteInfo.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <span className="capitalize text-xs font-semibold">{platform.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-primary"></div>
              <h3 className="text-white font-bold text-lg whitespace-nowrap">استكشف</h3>
            </div>
            
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-primary transition-colors inline-block">الرئيسية</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors inline-block">المدونة</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors inline-block">من نحن</Link></li>
            </ul>
          </div>

          {/* Categories Links */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-primary"></div>
              <h3 className="text-white font-bold text-lg whitespace-nowrap">التصنيفات</h3>
            </div>
            
            <ul className="space-y-4 text-gray-400">
              {categories.slice(0, 4).map(cat => (
                <li key={cat.name}>
                  <Link to={`/blog?category=${cat.name}`} className="hover:text-primary transition-colors inline-block">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter (Leftmost in RTL) */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-primary"></div>
              <h3 className="text-white font-bold text-lg whitespace-nowrap">ابقى على اطلاع</h3>
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              اشترك للحصول على أحدث المقالات والتحديثات.
            </p>
            
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 text-right outline-none placeholder-gray-600"
              />
              <button 
                type="submit" 
                className="w-full bg-primary text-black font-bold px-4 py-3 rounded-xl hover:bg-white transition-colors"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 pb-2">
          <div className="flex items-center gap-1 order-2 md:order-1 mt-4 md:mt-0">
            <span>© {new Date().getFullYear()} {siteInfo.name} صنع بكل</span>
            <span className="text-primary mx-1">❤</span>
            <span>جميع الحقوق محفوظة</span>
          </div>

          <div className="flex gap-6 order-1 md:order-2">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الخدمة</a>
          </div>
        </div>
      </div>
    </footer>
  );
}