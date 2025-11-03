import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Users, BookOpen, BarChart3, TrendingUp, Clock } from 'lucide-react';
import { Course } from '../../lib/mock-data';
import { NeuralNetworkBg } from '../shared/neural-network-bg';

interface TeacherDashboardProps {
  courses: Course[];
}

export function TeacherDashboard({ courses }: TeacherDashboardProps) {
  return (
    <div className="relative space-y-8">
      {/* AI Neural Network Background */}
      <div className="fixed inset-0 z-0">
        <NeuralNetworkBg neuronCount={25} particleCount={20} opacity={0.25} />
      </div>
      
      <div className="relative z-10 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-purple-500/50">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl text-white mb-2">Instructor Dashboard</h1>
              <p className="text-gray-300">
                Manage your courses and track student progress
              </p>
            </div>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
              <Plus className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '1,247', icon: Users, change: '+23 this week', color: 'text-blue-400' },
          { label: 'Active Courses', value: courses.length, icon: BookOpen, change: 'All published', color: 'text-green-400' },
          { label: 'Avg. Completion', value: '68%', icon: BarChart3, change: '+5% this month', color: 'text-purple-400' },
          { label: 'Avg. Rating', value: '4.8', icon: TrendingUp, change: '⭐⭐⭐⭐⭐', color: 'text-yellow-400' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className={`text-xs ${stat.color} mt-1`}>{stat.change}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Your Courses */}
      <div>
        <h2 className="text-2xl text-white mb-6">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="p-5 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="border-green-500/50 text-green-400">
                    Published
                  </Badge>
                </div>
                <h3 className="text-white mb-2">{course.title}</h3>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolledStudents?.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 border-purple-500/50 text-purple-400">
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600">
                    Analytics
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <h2 className="text-2xl text-white mb-4">Recent Student Activity</h2>
        <div className="space-y-3">
          {[
            { student: 'Sarah M.', action: 'completed', course: 'Full Stack Web Development', time: '2 hours ago' },
            { student: 'Kevin P.', action: 'enrolled in', course: 'Introduction to Machine Learning', time: '3 hours ago' },
            { student: 'Emily C.', action: 'submitted project for', course: 'Data Structures & Algorithms', time: '5 hours ago' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-300">
                  <span className="text-white">{activity.student}</span> {activity.action}{' '}
                  <span className="text-purple-400">{activity.course}</span>
                </p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
      </div>
    </div>
  );
}
