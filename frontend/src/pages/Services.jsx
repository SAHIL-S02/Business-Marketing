import { MonitorSmartphone, SearchCode, PenTool, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const servicesList = [
  {
    title: 'Social Media Management',
    description: 'DOMINATE THE FEED. We orchestrate consistent, high-converting social media strategies across Instagram, TikTok, LinkedIn, and X.',
    icon: <Share2 className="h-8 w-8 text-pink-500" />,
    color: 'bg-pink-50 border-pink-200',
    hover: 'hover:shadow-pink-200/50'
  },
  {
    title: 'Search Engine Optimization',
    description: 'BE FOUND INSTANTLY. Deep-dive technical SEO and keyword blueprints that land your business squarely on Google Page 1.',
    icon: <SearchCode className="h-8 w-8 text-blue-500" />,
    color: 'bg-blue-50 border-blue-200',
    hover: 'hover:shadow-blue-200/50'
  },
  {
    title: 'Web Design & Performance',
    description: 'CONVERT TRAFFIC INTENT. We build stunning, fast-loading Landing Pages that turn passing visitors into paying customers.',
    icon: <MonitorSmartphone className="h-8 w-8 text-indigo-500" />,
    color: 'bg-indigo-50 border-indigo-200',
    hover: 'hover:shadow-indigo-200/50'
  },
  {
    title: 'Content & Copywriting',
    description: 'SPEAK TO THEIR SOULS. Engaging blog posts, magnetic email sequences, and persuasive ad copy written to sell.',
    icon: <PenTool className="h-8 w-8 text-emerald-500" />,
    color: 'bg-emerald-50 border-emerald-200',
    hover: 'hover:shadow-emerald-200/50'
  }
];

const Services = () => {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Elite Services</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Laser-focused strategies crafted to establish digital superiority for your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-3xl border ${service.color} transition-all duration-300 shadow-lg ${service.hover} hover:-translate-y-1 bg-white`}
            >
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-white border ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center bg-slate-900 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Ready to transform your digital presence?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 relative z-10 text-lg">
            Whether you need a full digital overhaul or targeted growth in specific channels, our team is standing by to deliver.
          </p>
          <Link to="/order" className="inline-block px-8 py-4 bg-white text-slate-900 hover:bg-blue-50 rounded-full font-bold text-lg transition-transform duration-300 transform hover:scale-105 shadow-xl relative z-10">
            Request A Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
