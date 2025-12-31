import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.03, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-[40vw] md:text-[40vw] font-black uppercase tracking-tighter leading-none select-none whitespace-nowrap"
                >
                    SMART
                </motion.div>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                />
            </div>

            <div className="container relative z-10 text-center px-6 -mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="inline-block px-6 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.6em] mb-10 bg-white/5 text-white/40">
                        Evolving Efficiency
                    </span>
                    <h1 className="text-4xl md:text-[10rem] font-black mb-10 leading-[0.9] tracking-tighter uppercase">
                        SMART<br className="md:hidden" /> PRODUCTIVITY
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-2xl mb-14 font-medium leading-tight">
                        Precision instruments for high-performance individuals.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link
                            to="/products"
                            className="w-full md:w-auto px-16 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs shadow-[0_20px_50px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95 text-center"
                        >
                            Explore Our Tools
                        </Link>
                        <Link
                            to="/philosophy"
                            className="w-full md:w-auto px-16 py-6 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-xs transition-all backdrop-blur-sm hover:bg-white/5 text-center"
                        >
                            Read Philosophy
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 left-0 w-full flex justify-center pointer-events-none">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
