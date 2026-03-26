import { ArrowRight, BarChart3, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-16 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')] mix-blend-overlay opacity-30 bg-cover bg-center z-0" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
            Turbocharge Your Growth.
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light max-w-2xl mx-auto">
            We are the student-led accelerator turning your business aspirations into measurable results through data-driven digital marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2">
              Start a Project <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/portfolio" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-lg transition-all duration-300">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Features Value Prop */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800">Why Choose ElevateDigital?</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-white rounded-2xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
            <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Execution</h3>
            <p className="text-slate-600">
              Our dynamic team of digital natives crafts and executes campaigns swiftly, matching the speed of today's markets.
            </p>
          </div>
          
          <div className="p-8 bg-white rounded-2xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
            <div className="h-14 w-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Data-Driven Strategy</h3>
            <p className="text-slate-600">
              Every move is backed by analytics. We optimize continuously to ensure your ROI reaches its maximum potential.
            </p>
          </div>
          
          <div className="p-8 bg-white rounded-2xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
            <div className="h-14 w-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Student Led Innovation</h3>
            <p className="text-slate-600">
              Capitalize on the freshest perspectives and newest platform trends brought directly from the campus forefront.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
