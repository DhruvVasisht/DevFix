"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleGenAI } from '@google/genai';
import { Send, X, Loader2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY });

export default function ChatAi({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: input,
      });

      const aiText = response.text ?? "No response from AI.";
      const aiMessage = { sender: "ai", text: aiText };
      console.log('response.text', aiText);

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { 
        sender: "ai", 
        text: "Error: Failed to get response. Please check your API key and try again." 
      }]);
    } finally {
      setLoading(false);
    }
  }, [input]);

  return (
    <div className="fixed bottom-20 right-5 bg-white dark:bg-zinc-800 shadow-2xl rounded-2xl w-80 h-96 flex flex-col overflow-hidden z-50 border border-gray-200 dark:border-zinc-700 transition-all duration-200 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg">💬</span>
          </div>
          <h3 className="font-bold text-lg">Gemini Chat</h3>
        </div>
        <button 
          onClick={onClose} 
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-zinc-900">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm italic">
            Ask Gemini anything...
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
          >
            {msg.sender === "ai" && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <span className="text-white text-xs">G</span>
              </div>
            )}
            
            <div 
              className={`px-4 py-2 rounded-2xl max-w-[85%] shadow-sm ${
                msg.sender === "user" 
                  ? "bg-indigo-500 text-white rounded-tr-none" 
                  : "bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-zinc-700"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
            </div>
            
            {msg.sender === "user" && (
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                <span className="text-white text-xs">U</span>
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-2 mt-1">
              <span className="text-white text-xs">G</span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-zinc-700">
              <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-900 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-800 dark:text-gray-200"
            disabled={loading}
          />
          <button 
            onClick={sendMessage} 
            className={`rounded-full p-1.5 ${input.trim() ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-300 dark:bg-zinc-700'} text-white transition-colors`}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <Send size={16} className={input.trim() ? '' : 'opacity-50'} />
          </button>
        </div>
      </div>
    </div>
  );
}
