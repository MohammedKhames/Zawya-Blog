import { useParams, Link } from "react-router-dom";
import apiResponse from "../../response";
import PostCard from "../../Components/PostCard/PostCard";
import CategoryBadge from "../../Components/CategoryBadge/CategoryBadge";

export default function PostDetails() {
  const { id } = useParams();
  
  const post = apiResponse.posts.find(
    (p) => p.slug === id || p.id === Number(id)
  );

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center pt-24">
        <h2 className="text-4xl font-black text-white mb-4">المقال غير موجود</h2>
        <p className="text-gray-400 mb-8">عذراً، لم نتمكن من العثور على المقال الذي تبحث عنه.</p>
        <Link to="/blog" className="bg-primary text-black font-bold px-8 py-3 rounded-full hover:bg-white transition-colors">
          العودة للمدونة
        </Link>
      </div>
    );
  }

  // Extract related posts
  const relatedPosts = apiResponse.posts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);
  
  // If not enough related posts, fallback to any other posts
  if (relatedPosts.length < 3) {
      const remaining = apiResponse.posts.filter(p => p.slug !== post.slug && !relatedPosts.find(rp => rp.slug === p.slug)).slice(0, 3 - relatedPosts.length);
      relatedPosts.push(...remaining);
  }

  // Extract content strings
  const contentBody = post.content || post.body || "";
  const blocks = contentBody.split('\n\n');
  const headings = blocks.filter(b => b.startsWith('## ')).map(b => b.replace('## ', ''));

  return (
    <article className="animate-fade-in pb-20 pt-28 px-4 container mx-auto max-w-[1200px]">
      
      {/* Cover Image & Header Top */}
      <header className="mb-12 relative rounded-3xl overflow-hidden glass-panel aspect-video sm:aspect-video md:aspect-[21/9] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-16">
          <div className="mb-4">
            <CategoryBadge category={post.category} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 leading-tight shadow-md">
            {post.title}
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-gray-300 max-w-3xl line-clamp-2 md:line-clamp-none">
            {post.excerpt}
          </p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Right Column - Main Content (First in RTL = Right) */}
        <div className="w-full lg:w-8/12 text-right pb-10">
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 mb-16">
            {blocks.map((block, index) => {
              if (block.startsWith('## ')) {
                const headingText = block.replace('## ', '');
                return (
                  <div key={index} className="flex items-center gap-3 mt-12 mb-6" id={`section-${index}`}>
                    <div className="bg-primary text-black w-10 h-10 rounded-[10px] flex items-center justify-center shadow-lg shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h2.5l1.5-2h8l1.5 2H20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white m-0">
                      {headingText}
                    </h2>
                  </div>
                );
              }
              return (
                <p key={index} className="leading-relaxed mb-6 text-xl">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Tags Box */}
          <div className="bg-[#111] border border-white/5 rounded-[24px] p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/20 w-8 h-8 rounded-lg flex items-center justify-center text-primary">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
              </div>
              <h4 className="text-white font-bold text-lg m-0">الوسوم</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {(post.tags || ["تصوير طبيعة", "إضاءة ساطعة", "المناظر"]).map((tag, idx) => (
                <span key={idx} className="px-5 py-2.5 bg-white/5 border border-white/5 hover:border-white/20 transition-colors rounded-full text-sm text-gray-400 cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Box */}
          <div className="bg-[#111] border border-white/5 rounded-[24px] p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 order-2 sm:order-1 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
            </div>
            
            <div className="flex items-center gap-3 order-1 sm:order-2">
              <h4 className="text-white font-bold text-lg m-0">شارك المقال</h4>
              <div className="bg-primary/20 w-8 h-8 rounded-lg flex items-center justify-center text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              </div>
            </div>
          </div>

          {/* Author Box */}
          <div className="bg-[#111] border border-white/5 rounded-[24px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="text-right flex-1 z-10 w-full mb-0">
              <p className="text-primary text-xs font-bold mb-1">كاتب المقال</p>
              <h3 className="text-xl md:text-2xl font-black text-white mb-1">{post.author.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{post.author.role}</p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                مصور محترف شغوف بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي.
              </p>
            </div>
            
            <div className="shrink-0 z-10 relative mt-0">
              <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-white/10 shadow-xl" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary rounded-full border-2 border-[#111] flex items-center justify-center">
                <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
          </div>
          
        </div>

        {/* Left Column - Sidebar (Desktop: Left, Mobile: Bottom) */}
        <div className="w-full lg:w-4/12 space-y-6">
          
          {/* Table of Contents Box */}
          <div className="bg-[#111] border border-white/5 rounded-[24px] p-6 lg:p-8 shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            
            <div className="flex items-center gap-3 mb-6 sm:mb-8 z-10 relative">
              <div className="bg-primary/20 w-8 h-8 rounded-lg flex items-center justify-center text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </div>
              <h3 className="text-white font-bold text-lg">محتويات المقال</h3>
            </div>
            
            <ul className="space-y-4 relative z-10">
              {headings.map((heading, idx) => (
                <li key={idx}>
                  <a href={`#section-${idx}`} className="flex items-center justify-between text-gray-400 hover:text-primary transition-colors text-sm group">
                    <span className="truncate max-w-[200px]">{heading}</span>
                    <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:bg-primary/20 group-hover:text-primary transition-colors shrink-0">
                      {idx + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta Boxes Container */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Date Box */}
            <div className="bg-[#111] border border-white/5 rounded-[24px] p-6 text-center">
              <div className="w-10 h-10 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <p className="text-white font-bold text-md mb-1">{post.date}</p>
              <p className="text-gray-500 text-xs font-semibold">تاريخ النشر</p>
            </div>

            {/* Read Time Box */}
            <div className="bg-[#111] border border-white/5 rounded-[24px] p-6 text-center">
              <div className="w-10 h-10 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p className="text-white font-bold text-md mb-1">{post.readTime}</p>
              <p className="text-gray-500 text-xs font-semibold">وقت القراءة</p>
            </div>
            
          </div>

          {/* Newsletter Box */}
          <div className="bg-[#111] border border-white/5 rounded-[24px] p-8 text-center relative overflow-hidden">
            {/* Orange gradient pulse for aesthetic */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[80px]"></div>
            
            <div className="w-16 h-16 mx-auto bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-[0_0_20px_rgba(255,165,0,0.3)] relative z-10">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">لا تفوّت جديدنا</h3>
            <p className="text-gray-400 text-sm mb-6 relative z-10">
              اشترك للحصول على أحدث المقالات والنصائح حصرياً.
            </p>
            
            <button className="w-full bg-primary text-black font-bold px-6 py-4 rounded-xl hover:bg-white transition-all duration-300 relative z-10 shadow-[0_0_15px_rgba(255,165,0,0.4)]">
              تصفح المزيد
            </button>
          </div>
          
        </div>

      </div>

      {/* Recommended Posts Section */}
      <div className="mt-20 pt-16 border-t border-white/10">
        <div className="flex items-center justify-between mb-10 w-full">
          <Link to="/blog" className="text-primary font-bold hover:text-white transition-colors flex items-center gap-2">
            عرض الكل <span className="text-xl font-black">&gt;</span>
          </Link>
          
          <div className="flex items-center gap-4 text-right">
            <div>
              <h3 className="text-2xl font-black text-white mb-1">مقالات قد تعجبك</h3>
              <p className="text-gray-400 text-sm">استكشف المزيد من المحتوى المميز</p>
            </div>
            <div className="bg-primary/10 border border-primary/30 w-12 h-12 rounded-xl flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 12h2v5H7zm4-3h2v8h-2zm4-4h2v12h-2z"/></svg>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((rp) => (
            <PostCard key={rp.id} post={rp} layout="grid" />
          ))}
        </div>
      </div>

    </article>
  );
}