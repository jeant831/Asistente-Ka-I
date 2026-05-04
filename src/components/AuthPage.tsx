import React, { useState } from 'react';
import { KaiLogo } from './Logo';
import { Shield, Lock, Mail, User, ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthPageProps {
  onLogin: (userData: { name: string, email: string }) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth for now - Local storage based
    const userData = { name: name || 'Ingeniero Visitante', email };
    onLogin(userData);
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,#1e293b_1px,transparent_0)] bg-[size:24px_24px]" />
      
      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-[#0a0c12]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <KaiLogo className="w-20 h-20 mb-4" colorClassName="text-brand-primary" />
            <h1 className="text-2xl font-bold text-white tracking-tight uppercase">COPA KA'I: CENTRAL</h1>
            <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-widest">Protocolo de Acceso Seguro</p>
          </div>

          <div className="flex bg-black/40 p-1 rounded-xl mb-8 border border-white/5">
            <button 
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                isLogin ? "bg-brand-primary text-black shadow-lg" : "text-slate-500 hover:text-slate-300"
              )}
            >
              INICIAR SESIÓN
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                !isLogin ? "bg-brand-primary text-black shadow-lg" : "text-slate-500 hover:text-slate-300"
              )}
            >
              REGISTRO
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-mono ml-1">Nombre de Ingeniero</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-10 py-3 text-sm text-white focus:border-brand-primary/50 outline-none transition-all"
                    placeholder="Ej: Simon Rodriguez"
                  />
                </div>
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-mono ml-1">Correo Institucional</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-10 py-3 text-sm text-white focus:border-brand-primary/50 outline-none transition-all"
                  placeholder="ingeniero@copakai.org"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-mono ml-1">Código de Acceso</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-10 py-3 text-sm text-white focus:border-brand-primary/50 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-brand-primary hover:opacity-90 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_var(--brand-glow)] active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              {isLogin ? 'AUTORIZAR ACCESO' : 'CREAR CREDENCIALES'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 flex gap-3 italic">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
            <p className="text-[10px] text-yellow-200/60 leading-relaxed">
              AVISO: El sistema central se encuentra en modo [DEMO_LOCAL]. Los datos se almacenarán en esta terminal para fines educativos.
            </p>
          </div>
        </div>
        
        <p className="mt-6 text-center text-slate-600 text-[10px] font-mono uppercase tracking-[0.3em]">
          Copa Ka'i // Red STEM de Venezuela // v2026
        </p>
      </div>
    </div>
  );
}
