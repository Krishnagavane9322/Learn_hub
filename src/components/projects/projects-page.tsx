import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Lock, Play, Upload, CheckCircle2, Clock, Award, Sparkles, ArrowRight, Code, Target } from 'lucide-react';
import { Project } from '../../lib/mock-data';
import { toast } from 'sonner@2.0.3';

interface ProjectsPageProps {
  projects: Project[];
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleSubmit = (projectId: string) => {
    toast.success('Project submitted successfully! Your instructor will review it soon.');
  };

  const statusConfig = {
    locked: {
      icon: Lock,
      color: 'text-gray-500',
      bg: 'bg-gray-500/10',
      border: 'border-gray-500/30',
      label: 'Locked',
      gradient: 'from-gray-600 to-gray-700',
    },
    available: {
      icon: Play,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      label: 'Available',
      gradient: 'from-blue-600 to-indigo-600',
    },
    'in-progress': {
      icon: Clock,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      label: 'In Progress',
      gradient: 'from-yellow-600 to-orange-600',
    },
    submitted: {
      icon: Upload,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      label: 'Submitted',
      gradient: 'from-purple-600 to-pink-600',
    },
    completed: {
      icon: CheckCircle2,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      label: 'Completed',
      gradient: 'from-green-600 to-teal-600',
    },
  };

  const groupedProjects = {
    available: projects.filter(p => p.status === 'available'),
    inProgress: projects.filter(p => p.status === 'in-progress' || p.status === 'submitted'),
    completed: projects.filter(p => p.status === 'completed'),
    locked: projects.filter(p => p.status === 'locked'),
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl text-white">Real-World Projects</h1>
              <p className="text-gray-400">
                Apply your skills to practical projects and build your portfolio
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'Available', 
              value: groupedProjects.available.length, 
              icon: Target,
              gradient: 'from-blue-500 to-indigo-500',
              bgGlow: 'bg-blue-500/10'
            },
            { 
              label: 'In Progress', 
              value: groupedProjects.inProgress.length, 
              icon: Clock,
              gradient: 'from-yellow-500 to-orange-500',
              bgGlow: 'bg-yellow-500/10'
            },
            { 
              label: 'Completed', 
              value: groupedProjects.completed.length, 
              icon: CheckCircle2,
              gradient: 'from-green-500 to-teal-500',
              bgGlow: 'bg-green-500/10'
            },
            { 
              label: 'Locked', 
              value: groupedProjects.locked.length, 
              icon: Lock,
              gradient: 'from-gray-500 to-gray-600',
              bgGlow: 'bg-gray-500/10'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <Card className="p-5 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className={`absolute inset-0 ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Available Projects */}
        {groupedProjects.available.length > 0 && (
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-5"
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl text-white">Available Projects</h2>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                {groupedProjects.available.length}
              </Badge>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedProjects.available.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  statusConfig={statusConfig}
                  index={index}
                  onAction={() => toast.success('Project started!')}
                  actionLabel="Start Project"
                  hoveredProject={hoveredProject}
                  setHoveredProject={setHoveredProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* In Progress Projects */}
        {groupedProjects.inProgress.length > 0 && (
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-5"
            >
              <Clock className="w-5 h-5 text-yellow-400" />
              <h2 className="text-2xl text-white">In Progress</h2>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                {groupedProjects.inProgress.length}
              </Badge>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedProjects.inProgress.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  statusConfig={statusConfig}
                  index={index}
                  onAction={() => handleSubmit(project.id)}
                  actionLabel={project.status === 'submitted' ? 'Resubmit' : 'Submit Project'}
                  hoveredProject={hoveredProject}
                  setHoveredProject={setHoveredProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Projects */}
        {groupedProjects.completed.length > 0 && (
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-5"
            >
              <Award className="w-5 h-5 text-green-400" />
              <h2 className="text-2xl text-white">Completed Projects</h2>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                {groupedProjects.completed.length}
              </Badge>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedProjects.completed.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  statusConfig={statusConfig}
                  index={index}
                  onAction={() => {}}
                  actionLabel="View Details"
                  hoveredProject={hoveredProject}
                  setHoveredProject={setHoveredProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* Locked Projects */}
        {groupedProjects.locked.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-5"
            >
              <Lock className="w-5 h-5 text-gray-400" />
              <h2 className="text-2xl text-white">Locked Projects</h2>
              <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                {groupedProjects.locked.length}
              </Badge>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedProjects.locked.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  statusConfig={statusConfig}
                  index={index}
                  onAction={() => {}}
                  actionLabel="Complete Prerequisites"
                  disabled
                  hoveredProject={hoveredProject}
                  setHoveredProject={setHoveredProject}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  statusConfig: any;
  index: number;
  onAction: () => void;
  actionLabel: string;
  disabled?: boolean;
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
}

function ProjectCard({ 
  project, 
  statusConfig, 
  index, 
  onAction, 
  actionLabel, 
  disabled,
  hoveredProject,
  setHoveredProject
}: ProjectCardProps) {
  const config = statusConfig[project.status];
  const Icon = config.icon;
  const isHovered = hoveredProject === project.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      <Card
        className={`group relative p-6 bg-white/5 backdrop-blur-sm border-white/10 transition-all duration-300 overflow-hidden h-full flex flex-col ${
          disabled ? 'opacity-60' : 'hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10'
        }`}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 transition-opacity duration-300`}
          animate={{ opacity: isHovered && !disabled ? 0.05 : 0 }}
        />

        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              animate={{ scale: isHovered && !disabled ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Badge className={`${config.bg} ${config.color} ${config.border} flex items-center gap-1.5`}>
                <Icon className="w-3.5 h-3.5" />
                {config.label}
              </Badge>
            </motion.div>
            <Badge
              variant="outline"
              className={`${
                project.difficulty === 'beginner'
                  ? 'border-green-500/50 text-green-400 bg-green-500/10'
                  : project.difficulty === 'intermediate'
                  ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
                  : 'border-red-500/50 text-red-400 bg-red-500/10'
              }`}
            >
              {project.difficulty}
            </Badge>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-5 line-clamp-2">{project.description}</p>

          {/* Rubric */}
          <div className="mb-5 flex-grow">
            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Requirements:
            </p>
            <div className="space-y-1.5">
              {project.rubric.slice(0, 3).map((requirement, idx) => (
                <motion.div
                  key={requirement}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + idx * 0.03 }}
                  className="flex items-start gap-2 text-sm text-gray-400"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${config.bg} ${config.color} mt-1.5 flex-shrink-0`} />
                  <span className="line-clamp-1">{requirement}</span>
                </motion.div>
              ))}
              {project.rubric.length > 3 && (
                <p className="text-xs text-gray-500 ml-4">+{project.rubric.length - 3} more requirements</p>
              )}
            </div>
          </div>

          {/* Required courses warning */}
          <AnimatePresence>
            {project.requiredCourses.length > 0 && disabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
              >
                <p className="text-xs text-yellow-400 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Prerequisites Required
                </p>
                <p className="text-xs text-gray-400">
                  Complete {project.requiredCourses.length} required course{project.requiredCourses.length > 1 ? 's' : ''} to unlock
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <Button
            onClick={onAction}
            disabled={disabled}
            className={`w-full group/button relative overflow-hidden ${
              disabled
                ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                : `bg-gradient-to-r ${config.gradient} hover:shadow-lg hover:shadow-purple-500/30`
            }`}
          >
            <motion.span
              className="flex items-center justify-center gap-2"
              animate={{ x: isHovered && !disabled ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {actionLabel}
              {!disabled && <ArrowRight className="w-4 h-4" />}
            </motion.span>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
