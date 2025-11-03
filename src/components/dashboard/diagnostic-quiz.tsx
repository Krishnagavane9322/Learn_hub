import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import {
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Brain,
  Target,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { QuizQuestion } from '../../lib/mock-data';

interface DiagnosticQuizProps {
  questions: QuizQuestion[];
  onComplete: (results: QuizResults) => void;
  onSkip: () => void;
}

export interface QuizResults {
  score: number;
  weakAreas: string[];
  strongAreas: string[];
  recommendations: string[];
}

export function DiagnosticQuiz({ questions, onComplete, onSkip }: DiagnosticQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        calculateResults();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const calculateResults = () => {
    setShowResults(true);
    
    // Calculate score
    let correctCount = 0;
    const categoryScores: Record<string, { correct: number; total: number }> = {};
    
    questions.forEach((q, index) => {
      const answer = answers[index];
      if (answer === q.correctAnswer) {
        correctCount++;
      }
      
      // Track by category
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0 };
      }
      categoryScores[q.category].total++;
      if (answer === q.correctAnswer) {
        categoryScores[q.category].correct++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    
    // Identify weak and strong areas
    const weakAreas: string[] = [];
    const strongAreas: string[] = [];
    
    Object.entries(categoryScores).forEach(([category, scores]) => {
      const percentage = (scores.correct / scores.total) * 100;
      if (percentage < 60) {
        weakAreas.push(category);
      } else if (percentage >= 80) {
        strongAreas.push(category);
      }
    });

    // Generate recommendations
    const recommendations: string[] = [];
    if (weakAreas.length > 0) {
      recommendations.push(`Focus on strengthening: ${weakAreas.join(', ')}`);
    }
    if (strongAreas.length > 0) {
      recommendations.push(`Build advanced skills in: ${strongAreas.join(', ')}`);
    }
    
    setTimeout(() => {
      onComplete({ score, weakAreas, strongAreas, recommendations });
    }, 3000);
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-purple-900/50 border-2 border-purple-500/50 backdrop-blur-sm relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl text-white mb-4"
              >
                Quiz Complete!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 mb-6"
              >
                Analyzing your results and creating a personalized learning path...
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-purple-500"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-3xl w-full my-8"
      >
        <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-500/50 backdrop-blur-sm relative overflow-hidden">
          {/* Background effects */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center"
                >
                  <Brain className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl text-white">Diagnostic Quiz</h2>
                  <p className="text-sm text-gray-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={onSkip}
                className="text-gray-400 hover:text-white"
              >
                Skip for now
              </Button>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs text-purple-400">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {question.category}
                  </Badge>
                  <h3 className="text-xl text-white mb-6">{question.question}</h3>
                  
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    <div className="space-y-3">
                      {question.options.map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 4 }}
                        >
                          <div
                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                              selectedAnswer === option
                                ? 'bg-purple-500/20 border-purple-500'
                                : 'bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-white/10'
                            }`}
                            onClick={() => setSelectedAnswer(option)}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem
                                value={option}
                                id={`option-${index}`}
                                className="border-2"
                              />
                              <Label
                                htmlFor={`option-${index}`}
                                className="flex-1 text-gray-300 cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-white/20 text-gray-300 hover:bg-white/10"
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                {questions.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuestion
                        ? 'bg-purple-500 w-8'
                        : index < currentQuestion
                        ? 'bg-green-500'
                        : 'bg-white/20'
                    }`}
                    whileHover={{ scale: 1.5 }}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50"
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
