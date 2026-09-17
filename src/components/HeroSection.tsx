import { motion } from "framer-motion";
import { Sparkles, Zap, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background glows */}
      <div
        className="hero-glow w-[800px] h-[800px] -top-60 -left-60"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />
      <div
        className="hero-glow w-[600px] h-[600px] top-20 -right-40"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)",
          animation: "pulse-glow 8s ease-in-out infinite 1s",
        }}
      />
      <div
        className="hero-glow w-[500px] h-[500px] -bottom-20 left-1/4"
        style={{
          background: "radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)",
          animation: "pulse-glow 7s ease-in-out infinite 2s",
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-32 left-1/4 text-primary/40 hidden md:block"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={32} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-1/4 text-accent/40 hidden md:block"
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Zap size={28} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-1/3 text-secondary/40 hidden md:block"
        animate={{ y: [0, -15, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Star size={24} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-3 px-5 py-2 mb-8 rounded-full text-sm font-medium glass-surface shadow-xl hover:scale-105 transition-transform cursor-default"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-foreground tracking-wide font-medium">50+ AI Tools Curated For You</span>
        </motion.div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold font-display tracking-tighter mb-8 leading-[1.05] drop-shadow-2xl">
          Find the Perfect{" "}
          <span className="glow-text">AI Tool</span>
          <br />
          for Every Task
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
          Discover, compare, and choose from the best AI tools and platforms — all organized by what you need to get done.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-7 h-12 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-2 bg-background/50 backdrop-blur-sm"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], height: ["6px", "12px", "6px"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 rounded-full bg-primary/80"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
