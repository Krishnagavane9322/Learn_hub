import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FooterProps {
  variant?: 'landing' | 'dashboard';
}

export function Footer({ variant = 'landing' }: FooterProps) {
  const isDashboard = variant === 'dashboard';
  const [mouseX, setMouseX] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX((e.clientX - rect.left) / rect.width);
  };

  // Generate wave path
  const generateWavePath = (
    amplitude: number,
    frequency: number,
    phase: number,
    yOffset: number
  ) => {
    const points = [];
    const width = 100;
    const steps = 100;
    
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      const y = 
        yOffset +
        amplitude * Math.sin((x / width) * frequency * Math.PI * 2 + phase + time) +
        (amplitude * 0.3) * Math.sin((x / width) * frequency * 4 * Math.PI + time * 1.5) +
        (mouseX - 0.5) * 20 * Math.sin((x / width - mouseX) * Math.PI * 8);
      points.push(`${x},${y}`);
    }
    
    return `M 0,100 L 0,${points[0].split(',')[1]} ${points.join(' L ')} L 100,100 Z`;
  };

  return (
    <footer 
      className={`relative overflow-hidden ${isDashboard ? 'bg-slate-950/50 border-t border-white/10' : 'bg-slate-950'}`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Wave Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg 
          className="absolute bottom-0 w-full h-64" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ transform: 'scaleY(-1)' }}
        >
          <defs>
            {/* Gradients for waves */}
            <linearGradient id="wave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Wave layers - back to front */}
          <motion.path
            d={generateWavePath(8, 2, 0, 40)}
            fill="url(#wave1)"
            animate={{
              d: generateWavePath(8, 2, time * 0.5, 40),
            }}
            transition={{ duration: 0 }}
          />
          <motion.path
            d={generateWavePath(6, 3, Math.PI / 3, 50)}
            fill="url(#wave2)"
            animate={{
              d: generateWavePath(6, 3, Math.PI / 3 + time * 0.7, 50),
            }}
            transition={{ duration: 0 }}
          />
          <motion.path
            d={generateWavePath(5, 4, Math.PI / 2, 60)}
            fill="url(#wave3)"
            filter="url(#glow)"
            animate={{
              d: generateWavePath(5, 4, Math.PI / 2 + time * 1.2, 60),
            }}
            transition={{ duration: 0 }}
          />
          
          {/* Wave edge lines for more definition */}
          <motion.path
            d={generateWavePath(5, 4, Math.PI / 2, 60).replace('Z', '')}
            fill="none"
            stroke="#14b8a6"
            strokeWidth="0.3"
            strokeOpacity="0.6"
            animate={{
              d: generateWavePath(5, 4, Math.PI / 2 + time * 1.2, 60).replace('Z', ''),
            }}
            transition={{ duration: 0 }}
          />
        </svg>

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: '100%',
              opacity: 0,
              scale: Math.random() * 1.5 + 0.5,
            }}
            animate={{
              y: [
                '100%',
                `${Math.random() * 40 + 20}%`,
                `${Math.random() * 40 + 20}%`,
                '-10%',
              ],
              x: [
                `${Math.random() * 100}%`,
                `${(Math.random() * 100 + mouseX * 50) % 100}%`,
                `${(Math.random() * 100 - mouseX * 30) % 100}%`,
                `${Math.random() * 100}%`,
              ],
              opacity: [0, 0.6, 0.8, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
            style={{
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
            }}
          />
        ))}

        {/* Interactive sparkles that follow mouse */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${mouseX * 100}%`,
            top: '50%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-6 h-6 text-purple-400" />
        </motion.div>
      </div>

      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-1 md:col-span-1"
            >
              <motion.div 
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-500 flex items-center justify-center relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span 
                    className="text-white font-bold"
                    animate={{
                      textShadow: [
                        '0 0 5px rgba(168, 85, 247, 0.5)',
                        '0 0 20px rgba(168, 85, 247, 0.8)',
                        '0 0 5px rgba(168, 85, 247, 0.5)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    PL
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 blur-lg opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <span className="text-white font-semibold">Personalized Learning</span>
              </motion.div>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Empowering learners worldwide with AI-driven personalized education.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -4,
                      rotate: [0, -10, 10, 0],
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/5 to-white/10 hover:from-indigo-500/20 hover:to-purple-500/20 border border-white/10 hover:border-purple-400/50 flex items-center justify-center transition-all duration-300 group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20"
                      initial={{ x: '-100%', y: '-100%' }}
                      whileHover={{ x: '100%', y: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (sectionIndex + 1) * 0.1, duration: 0.5 }}
              >
                <motion.h3 
                  className="text-white mb-5 font-semibold relative inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {section.title}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (sectionIndex + 1) * 0.1 + linkIndex * 0.05 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <motion.span
                          className="w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-3 transition-all duration-300"
                        />
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom bar with wave decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pt-8 border-t border-white/10 relative"
          >
            {/* Decorative line with gradient */}
            <motion.div
              className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              <motion.p 
                className="text-sm text-gray-400"
                whileHover={{ scale: 1.05 }}
              >
                © {new Date().getFullYear()} Personalized Learning Paths. All rights reserved.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-sm" />
    </footer>
  );
}

const socialLinks = [
  {
    name: 'GitHub',
    href: '#',
    icon: <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors relative z-10" />,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors relative z-10" />,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors relative z-10" />,
  },
  {
    name: 'Email',
    href: '#',
    icon: <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors relative z-10" />,
  },
];

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { name: 'Features', href: '#' },
      { name: 'Courses', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'API', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Community', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  },
];
