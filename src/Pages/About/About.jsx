import React from "react";
import { Link } from "react-router-dom";
import apiResponse from "../../response";

export default function About() {
  const { siteInfo, posts } = apiResponse;

  // Fake stats for the stats section
  const stats = [
    { value: "15+", label: "تصنيف", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { value: "50+", label: "كاتب خبير", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" },
    { value: "500+", label: "مقالة منشورة", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
    { value: "100000+", label: "قارئ شهرياً", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
  ];

  const values = [
    { title: "دائماً محدث", desc: "أحدث الاتجاهات وأفضل الممارسات", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
    { title: "المجتمع", desc: "تعلم مع آلاف المصورين", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { title: "تركيز عملي", desc: "أمثلة واقعية يمكنك تطبيقها اليوم", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { title: "الجودة أولاً", desc: "محتوى مدروس ومكتوب بخبرة", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }
  ];

  // Extract unique authors from posts
  const uniqueAuthors = [];
  const authorNames = new Set();
  
  if (posts) {
    posts.forEach(post => {
      if (post.author && !authorNames.has(post.author.name)) {
        uniqueAuthors.push(post.author);
        authorNames.add(post.author.name);
      }
    });
  }

  return (
    <div className="pt-24 min-h-screen text-right">

      {/* Section 1: Hero & Stats */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px] z-0"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 border border-primary/30 rounded-full px-4 py-1.5 mb-6 bg-darkBg/50 text-sm">
            <span className="text-primary">من نحن</span>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-75"></span>
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            مهمتنا هي <span className="text-primary">الإعلام والإلهام</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم. 
            نحن شغوفون بمشاركة المعرفة ومساعدة المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto relative z-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-6 text-center hover:bg-[#222] transition-colors">
              <div className="w-10 h-10 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-primary mb-1" dir="ltr">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            <span className="text-primary mr-2">|</span> قيمنا <span className="text-primary ml-2">|</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">المبادئ التي توجه كل ما نقوم بإنشائه</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((v, idx) => (
            <div key={idx} className="bg-[#111] border border-white/5 rounded-3xl p-8 text-center hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={v.icon} />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Authors */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-primary/30 rounded-full px-4 py-1.5 mb-6 bg-darkBg/50 text-sm">
            <span className="text-primary">فريقنا</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">تعرف على كتابنا</h2>
          <p className="text-gray-400 text-sm md:text-base">فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع المجتمع.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {uniqueAuthors.map((author, idx) => (
            <div key={idx} className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 text-center hover:shadow-[0_0_20px_rgba(212,175,55,0.05)] transition-shadow">
              <div className="relative w-28 h-28 mx-auto mb-6">
                <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover border-4 border-[#1A1A1A] shadow-xl" />
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary rounded-full border-2 border-[#1A1A1A] flex items-center justify-center">
                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
              </div>
              <h3 className="text-white font-bold text-xl mb-1">{author.name}</h3>
              <p className="text-primary text-sm font-semibold mb-6">{author.role}</p>
              
              <div className="flex justify-center gap-3">
                {[...Array(3)].map((_, i) => (
                  <button key={i} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 hover:bg-primary/20 hover:text-primary transition-colors">
                    {i === 0 && <span className="font-bold font-serif">in</span>}
                    {i === 1 && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>}
                    {i === 2 && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Banner */}
      <section className="container mx-auto px-4 py-8 mb-16">
        <div className="bg-gradient-to-r from-[#cc5500] via-primary to-[#ff8c00] rounded-[40px] p-12 md:p-16 text-center max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-md">لديك أسئلة؟ دعنا نتحدث!</h2>
            <p className="text-white/90 font-medium text-sm md:text-base max-w-2xl mx-auto mb-10 drop-shadow">
              نحب أن نسمع منك. سواء كان لديك سؤال حول محتوانا، أو تريد المساهمة، أو تريد فقط إلقاء التحية، لا تتردد في التواصل.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-black text-white font-bold px-8 py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors min-w-[180px]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                تواصل معنا
              </button>
              <Link to="/blog" className="bg-transparent border border-white/30 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-white/10 transition-colors min-w-[180px]">
                تصفح المقالات
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
