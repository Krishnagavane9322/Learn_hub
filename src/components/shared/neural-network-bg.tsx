import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface NeuralNetworkBgProps {
  neuronCount?: number;
  particleCount?: number;
  opacity?: number;
  className?: string;
}

export function NeuralNetworkBg({ 
  neuronCount = 30, 
  particleCount = 25,
  opacity = 0.4,
  className = ''
}: NeuralNetworkBgProps) {
  const [neurons, setNeurons] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    // Generate random neuron positions
    const generatedNeurons = Array.from({ length: neuronCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setNeurons(generatedNeurons);
  }, [neuronCount]);

  const uniqueId = Math.random().toString(36).substr(2, 9);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
      <svg className="w-full h-full min-h-full">
        {/* Gradient definitions */}
        <defs>
          <linearGradient id={`neuronGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id={`neuronGlow-${uniqueId}`}>
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
                  stroke={`url(#neuronGradient-${uniqueId})`}
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
              fill={`url(#neuronGlow-${uniqueId})`}
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
      {Array.from({ length: particleCount }).map((_, i) => (
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
