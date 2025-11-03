import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { NeuralNetworkBg } from '../shared/neural-network-bg';

interface PricingSectionProps {
  onGetStarted: (role: 'student' | 'teacher') => void;
}

// Legacy Neural Network Animation Component (kept for reference, will be replaced)
function NeuralNetworkOLD() {
  const [neurons, setNeurons] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    // Generate random neuron positions
    const generatedNeurons = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setNeurons(generatedNeurons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ minHeight: '800px' }}>
      <svg className="w-full h-full" style={{ minHeight: '800px' }}>
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="pricingNeuronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="pricingNeuronGlow">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Draw connections between nearby neurons */}
        {neurons.map((neuron1, i) =>
          neurons.slice(i + 1).map((neuron2, j) => {
            const distance = Math.sqrt(
              Math.pow(neuron1.x - neuron2.x, 2) + Math.pow(neuron1.y - neuron2.y, 2)
            );
            // Only draw connections for nearby neurons
            if (distance < 25) {
              return (
                <motion.line
                  key={`line-${neuron1.id}-${neuron2.id}`}
                  x1={`${neuron1.x}%`}
                  y1={`${neuron1.y}%`}
                  x2={`${neuron2.x}%`}
                  y2={`${neuron2.y}%`}
                  stroke="url(#pricingNeuronGradient)"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: (i + j) * 0.1,
                  }}
                />
              );
            }
            return null;
          })
        )}

        {/* Draw neurons */}
        {neurons.map((neuron, i) => (
          <motion.g key={neuron.id}>
            {/* Glow effect */}
            <motion.circle
              cx={`${neuron.x}%`}
              cy={`${neuron.y}%`}
              r="12"
              fill="url(#pricingNeuronGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
            {/* Core */}
            <motion.circle
              cx={`${neuron.x}%`}
              cy={`${neuron.y}%`}
              r="4"
              fill="#a855f7"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.8, 1, 0.8],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
            {/* Pulse ring */}
            <motion.circle
              cx={`${neuron.x}%`}
              cy={`${neuron.y}%`}
              r="4"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: [1, 0, 1],
                scale: [1, 3.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Floating particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  return (
    <section id="pricing" className="relative py-24 bg-slate-950 overflow-hidden min-h-screen">
      {/* AI Neural Network Animation */}
      <NeuralNetworkBg neuronCount={32} particleCount={28} opacity={0.45} />

      {/* Subtle gradient orbs for depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Flexible Pricing Plans</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learning Plan
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free and upgrade anytime to unlock premium features and accelerate your learning journey
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <Card
                className={`relative p-8 h-full backdrop-blur-sm border-2 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-purple-900/40 border-purple-500/50 shadow-xl shadow-purple-500/20'
                    : 'bg-gradient-to-br from-slate-900/60 to-slate-800/60 border-white/10 hover:border-purple-500/30'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                  >
                    <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 px-4 py-1 shadow-lg">
                      <Crown className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </motion.div>
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-purple-500/50'
                      : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10'
                  }`}
                >
                  {plan.icon}
                </motion.div>

                {/* Plan Details */}
                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-5xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="text-gray-400">/{plan.period}</span>
                    )}
                  </motion.div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check
                          className={`w-5 h-5 flex-shrink-0 ${
                            plan.popular ? 'text-purple-400' : 'text-indigo-400'
                          }`}
                        />
                      </motion.div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => onGetStarted('student')}
                    className={`w-full h-12 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-purple-500/30'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>

                {/* Decorative elements */}
                {plan.popular && (
                  <>
                    <motion.div
                      className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl -z-10 blur-xl opacity-30"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Need a custom solution for your institution?{' '}
            <button
              onClick={() => onGetStarted('teacher')}
              className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4"
            >
              Contact us for Enterprise pricing
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    description: 'Perfect for trying out our platform and exploring basic features',
    icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
    popular: false,
    features: [
      'Access to 50+ free courses',
      'Basic AI Study Buddy (10 messages/day)',
      'Diagnostic quiz and learning path',
      'Basic skill portfolio',
      'Community forums access',
      'Notes scanner (5 scans/month)',
    ],
    cta: 'Start Free',
  },
  {
    name: 'Pro',
    price: '19',
    period: 'month',
    description: 'Best for serious learners who want full access to all features',
    icon: <Zap className="w-8 h-8 text-white" />,
    popular: true,
    features: [
      'Unlimited access to 500+ courses',
      'Unlimited AI Study Buddy',
      'Advanced personalized learning paths',
      'Premium skill portfolio with PDF export',
      'Real-world projects with feedback',
      'Unlimited notes scanner & flashcards',
      'AI-powered mind maps',
      'Peer matching system',
      'Priority support',
      'Certificates of completion',
    ],
    cta: 'Get Pro',
  },
  {
    name: 'Institution',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for schools, universities, and organizations',
    icon: <Crown className="w-8 h-8 text-purple-400" />,
    popular: false,
    features: [
      'Everything in Pro',
      'Custom branding',
      'Advanced analytics & reporting',
      'LMS integration',
      'Dedicated account manager',
      'Custom course creation tools',
      'Multi-tenant architecture',
      'SSO & advanced security',
      'API access',
    ],
    cta: 'Contact Sales',
  },
];
