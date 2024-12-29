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

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Enhanced response templates with variations
  const responseTemplates = {
    initial: {
      greetText: "👋 Hello! Welcome to SBA_CIA. How can we assist you today?",

      message: () => {
        const greetingResponses = [
          `${getTimeBasedGreeting()}! Welcome to ArchitectStudio. How can I assist you today?`,
          `${getTimeBasedGreeting()}! I'm here to help you create your dream space. What can I do for you?`,
          `${getTimeBasedGreeting()}! Ready to transform your space? Let me know what you're looking for.`
        ];
        return getRandomResponse(greetingResponses);
      },
      quickReplies: [
        { text: "Interior Design", icon: Palette },
        { text: "Home Design", icon: Home },
        { text: "Landscape Design", icon: Trees },
        { text: "Office Design", icon: Building }
      ]
    },
    service_selected: {
      "Interior Design": {
        message: () => getRandomResponse([
          "Great choice! Our interior design team specializes in creating beautiful, functional spaces. What type of space are you looking to transform?",
          "Excellent! Interior design is our passion. What kind of space would you like to work on?",
          "Perfect! We love bringing interior spaces to life. What area would you like to focus on?"
        ]),
        quickReplies: [
          { text: "Residential", icon: Home },
          { text: "Commercial", icon: Building },
          { text: "Book Consultation", icon: Calendar },
          { text: "View Portfolio", icon: Palette }
        ]
      },
      "Home Design": {
        message: () => getRandomResponse([
          "Excellent! We love creating dream homes. What stage of the home design process are you in?",
          "How exciting! Home design is where memories begin. Where are you in your journey?",
          "Perfect! Let's create your ideal home. What phase of the project are you currently in?"
        ]),
        quickReplies: [
          { text: "Initial Planning", icon: Home },
          { text: "Ready to Build", icon: Building },
          { text: "Renovation", icon: Palette },
          { text: "Just Exploring", icon: Trees }
        ]
      },
      // ... similar variations for other services
    },
    consultation: {
      message: () => getRandomResponse([
        "I'd be happy to help you schedule a consultation. When would be the best time for you?",
        "Let's get you set up with one of our experts. What timing works best for you?",
        "Great choice! Our team would love to meet with you. When are you available?"
      ]),
      quickReplies: [
        { text: "This Week", icon: Calendar },
        { text: "Next Week", icon: Calendar },
        { text: "Call Me", icon: Phone },
        { text: "Email Me", icon: MessageCircle }
      ]
    },
    closing: {
      message: () => getRandomResponse([
        "Thank you for your interest! Our team will be in touch soon. Is there anything else you'd like to know?",
        "We're excited to work with you! While you wait for our team to contact you, can I help you with anything else?",
        "Perfect! Our team will reach out shortly. In the meantime, what other questions can I answer for you?"
      ]),
      quickReplies: [
        { text: "View Portfolio", icon: Palette },
        { text: "Services", icon: Building },
        { text: "Office Hours", icon: Clock },
        { text: "No, thanks!", icon: X }
      ]
    }
  };

  // Enhanced automated responses
  const getAutomatedResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();

    // Time-sensitive responses
    const currentHour = new Date().getHours();
    const isOutsideBusinessHours = currentHour < 9 || currentHour >= 17;

    if (isOutsideBusinessHours && (lowercaseInput.includes('call') || lowercaseInput.includes('consultation'))) {
      return {
        message: "Our office is currently closed, but I can help you schedule a callback during business hours (9 AM - 5 PM). When would you like us to contact you?",
        quickReplies: responseTemplates.consultation.quickReplies
      };
    }

    // Project timeline responses
    if (lowercaseInput.includes('how long') || lowercaseInput.includes('timeline')) {
      return {
        message: "Project timelines vary based on scope and complexity. Generally:\n- Interior Design: 2-4 months\n- Home Design: 4-8 months\n- Landscape: 1-3 months\nWould you like to discuss your specific project?",
        quickReplies: [
          { text: "Get Timeline", icon: Clock },
          { text: "Book Consultation", icon: Calendar }
        ]
      };
    }

    // Budget-related responses
    if (lowercaseInput.includes('cost') || lowercaseInput.includes('price') || lowercaseInput.includes('budget')) {
      return {
        message: "We work with various budgets and can create custom solutions that align with your financial goals. Would you like to discuss pricing with one of our experts?",
        quickReplies: [
          { text: "Get Quote", icon: Calendar },
          { text: "View Packages", icon: Palette }
        ]
      };
    }

    return null;
  };

  const handleUserResponse = (text: string) => {
    // Add user message
    const userMessage: Message = {
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);

    // Process response
    setIsTyping(true);
    setTimeout(() => {
      // Check for automated responses first
      const automatedResponse = getAutomatedResponse(text);

      if (automatedResponse) {
        const botMessage: Message = {
          text: automatedResponse.message,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
        setQuickReplies(automatedResponse.quickReplies);
      } else {
        // Process normal flow responses
        let response;
        let newState = conversationState;
        let newQuickReplies: { text: string; icon: React.ComponentType }[] = [];

        if (conversationState === 'initial') {
          const serviceResponse = responseTemplates.service_selected[text as keyof typeof responseTemplates.service_selected];
          if (serviceResponse) {
            response = serviceResponse.message();
            newQuickReplies = serviceResponse.quickReplies;
            newState = 'service_selected';
          }
        } else if (text.includes('Consultation') || text.includes('Quote')) {
          response = responseTemplates.consultation.message();
          newQuickReplies = responseTemplates.consultation.quickReplies;
          newState = 'consultation';
        } else if (text === 'No, thanks!') {
          response = "Thank you for chatting with us! Have a great " +
            (new Date().getHours() < 17 ? "day" : "evening") + "!";
          newState = 'closed';
        } else {
          response = responseTemplates.closing.message();
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
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      handleUserResponse(message);
      setMessage('');
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = responseTemplates.initial;
      setMessages([{
        text: initialMessage.greetText,
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

              {/* Chat Box Title */}
              <div className="flex items-center gap-2">

                <div className="w-3 h-3 bg-green-500 rounded-full"></div>

                <h3 className={`${dmSans.className} font-medium font-display text-gray-100`}>
                  Chat with SBA_CIA
                </h3>

              </div>

              {/* button */}
              <div className="flex items-center gap-2">

                {/* Minimize button */}
                <button
                  onClick={() => setMinimized(true)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <Minus className="w-4 h-4" />
                </button>

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>

              </div>

            </div>

            {/* Chat Messages */}
            <div className="h-[19rem] overflow-y-auto p-4 space-y-4 font-ui">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.sender === 'user'
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
              <div className="p-4 border-t border-gray-800 font-sans">
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
            <div className="p-4 border-t border-gray-800 font-ui">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none"
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
            className="btn-bg p-4 rounded-lg shadow-lg flex items-center gap-2 hover:bg-yellow-500"
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
            className="btn-bg p-4 rounded-full shadow-lg hover:bg-yellow-500 bg-gray-700 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;