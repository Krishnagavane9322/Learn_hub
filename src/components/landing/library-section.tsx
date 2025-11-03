import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { BookOpen, Sparkles, Library, GraduationCap, Code, Palette } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

// Animated Book Component
function AnimatedBook({ 
  title, 
  author, 
  color, 
  pages = 5,
  delay = 0 
}: { 
  title: string; 
  author: string; 
  color: string;
  pages?: number;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative group cursor-pointer"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Hover tooltip */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white text-xs whitespace-nowrap pointer-events-none z-50"
        initial={{ opacity: 0, y: 5 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
        transition={{ duration: 0.2 }}
      >
        Hover to read →
      </motion.div>
      <motion.div
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-48 h-64"
        whileHover={{ 
          scale: 1.05,
          y: -10,
        }}
        transition={{ 
          duration: 0.3,
          type: 'spring',
          stiffness: 300,
        }}
      >
        {/* Book shadow */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-4 bg-black/40 blur-xl rounded-full"
          animate={isHovered ? { scale: 1.3, opacity: 0.6 } : { scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Book cover */}
        <div className={`absolute inset-0 rounded-lg overflow-hidden ${color} shadow-2xl`}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(30px)',
          }}
        >
          {/* Cover design */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 backdrop-blur-sm">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white mb-1">{title}</h4>
              <p className="text-white/70 text-xs">{author}</p>
            </div>
            
            {/* Decorative elements & Progress */}
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="w-full h-1 bg-white/20 rounded" />
                <div className="w-3/4 h-1 bg-white/20 rounded" />
              </div>
              
              {/* Reading progress indicator */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                  <span>Progress</span>
                  <motion.span
                    animate={isHovered ? { opacity: 1 } : { opacity: 0.6 }}
                  >
                    {isHovered ? '100%' : '0%'}
                  </motion.span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={isHovered ? { width: '100%' } : { width: '0%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
        </div>

        {/* Book spine */}
        <div 
          className={`absolute top-0 left-0 w-4 h-full ${color} rounded-l-lg`}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateY(-90deg) translateZ(2px) translateX(-2px)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>

        {/* Animated pages - optimized */}
        {Array.from({ length: pages }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1 right-1 w-full h-full bg-gradient-to-r from-gray-50 to-white rounded-r-lg border-r border-gray-300 shadow-lg overflow-hidden will-change-transform"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(${5 + i * 2}px)`,
              originX: 0,
              originY: 0.5,
              backfaceVisibility: 'hidden',
            }}
            animate={isHovered ? {
              rotateY: -180 + (i * 10),
              x: -(i * 8),
            } : {
              rotateY: 0,
              x: 0,
            }}
            transition={{
              delay: i * 0.04,
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Simplified page content */}
            <div className="p-4 space-y-2">
              {Array.from({ length: 6 }).map((_, lineIndex) => (
                <div 
                  key={lineIndex} 
                  className="h-1 bg-gray-300 rounded"
                  style={{ width: `${80 + (lineIndex * 3)}%` }}
                />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl"
          style={{
            background: `radial-gradient(circle, ${color.includes('indigo') ? '#6366f1' : color.includes('purple') ? '#8b5cf6' : color.includes('teal') ? '#14b8a6' : '#ec4899'} 0%, transparent 70%)`,
          }}
          animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

// Resource Card Component
function ResourceCard({
  icon: Icon,
  title,
  description,
  stats,
  gradient,
  delay = 0,
}: {
  icon: any;
  title: string;
  description: string;
  stats: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Card className="relative p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/20 overflow-hidden group h-full">
        {/* Animated gradient background */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 blur-2xl`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="relative">
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-white mb-2">{title}</h3>
          <p className="text-gray-400 mb-4 text-sm">{description}</p>

          <div className="flex items-center gap-2">
            <Badge className="bg-white/10 text-white border-white/20">
              {stats}
            </Badge>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function LibrarySection() {
  // Memoize random values for consistent rendering
  const books = [
    {
      title: 'Web Development',
      author: 'Modern Practices',
      color: 'bg-gradient-to-br from-indigo-600 to-indigo-800',
    },
    {
      title: 'Data Science',
      author: 'AI & ML Fundamentals',
      color: 'bg-gradient-to-br from-purple-600 to-purple-800',
    },
    {
      title: 'Mobile Design',
      author: 'UX/UI Patterns',
      color: 'bg-gradient-to-br from-teal-600 to-teal-800',
    },
    {
      title: 'Cloud Computing',
      author: 'Scalable Systems',
      color: 'bg-gradient-to-br from-pink-600 to-pink-800',
    },
  ];

  const resources = [
    {
      icon: Library,
      title: '10,000+ Courses',
      description: 'Access a vast library of courses across multiple disciplines',
      stats: '500+ New Monthly',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      icon: GraduationCap,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals and academic leaders',
      stats: '1,200+ Educators',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: Code,
      title: 'Hands-on Projects',
      description: 'Build real-world projects with interactive coding environments',
      stats: '5,000+ Projects',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      icon: Palette,
      title: 'Creative Labs',
      description: 'Explore design, art, and creative technology courses',
      stats: '800+ Workshops',
      gradient: 'from-pink-500 to-rose-600',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950 overflow-hidden">
      {/* Animated background orbs - optimized */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating sparkles - reduced */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute will-change-transform"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
          >
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300">Interactive Learning Library</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Explore Our{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Digital Collection
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Dive into interactive books that come alive with knowledge. Hover to explore pages and discover content.
          </p>
        </motion.div>

        {/* Animated books showcase */}
        <div className="flex justify-center items-end gap-8 mb-20">
          {books.map((book, index) => (
            <AnimatedBook
              key={book.title}
              {...book}
              pages={3}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard
              key={resource.title}
              {...resource}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-teal-500/10 backdrop-blur-xl border border-purple-500/30">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white">New courses added weekly - Never stop learning!</span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
