import { motion } from 'framer-motion';

const Vision = () => {
    return (
        <section id="vision" className="py-32 bg-white text-black overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-20">
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                    >
                        <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-none text-black">
                            PURE<br />INTENT
                        </h2>
                        <p className="text-2xl font-bold mb-8 leading-tight">
                            We don't build features. We build flow.
                        </p>
                        <p className="text-gray-600 mb-12 max-w-lg">
                            Smart Productivity was founded on a simple realization: modern software is too loud. We create tools that respect your attention and augment your capabilities without the clutter.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-12 h-[2px] bg-black mt-3" />
                            <div className="font-black uppercase tracking-widest text-sm">Our Mission</div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1 relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                    >
                        <div className="w-full aspect-[4/5] bg-black relative">
                            <div className="absolute inset-0 flex items-center justify-center text-[200px] font-black mix-blend-difference text-white opacity-10">SP</div>
                            <div className="absolute bottom-12 left-12 right-12">
                                <div className="text-white text-4xl font-black uppercase tracking-tighter leading-none mb-4">Focus is the new currency.</div>
                                <div className="w-1/3 h-2 bg-white" />
                            </div>
                        </div>
                        {/* Floating Accent */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-40 h-40 border-2 border-black hidden md:block"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Vision;
