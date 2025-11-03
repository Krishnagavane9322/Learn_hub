import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function CodeAnimation() {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % codeLines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-teal-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Powered by{' '}
              <motion.span 
                className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Advanced AI
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our platform leverages cutting-edge artificial intelligence to create truly personalized learning experiences. From intelligent content recommendations to adaptive assessments, every feature is designed to help you learn more efficiently.
            </motion.p>
            <div className="space-y-4">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 relative"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 blur-md opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <svg className="w-3 h-3 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <div>
                    <motion.h4 
                      className="text-white mb-1"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {feature.title}
                    </motion.h4>
                    <motion.p 
                      className="text-sm text-gray-400"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-500 ml-2">ai-learning-engine.ts</span>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: index === currentLine ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mb-2"
                  >
                    <span className="text-gray-600 select-none mr-4">{index + 1}</span>
                    <span
                      className={index === currentLine ? 'text-teal-400' : 'text-gray-400'}
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                    {index === currentLine && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-teal-400 ml-1"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-teal-500/30 to-indigo-500/30 rounded-full blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const aiFeatures = [
  {
    title: 'Adaptive Learning Algorithms',
    description: 'Machine learning models that continuously adjust to your learning style and pace',
  },
  {
    title: 'Natural Language Processing',
    description: 'Understand and respond to your questions with human-like comprehension',
  },
  {
    title: 'Intelligent Content Curation',
    description: 'Automatically recommend the most relevant resources for your goals',
  },
];

const codeLines = [
  '<span class="text-purple-400">async function</span> <span class="text-yellow-400">generateLearningPath</span>(<span class="text-orange-400">student</span>) {',
  '  <span class="text-purple-400">const</span> skills = <span class="text-purple-400">await</span> <span class="text-yellow-400">assessSkillLevel</span>(student);',
  '  <span class="text-purple-400">const</span> goals = <span class="text-yellow-400">analyzeGoals</span>(student.objectives);',
  '  <span class="text-purple-400">const</span> path = ai.<span class="text-yellow-400">optimize</span>({ skills, goals });',
  '  <span class="text-purple-400">return</span> <span class="text-yellow-400">createRoadmap</span>(path);',
  '}',
  '',
  '<span class="text-gray-500">// AI-powered personalization engine</span>',
  '<span class="text-purple-400">const</span> recommendations = <span class="text-purple-400">await</span> ai.<span class="text-yellow-400">getRecommendations</span>({',
  '  learningStyle: <span class="text-green-400">"visual"</span>,',
  '  preferredPace: <span class="text-green-400">"moderate"</span>,',
  '  interests: [<span class="text-green-400">"web-dev"</span>, <span class="text-green-400">"AI"</span>],',
  '});',
];
