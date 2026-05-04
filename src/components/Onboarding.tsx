import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Cpu, Globe, BookOpen, Rocket, ArrowRight, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { KaiLogo } from './Logo';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Bienvenido, Ingeniero",
      desc: "Estás entrando a la red central de la Copa Ka'i. Tu misión es dominar el reto DECODE y llevar la robótica venezolana al siguiente nivel.",
      icon: <Rocket className="w-12 h-12 text-brand-primary" />,
      image: <KaiLogo className="w-32 h-32" colorClassName="text-brand-primary" />
    },
    {
      title: "Tu Asistente de IA",
      desc: "En la Bóveda de Consulta, mi sistema procesará tus dudas. Recuerda: no te daré las respuestas, te enseñaré a encontrarlas usando lógica técnica.",
      icon: <Bot className="w-12 h-12 text-brand-primary" />,
      tab: "BÓVEDA DE CONSULTA"
    },
    {
      title: "Estación de Trabajo",
      desc: "Usa el Conversor de Ángulos y el Traductor Hexadecimal para procesar los datos de tu Roseta física en tiempo real.",
      icon: <Cpu className="w-12 h-12 text-brand-primary" />,
      tab: "TRABAJO DE CAMPO"
    },
    {
      title: "Bitácora de Misión",
      desc: "Documenta cada hallazgo. Un buen ingeniero registra sus pruebas para que su equipo pueda aprender y optimizar el hardware.",
      icon: <BookOpen className="w-12 h-12 text-brand-primary" />,
      tab: "CUADERNO de BITÁCORA"
    },
    {
      title: "Venezuela STEM",
      desc: "Explora las áreas críticas de estudio en nuestro país. La robótica es solo el inicio de una gran transformación tecnológica.",
      icon: <Globe className="w-12 h-12 text-brand-primary" />,
      tab: "PORTAL STEM VZLA"
    }
  ];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]/90 backdrop-blur-md p-6">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,#1e293b_1px,transparent_0)] bg-[size:24px_24px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#0a0c12] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
      >
        <button 
          onClick={onComplete}
          className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Visual Side */}
          <div className="md:w-5/12 bg-white/5 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-primary/5 blur-[80px] rounded-full" />
             <AnimatePresence mode="wait">
               <motion.div
                 key={step}
                 initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
                 exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                 transition={{ type: "spring", stiffness: 100 }}
                 className="relative z-10 flex flex-col items-center gap-6"
               >
                 {steps[step].image || (
                   <div className="w-32 h-32 rounded-3xl bg-slate-900 border border-brand-primary/30 flex items-center justify-center shadow-2xl">
                     {steps[step].icon}
                   </div>
                 )}
                 {steps[step].tab && (
                   <div className="px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-[0.2em]">
                     MODO: {steps[step].tab}
                   </div>
                 )}
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Content Side */}
          <div className="md:w-7/12 p-10 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      i === step ? "w-8 bg-brand-primary" : i < step ? "w-4 bg-brand-primary/40" : "w-2 bg-slate-800"
                    )}
                  />
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
                    {steps[step].title}
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed font-sans italic">
                    "{steps[step].desc}"
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="pt-8 flex items-center gap-4">
                <button 
                  onClick={next}
                  className="flex-1 py-4 bg-brand-primary hover:opacity-90 text-black font-bold rounded-2xl transition-all shadow-[0_0_30px_var(--brand-glow)] active:scale-95 flex items-center justify-center gap-3 group"
                >
                  {step === steps.length - 1 ? 'INICIAR PROTOCOLO' : 'SIGUIENTE PASO'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {step < steps.length - 1 && (
                  <button 
                    onClick={onComplete}
                    className="px-6 py-4 text-slate-500 hover:text-slate-300 text-xs font-bold uppercase tracking-widest"
                  >
                    Omitir
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
