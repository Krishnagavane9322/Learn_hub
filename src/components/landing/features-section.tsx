import { motion } from 'motion/react';
import { Brain, Users, Target, FileText, Award, Zap } from 'lucide-react';
import { NeuralNetworkBg } from '../shared/neural-network-bg';

export function FeaturesSection() {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden" id="features">
      {/* AI Neural Network Background */}
      <NeuralNetworkBg neuronCount={30} particleCount={25} opacity={0.35} />
      
      {/* Background decoration - optimized */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive platform designed to accelerate your learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.05, 
                duration: 0.4,
              }}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="relative group will-change-transform"
            >
              {/* Simplified glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const allFeatures = [
  {
    title: 'Diagnostic Assessments',
    description: 'Take intelligent quizzes that analyze your current knowledge and create personalized roadmaps tailored to your goals.',
    icon: <Target className="w-7 h-7 text-white" />,
  },
  {
    title: 'AI Study Buddy',
    description: 'Get instant help with concepts, generate practice quizzes, create flashcards, and receive detailed explanations anytime.',
    icon: <Brain className="w-7 h-7 text-white" />,
  },
  {
    title: 'Smart Peer Matching',
    description: 'Connect with study partners who share your interests, skill level, and learning goals for effective collaboration.',
    icon: <Users className="w-7 h-7 text-white" />,
  },
  {
    title: 'Notes Scanner with OCR',
    description: 'Transform handwritten or printed notes into searchable, organized digital content with advanced OCR technology.',
    icon: <FileText className="w-7 h-7 text-white" />,
  },
  {
    title: 'Skills Portfolio',
    description: 'Build a professional portfolio showcasing your achievements, certifications, and projects with PDF export.',
    icon: <Award className="w-7 h-7 text-white" />,
  },
  {
    title: 'Real-World Projects',
    description: 'Work on industry-standard projects with detailed rubrics, peer reviews, and instructor feedback.',
    icon: <Zap className="w-7 h-7 text-white" />,
  },
];
