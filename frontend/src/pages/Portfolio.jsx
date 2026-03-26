import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projects';

const Portfolio = () => {
  return (
    <div className="pt-24 pb-20 bg-slate-900 min-h-screen text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Our Recent Work</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Explore our curated selection of in-depth case studies where strategy meets flawless execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              className={`group flex flex-col ${index % 2 !== 0 ? 'lg:mt-16' : ''}`}
            >
              <Link to={`/portfolio/${project.id}`}>
                <div className="relative overflow-hidden rounded-3xl mb-6 shadow-2xl bg-slate-800 border border-slate-700/50 cursor-pointer">
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button className="absolute top-6 right-6 h-12 w-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-20 hover:bg-blue-600 hover:border-blue-500">
                    <ArrowUpRight className="text-white h-5 w-5" />
                  </button>
                </div>
              </Link>
              <div className="px-2">
                <span className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-2 block">
                  {project.category}
                </span>
                <Link to={`/portfolio/${project.id}`}>
                  <h3 className="text-3xl font-bold text-white mb-3 hover:text-blue-400 transition-colors cursor-pointer inline-block">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-slate-400 text-lg leading-relaxed mb-4">
                  {project.shortDescription}
                </p>
                <Link to={`/portfolio/${project.id}`} className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wide text-sm">
                  View Full Case Study <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
