import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

export const CompletionScreen = ({ onRestart }) => {
    return (
        <section
            data-testid="completion-screen"
            className="relative max-w-3xl mx-auto px-6 sm:px-10 py-20 md:py-28 text-center"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-64 h-64 mx-auto mb-14"
            >
                <div className="absolute inset-0 rounded-full bg-sage/40 blur-3xl animate-breathe-slow" />
                <div className="absolute inset-6 rounded-full bg-gold/50 blur-3xl animate-breathe" />
                <div className="absolute inset-16 rounded-full bg-coral/40 blur-2xl animate-float-y" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full glass-strong flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_24px_rgba(224,177,118,0.8)] animate-breathe" />
                    </div>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="text-[11px] uppercase tracking-[0.32em] text-gold mb-5"
            >
                Session complete
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.9 }}
                className="font-serif text-5xl sm:text-6xl text-cream leading-tight"
                style={{ fontVariationSettings: '"SOFT" 60, "opsz" 144' }}
            >
                Thank you for{" "}
                <span
                    className="italic text-gold"
                    style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
                >
                    arriving
                </span>
                .
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-6 text-base sm:text-lg text-creamSoft max-w-xl mx-auto leading-relaxed"
            >
                Carry a little of this quiet with you. Return whenever you
                would like to land again.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-12"
            >
                <button
                    data-testid="restart-session-button"
                    onClick={onRestart}
                    className="btn-gold group inline-flex items-center gap-3 rounded-full pl-7 pr-3 py-3 text-base font-medium"
                >
                    Begin another session
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-night text-gold transition-transform duration-500 group-hover:rotate-[-180deg]">
                        <RotateCcw size={16} strokeWidth={1.75} />
                    </span>
                </button>
            </motion.div>
        </section>
    );
};

export default CompletionScreen;
