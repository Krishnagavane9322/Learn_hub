import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { NeuralNetworkBg } from '../shared/neural-network-bg';

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract numeric value
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const hasK = value.includes('K');
  const hasPercent = value.includes('%');
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);
  
  return (
    <span ref={ref}>
      {displayValue}
      {hasK && 'K'}
      {hasPercent && '%'}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-24 bg-slate-950 overflow-hidden">
      {/* AI Neural Network Background */}
      <NeuralNetworkBg neuronCount={25} particleCount={20} opacity={0.3} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"
            style={{ left: `${(i + 1) * 20}%` }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleY: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Join Thousands of{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Successful Learners
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Our platform is transforming education worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ 
                scale: 1.15, 
                y: -15,
                rotateY: 5,
                rotateX: -5,
                transition: { duration: 0.3 }
              }}
              className="text-center group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative inline-block">
                {/* Pulsing glow effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  animate={{
                    scale: isInView ? [1, 1.3, 1] : 1,
                    opacity: isInView ? [0.3, 0.6, 0.3] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 blur-2xl group-hover:blur-3xl"
                />
                
                {/* Rotating ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-indigo-500/30"
                  animate={{
                    rotate: isInView ? [0, 360] : 0,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                <motion.h3
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1 + 0.2, 
                    duration: 0.6, 
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="relative text-5xl md:text-6xl bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent mb-2 px-4"
                >
                  <AnimatedCounter value={stat.value} />
                </motion.h3>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                className="text-gray-400 group-hover:text-gray-300 transition-colors mt-4"
              >
                {stat.label}
              </motion.p>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-indigo-500/50 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: '50K+', label: 'Active Students' },
  { value: '2K+', label: 'Expert Instructors' },
  { value: '500+', label: 'Courses Available' },
  { value: '95%', label: 'Success Rate' },
];
