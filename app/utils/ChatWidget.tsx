import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, Send, Minus, X, 
  Building, Home, Palette, Trees,
  Clock, Calendar, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'] });

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState('');
  interface Message {
    text: string;
    sender: 'user' | 'bot';
    time: string;
  }
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<{ text: string; icon: React.ComponentType }[]>([]);
  const [conversationState, setConversationState] = useState('initial');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automated responses based on conversation state and user input
  const responseTemplates = {
    initial: {
      message: "👋 Hello! Welcome to ArchitectStudio. How can I assist you today?",
      quickReplies: [
        { text: "Interior Design", icon: Palette },
        { text: "Home Design", icon: Home },
        { text: "Landscape Design", icon: Trees },
        { text: "Office Design", icon: Building }
      ]
    },
    service_selected: {
      "Interior Design": {
        message: "Great choice! Our interior design team specializes in creating beautiful, functional spaces. What type of space are you looking to transform?",
        quickReplies: [
          { text: "Residential", icon: Home },
          { text: "Commercial", icon: Building },
          { text: "Book Consultation", icon: Calendar },
          { text: "View Portfolio", icon: Palette }
        ]
      },
      "Home Design": {
        message: "Excellent! We love creating dream homes. What stage of the home design process are you in?",
        quickReplies: [
          { text: "Initial Planning", icon: Home },
          { text: "Ready to Build", icon: Building },
          { text: "Renovation", icon: Palette },
          { text: "Just Exploring", icon: Trees }
        ]
      },
      "Landscape Design": {
        message: "Perfect! Our landscape architects create stunning outdoor spaces. What type of landscape project are you interested in?",
        quickReplies: [
          { text: "Garden Design", icon: Trees },
          { text: "Outdoor Living", icon: Home },
          { text: "Commercial", icon: Building },
          { text: "View Projects", icon: Palette }
        ]
      },
      "Office Design": {
        message: "Wonderful! We specialize in creating productive and inspiring workspaces. What's the scope of your office project?",
        quickReplies: [
          { text: "Small Office", icon: Building },
          { text: "Corporate Space", icon: Building },
          { text: "Renovation", icon: Palette },
          { text: "Get Quote", icon: Calendar }
        ]
      }
    },
    consultation: {
      message: "I'd be happy to help you schedule a consultation. When would be the best time for you?",
      quickReplies: [
        { text: "This Week", icon: Calendar },
        { text: "Next Week", icon: Calendar },
        { text: "Call Me", icon: Phone },
        { text: "Email Me", icon: MessageCircle }
      ]
    },
    contact_method: {
      message: "Great! Please provide your preferred contact information, and our team will reach out to you within 24 hours.",
      quickReplies: [
        { text: "Call Now", icon: Phone },
        { text: "Send Email", icon: MessageCircle }
      ]
    },
    closing: {
      message: "Thank you for your interest! Our team will be in touch soon. Is there anything else you'd like to know?",
      quickReplies: [
        { text: "View Portfolio", icon: Palette },
        { text: "Services", icon: Building },
        { text: "Office Hours", icon: Clock },
        { text: "No, thanks!", icon: X }
      ]
    }
  };

  const handleUserResponse = (text: string) => {
    // Add user message
    const userMessage: Message = {
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Process response based on current state and user input
    setIsTyping(true);
    setTimeout(() => {
      let response;
      let newState = conversationState;
      let newQuickReplies: { text: string; icon: React.ComponentType }[] = [];

      if (conversationState === 'initial') {
        const serviceResponse = responseTemplates.service_selected[text as keyof typeof responseTemplates.service_selected];
        if (serviceResponse) {
          response = serviceResponse.message;
          newQuickReplies = serviceResponse.quickReplies;
          newState = 'service_selected';
        }
      } else if (text.includes('Consultation') || text.includes('Quote')) {
        response = responseTemplates.consultation.message;
        newQuickReplies = responseTemplates.consultation.quickReplies;
        newState = 'consultation';
      } else if (text.includes('Call') || text.includes('Email')) {
        response = responseTemplates.contact_method.message;
        newQuickReplies = responseTemplates.contact_method.quickReplies;
        newState = 'contact_method';
      } else if (text === 'No, thanks!') {
        response = "Thank you for chatting with us! Feel free to reach out if you have any questions.";
        newState = 'closed';
      } else {
        response = responseTemplates.closing.message;
        newQuickReplies = responseTemplates.closing.quickReplies;
        newState = 'closing';
      }

      const botMessage: Message = {
        text: response || '',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setQuickReplies(newQuickReplies);
      setConversationState(newState);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    handleUserResponse(message);
    setMessage('');
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = responseTemplates.initial;
      setMessages([{
        text: initialMessage.message,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setQuickReplies(initialMessage.quickReplies);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gray-900 rounded-lg shadow-xl md:w-96 w-[20rem] mb-4 border border-gray-800"
          >
            {/* Chat Header */}
            <div className="bg-gray-800 p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className={`${dmSans.className} font-medium text-gray-100`}>
                  Chat with ArchitectStudio
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setMinimized(true)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-[19rem] overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-gray-800 text-gray-100'
                  } rounded-lg p-3`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {msg.time}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-sm">Typing...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {quickReplies.length > 0 && (
              <div className="p-4 border-t border-gray-800">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleUserResponse(reply.text)}
                      className="bg-gray-800 text-gray-100 px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors"
                    >
                      {reply.icon && React.createElement(reply.icon as React.ComponentType<{ className?: string }>, { className: "w-4 h-4" })}
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="btn-bg p-2 rounded-lg dark:hover:bg-yellow-500 hover:bg-gray-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <AnimatePresence>
        {minimized && isOpen ? (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setMinimized(false)}
            className="btn-bg p-4 rounded-lg shadow-lg flex items-center gap-2 dark:hover:bg-yellow-500 hover:bg-gray-700"
          >
            <MessageCircle className="w-5 h-5" />
            <span className={`${dmSans.className} font-medium`}>Continue Chat</span>
          </motion.button>
        ) : !isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="btn-bg p-4 rounded-full shadow-lg dark:hover:bg-yellow-500 hover:bg-gray-700 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;