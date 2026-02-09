import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                await updateProfile(userCredential.user, {
                    displayName: formData.name
                });
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6 py-20">
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                <div className="text-[20vw] font-black opacity-[0.02] select-none uppercase tracking-tighter whitespace-nowrap">
                    {isLogin ? 'Access' : 'Protocol'}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="mb-12 text-center">
                    <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 mb-4 block">Identity Console</span>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-tight">
                        {isLogin ? 'Login' : 'Create Account'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                key="name"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative"
                            >
                                <label className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2 block">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white focus:outline-none focus:border-white transition-all font-medium placeholder:text-white/10"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative">
                        <label className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2 block">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white focus:outline-none focus:border-white transition-all font-medium placeholder:text-white/10"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2 block">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white focus:outline-none focus:border-white transition-all font-medium placeholder:text-white/10"
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-3 text-red-500"
                        >
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span className="text-xs font-bold uppercase tracking-widest">{error}</span>
                        </motion.div>
                    )}

                    <button
                        disabled={loading}
                        className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-gray-200 transition-all flex items-center justify-center gap-4 group"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                {isLogin ? 'Initialize Session' : 'Register Protocol'}
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-white transition-colors"
                    >
                        {isLogin ? "Don't have an account? Create Protocol" : "Already registered? Initialize Session"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
