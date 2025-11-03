import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CheckCircle2, Circle, Clock, SkipForward, HelpCircle } from 'lucide-react';
import { RoadmapItem } from '../../lib/mock-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface RoadmapSectionProps {
  roadmap: RoadmapItem[];
  onStartLesson: (courseId: string) => void;
}

export function RoadmapSection({ roadmap, onStartLesson }: RoadmapSectionProps) {
  const currentItem = roadmap.find(item => item.status === 'current');
  const overallProgress = Math.round(
    roadmap.filter(item => item.status === 'completed').length / roadmap.filter(item => item.status !== 'skipped').length * 100
  );

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl text-white mb-1">Your Learning Roadmap</h2>
          <p className="text-gray-400">Personalized path based on your diagnostic results</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Overall Progress</p>
            <p className="text-2xl text-white">{overallProgress}%</p>
          </div>
          <motion.div
            className="relative w-20 h-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 226' }}
                animate={{ strokeDasharray: `${(overallProgress / 100) * 226} 226` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-white">{overallProgress}%</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Current lesson highlight */}
      {currentItem && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-purple-500/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-purple-500/50 text-white border-purple-400">
                    Currently Learning
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-purple-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-900 border-purple-500/50 max-w-xs">
                        <p className="text-white mb-1">Why this next?</p>
                        <p className="text-sm text-gray-300">{currentItem.reason}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <h3 className="text-xl text-white mb-2">{currentItem.title}</h3>
                <p className="text-gray-300 mb-4">{currentItem.description}</p>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{currentItem.estimatedTime}</span>
                  </div>
                  <div className="flex-1">
                    <Progress value={currentItem.progress} className="h-2" />
                  </div>
                  <span className="text-sm text-white">{currentItem.progress}%</span>
                </div>
                <Button
                  onClick={() => onStartLesson(currentItem.courseId)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-white/20"
                >
                  Continue Learning
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Roadmap timeline */}
      <div className="space-y-4">
        {roadmap.map((item, index) => {
          const Icon = item.status === 'completed' ? CheckCircle2 : 
                       item.status === 'current' ? Circle :
                       item.status === 'skipped' ? SkipForward : Clock;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-4 transition-all duration-300 hover:scale-[1.01] ${
                item.status === 'completed' 
                  ? 'bg-green-500/10 border-green-500/30'
                  : item.status === 'current'
                  ? 'bg-purple-500/10 border-purple-500/30'
                  : item.status === 'skipped'
                  ? 'bg-gray-500/10 border-gray-500/30 opacity-60'
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-start gap-4">
                  <Icon className={`w-6 h-6 mt-1 ${
                    item.status === 'completed' ? 'text-green-400' :
                    item.status === 'current' ? 'text-purple-400' :
                    item.status === 'skipped' ? 'text-gray-400' :
                    'text-gray-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 cursor-help">
                                <HelpCircle className="w-3 h-3" />
                                <span>Why this step?</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-900 border-purple-500/50 max-w-xs">
                              <p className="text-sm text-gray-300">{item.reason}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={`${
                          item.status === 'completed' ? 'border-green-400 text-green-400' :
                          item.status === 'current' ? 'border-purple-400 text-purple-400' :
                          item.status === 'skipped' ? 'border-gray-400 text-gray-400' :
                          'border-gray-500 text-gray-500'
                        }`}>
                          {item.status === 'completed' ? 'Completed' :
                           item.status === 'current' ? 'In Progress' :
                           item.status === 'skipped' ? 'Skipped' : 'Upcoming'}
                        </Badge>
                        {item.status !== 'skipped' && (
                          <p className="text-xs text-gray-500 mt-1">{item.estimatedTime}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
