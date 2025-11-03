import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Navbar } from './navbar';
import { Hero } from './hero';
import { FeaturesSection } from './features-section';
import { CourseShowcase } from './course-showcase';
import { CodeAnimation } from './code-animation';
import { LibrarySection } from './library-section';
import { StatsSection } from './stats-section';
import { PricingSection } from './pricing-section';
import { CTASection } from './cta-section';
import { Footer } from '../shared/footer';
import { ScrollProgress } from './scroll-progress';

interface LandingPageProps {
  onGetStarted: (role: 'student' | 'teacher') => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Parallax effects for different sections
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const featuresY = useTransform(scrollYProgress, [0.2, 0.5], [100, -50]);
  const statsY = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  return (
    <div ref={containerRef} className="min-h-screen relative bg-slate-950">
      {/* Floating gradient orbs for depth - optimized */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
      >
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl will-change-transform"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl will-change-transform"
        />
      </motion.div>

      <ScrollProgress />
      <Navbar onGetStarted={onGetStarted} />
      
      <div className="relative">
        <motion.div style={{ y: heroY }}>
          <Hero onGetStarted={onGetStarted} />
        </motion.div>
        
        <motion.div id="features" style={{ y: featuresY }}>
          <FeaturesSection />
        </motion.div>
        
        <div id="courses">
          <CourseShowcase />
        </div>
        
        <LibrarySection />
        <CodeAnimation />
        
        <motion.div id="about" style={{ y: statsY }}>
          <StatsSection />
        </motion.div>
        
        <PricingSection onGetStarted={onGetStarted} />
        
        <CTASection onGetStarted={onGetStarted} />
        <Footer variant="landing" />
      </div>
    </div>
  );
}
