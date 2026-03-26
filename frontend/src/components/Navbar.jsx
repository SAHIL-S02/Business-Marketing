import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, LogOut, User } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  if (user) {
    if (user.role === 'admin') {
      links.push({ name: 'Admin Hub', path: '/admin' });
    } else {
      links.push({ name: 'My Orders', path: '/dashboard' });
      links.push({ name: 'Request Service', path: '/order' });
    }
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full z-50 glass top-0 left-0 right-0 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Elevate<span className="text-blue-600">Digital</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex items-baseline space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-blue-600 transition-colors duration-300'
                  } px-3 py-2 text-sm font-medium`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                    <User className="h-4 w-4" /> {user.name}
                  </span>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-full transition-colors"
                  >
                    Log Out <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium text-sm">Log In</Link>
                  <Link to="/register" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow-sm transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`${
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-slate-200 mt-2 pt-2">
              {user ? (
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50">Log In</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
