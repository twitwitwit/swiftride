import React, { useState } from 'react';
import { X, Send, Bot, User, CheckCircle2, Phone, Mail, Sparkles, MessageSquare } from 'lucide-react';
import { SwiftRideLogo } from '../common/SwiftRideLogo';
import { useRide } from '../../context/RideContext';

interface LiveChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatItem {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const LiveChatDrawer: React.FC<LiveChatDrawerProps> = ({ isOpen, onClose }) => {
  const { showNotification } = useRide();
  const [messages, setMessages] = useState<ChatItem[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Mabuhay! Welcome to SwiftRide 24/7 Live Support. How may we assist your journey today?',
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    const userMsg: ChatItem = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Dynamic smart response
    setTimeout(() => {
      let reply = "Thank you for reaching out! Our dispatch support officer is looking into this for you right now.";
      const lower = userText.toLowerCase();

      if (lower.includes('book') || lower.includes('ride') || lower.includes('fare')) {
        reply = "You can book a ride directly by tapping 'Book a Ride Now' on the homepage or through our passenger app. Fares start at ₱80 for motorcycles and ₱120 for sedans.";
      } else if (lower.includes('cancel') || lower.includes('refund')) {
        reply = "Cancellations made within 3 minutes of driver acceptance are 100% free of charge with instant wallet refunds.";
      } else if (lower.includes('driver') || lower.includes('apply') || lower.includes('register')) {
        reply = "To join as a SwiftRide driver partner, you will need a valid driver's license, vehicle OR/CR, and NBI clearance. You can register via our Driver Portal.";
      } else if (lower.includes('lost') || lower.includes('item')) {
        reply = "If you left an item in a vehicle, please provide your Trip ID and our team will contact the driver partner immediately.";
      } else if (lower.includes('payment') || lower.includes('gcash') || lower.includes('card')) {
        reply = "We support GCash, Visa/Mastercard, Maya, In-App Wallet, and Cash payments directly to drivers.";
      }

      const botMsg: ChatItem = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const quickQuestions = [
    'How do I book a ride?',
    'Payment methods accepted',
    'Apply as a Driver Partner',
    'Report a lost item'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-slate-900 border border-slate-700 w-full sm:max-w-md h-full sm:h-[650px] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                SwiftRide 24/7 Support
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </h4>
              <p className="text-[10px] text-slate-400 font-mono">Typically replies within 1 min</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${
                  m.sender === 'user' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-200'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-400 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                <span className={`text-[9px] block mt-1 ${m.sender === 'user' ? 'text-slate-800' : 'text-slate-500'}`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-900/60 p-2.5 rounded-2xl max-w-[120px] border border-slate-800">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[10px] ml-1">Typing...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-slate-950 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputVal(q);
              }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-full text-[10px] text-amber-300 whitespace-nowrap transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 flex items-center justify-center font-bold transition-colors cursor-pointer shrink-0 shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
