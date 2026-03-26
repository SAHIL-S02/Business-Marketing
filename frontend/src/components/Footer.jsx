import { Rocket, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-xl text-white">ElevateDigital</span>
            </div>
            <p className="text-sm text-slate-400 mb-4 max-w-xs">
              A student-led digital marketing agency dedicated to accelerating businesses with dynamic and measurable scaling strategies.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-400 text-sm transition-colors">Home</a></li>
              <li><a href="/services" className="hover:text-blue-400 text-sm transition-colors">Services</a></li>
              <li><a href="/portfolio" className="hover:text-blue-400 text-sm transition-colors">Portfolio</a></li>
              <li><a href="/order" className="hover:text-blue-400 text-sm transition-colors">Order Now</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-blue-500" /> hello@elevatedigital.edu
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-blue-500" /> 1-800-ELEVATE
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-blue-500" /> 123 University Ave, Silicon Valley
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} ElevateDigital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
