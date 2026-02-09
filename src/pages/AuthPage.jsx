import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
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

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
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

                <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[8px] uppercase tracking-widest font-black text-white/20">OR</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <button
                    disabled={loading}
                    onClick={handleGoogleSignIn}
                    className="w-full mt-8 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-4 group"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                        <path fill="none" d="M0 0h24v24H0z" />
                    </svg>
                    Continue with Google
                </button>

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
