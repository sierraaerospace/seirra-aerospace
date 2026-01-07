import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Play, Pause } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import heroVideo from "@/assets/hero-drone-video.mp4";

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-foreground">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="video-bg opacity-60"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent z-[1]" />

      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 z-[2]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-background/90 tracking-wide">
              Global Aerospace Solutions
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] text-balance text-background"
          >
            Precision Avionics for{" "}
            <span className="text-primary">Global Excellence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-background/70 mb-10 max-w-2xl leading-relaxed"
          >
            Sierra Aerospace delivers world-class RTK GPS systems, autopilots, and sensors 
            for UAV applications. International export-ready with centimeter-level precision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-16"
          >
            <Button variant="blue" size="xl" asChild>
              <a href="#products" className="group">
                Explore Products
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="blueOutline" size="xl" className="border-background/30 text-background hover:bg-background hover:text-foreground" asChild>
              <a href="#contact">Request Catalogue</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-background/20"
          >
            {[
              { value: "±1cm", label: "RTK Precision" },
              { value: "50+", label: "Countries Served" },
              { value: "15+", label: "Product Lines" },
              { value: "99.9%", label: "Reliability Rate" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-background">
                  {stat.value}
                </div>
                <div className="text-sm text-background/60 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Video Control */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={toggleVideo}
          className="absolute bottom-24 right-8 p-4 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 text-background hover:bg-background/20 transition-all"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/60 hover:text-primary transition-colors z-10"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
