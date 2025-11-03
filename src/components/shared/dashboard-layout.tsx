import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  Users,
  Trophy,
  ScanText,
  LogOut,
  Menu,
  X,
  Settings,
  Bell,
  GraduationCap,
  BarChart3,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { User } from '../../lib/mock-data';
import { Footer } from './footer';
import { AIStudyBuddy } from '../ai/ai-study-buddy';

interface DashboardLayoutProps {
  user: User;
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function DashboardLayout({
  user,
  children,
  currentPage,
  onNavigate,
  onLogout,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAIBuddy, setShowAIBuddy] = useState(false);

  const studentNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'peers', label: 'Find Peers', icon: Users },
    { id: 'portfolio', label: 'Portfolio', icon: Trophy },
    { id: 'notes', label: 'Smart Notes', icon: ScanText },
  ];

  const teacherNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'content', label: 'Create Content', icon: GraduationCap },
  ];

  const adminNav = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'All Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const navItems = user.role === 'student' ? studentNav : user.role === 'teacher' ? teacherNav : adminNav;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Top navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/10"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              LearnHub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar className="w-9 h-9 border-2 border-purple-500/50">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.header>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-16 bottom-0 w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 z-40 overflow-y-auto"
          >
            <div className="p-4">
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Welcome back,</p>
                <p className="text-white">{user.name}</p>
                <p className="text-xs text-purple-400 mt-1 capitalize">{user.role}</p>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white border border-white/20 shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-8 border-t border-white/10">
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="w-full justify-start text-gray-400 hover:text-white hover:bg-red-500/10"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
        <Footer variant="dashboard" />
      </main>

      {/* Floating AI Study Buddy Button */}
      {user.role === 'student' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Pulsing glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl"
            />
            
            <Button
              onClick={() => setShowAIBuddy(true)}
              size="lg"
              className="relative w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-2xl shadow-purple-500/50 border-2 border-white/20"
            >
              <div className="flex flex-col items-center">
                <Sparkles className="w-6 h-6" />
              </div>
            </Button>
          </motion.div>
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900/95 backdrop-blur-sm border border-purple-500/50 rounded-lg whitespace-nowrap pointer-events-none"
          >
            <p className="text-sm text-white">AI Study Buddy</p>
            <p className="text-xs text-gray-400">Get instant help</p>
          </motion.div>
        </motion.div>
      )}

      {/* AI Study Buddy Modal */}
      <AnimatePresence>
        {showAIBuddy && (
          <AIStudyBuddy
            lessonContext="General Learning"
            onClose={() => setShowAIBuddy(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
