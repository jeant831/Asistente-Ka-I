import React, { useState, useEffect } from 'react';
import { Compass, Hash, RefreshCw, Info, Zap, Milestone, Ruler, Settings2, Calculator, ArrowRightLeft, Timer, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export function TechnicalTools() {
  // Angle & Hex (Existing)
  const [angle, setAngle] = useState('');
  const [hex, setHex] = useState('');

  // Kinematics State
  const [velocity, setVelocity] = useState('');
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState('');
  const [gravity, setGravity] = useState('9.81');

  // Trig / Arms State
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [hypotenuse, setHypotenuse] = useState('');

  // Gear Ratio State
  const [gearIn, setGearIn] = useState('');
  const [gearOut, setGearOut] = useState('');

  // Material State
  const [volume, setVolume] = useState('');
  const [density, setDensity] = useState('2.7');

  // Battery State
  const [capacity, setCapacity] = useState('');
  const [avgCurrent, setAvgCurrent] = useState('');

  // Ohm's Law
  const [voltage, setVoltage] = useState('');
  const [resistance, setResistance] = useState('');
  const [current, setCurrent] = useState('');

  const calculateHex = (val: string) => {
    try {
      return parseInt(val).toString(16).toUpperCase();
    } catch {
      return '??';
    }
  };

  // Helper for physics
  const getPhysicsResult = () => {
    const v = parseFloat(velocity);
    const t = parseFloat(time);
    const g = parseFloat(gravity);
    
    // Simple d = v * t or free fall d = 0.5 * g * t^2
    const dist = (v || 0) * (t || 0);
    const fall = 0.5 * g * Math.pow((t || 0), 2);
    
    return { dist: dist.toFixed(2), fall: fall.toFixed(2) };
  };

  // Helper for Trig
  const getTrigResult = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    if (a && b) return Math.sqrt(a * a + b * b).toFixed(2);
    return '0.00';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-l-4 border-brand-primary pl-4 py-1">
        <Calculator className="w-5 h-5 text-brand-primary" />
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">Estación de Cálculo Avanzado</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase">Matemática / Física / Ingeniería Aplicada</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cinemática y Movimiento */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 hover:border-brand-primary/30 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-secondary">
              <Milestone className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-tight">Física de Desplazamiento</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-600 group-hover:text-brand-primary/50">MJS-CINEMATIC</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase font-mono">Velocidad (m/s)</label>
              <input 
                type="number" 
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-brand-primary/50"
                placeholder="v"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase font-mono">Tiempo (s)</label>
              <input 
                type="number" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-brand-primary/50"
                placeholder="t"
              />
            </div>
          </div>

          <div className="p-3 bg-brand-primary/5 rounded border border-brand-primary/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-brand-secondary font-mono">RECORRIDO:</span>
              <span className="text-sm font-bold text-white">{getPhysicsResult().dist} m</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/5 pt-2">
              <span className="text-[10px] text-brand-secondary font-mono">CAÍDA (G):</span>
              <span className="text-sm font-bold text-white">{getPhysicsResult().fall} m</span>
            </div>
          </div>
        </div>

        {/* Geometría y Mecanismos */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 hover:border-emerald-500/30 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-500">
              <Ruler className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-tight">Geometría de Escuadría</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-600 group-hover:text-emerald-500/50">GEO-TRIG</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase font-mono">Cateto Opuesto (mm)</label>
              <input 
                type="number" 
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-emerald-500/50"
                placeholder="a"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase font-mono">Cateto Ady (mm)</label>
              <input 
                type="number" 
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-emerald-500/50"
                placeholder="b"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-500/5 rounded border border-emerald-500/10 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-500 font-mono block">DIAGONAL / HIPOTENUSA:</span>
              <span className="text-lg font-bold text-white tracking-tighter">{getTrigResult()} mm</span>
            </div>
            <div className="w-12 h-12 border-b-2 border-r-2 border-emerald-500/30 relative">
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-emerald-500/20" />
            </div>
          </div>
        </div>

        {/* Electrónica de Control */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 hover:border-yellow-500/30 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-yellow-500">
              <Zap className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-tight">Potencia Eléctrica (Ohm)</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-600 group-hover:text-yellow-500/50">PWR-LOGIC</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase font-mono">Voltaje (V)</label>
              <input 
                type="number" 
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-yellow-500/50"
                placeholder="12.0"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase font-mono">Resistencia (Ω)</label>
              <input 
                type="number" 
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-yellow-500/50"
                placeholder="4.0"
              />
            </div>
          </div>

          <div className="p-3 bg-yellow-500/5 rounded border border-yellow-500/20">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-yellow-500/70 font-mono">CORRIENTE ESTIMADA:</span>
              <span className="text-sm font-bold text-white font-mono">
                {voltage && resistance ? (parseFloat(voltage) / parseFloat(resistance)).toFixed(3) : '0.000'} A
              </span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-white/5">
              <span className="text-[10px] text-yellow-500/70 font-mono">POTENCIA:</span>
              <span className="text-sm font-bold text-white font-mono">
                {voltage && resistance ? (Math.pow(parseFloat(voltage), 2) / parseFloat(resistance)).toFixed(2) : '0.00'} W
              </span>
            </div>
          </div>
        </div>

        {/* Transmisiones Mecánicas */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 hover:border-fuchsia-500/30 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-fuchsia-500">
              <Settings2 className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-tight">Relación de Engranajes</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-600 group-hover:text-fuchsia-500/50">MEC-GEARS</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase font-mono">Entrada (Dientes)</label>
              <input 
                type="number" 
                value={gearIn}
                onChange={(e) => setGearIn(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-fuchsia-500/50"
                placeholder="12"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase font-mono">Salida (Dientes)</label>
              <input 
                type="number" 
                value={gearOut}
                onChange={(e) => setGearOut(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-fuchsia-500/50"
                placeholder="60"
              />
            </div>
          </div>

          <div className="p-3 bg-fuchsia-500/5 rounded border border-fuchsia-500/20 flex flex-col justify-center text-center">
            <span className="text-[10px] text-fuchsia-500/70 font-mono uppercase mb-1">Ratio de Torque</span>
            <span className="text-2xl font-bold text-white tracking-widest">
              {gearIn && gearOut ? (parseFloat(gearOut) / parseFloat(gearIn)).toFixed(2) : '1.00'}:1
            </span>
          </div>
        </div>

        {/* Conversor de Orientación */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 hover:border-cyan-500/30 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-500">
              <Compass className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-tight">Giroscopio / Ángulo</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-600 group-hover:text-cyan-500/50">NAV-IMU</span>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase font-mono">Grados (0-359°)</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm focus:border-cyan-500/50 outline-none"
                placeholder="90"
              />
            </div>
            <div className="relative h-20 flex items-center justify-center bg-black/20 rounded-lg overflow-hidden border border-white/5">
              <div 
                className="w-0.5 h-8 bg-cyan-500 origin-bottom rounded-full transition-transform duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                style={{ transform: `rotate(${angle || 0}deg) translateY(-16px)` }}
              />
              <div className="w-1.5 h-1.5 bg-white rounded-full z-10"></div>
            </div>
          </div>
        </div>

        {/* Decoder Logístico */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 hover:border-slate-400/30 transition-colors group">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-slate-400">
              <Hash className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-tight">Convertidor Base</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-200">SYS-DATA</span>
          </div>
          <div className="space-y-3">
             <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase font-mono">Valor Decimal</label>
              <input 
                type="number" 
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-white/20"
                placeholder="255"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-white/5 border border-white/10 rounded flex flex-col items-center">
                <span className="text-[8px] text-slate-500 font-mono">HEXADECIMAL</span>
                <span className="text-sm font-bold text-white tracking-widest">0x{hex ? calculateHex(hex) : '00'}</span>
              </div>
              <div className="p-2 bg-white/5 border border-white/10 rounded flex flex-col items-center">
                <span className="text-[8px] text-slate-500 font-mono">BINARIO</span>
                <span className="text-[10px] font-bold text-white tracking-tighter truncate w-full text-center">
                  {hex ? parseInt(hex).toString(2).padStart(8, '0') : '00000000'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Propiedades de Materiales (Chemistry/Engineering) */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 hover:border-orange-500/30 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-500">
              <Activity className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-tight">Análisis de Materiales</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-600 group-hover:text-orange-500/50">MAT-DENSITY</span>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-500 uppercase font-mono">Volumen (cm³)</label>
                <input 
                  type="number" 
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-orange-500/50"
                  placeholder="100"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-slate-500 uppercase font-mono">Material</label>
                <select 
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  className="w-full bg-black text-white border border-white/10 rounded px-2 py-1.5 text-[10px] outline-none cursor-pointer"
                >
                  <option value="2.7">Aluminio (2.7g/cm³)</option>
                  <option value="7.8">Acero (7.8g/cm³)</option>
                  <option value="1.2">PLA/ABS (1.2g/cm³)</option>
                  <option value="1.0">Acrílico (1.0g/cm³)</option>
                </select>
              </div>
            </div>
            <div className="p-2.5 bg-orange-500/5 border border-orange-500/20 rounded flex justify-between items-center">
              <span className="text-[10px] text-orange-500 font-mono">PESO ESTIMADO:</span>
              <span className="text-sm font-bold text-white">
                {volume && density ? (parseFloat(volume) * parseFloat(density)).toFixed(1) : '0.0'} g
              </span>
            </div>
          </div>
        </div>

        {/* Autonomía / Batería */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-4 hover:border-blue-500/30 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-500">
              <Timer className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-tight">Estimación de Autonomía</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-600 group-hover:text-blue-500/50">BAT-LIFE</span>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-500 uppercase font-mono">Capacidad (mAh)</label>
                <input 
                  type="number" 
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500/50"
                  placeholder="3000"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-slate-500 uppercase font-mono">Consumo (A)</label>
                <input 
                  type="number" 
                  value={avgCurrent}
                  onChange={(e) => setAvgCurrent(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500/50"
                  placeholder="2.5"
                />
              </div>
            </div>
            <div className="p-2.5 bg-blue-500/5 border border-blue-500/20 rounded flex justify-between items-center">
              <span className="text-[10px] text-blue-500 font-mono">TIEMPO DE OPERACIÓN:</span>
              <span className="text-sm font-bold text-white">
                {capacity && avgCurrent ? Math.floor((parseFloat(capacity) / 1000) / parseFloat(avgCurrent) * 60) : '0'} min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Footnote */}
      <div className="flex items-center gap-3 p-3 bg-brand-primary/5 rounded-lg border border-brand-primary/20">
        <Info className="w-4 h-4 text-brand-secondary shrink-0" />
        <p className="text-[10px] text-slate-400 leading-relaxed italic">
          PROTOCOL NOTE: Estos cálculos utilizan aproximaciones ideales para entornos de pre-prototipado (aire, superficies lisas, componentes estándar). 
          Para alta precisión en competencia, utiliza sensores de retroalimentación (Encoders/PIDs) en tiempo real.
        </p>
      </div>
    </div>
  );
}
