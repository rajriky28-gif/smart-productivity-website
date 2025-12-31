import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer id="contact" className="py-24 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-20">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <img src={logo} alt="Smart Productivity Logo" className="w-16 h-16 object-contain brightness-0 invert" />
                            <h2 className="text-3xl font-black tracking-tighter uppercase">Smart Productivity</h2>
                        </div>
                        <p className="text-gray-500 max-w-sm mb-8">
                            Crafting elite digital tools for the modern professional. Efficiency is our obsession. Minimalist is our medium.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-white">Products</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><Link to="/stride" className="hover:text-white transition-colors uppercase tracking-widest">Stride</Link></li>
                            <li><Link to="/upcoming" className="hover:text-white transition-colors uppercase tracking-widest">Upcoming</Link></li>
                            <li><Link to="/roadmap" className="hover:text-white transition-colors uppercase tracking-widest">Roadmap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-white">Company</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><Link to="/products" className="hover:text-white transition-colors uppercase tracking-widest">Products</Link></li>
                            <li><Link to="/stride" className="hover:text-white transition-colors uppercase tracking-widest">Stride</Link></li>
                            <li><Link to="/philosophy" className="hover:text-white transition-colors uppercase tracking-widest">Philosophy</Link></li>
                            <li><Link to="/impact" className="hover:text-white transition-colors uppercase tracking-widest">Impact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-white">Support</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><Link to="/privacy" className="hover:text-white transition-colors uppercase tracking-widest">Privacy</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors uppercase tracking-widest">Terms</Link></li>
                            <li><Link to="/help" className="hover:text-white transition-colors uppercase tracking-widest">Help Centre</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors uppercase tracking-widest">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600">
                        &copy; {new Date().getFullYear()} Smart Productivity. All Rights Reserved.
                    </p>
                    <div className="flex gap-8">
                        {['Twitter', 'LinkedIn', 'Github'].map(social => (
                            <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
