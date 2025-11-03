import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { Course, Lesson } from '../../lib/mock-data';
import { AIStudyBuddy } from '../ai/ai-study-buddy';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface CourseViewerProps {
  course: Course;
  lessons: Lesson[];
  onBack: () => void;
}

export function CourseViewer({ course, lessons, onBack }: CourseViewerProps) {
  const [currentLesson, setCurrentLesson] = useState(lessons[0]);
  const [playing, setPlaying] = useState(false);
  const [showAIBuddy, setShowAIBuddy] = useState(false);

  const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
  const nextLesson = lessons[currentIndex + 1];

  const markComplete = () => {
    // Simulate marking lesson as complete
    if (nextLesson) {
      setCurrentLesson(nextLesson);
      setPlaying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-white/70 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video player */}
            <Card className="overflow-hidden bg-black border-white/10">
              <div className="relative aspect-video bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center">
                {/* Simulated video player */}
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPlaying(!playing)}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {playing ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </motion.button>
                  <p className="text-white mt-4">{currentLesson.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{currentLesson.duration}</p>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: playing ? '100%' : '0%' }}
                    transition={{ duration: 30, ease: 'linear' }}
                  />
                </div>
              </div>
            </Card>

            {/* Lesson info and tabs */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl text-white mb-2">{currentLesson.title}</h2>
                  <p className="text-gray-400">{currentLesson.description}</p>
                </div>
                <Button
                  onClick={markComplete}
                  className={`${
                    currentLesson.completed
                      ? 'bg-green-500/20 text-green-400 border-green-400'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                  } border`}
                >
                  {currentLesson.completed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    'Mark Complete'
                  )}
                </Button>
              </div>

              <Tabs defaultValue="transcript" className="mt-6">
                <TabsList className="bg-white/5 border border-white/10">
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="transcript" className="mt-4">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300">{currentLesson.transcript}</p>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-4">
                  <div className="text-gray-400">
                    <p>Take notes as you learn...</p>
                    <textarea
                      className="w-full mt-4 p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none min-h-[200px]"
                      placeholder="Write your notes here..."
                    />
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="mt-4">
                  <div className="space-y-2">
                    {['Course slides.pdf', 'Code examples.zip', 'Additional reading.pdf'].map((resource) => (
                      <div
                        key={resource}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <span className="text-gray-300">{resource}</span>
                        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* AI Study Buddy CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-purple-500/50 cursor-pointer"
                onClick={() => setShowAIBuddy(true)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white">Need help understanding this lesson?</p>
                      <p className="text-sm text-purple-400">Ask AI Study Buddy</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                </div>
              </motion.div>

              {/* Next lesson */}
              {nextLesson && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm text-gray-400">Up Next</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-purple-400" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-900 border-purple-500/50 max-w-xs">
                          <p className="text-white mb-1">Why this next?</p>
                          <p className="text-sm text-gray-300">Continues building on the concepts you just learned</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">{nextLesson.title}</p>
                      <p className="text-sm text-gray-400">{nextLesson.duration}</p>
                    </div>
                    <Button
                      onClick={() => setCurrentLesson(nextLesson)}
                      variant="outline"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                    >
                      Start Next
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar - Lesson list */}
          <div className="lg:col-span-1">
            <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10 sticky top-20">
              <div className="mb-4">
                <h3 className="text-white mb-2">{course.title}</h3>
                <Progress value={course.progress} className="h-2" />
                <p className="text-sm text-gray-400 mt-2">
                  {course.progress}% complete • {lessons.filter(l => l.completed).length}/{lessons.length} lessons
                </p>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {lessons.map((lesson, index) => (
                  <motion.button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(lesson)}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      lesson.id === currentLesson.id
                        ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-purple-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center">
                            <span className="text-xs text-gray-500">{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm mb-1 ${
                          lesson.id === currentLesson.id ? 'text-white' : 'text-gray-300'
                        }`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* AI Study Buddy Overlay */}
      <AnimatePresence>
        {showAIBuddy && (
          <AIStudyBuddy
            lessonContext={currentLesson.title}
            onClose={() => setShowAIBuddy(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
