import React from 'react';
import { Link } from 'react-router-dom';
import apiResponse from '../../response';
import PostCard from '../../Components/PostCard/PostCard';
import CategoryBadge from '../../Components/CategoryBadge/CategoryBadge';

export default function Home() {
  const { posts, siteInfo } = apiResponse;
  
  // Featured posts (mimicking the "مقالات مختارة" layout)
  const featuredPosts = posts.filter(post => post.featured).slice(0, 2);
  // Latest posts (mimicking the "أحدث المقالات" layout)
  const latestPosts = posts.slice(2, 5); // Just taking 3 distinct posts

  return (
    <div className="space-y-32">
      {/* 1. Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center pt-20 pb-16 min-h-[60vh] animate-fade-in-up">
        {/* Faint background grid mimicking the screenshot */}
        <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02MCAwaC0xdjYwaDFWME0wIDU5aDYwVjAwaDF2NjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="mb-10 px-4 py-2 rounded-full border border-white/10 glass-panel flex items-center gap-2 text-sm text-gray-300">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            مرحباً بك في {siteInfo.name}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            اكتشف <span className="text-primary">فن</span><br/>
            التصوير الفوتوغرافي
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/blog" className="px-8 py-3 rounded-full bg-primary text-black font-bold hover:bg-white transition-colors duration-300 flex items-center gap-2 justify-center w-max mx-auto sm:mx-0">
              استكشف المقالات <span className="text-lg font-black">&gt;</span>
            </Link>
            <Link to="/about" className="px-8 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors duration-300 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              اعرف المزيد
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Selected Posts (مقالات مختارة) */}
      <section className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-right">
          <Link to="/blog" className="order-2 md:order-1 px-6 py-2 rounded-xl bg-primary text-black font-bold hover:bg-white transition-colors flex items-center gap-2 justify-center">
            عرض الكل <span className="font-black">&gt;</span>
          </Link>
          <div className="order-1 md:order-2 mb-6 md:mb-0">
            <h2 className="text-3xl font-black text-white mb-2">مقالات مختارة</h2>
            <p className="text-gray-400">محتوى منتقى لبدء رحلة تعلمك</p>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-10">
          {featuredPosts.map((post) => (
            <div key={post.id} className="glass-panel border border-white/10 rounded-3xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[450px] hover:shadow-[0_0_20px_rgba(212,175,55,0.05)] transition-shadow">
              
              {/* Image Side (Right in RTL DOM order) */}
              <div className="w-full lg:w-1/2 h-64 lg:h-full relative shrink-0">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <span className="text-[10px]">★</span> مميز
                </div>
              </div>

              {/* Text Side (Left in RTL DOM order) */}
              <div className="p-8 lg:p-12 w-full lg:w-1/2 flex flex-col justify-center relative">
                <div className="flex items-center gap-4 mb-6">
                  <CategoryBadge category={post.category} />
                  <span className="text-gray-500 whitespace-nowrap text-sm"><svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>{post.readTime}</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 hover:text-primary transition-colors hover:cursor-pointer line-clamp-2 md:line-clamp-3">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 mb-8 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-white/20"/>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-darkBg"></span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">{post.author.name}</p>
                      <p className="text-gray-500 text-xs">{post.date}</p>
                    </div>
                  </div>

                  <Link to={`/post/${post.slug}`} className="text-primary font-bold hover:text-white flex items-center gap-2">
                    اقرأ المقال <span className="text-xl font-black">&gt;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Latest Posts (أحدث المقالات) */}
      <section className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <Link to="/blog" className="text-primary font-bold hover:text-white flex items-center gap-2 mb-4 md:mb-0">
            عرض جميع المقالات <span className="text-xl font-black">&gt;</span>
          </Link>
          <div className="text-right">
            <h2 className="text-3xl font-black text-white mb-2">أحدث المقالات</h2>
            <p className="text-gray-400">محتوى جديد طازج من المطبعة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <div key={post.id} className="glass-panel border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-56">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4">
                  <CategoryBadge category={post.category} />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span><svg className="w-3 h-3 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {post.readTime}</span>
                </div>

                <Link to={`/post/${post.slug}`}>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-relaxed line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-white text-sm font-bold">{post.author.name}</p>
                      <p className="text-gray-500 text-xs">{post.author.role}</p>
                    </div>
                  </div>
                  
                  <Link to={`/post/${post.slug}`} className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors font-bold pb-0.5">
                    &gt;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 z-10 relative pb-20">
        <div className="glass-panel border border-white/5 rounded-[32px] md:rounded-[40px] p-6 sm:p-10 md:p-16 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20 transform -rotate-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">اشترك في نشرتنا الإخبارية</h2>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto">
              احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني
            </p>

            <form className="w-full max-w-lg flex flex-col sm:flex-row gap-4 mb-8">
              <input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني" 
                className="flex-grow bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 text-right"
              />
              <button 
                type="submit" 
                className="bg-primary text-black font-bold px-8 py-4 rounded-xl hover:bg-white transition-colors whitespace-nowrap"
              >
                اشترك الآن
              </button>
            </form>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2">
                <div className="flex -space-x-2 space-x-reverse mr-2">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop" className="w-6 h-6 rounded-full border border-darkBg" />
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop" className="w-6 h-6 rounded-full border border-darkBg" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop" className="w-6 h-6 rounded-full border border-darkBg" />
                </div>
                انضم لـ +10,000 مصور
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600 hidden md:block"></span>
              <span>بدون إزعاج</span>
              <span className="w-1 h-1 rounded-full bg-gray-600 hidden md:block"></span>
              <span>إلغاء الاشتراك في أي وقت</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
