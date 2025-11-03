import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CreditCard, Lock, CheckCircle2, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Course } from '../../lib/mock-data';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onPaymentSuccess: (courseId: string) => void;
}

export function PaymentModal({ isOpen, onClose, course, onPaymentSuccess }: PaymentModalProps) {
  const [processing, setProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success'>('details');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handlePayment = async () => {
    // Validation
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      toast.error('Please fill in all payment details');
      return;
    }

    setProcessing(true);
    setPaymentStep('processing');

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      setProcessing(false);
      
      setTimeout(() => {
        onPaymentSuccess(course.id);
        toast.success(`Successfully enrolled in ${course.title}!`);
        handleClose();
      }, 2000);
    }, 2500);
  };

  const handleClose = () => {
    setPaymentStep('details');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardName('');
    onClose();
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\//g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-white/10 p-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        
        <AnimatePresence mode="wait">
          {paymentStep === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative p-6"
            >
              <DialogHeader>
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-2xl text-white">Complete Your Purchase</DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <DialogDescription className="text-gray-400">
                  Secure payment powered by encrypted technology
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Course Summary */}
                <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 space-y-4">
                  <h3 className="text-lg text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Course Summary
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Course</p>
                      <p className="text-white">{course.title}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Instructor</p>
                      <p className="text-white">{course.instructor}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {course.lessons} Lessons
                      </Badge>
                      <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                        {course.duration}
                      </Badge>
                      <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 capitalize">
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total</span>
                      <span className="text-2xl text-white">${course.price?.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lifetime access included</span>
                  </div>
                </Card>

                {/* Payment Form */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Lock className="w-4 h-4 text-green-400" />
                    <span>Secured with SSL encryption</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName" className="text-white">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                      <div className="relative mt-2">
                        <Input
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            if (formatted.replace(/\s/g, '').length <= 16) {
                              setCardNumber(formatted);
                            }
                          }}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pl-10"
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-white">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            if (formatted.replace(/\//g, '').length <= 4) {
                              setExpiryDate(formatted);
                            }
                          }}
                          className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cvv" className="text-white">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => {
                            if (e.target.value.length <= 3) {
                              setCvv(e.target.value.replace(/\D/g, ''));
                            }
                          }}
                          className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white h-12 mt-6"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Pay ${course.price?.toFixed(2)}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By confirming your purchase, you agree to our Terms of Service
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {paymentStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative p-12 flex flex-col items-center justify-center min-h-[400px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-500 mb-6"
              />
              <h3 className="text-xl text-white mb-2">Processing Payment...</h3>
              <p className="text-gray-400 text-center">Please wait while we securely process your transaction</p>
            </motion.div>
          )}

          {paymentStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative p-12 flex flex-col items-center justify-center min-h-[400px]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </motion.div>
              <h3 className="text-2xl text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-400 text-center mb-4">
                You now have full access to {course.title}
              </p>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Redirecting to course...
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
