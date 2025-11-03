import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { X, Send, Sparkles, Download, Loader2, FileJson, FileText } from 'lucide-react';
import { ChatMessage } from '../../lib/mock-data';
import { getAIResponse } from '../../lib/utils';
import { toast } from 'sonner@2.0.3';

interface AIStudyBuddyProps {
  lessonContext?: string;
  onClose: () => void;
}

export function AIStudyBuddy({ lessonContext, onClose }: AIStudyBuddyProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm your AI Study Buddy${lessonContext ? ` for "${lessonContext}"` : ''}. I can help you:\n\n• Explain topics in simple terms\n• Answer your questions\n• Create quizzes and flashcards\n• Provide examples and practice problems\n\nWhat would you like to learn about?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    'Explain this topic',
    'Create a quiz',
    'Generate flashcards',
    'Give me an example',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await getAIResponse(text, lessonContext);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportAsJSON = (content: string) => {
    try {
      // Extract quiz or flashcard data from the message
      const data = {
        context: lessonContext,
        type: content.includes('Quiz') ? 'quiz' : 'flashcards',
        content: content,
        exportedAt: new Date().toISOString(),
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.type}-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Exported as JSON');
    } catch (error) {
      toast.error('Failed to export');
    }
  };

  const exportAsCSV = (content: string) => {
    try {
      // Convert content to CSV format
      let csvContent = 'Question,Answer\n';
      const lines = content.split('\n');
      
      lines.forEach(line => {
        if (line.includes('Q:') && line.includes('|')) {
          const [question, answer] = line.split('|').map(s => s.trim());
          const q = question.replace(/^\d+\.\s*Q:\s*/, '').replace(/"/g, '""');
          const a = answer.replace(/^A:\s*/, '').replace(/"/g, '""');
          csvContent += `"${q}","${a}"\n`;
        }
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `flashcards-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Exported as CSV');
    } catch (error) {
      toast.error('Failed to export');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl h-[80vh] flex flex-col"
      >
        <Card className="flex flex-col h-full bg-slate-900/95 backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white">AI Study Buddy</h3>
                {lessonContext && (
                  <p className="text-xs text-gray-400">{lessonContext}</p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Quick actions */}
          <div className="p-4 border-b border-white/10 flex gap-2 flex-wrap">
            {quickActions.map((action) => (
              <Badge
                key={action}
                variant="outline"
                className="cursor-pointer border-purple-500/50 text-purple-400 hover:bg-purple-500/20 transition-colors"
                onClick={() => sendMessage(action)}
              >
                {action}
              </Badge>
            ))}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-200 border border-white/10'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                  {message.role === 'assistant' && (message.content.includes('Flashcard') || message.content.includes('Quiz')) && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => exportAsJSON(message.content)}
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                      >
                        <FileJson className="w-3 h-3 mr-2" />
                        Export JSON
                      </Button>
                      {message.content.includes('Flashcard') && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => exportAsCSV(message.content)}
                          className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20"
                        >
                          <FileText className="w-3 h-3 mr-2" />
                          Export CSV
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    <span className="text-gray-400">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about this lesson..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-purple-500"
                disabled={loading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Try: "Explain this in simple terms" or "Create a quiz for me"
            </p>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
}
