import { motion } from 'motion/react';
import { RoadmapSection } from './roadmap-section';
import { CourseGrid } from './course-grid';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sparkles, TrendingUp, Calendar, Target } from 'lucide-react';
import { Course, RoadmapItem } from '../../lib/mock-data';
import { NeuralNetworkBg } from '../shared/neural-network-bg';

interface StudentDashboardProps {
  courses: Course[];
  roadmap: RoadmapItem[];
  onCourseClick: (courseId: string) => void;
  onStartLesson: (courseId: string) => void;
}

export function StudentDashboard({
  courses,
  roadmap,
  onCourseClick,
  onStartLesson,
}: StudentDashboardProps) {
  const enrolledCourses = courses.filter(c => c.progress > 0);
  const recommendedCourses = courses.filter(c => c.progress === 0).slice(0, 3);

  return (
    <div className="relative space-y-8">
      {/* AI Neural Network Background */}
      <div className="fixed inset-0 z-0">
        <NeuralNetworkBg neuronCount={25} particleCount={20} opacity={0.25} />
      </div>
      
      <div className="relative z-10 space-y-8">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Card className="p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-purple-500/50 backdrop-blur-sm relative overflow-hidden group hover:border-purple-400/70 transition-all duration-300">
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl text-white mb-2">Welcome back! 👋</h1>
                <p className="text-gray-300 mb-4">
                  You're making great progress on your learning journey
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-purple-500/50 text-white border-purple-400">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Personalized
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>Week 4 of your journey</span>
                  </div>
                </div>
              </div>
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                <Target className="w-4 h-4 mr-2" />
                Set Weekly Goals
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Courses Enrolled',
            value: enrolledCourses.length,
            icon: '📚',
            change: '+2 this month',
            color: 'text-blue-400',
          },
          {
            label: 'Avg. Progress',
            value: `${Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)}%`,
            icon: '📊',
            change: '+12% this week',
            color: 'text-green-400',
          },
          {
            label: 'Learning Streak',
            value: '7 days',
            icon: '🔥',
            change: 'Keep it up!',
            color: 'text-orange-400',
          },
          {
            label: 'Skills Gained',
            value: '12',
            icon: '⭐',
            change: '+3 this month',
            color: 'text-yellow-400',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.5, y: 30, rotateX: 45 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              type: 'spring',
              stiffness: 150,
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              rotateY: 5,
              transition: { duration: 0.2 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                initial={{ x: '-100%', y: '-100%' }}
                whileHover={{ x: '100%', y: '100%' }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex items-center justify-between mb-2 relative">
                <motion.span
                  className="text-2xl"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.icon}
                </motion.span>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <TrendingUp className={`w-4 h-4 ${stat.color}`} />
                </motion.div>
              </div>
              <p className="text-2xl text-white mb-1 relative">{stat.value}</p>
              <p className="text-xs text-gray-400 relative">{stat.label}</p>
              <p className={`text-xs ${stat.color} mt-1 relative`}>{stat.change}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Personalized Roadmap */}
      <RoadmapSection roadmap={roadmap} onStartLesson={onStartLesson} />

      {/* Continue Learning */}
      {enrolledCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-2xl text-white mb-6"
          >
            Continue Learning
          </motion.h2>
          <CourseGrid
            courses={enrolledCourses}
            onCourseClick={onCourseClick}
            title=""
            showProgress={true}
          />
        </motion.div>
      )}

      {/* Recommended Courses */}
      {recommendedCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
            <h2 className="text-2xl text-white">Recommended for You</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.15, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="cursor-pointer"
              >
                <Card className="p-5 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <Badge className="mb-3 bg-purple-500/20 text-purple-400 border-purple-500/30 relative">
                    {course.category}
                  </Badge>
                  <h3 className="text-white mb-2 relative">{course.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 relative">{course.description}</p>
                  <Button
                    size="sm"
                    onClick={() => onCourseClick(course.id)}
                    className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                  >
                    Explore Course
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick actions */}
      <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-purple-500/30">
        <h3 className="text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🤖', label: 'Ask AI Study Buddy', desc: 'Get instant help' },
            { icon: '👥', label: 'Find Study Partners', desc: 'Connect with peers' },
            { icon: '📝', label: 'Scan Notes', desc: 'Convert handwriting' },
          ].map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto p-4 flex-col items-start border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <p className="text-white">{action.label}</p>
              <p className="text-xs text-gray-400">{action.desc}</p>
            </Button>
          ))}
        </div>
      </Card>
      </div>
    </div>
  );
}
