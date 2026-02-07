import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 pt-20 pb-10 overflow-hidden">
      {/* Background glows */}
      <div
        className="hero-glow w-[600px] h-[600px] -top-40 -left-40"
        style={{
          background: "radial-gradient(circle, hsl(187 80% 52% / 0.15) 0%, transparent 70%)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />
      <div
        className="hero-glow w-[500px] h-[500px] -top-20 -right-32"
        style={{
          background: "radial-gradient(circle, hsl(260 70% 60% / 0.12) 0%, transparent 70%)",
          animation: "pulse-glow 5s ease-in-out infinite 1s",
        }}
      />
      <div
        className="hero-glow w-[400px] h-[400px] bottom-0 left-1/3"
        style={{
          background: "radial-gradient(circle, hsl(187 80% 52% / 0.08) 0%, transparent 70%)",
          animation: "pulse-glow 6s ease-in-out infinite 2s",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-sm font-medium glass-surface"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-muted-foreground">50+ AI Tools Curated For You</span>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight mb-6 leading-[1.1]">
          Find the Perfect{" "}
          <span className="glow-text">AI Tool</span>
          <br />
          for Every Task
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover, compare, and choose from the best AI tools and platforms — all organized by what you need to get done.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], height: ["4px", "8px", "4px"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
