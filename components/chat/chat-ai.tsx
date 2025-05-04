"use client";

import { useState, useCallback } from "react";
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY });

export default function ChatAi({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="fixed bottom-20 right-5 dark:bg-zinc-500 shadow-xl rounded-lg w-80 h-96 flex flex-col p-4 z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">Gemini Chat</h3>
        <button onClick={onClose} className="text-red-600 hover:text-red-700 font-bold text-xl transition-colors">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
              msg.sender === "user" 
                ? "bg-blue-500 text-white rounded-br-none" 
                : "bg-gray-200 text-gray-800 rounded-bl-none"
            }`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <span className="inline-block px-3 py-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
              Thinking...
            </span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button 
          onClick={sendMessage} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}