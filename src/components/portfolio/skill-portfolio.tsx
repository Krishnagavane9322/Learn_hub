import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Download, Share2, Award, Calendar, ExternalLink, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Skill, Certificate, Project } from '../../lib/mock-data';
import { generatePortfolioPDF, formatDate } from '../../lib/utils';
import { toast } from 'sonner@2.0.3';
import { useEffect, useRef, useState } from 'react';

interface SkillPortfolioProps {
  skills: Skill[];
  certificates: Certificate[];
  projects: Project[];
  userName: string;
}

// Animated Counter Component
function AnimatedCounter({ value, delay = 0 }: { value: number; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        let start = 0;
        const end = value;
        const duration = 1500;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay]);

  return <span ref={ref}>{count}</span>;
}

// Circular Progress Component
function CircularProgress({ 
  percentage, 
  size = 140, 
  strokeWidth = 8,
  delay = 0 
}: { 
  percentage: number; 
  size?: number; 
  strokeWidth?: number;
  delay?: number;
}) {
  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);
  const ref = useRef<SVGCircleElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          ref={ref}
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={isInView ? {
            strokeDashoffset: circumference - (percentage / 100) * circumference,
          } : {}}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-white">
            <AnimatedCounter value={percentage} delay={delay * 1000} />%
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillPortfolio({ skills, certificates, projects, userName }: SkillPortfolioProps) {
  const handleExportPDF = () => {
    const portfolioData = {
      name: userName,
      skills,
      certificates,
      projects: projects.filter(p => p.status === 'completed'),
      generatedAt: new Date().toISOString(),
    };
    generatePortfolioPDF(portfolioData);
    toast.success('Portfolio exported successfully!');
  };

  const handleShare = () => {
    const shareUrl = `https://learnhub.example.com/portfolio/${userName.toLowerCase().replace(' ', '-')}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Portfolio link copied to clipboard!');
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl text-white mb-2">My Skill Portfolio</h1>
            <p className="text-gray-400">
              Showcase your learning achievements and skills
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: 'Skills Mastered',
              value: skills.filter(s => s.level >= 70).length,
              total: skills.length,
              icon: Target,
              gradient: 'from-indigo-500 to-purple-600',
              glow: 'indigo',
            },
            {
              label: 'Certificates Earned',
              value: certificates.length,
              icon: Award,
              gradient: 'from-purple-500 to-pink-600',
              glow: 'purple',
            },
            {
              label: 'Projects Completed',
              value: projects.filter(p => p.status === 'completed').length,
              total: projects.length,
              icon: TrendingUp,
              gradient: 'from-teal-500 to-cyan-600',
              glow: 'teal',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className={`relative p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/20 overflow-hidden group`}>
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl text-white">
                        <AnimatedCounter value={stat.value} delay={index * 0.15} />
                        {stat.total && <span className="text-lg text-gray-400">/{stat.total}</span>}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skills section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl text-white">My Skills</h2>
          </div>

          <div className="space-y-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-xl text-purple-300 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                  {category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                    >
                      <Card className="relative p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/20 overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                        {/* Animated gradient background */}
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 opacity-0 group-hover:opacity-30 blur-xl"
                          animate={{
                            background: [
                              'linear-gradient(to right, #6366f1, #8b5cf6, #14b8a6)',
                              'linear-gradient(to right, #14b8a6, #6366f1, #8b5cf6)',
                              'linear-gradient(to right, #8b5cf6, #14b8a6, #6366f1)',
                              'linear-gradient(to right, #6366f1, #8b5cf6, #14b8a6)',
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />

                        <div className="relative flex flex-col items-center">
                          {/* Circular progress */}
                          <CircularProgress 
                            percentage={skill.level} 
                            size={120}
                            strokeWidth={8}
                            delay={(categoryIndex * 0.1) + (index * 0.05)}
                          />

                          {/* Skill name */}
                          <h4 className="text-white mt-4 text-center">{skill.name}</h4>

                          {/* Badge */}
                          <Badge
                            className={`mt-3 ${
                              skill.level >= 80
                                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30'
                                : skill.level >= 60
                                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30'
                                : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30'
                            }`}
                          >
                            {skill.level >= 80 ? '⭐ Expert' : skill.level >= 60 ? '📚 Proficient' : '🌱 Learning'}
                          </Badge>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificates section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl text-white">Certificates & Achievements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="relative p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/20 overflow-hidden group cursor-pointer">
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '200% 0%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  <div className="relative flex items-start gap-4">
                    <motion.div 
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Award className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{cert.courseName}</h3>
                      <p className="text-sm text-purple-300 mb-3">Instructor: {cert.instructor}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>Earned on {formatDate(cert.dateEarned)}</span>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
                      <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Completed projects */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl text-white">Completed Projects</h2>
          </div>

          <div className="space-y-4">
            {projects
              .filter(p => p.status === 'completed')
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ x: 10 }}
                >
                  <Card className="relative p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/20 overflow-hidden group">
                    {/* Side accent */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-cyan-500"
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    />

                    {/* Glow on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                    <div className="relative flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-white text-lg">{project.title}</h3>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                          >
                            <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30">
                              ✓ Completed
                            </Badge>
                          </motion.div>
                        </div>
                        <p className="text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.rubric.slice(0, 3).map((item, i) => (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + 0.6 + (i * 0.05) }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 border-purple-500/20 text-xs"
                              >
                                {item}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="ghost" 
                          className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
                        >
                          View Details
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Public profile link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="relative mt-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-teal-500/10 backdrop-blur-xl border border-purple-500/30 text-center overflow-hidden group"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.3), transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.3), transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(20, 184, 166, 0.3), transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.3), transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative">
            <p className="text-gray-300 mb-3">🌐 Your public portfolio is live at:</p>
            <motion.code 
              className="text-purple-300 bg-black/40 px-6 py-3 rounded-xl inline-block border border-purple-500/30"
              whileHover={{ scale: 1.05 }}
            >
              https://learnhub.example.com/portfolio/{userName.toLowerCase().replace(' ', '-')}
            </motion.code>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
