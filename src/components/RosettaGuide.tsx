import React from 'react';
import { Target, ShieldAlert, Cpu, Lightbulb, Hexagon, Circle, Square, Triangle } from 'lucide-react';
import { cn } from '../lib/utils';

export function RosettaGuide() {
  return (
    <div className="h-full flex flex-col gap-8 text-slate-300">
      {/* Phases / Navigation */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Fases del Reto</p>
          <span className="text-[9px] px-2 py-0.5 bg-brand-primary/10 text-brand-secondary rounded border border-brand-primary/20">ACTIVO</span>
        </div>
        
        <nav className="space-y-2">
          <PhaseItem active title="01. Alineación Roseta" color="bg-brand-primary" glow />
          <PhaseItem title="02. Decodificación Hex" color="bg-slate-600" />
          <PhaseItem title="03. Cálculo de Inercia" color="bg-slate-600" />
          <PhaseItem title="04. Envío de Comandos" color="bg-slate-600" />
        </nav>
      </div>

      {/* Bitácora / Logs Section */}
      <div className="flex-1 min-h-0 flex flex-col gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5 h-full overflow-hidden flex flex-col">
          <p className="text-[10px] text-brand-secondary font-mono mb-4 uppercase tracking-[0.2em]">Bitácora de Sistemas</p>
          <div className="flex-1 text-[11px] font-mono leading-relaxed space-y-3 text-slate-400 overflow-y-auto pr-2">
            <p className="flex gap-2">
              <span className="text-brand-primary/50">&gt;</span> Escaneando hardware...
            </p>
            <p className="flex gap-2">
              <span className="text-brand-primary/50">&gt;</span> Roseta sincronizada (OK)
            </p>
            <p className="flex gap-2">
              <span className="text-brand-primary/50">&gt;</span> Símbolo: [POLÍGONO_B]
            </p>
            <p className="flex gap-2">
              <span className="text-brand-primary/50">&gt;</span> Sensor de luz: 94.2%
            </p>
            <div className="pt-4 border-t border-white/5">
              <p className="text-brand-secondary font-bold underline cursor-help hover:opacity-80 transition-colors">
                ACCEDER A LOGS TÉCNICOS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reference Symbols */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Referencia DECODE</p>
          <ShieldAlert className="w-3 h-3 text-red-500/60" />
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg border border-white/5 space-y-3">
          <p className="text-[10px] text-white font-bold uppercase tracking-wider">Símbolos Clase-A</p>
          <div className="grid grid-cols-3 gap-2">
            <SymbolBox char="Δ" />
            <SymbolBox char="Ω" />
            <SymbolBox char="Σ" />
          </div>
        </div>
      </div>

      <div className="mt-auto px-4 py-3 rounded bg-brand-primary/10 border border-brand-primary/20 text-center">
        <p className="text-[10px] text-brand-secondary italic font-medium leading-relaxed">
           "Los ingenieros no adivinan, calculan."
        </p>
      </div>
    </div>
  );
}

function PhaseItem({ title, active, color, glow }: { title: string, active?: boolean, color: string, glow?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-2 rounded-md transition-all cursor-default",
      active ? "bg-brand-primary/10 border border-brand-primary/30" : "opacity-40 hover:opacity-100"
    )}>
      <div className={cn(
        "w-2 h-2 rounded-full",
        color,
        glow && "shadow-[0_0_8px_var(--brand-glow)]"
      )} />
      <span className={cn("text-[11px] font-medium", active ? "text-white" : "text-slate-400")}>{title}</span>
    </div>
  );
}

function SymbolBox({ char }: { char: string }) {
  return (
    <div className="h-10 bg-black/40 rounded border border-white/10 flex items-center justify-center text-xs font-mono text-brand-secondary hover:border-brand-primary/50 hover:bg-black/60 transition-all cursor-help">
      {char}
    </div>
  );
}
