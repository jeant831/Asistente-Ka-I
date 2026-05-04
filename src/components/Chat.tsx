import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../lib/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Bienvenido, Ingeniero! Soy tu Asistente Técnico de la Copa Ka\'i. Estoy listo para ayudarte a descifrar los misterios de la Roseta DECODE. ¿En qué parte del hardware o del código te encuentras hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages
            .filter((_, i) => i !== 0 || messages[0].role === 'user') // Skip if first message is a greeting (model)
            .map(m => ({
              role: m.role,
              parts: [{ text: m.text }]
            }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error de conexión con el núcleo');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.response }]);
    } catch (error: any) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `ERROR DE SISTEMA: ${error.message || 'No se pudo establecer conexión con los núcleos de procesamiento.'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent flex-1">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-6 max-w-2xl px-4 py-6 rounded-2xl relative transition-colors",
                m.role === 'user' 
                  ? "ml-auto flex-row-reverse bg-white/5 border border-white/5 shadow-lg" 
                  : "mr-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl"
              )}
            >
              {/* Badge for Assistant */}
              {m.role === 'model' && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-brand-primary text-black text-[10px] font-bold rounded uppercase tracking-tighter">
                  Asistente de Ingeniería
                </div>
              )}
              
              <div className={cn(
                "w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border",
                m.role === 'user' 
                  ? "bg-slate-950 border-white/10 text-slate-400" 
                  : "bg-brand-primary/20 border-brand-primary/40 text-brand-secondary"
              )}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 shadow-[0_0_15px_var(--brand-glow)]" />}
              </div>
              <div className={cn(
                "flex-1 text-sm leading-relaxed",
                m.role === 'user' ? "text-slate-300" : "text-white italic"
              )}>
                <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/5">
                  <ReactMarkdown>
                    {m.text}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-6 items-center text-brand-secondary/60 max-w-2xl px-10">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] italic">Procesando datos del núcleo...</span>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="p-8 border-t border-white/5 bg-[#0a0c12]/50 backdrop-blur">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center max-w-4xl mx-auto w-full"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu duda técnica aquí, Ingeniero..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm text-slate-200 focus:outline-none focus:border-brand-primary/50 pr-24 placeholder:text-slate-600 transition-all shadow-inner"
          />
          <div className="absolute right-4 flex items-center gap-3">
             <span className="hidden md:inline text-[9px] font-mono text-slate-500 uppercase tracking-widest">Enter para enviar</span>
             <button
               type="submit"
               disabled={!input.trim() || isLoading}
               className="w-10 h-10 bg-brand-primary hover:opacity-90 disabled:opacity-50 disabled:bg-slate-800 text-black font-bold rounded-lg transition-all active:scale-95 shadow-[0_0_20px_var(--brand-glow)] flex items-center justify-center cursor-pointer"
             >
               <Send className="w-5 h-5 -rotate-45" />
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
