import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Upload, FileText, Wand2, Download, Loader2, CheckCircle2, Copy, Sparkles, Brain, Layers } from 'lucide-react';
import { FlashcardViewer } from './flashcard-viewer';
import { MindMapViewer } from './mindmap-viewer';
import { processOCR } from '../../lib/utils';
import { toast } from 'sonner@2.0.3';

type OutputMode = 'preview' | 'flashcards' | 'mindmap';

// Neural Network Animation Component
function NeuralNetwork() {
  const [neurons, setNeurons] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    // Generate random neuron positions
    const generatedNeurons = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setNeurons(generatedNeurons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" style={{ minHeight: '100vh' }}>
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
                  stroke="url(#neuronGradient)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
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

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="neuronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="neuronGlow">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Draw neurons */}
        {neurons.map((neuron, i) => (
          <motion.g key={neuron.id}>
            {/* Glow effect */}
            <motion.circle
              cx={`${neuron.x}%`}
              cy={`${neuron.y}%`}
              r="8"
              fill="url(#neuronGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
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
              r="3"
              fill="#a855f7"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.6, 1, 0.6],
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
              r="3"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: [0.8, 0, 0.8],
                scale: [1, 3, 1],
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
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export function NotesScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{
    cleanText: string;
    summary: string;
    flashcards: Array<{ question: string; answer: string }>;
  } | null>(null);
  const [outputMode, setOutputMode] = useState<OutputMode>('preview');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setOutputMode('preview');
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const ocrResult = await processOCR(file);
      setResult(ocrResult);
      setOutputMode('preview');
      toast.success('Notes processed successfully!');
    } catch (error) {
      toast.error('Failed to process notes');
    } finally {
      setProcessing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleDownloadText = () => {
    if (!result) return;
    
    const content = `# Extracted Text\n\n${result.cleanText}\n\n# AI Summary\n\n${result.summary}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Text downloaded!');
  };

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Background book image with overlay */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYm9vayUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjIxNTUxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95" />
      </div>

      {/* AI Neural Network Animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <NeuralNetwork />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl text-white mb-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Smart Notes Scanner
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform handwritten notes into digital text, interactive flashcards, and AI-powered mind maps
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Upload section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-sm border border-white/10 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl text-white">Upload Notes</h2>
              </div>

              {!file ? (
                <label className="block">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-dashed border-purple-500/50 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        background: [
                          'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    </motion.div>
                    
                    <p className="text-white mb-2 relative z-10">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-400 relative z-10">
                      JPG, PNG, PDF • Max 10MB
                    </p>
                  </motion.div>
                </label>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  {/* File preview */}
                  {imagePreview && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative rounded-xl overflow-hidden border border-white/10"
                    >
                      <img
                        src={imagePreview}
                        alt="Note preview"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div className="text-white">
                          <p className="text-sm opacity-90">{file.name}</p>
                          <p className="text-xs opacity-70">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFile(null);
                        setImagePreview(null);
                        setResult(null);
                      }}
                      className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      Remove
                    </Button>
                  </div>

                  <Button
                    onClick={handleProcess}
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 h-12"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing with AI...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5 mr-2" />
                        Process with OCR
                      </>
                    )}
                  </Button>
                </motion.div>
              )}

              {/* Features */}
              <div className="mt-6 space-y-3 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  AI-Powered Features:
                </p>
                {[
                  { icon: '📝', text: 'OCR Text Extraction' },
                  { icon: '🎴', text: 'Interactive Flashcards' },
                  { icon: '🧠', text: 'Smart Mind Maps' },
                  { icon: '📊', text: 'AI Summary Generation' },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-gray-300">{feature.text}</span>
                    <motion.div
                      className="ml-auto"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Results section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-sm border border-white/10 min-h-[600px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl text-white">Results</h2>
                </div>

                {result && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setOutputMode('preview')}
                      className={`border-white/10 ${
                        outputMode === 'preview'
                          ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50'
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Text
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setOutputMode('flashcards')}
                      className={`border-white/10 ${
                        outputMode === 'flashcards'
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <Layers className="w-4 h-4 mr-2" />
                      Flashcards
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setOutputMode('mindmap')}
                      className={`border-white/10 ${
                        outputMode === 'mindmap'
                          ? 'bg-pink-500/20 text-pink-400 border-pink-500/50'
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Mind Map
                    </Button>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-24 text-center"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity },
                      }}
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 relative"
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-4 border-2 border-dashed border-purple-500/30 rounded-full"
                      />
                      <FileText className="w-16 h-16 text-purple-400" />
                    </motion.div>
                    
                    <h3 className="text-xl text-white mb-2">Ready to Process</h3>
                    <p className="text-gray-400 max-w-md">
                      Upload your handwritten notes and click "Process with OCR" to extract text,
                      generate flashcards, and create mind maps
                    </p>

                    {/* Feature preview */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                      {[
                        { icon: '📝', label: 'Extract Text', color: 'indigo' },
                        { icon: '🎴', label: 'Flashcards', color: 'purple' },
                        { icon: '🧠', label: 'Mind Map', color: 'pink' },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className={`p-4 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/30`}
                        >
                          <div className="text-3xl mb-2">{item.icon}</div>
                          <p className="text-sm text-gray-300">{item.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={outputMode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {outputMode === 'preview' && (
                      <Tabs defaultValue="text" className="w-full">
                        <TabsList className="bg-white/5 border border-white/10 w-full mb-6">
                          <TabsTrigger value="text" className="flex-1">
                            Clean Text
                          </TabsTrigger>
                          <TabsTrigger value="summary" className="flex-1">
                            AI Summary
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="text" className="mt-0">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <CheckCircle2 className="w-3 h-3 mr-2" />
                                OCR Complete
                              </Badge>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCopy(result.cleanText)}
                                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                                >
                                  <Copy className="w-3 h-3 mr-2" />
                                  Copy
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={handleDownloadText}
                                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                                >
                                  <Download className="w-3 h-3 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                            <Card className="p-6 bg-white/5 border border-white/10 max-h-[450px] overflow-y-auto">
                              <pre className="text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                                {result.cleanText}
                              </pre>
                            </Card>
                          </motion.div>
                        </TabsContent>

                        <TabsContent value="summary" className="mt-0">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                          >
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              <Sparkles className="w-3 h-3 mr-2" />
                              AI-Generated Summary
                            </Badge>
                            <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-purple-500/30">
                              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {result.summary}
                              </p>
                            </Card>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCopy(result.summary)}
                              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                            >
                              <Copy className="w-3 h-3 mr-2" />
                              Copy Summary
                            </Button>
                          </motion.div>
                        </TabsContent>
                      </Tabs>
                    )}

                    {outputMode === 'flashcards' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <FlashcardViewer flashcards={result.flashcards} />
                      </motion.div>
                    )}

                    {outputMode === 'mindmap' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <MindMapViewer text={result.cleanText} />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-purple-500/30 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-white">Pro Tips for Best Results</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: '💡',
                    title: 'Good Lighting',
                    desc: 'Ensure your notes are well-lit and clearly visible for accurate OCR',
                  },
                  {
                    icon: '✍️',
                    title: 'Legible Writing',
                    desc: 'Neat handwriting significantly improves text extraction accuracy',
                  },
                  {
                    icon: '📸',
                    title: 'High Quality',
                    desc: 'Use high-resolution images and avoid shadows or glare',
                  },
                ].map((tip, index) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all"
                  >
                    <motion.div
                      className="text-4xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {tip.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-white mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{tip.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
