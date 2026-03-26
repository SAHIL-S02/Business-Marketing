import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, BarChart, Calendar, Layers } from 'lucide-react';
import { projectsData } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="pt-32 min-h-screen bg-slate-50 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Project not found.</h2>
        <Link to="/portfolio" className="text-blue-600 mt-4 inline-block hover:underline">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 font-bold tracking-wide rounded-full text-sm mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {project.title} Case Study
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="bg-slate-900 py-16 mb-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-700">
            {project.results.map((res, i) => (
              <div key={i} className="px-4 text-center">
                <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2 drop-shadow-md">{res.metric}</div>
                <div className="text-sm md:text-base font-medium text-slate-300 uppercase tracking-widest">{res.label}</div>
              </div>
            ))}
            <div className="px-4 text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">{project.timeline}</div>
              <div className="text-sm md:text-base font-medium text-slate-300 uppercase tracking-widest">Timeline</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-slate-100 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <BarChart className="h-8 w-8 text-red-500" />
            <h2 className="text-3xl font-bold text-slate-900">The Challenge</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            {project.challenge}
          </p>

          <div className="w-full h-px bg-slate-200 mb-12"></div>

          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <h2 className="text-3xl font-bold text-slate-900">Our Solution</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            {project.solution}
          </p>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to achieve similar results?</h3>
          <Link to="/order" className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/50 rounded-full font-bold text-lg transition-transform transform hover:-translate-y-1">
            Start Your Project Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
