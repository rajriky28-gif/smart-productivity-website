import { motion } from 'framer-motion';
import { Menu, X, User as UserIcon, LogOut, ChevronDown, Layout } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Philosophy', href: '/philosophy' },
    { name: 'Impact', href: '/impact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Stride', href: '/stride' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-xl font-black tracking-tighter hover:opacity-70 transition-opacity whitespace-nowrap">
            <img src={logo} alt="Smart Productivity Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain brightness-0 invert" />
            <span>SMART PRODUCTIVITY</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, i) => (
            <div key={link.name}>
              <Link
                to={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors ${location.pathname === link.href ? 'text-white' : 'text-white/40'}`}
              >
                {link.name}
              </Link>
            </div>
          ))}

          {/* Auth Button */}
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 hover:bg-white/10 transition-all group"
                >
                  <UserIcon size={14} className="text-white/40 group-hover:text-white transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Account</span>
                  <ChevronDown size={14} className={`text-white/40 group-hover:text-white transition-all ${showAccountMenu ? 'rotate-180' : ''}`} />
                </button>

                {showAccountMenu && (
                  <div className="absolute top-full right-0 mt-4 w-64 bg-black border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2 block">Identity</span>
                      <div className="text-xs font-bold text-white truncate">{user.email}</div>
                    </div>
                    {user.email === 'rajriky28@gmail.com' && (
                      <Link
                        to="/admin"
                        onClick={() => setShowAccountMenu(false)}
                        className="w-full flex items-center gap-3 py-3 border-t border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
                      >
                        <Layout size={14} />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut(auth);
                        setShowAccountMenu(false);
                      }}
                      className="w-full flex items-center gap-3 py-3 border-t border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-white text-black px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-200 transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {user ? (
            <Link to="/auth" className="text-white/40 hover:text-white">
              <UserIcon size={20} />
            </Link>
          ) : (
            <Link to="/auth" className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none">
              Login
            </Link>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 px-6 py-12"
        >
          <div className="flex flex-col space-y-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black uppercase tracking-widest text-white hover:text-white/60 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
