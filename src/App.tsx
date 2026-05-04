/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Chat } from './components/Chat';
import { RosettaGuide } from './components/RosettaGuide';
import { TechnicalTools } from './components/TechnicalTools';
import { FabricationDesign } from './components/FabricationDesign';
import { MissionNotebook } from './components/MissionNotebook';
import { StemVenezuela } from './components/StemVenezuela';
import { AuthPage } from './components/AuthPage';
import { Onboarding } from './components/Onboarding';
import { KaiLogo } from './components/Logo';
import { Shield, Brain, Terminal, Activity, Bot, Cpu, Globe, LogOut, Wrench } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'workspace' | 'fabrication' | 'stem'>('chat');
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('kai_theme') || 'cyan');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('kai_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      const onboardingComplete = localStorage.getItem('kai_onboarding_complete');
      if (!onboardingComplete) {
        setShowOnboarding(true);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kai_theme', theme);
  }, [theme]);

  const handleLogin = (userData: {name: string, email: string}) => {
    setUser(userData);
    localStorage.setItem('kai_current_user', JSON.stringify(userData));
    const onboardingComplete = localStorage.getItem('kai_onboarding_complete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('kai_onboarding_complete', 'true');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kai_current_user');
  };

  if (!user) {
    return (
      <div data-theme={theme !== 'cyan' ? theme : undefined} className="min-h-screen">
        <AuthPage onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-full bg-[#05070a] text-slate-300 font-sans flex flex-col overflow-hidden select-none relative"
      data-theme={theme !== 'cyan' ? theme : undefined}
    >
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-dot-pattern" />

      {/* Onboarding Overlay */}
      {showOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {/* Header */}
      <header className="h-14 border-b border-white/10 bg-[#0a0c12] px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <KaiLogo className="w-10 h-10" colorClassName="text-brand-primary" />
          <div>
            <h1 className="text-sm font-bold tracking-widest text-white uppercase leading-none">Innovatec_ka'I // Asistente Técnico</h1>
            <p className="text-[10px] text-brand-secondary font-mono mt-1 uppercase leading-none">ST_STATUS: ONLINE / PROTOCOL: DECODE_V2.1</p>
          </div>
        </div>
        <div className="hidden md:flex gap-6 items-center text-[11px] font-mono">
          {/* Theme Selector */}
          <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
            <ThemeDot color="bg-[#06b6d4]" active={theme === 'cyan'} onClick={() => setTheme('cyan')} />
            <ThemeDot color="bg-[#f59e0b]" active={theme === 'amber'} onClick={() => setTheme('amber')} />
            <ThemeDot color="bg-[#10b981]" active={theme === 'emerald'} onClick={() => setTheme('emerald')} />
            <ThemeDot color="bg-[#d946ef]" active={theme === 'fuchsia'} onClick={() => setTheme('fuchsia')} />
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded uppercase tracking-tighter text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Ingeniero: {user.name}
          </div>
          <button 
            onClick={handleLogout}
            className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-red-400 transition-all cursor-pointer"
            title="Desconexión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden z-10">
        {/* Sidebar: Guide/Steps */}
        <aside className="hidden lg:flex w-72 border-r border-white/5 bg-[#080a0f] flex-col overflow-y-auto shrink-0">
          <div className="p-6">
            <RosettaGuide />
          </div>
        </aside>

        {/* Central Area with Tabs */}
        <section className="flex-1 flex flex-col relative bg-[#05070a]/50">
          <div className="flex border-b border-white/5 bg-[#0a0c12]/80 px-4 pt-4 shrink-0 h-16 items-end gap-1">
            <TabButton 
              active={activeTab === 'chat'} 
              onClick={() => setActiveTab('chat')}
              label="BÓVEDA DE CONSULTA"
              icon={<Bot className="w-3.5 h-3.5" />}
            />
            <TabButton 
              active={activeTab === 'workspace'} 
              onClick={() => setActiveTab('workspace')}
              label="TRABAJO DE CAMPO"
              icon={<Cpu className="w-3.5 h-3.5" />}
            />
            <TabButton 
              active={activeTab === 'fabrication'} 
              onClick={() => setActiveTab('fabrication')}
              label="TALLER PROTOTIPOS"
              icon={<Wrench className="w-3.5 h-3.5" />}
            />
            <TabButton 
              active={activeTab === 'stem'} 
              onClick={() => setActiveTab('stem')}
              label="PORTAL STEM VZLA"
              icon={<Globe className="w-3.5 h-3.5" />}
            />
          </div>
          
          <div className="flex-1 relative overflow-hidden">
            {activeTab === 'chat' && <Chat />}
            {activeTab === 'workspace' && (
              <div className="h-full overflow-y-auto p-8 space-y-8 animate-in fade-in duration-500">
                <TechnicalTools />
                <div className="border-t border-white/5 pt-8">
                  <MissionNotebook />
                </div>
              </div>
            )}
            {activeTab === 'fabrication' && (
              <div className="h-full overflow-y-auto p-8 animate-in fade-in duration-500">
                <FabricationDesign />
              </div>
            )}
            {activeTab === 'stem' && (
              <div className="h-full overflow-y-auto p-8 animate-in fade-in duration-500">
                <StemVenezuela />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-8 bg-brand-primary flex items-center px-6 justify-between text-black shrink-0 font-bold z-10 transition-colors">
        <div className="text-[9px] tracking-tighter uppercase">
          // TERMINAL ACTIVA // USUARIO: {user.email} // MODO: APOYO_PEDAGÓGICO
        </div>
        <div className="text-[9px] font-mono font-bold">
          C_KA'I: 2026.05.04-R4 // LATAM_UNIT
        </div>
      </footer>
    </div>
  );
}

function ThemeDot({ color, active, onClick }: { color: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-3 h-3 rounded-full transition-all cursor-pointer",
        color,
        active ? "ring-2 ring-white scale-125" : "opacity-50 hover:opacity-100"
      )}
    />
  );
}

function TabButton({ active, label, icon, onClick }: { active: boolean, label: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-4 h-10 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-all rounded-t-lg border-x border-t border-transparent",
        active 
          ? "text-brand-secondary bg-[#05070a]/80 border-white/10" 
          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
