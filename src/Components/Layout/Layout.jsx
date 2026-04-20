import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="bg-darkBg min-h-screen flex justify-center font-cairo text-gray-300">
      {/* Background gradients for artistic feel */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-screen"></div>
         <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl opacity-50 mix-blend-screen"></div>
      </div>
      
      {/* Main Container Limiting the Website Width */}
      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-[1440px] mx-auto bg-darkBg shadow-2xl border-x border-white/[0.02]">
        <Navbar />
        <main className="flex-1 w-full pt-28 pb-10">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </div>
  );
}