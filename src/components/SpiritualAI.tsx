import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "system",
    content: `You are a wise, compassionate, and highly knowledgeable Hindu spiritual guide and consultant. 
    Your purpose is to help devotees find the right divine path, suggest suitable temples for their problems, 
    provide astrological/kundli guidance if they share details, and explain daily rituals. 
    Always respond with deep respect, using traditional greetings like "Namaste", "Har Har Mahadev", or "Jai Shri Ram" where appropriate. 
    Keep your answers concise, structured, and profoundly helpful.`
  },
  {
    role: "assistant",
    content: "Namaste, seeker. I am your personal spiritual guide. How may I assist you on your divine journey today? You may ask about specific pujas, share kundli details for guidance, or seek the right temple for your prayers."
  }
];

export const SpiritualAI = ({ className }: { className?: string }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [...messages, userMsg],
          temperature: 0.7,
          max_tokens: 1024,
        })
      });

      if (!response.ok) throw new Error("Divine connection interrupted");

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.error("Spiritual AI Error:", error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Forgive me, the cosmic connection seems weak at the moment. Please try again in a few moments." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-border/50 h-full", className)}>
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shadow-inner">
            <Sparkles className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h3 className="font-serif-display font-bold text-white text-lg leading-tight">Divine AI Guide</h3>
            <p className="text-[10px] text-white/70 uppercase tracking-widest font-black">Your Spiritual Consultant</p>
          </div>
        </div>
        <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-gradient-cream">
        {messages.filter(m => m.role !== "system").map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-3 max-w-[90%]",
              msg.role === "user" ? "flex-row-reverse ml-auto" : "flex-row mr-auto"
            )}
          >
            <div className={cn(
              "h-8 w-8 shrink-0 rounded-full flex items-center justify-center mt-1 shadow-sm",
              msg.role === "user" ? "bg-secondary text-white" : "bg-primary text-gold"
            )}>
              {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={cn(
              "px-5 py-4 rounded-2xl text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap",
              msg.role === "user" 
                ? "bg-secondary text-white rounded-tr-sm" 
                : "bg-white border border-border text-foreground rounded-tl-sm font-medium text-secondary"
            )}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 max-w-[90%] mr-auto">
            <div className="h-8 w-8 shrink-0 rounded-full bg-primary text-gold flex items-center justify-center mt-1 shadow-sm">
              <Bot className="h-4 w-4" />
            </div>
            <div className="px-5 py-4 rounded-2xl bg-white border border-border text-foreground rounded-tl-sm flex gap-2 items-center shadow-sm">
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
              <span className="text-sm font-medium text-muted-foreground">Seeking divine guidance...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white border-t border-border/50 shrink-0">
        <div className="relative flex items-center shadow-sm rounded-full bg-muted/30 border border-border group focus-within:border-primary/50 focus-within:bg-white transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about rituals, pujas, or your kundli..."
            className="w-full h-14 bg-transparent pl-6 pr-14 text-[15px] focus:outline-none placeholder:text-muted-foreground/60"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:hover:bg-primary"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </div>
        <div className="text-center mt-3">
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black opacity-60">Powered by Vandan Darshan AI</span>
        </div>
      </div>
    </div>
  );
};
