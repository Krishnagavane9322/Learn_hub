import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Users, BookOpen, TrendingUp, AlertCircle, Activity } from 'lucide-react';
import { NeuralNetworkBg } from '../shared/neural-network-bg';

export function AdminDashboard() {
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
          <h1 className="text-3xl text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">
            Platform analytics and management overview
          </p>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '12,847', icon: Users, change: '+342 this week', color: 'text-blue-400' },
          { label: 'Total Courses', value: '156', icon: BookOpen, change: '+8 this month', color: 'text-green-400' },
          { label: 'Active Users', value: '8,234', icon: Activity, change: '64% of total', color: 'text-purple-400' },
          { label: 'Completion Rate', value: '72%', icon: TrendingUp, change: '+6% this quarter', color: 'text-yellow-400' },
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

      {/* User Growth Chart */}
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <h2 className="text-2xl text-white mb-6">User Growth</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {[40, 55, 48, 65, 70, 62, 78, 85, 90, 95, 88, 100].map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg min-w-0"
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </Card>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <h2 className="text-xl text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { type: 'user', text: 'New user registered', time: '2 min ago' },
              { type: 'course', text: 'Course "Advanced React" published', time: '15 min ago' },
              { type: 'user', text: '50 students enrolled today', time: '1 hour ago' },
              { type: 'system', text: 'System maintenance completed', time: '3 hours ago' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-gray-300">{activity.text}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <h2 className="text-xl text-white mb-4">System Alerts</h2>
          <div className="space-y-3">
            {[
              { level: 'info', text: 'Database backup completed successfully', time: '1 hour ago' },
              { level: 'warning', text: 'Server load at 75%', time: '2 hours ago' },
              { level: 'success', text: 'All systems operational', time: '5 hours ago' },
            ].map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border ${
                  alert.level === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : alert.level === 'success'
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-4 h-4 mt-0.5 ${
                    alert.level === 'warning'
                      ? 'text-yellow-400'
                      : alert.level === 'success'
                      ? 'text-green-400'
                      : 'text-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-gray-300">{alert.text}</p>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
      </div>
    </div>
  );
}
