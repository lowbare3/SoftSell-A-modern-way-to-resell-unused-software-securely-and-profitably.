// src/components/AIChatWidget.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const exampleQuestions = [
  {
    question: 'How do I sell my license?',
    answer: 'To sell your license, navigate to your dashboard, select the license, and click on "List for Sale".'
  },
  {
    question: 'Can I transfer a license to someone else?',
    answer: 'Yes, licenses can be transferred. Go to the license settings and choose "Transfer Ownership".'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We support major credit cards, PayPal, and crypto payments.'
  }
];

const TypingDots = () => (
  <div className="flex space-x-1">
    <div className="w-2 h-2 bg-[#5ce1e6] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-[#5ce1e6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-[#5ce1e6] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const handleSend = (question, answer) => {
    if (!question.trim()) return;
    const response =
      answer ||
      exampleQuestions.find(q => q.question.toLowerCase() === question.toLowerCase())?.answer ||
      "Sorry, I don't have an answer for that right now.";

    setChat(prev => [...prev, { q: question }]);
    setIsTyping(true);
    setInput('');
    setTimeout(() => {
      setChat(prev => [...prev.slice(0, -1), { q: question, a: response }]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-80 h-96 bg-[#1a1a1a] text-white rounded-3xl shadow-2xl border border-[#5ce1e6] flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center bg-[#1a1a1a] p-4 border-b border-[#5ce1e6]">
              <h3 className="text-lg font-semibold text-[#5ce1e6]">AI Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="text-white text-xl">&times;</button>
            </div>
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
              {chat.map((entry, i) => (
                <div key={i} className="space-y-1">
                  <p className="font-bold text-[#5ce1e6]">You: <span className="font-normal text-white">{entry.q}</span></p>
                  {entry.a ? (
                    <p className="font-bold text-[#5ce1e6]">Bot: <span className="font-normal text-white">{entry.a}</span></p>
                  ) : (
                    <p className="font-bold text-[#5ce1e6] flex items-center gap-2">Bot: <TypingDots /></p>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#5ce1e6]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                className="w-full px-4 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#5ce1e6]"
                placeholder="Type your question..."
              />
              <div className="mt-2 space-y-1">
                {exampleQuestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(item.question, item.answer)}
                    className="block text-left w-full text-sm text-[#5ce1e6] hover:underline"
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-[#5ce1e6] text-black px-4 py-2 rounded-full shadow-lg"
        >
          
          <span className="font-medium">Chat with AI</span>
        </motion.button>
      )}
    </div>
  );
};

export default AIChatWidget;
