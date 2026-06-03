import { motion } from "framer-motion";

export const LoadingScreen = () => {
    return (
        <motion.section
            data-testid="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[80vh] flex flex-col items-center justify-center px-6"
        >
            <div className="relative w-80 h-80 flex items-center justify-center">
                <div className="absolute w-72 h-72 rounded-full bg-sage/40 blur-3xl animate-breathe-slow" />
                <div className="absolute w-56 h-56 rounded-full bg-gold/40 blur-3xl animate-breathe" />
                <div className="absolute w-32 h-32 rounded-full bg-coral/40 blur-2xl animate-float-y" />
                <div className="relative w-28 h-28 rounded-full glass-strong flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_24px_rgba(224,177,118,0.8)] animate-breathe" />
                </div>
            </div>
            <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="mt-12 font-serif text-3xl sm:text-4xl text-cream italic"
                style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
            >
                Curating your peace&hellip;
            </motion.p>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 1.2 }}
                className="mt-4 text-xs uppercase tracking-[0.32em] text-gold"
            >
                Gathering soft sounds for you
            </motion.p>
        </motion.section>
    );
};

export default LoadingScreen;
