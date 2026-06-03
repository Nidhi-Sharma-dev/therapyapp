import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

export const CompletionScreen = ({ onRestart }) => {
    return (
        <section
            data-testid="completion-screen"
            className="max-w-3xl mx-auto px-6 sm:px-10 py-20 md:py-28 text-center"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-56 h-56 mx-auto mb-12"
            >
                <div className="absolute inset-0 rounded-full bg-sage/30 blur-3xl animate-breathe-slow" />
                <div className="absolute inset-6 rounded-full bg-rose/40 blur-2xl animate-breathe" />
                <div className="absolute inset-16 rounded-full bg-sand blur-xl animate-float-y" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-line bg-canvas/80 backdrop-blur-xl flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-ink" />
                    </div>
                </div>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-serif text-5xl sm:text-6xl text-ink leading-tight"
            >
                Thank you for{" "}
                <span className="italic text-sage">arriving</span>.
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-6 text-base sm:text-lg text-inkSoft max-w-xl mx-auto leading-relaxed"
            >
                Your session is complete. Carry a little of this quiet with
                you. Return whenever you would like to land again.
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
                    className="group inline-flex items-center gap-3 bg-ink text-canvas rounded-full pl-7 pr-3 py-3 text-base font-medium transition-all duration-500 hover:bg-sage hover:scale-[1.02] active:scale-[0.98]"
                >
                    Begin another session
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:rotate-[-180deg]">
                        <RotateCcw size={16} strokeWidth={1.75} />
                    </span>
                </button>
            </motion.div>
        </section>
    );
};

export default CompletionScreen;
