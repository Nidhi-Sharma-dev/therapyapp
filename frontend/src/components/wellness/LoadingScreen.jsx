import { motion } from "framer-motion";

export const LoadingScreen = () => {
    return (
        <motion.section
            data-testid="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-[80vh] flex flex-col items-center justify-center px-6"
        >
            <div className="relative w-72 h-72 flex items-center justify-center">
                <div className="absolute w-64 h-64 rounded-full bg-sage/30 blur-3xl animate-breathe-slow" />
                <div className="absolute w-48 h-48 rounded-full bg-rose/40 blur-2xl animate-breathe" />
                <div className="absolute w-28 h-28 rounded-full bg-sand blur-xl animate-float-y" />
                <div className="relative w-24 h-24 rounded-full border border-line bg-canvas/80 backdrop-blur-xl flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-ink animate-breathe" />
                </div>
            </div>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-10 font-serif text-2xl sm:text-3xl text-ink italic"
            >
                Curating your peace&hellip;
            </motion.p>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.2 }}
                className="mt-3 text-sm uppercase tracking-[0.28em] text-inkSoft"
            >
                Gathering soft sounds for you
            </motion.p>
        </motion.section>
    );
};

export default LoadingScreen;
