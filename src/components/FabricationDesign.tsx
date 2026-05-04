import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Settings, Hammer, Lightbulb, Box, ListChecks, ArrowRight, Cog, Layers, Zap, BookOpen, X, Search, Info, Terminal, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

interface Idea {
  id: string;
  title: string;
  category: string;
  desc: string;
  difficulty: 'BAJO' | 'MEDIO' | 'ALTO';
}

export function FabricationDesign() {
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const saved = localStorage.getItem('kai_fab_ideas');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Chasis H-Drive', category: 'MOVILIDAD', desc: 'Permite movimiento omnidireccional con 5 motores básicos.', difficulty: 'MEDIO' },
      { id: '2', title: 'Garra de Tensión Constante', category: 'MANIPULACIÓN', desc: 'Uso de ligas para mantener presión en objetos irregulares.', difficulty: 'BAJO' }
    ];
  });

  const [activeView, setActiveView] = useState<'ideas' | 'manuals' | 'design_tools'>('ideas');
  const [selectedComponent, setSelectedComponent] = useState<{name: string, category: string, desc: string, image: string, stats: string[]} | null>(null);

  const designTools = [
    {
      title: "Modelado 3D (CAD)",
      icon: <Box className="w-5 h-5 text-brand-primary" />,
      tools: [
        { name: "Onshape", level: "PRO", type: "Cloud CAD", desc: "El estándar en robótica educativa. [NOTA: Requiere Proton VPN en VZLA].", url: "https://www.onshape.com/en/education/", color: "border-brand-primary/30", vpn: true },
        { name: "Fusion 360", level: "ELITE", type: "Integrated CAD/CAM", desc: "Plataforma completa de diseño, simulación y manufactura.", url: "https://www.autodesk.com/products/fusion-360/personal", color: "border-orange-600/30" },
        { name: "AutoCAD", level: "VETERANO", type: "Precise Drafting", desc: "Herramienta clásica para planos técnicos y diagramas 2D.", url: "https://www.autodesk.com/education/free-software/autocad", color: "border-red-500/30" },
        { name: "Tinkercad 3D", level: "BÁSICO", type: "Solid Geometry", desc: "Ideal para iniciarse en el diseño de piezas sencillas.", url: "https://www.tinkercad.com/", color: "border-cyan-500/30" }
      ]
    },
    {
      title: "Algoritmos & Trayectorias",
      icon: <Terminal className="w-5 h-5 text-blue-400" />,
      tools: [
        { name: "Road Runner", level: "AVANZADO", type: "Pathing", desc: "Librería líder para navegación autónoma y control de chasis.", url: "https://learnroadrunner.com/", color: "border-blue-400/30" },
        { name: "Pedro Pathing", level: "PRO", type: "Movement", desc: "Sistema de seguimiento de trayectorias optimizado para alta precisión.", url: "https://pedropathways.com/", color: "border-indigo-500/30" }
      ]
    },
    {
      title: "Simuladores & Electrónica",
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      tools: [
        { name: "Wokwi", level: "INTERMEDIO", type: "MCU Sim", desc: "Simulador online de Arduino, ESP32 y sensores.", url: "https://wokwi.com/", color: "border-yellow-500/30" },
        { name: "Tinkercad Circuits", level: "BÁSICO", type: "Electronics", desc: "Laboratorio virtual de electrónica y protoboards.", url: "https://www.tinkercad.com/circuits", color: "border-cyan-500/30" }
      ]
    }
  ];

  const componentData: Record<string, { desc: string, image: string, stats: string[] }> = {
    'Mecanum': {
      desc: 'Ruedas con rodillos a 45 grados que permiten movimiento omnidireccional. Ideales para chasis de alta agilidad.',
      image: 'https://images.turo.com/perfiles/mecanum_wheel_reference.jpg',
      stats: ['Tracción: Alta', 'Agilidad: Máxima', 'Costo: Alto']
    },
    'Diferencial': {
      desc: 'Sistema de tracción clásica de dos ruedas motrices. Estable y fácil de programar.',
      image: 'https://images.turo.com/perfiles/tank_drive_reference.jpg',
      stats: ['Tracción: Máxima', 'Simplicidad: Alta', 'Mantenimiento: Bajo']
    },
    'Core Hex Motor': {
      desc: 'Motor compacto de REV Robotics con encoder incorporado. Perfecto para mecanismos pequeños.',
      image: 'https://images.turo.com/perfiles/rev_core_hex.jpg',
      stats: ['Potencia: Media', 'Precisión: Alta', 'Peso: Ligero']
    },
    'Sensores IR': {
      desc: 'Detección de distancia y color mediante infrarrojos. Vital para navegación autónoma.',
      image: 'https://images.turo.com/perfiles/rev_color_sensor.jpg',
      stats: ['Alcance: 20cm', 'Precisión: Alta', 'Protocolo: I2C']
    },
    'Perfiles C': {
      desc: 'Vigas de aluminio estructural. Proveen la rigidez necesaria para chasis y elevadores.',
      image: 'https://images.turo.com/perfiles/structural_c_channel.jpg',
      stats: ['Rigidez: Extrema', 'Material: Aluminio 6061', 'Peso: Medio']
    }
  };

  const manuals = [
    {
      brand: 'REV Robotics',
      logo: 'https://v5.airtableusercontent.com/v3/f/26/26/1714852800000/v-m2S-h_O3Q8W1F-Z1-lQA/6eTj_Z9u-5w2y5o-Y-sQ/logo-rev.png',
      desc: 'Sistemas de control Hub, sensores y perfiles de extrusión de 15mm.',
      links: [
        { label: 'Guía de Inicio REV DUO', url: 'https://docs.revrobotics.com/duo-build/' },
        { label: 'Control Hub Documentation', url: 'https://docs.revrobotics.com/control-hub/' },
        { label: 'Sensores y Electrónica', url: 'https://docs.revrobotics.com/duo-build/sensors' }
      ],
      color: 'border-orange-500/30 text-orange-400'
    },
    {
      brand: 'goBILDA',
      logo: 'https://v5.airtableusercontent.com/v3/f/26/26/1714852800000/-O-m2S-h_O3Q8W1F-Z1-lQA/6eTj_Z9u-5w2y5o-Y-sQ/logo-gobilda.png',
      desc: 'Sistema basado en patrón de 8mm. Ideal para chasis robustos y mecánica de precisión.',
      links: [
        { label: 'Manual Strafer Chassis', url: 'https://www.gobilda.com/strafer-chassis-kit-140mm-mecanum-wheels/' },
        { label: 'Guía de Patrón 1121', url: 'https://www.gobilda.com/learning-center/' },
        { label: 'Catálogo de Engranajes', url: 'https://www.gobilda.com/motion/' }
      ],
      color: 'border-yellow-500/30 text-yellow-400'
    },
    {
      brand: 'AndyMark',
      logo: 'https://v5.airtableusercontent.com/v3/f/26/26/1714852800000/v-m2S-h_O3Q8W1F-Z1-lQA/6eTj_Z9u-5w2y5o-Y-sQ/logo-andymark.png',
      desc: 'Especialistas en ruedas mecanum y transmisiones para TileRunner.',
      links: [
        { label: 'Manual TileRunner FTC', url: 'https://www.andymark.com/products/tilerunner-chassis-options' },
        { label: 'Setup de Ruedas Mecanum', url: 'https://www.andymark.com/products/4-in-mecanum-wheel-set-of-4' },
        { label: 'Recursos para Equipos', url: 'https://www.andymark.com/pages/resources' }
      ],
      color: 'border-red-500/30 text-red-400'
    }
  ];

  const [newIdea, setNewIdea] = useState({ title: '', category: 'MOVILIDAD', desc: '' });
  const [isAdding, setIsAdding] = useState(false);

  const categories = [
    { name: 'MOVILIDAD', icon: <Cog className="w-4 h-4" />, items: ['Diferencial', 'Mecanum', 'H-Drive', 'Oruga'] },
    { name: 'MANIPULACIÓN', icon: <Box className="w-4 h-4" />, items: ['Garra (Grabber)', 'Elevador', 'Ingesta (Intake)', 'Lanzador'] },
    { name: 'ELECTRÓNICA', icon: <Zap className="w-4 h-4" />, items: ['Sensores IR', 'Orden de Cableado', 'Control Inalámbrico'] },
    { name: 'ESTRUCTURA', icon: <Layers className="w-4 h-4" />, items: ['Perfiles C', 'Soportes L', 'Placas de Unión'] }
  ];

  const handleSaveIdea = () => {
    if (!newIdea.title || !newIdea.desc) return;
    const idea: Idea = {
      id: Date.now().toString(),
      ...newIdea,
      difficulty: 'MEDIO'
    };
    const updated = [idea, ...ideas];
    setIdeas(updated);
    localStorage.setItem('kai_fab_ideas', JSON.stringify(updated));
    setNewIdea({ title: '', category: 'MOVILIDAD', desc: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Component Details Overlay */}
      <AnimatePresence>
        {selectedComponent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#05070a]/95 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl bg-[#0d1117] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] relative"
            >
              <button 
                onClick={() => setSelectedComponent(null)}
                className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors z-10 bg-black/20 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 p-0 bg-slate-900/50 relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                   <div className="absolute inset-0 bg-brand-primary/5 blur-[60px]" />
                   <img 
                    src={selectedComponent.image} 
                    alt={selectedComponent.name}
                    className="relative z-10 w-full h-full object-cover aspect-square opacity-80"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/600x600/0d1117/00f3ff?text=${selectedComponent.name}`;
                    }}
                    referrerPolicy="no-referrer"
                   />
                </div>
                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] font-mono">{selectedComponent.category}</span>
                      <h2 className="text-3xl font-bold text-white mt-1 uppercase tracking-tight">{selectedComponent.name}</h2>
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed font-sans italic">
                      "{selectedComponent.desc}"
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                       {selectedComponent.stats.map((stat, i) => (
                         <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_10px_var(--brand-glow)]" />
                            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{stat}</span>
                         </div>
                       ))}
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <button 
                        onClick={() => setSelectedComponent(null)}
                        className="w-full py-4 bg-brand-primary text-black font-bold rounded-2xl transition-all shadow-[0_0_30px_var(--brand-glow)] active:scale-95 uppercase tracking-widest text-xs"
                      >
                        Entendido, Continuar Diseño
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Switcher */}
      <div className="flex gap-4 border-b border-white/10 pb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveView('ideas')}
          className={cn(
            "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
            activeView === 'ideas' ? "bg-brand-primary text-black" : "text-slate-500 hover:text-slate-300 bg-white/5"
          )}
        >
          Banco de Ideas
        </button>
        <button 
          onClick={() => setActiveView('design_tools')}
          className={cn(
            "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
            activeView === 'design_tools' ? "bg-brand-primary text-black" : "text-slate-500 hover:text-slate-300 bg-white/5"
          )}
        >
          Centro de Diseño & Simulación
        </button>
        <button 
          onClick={() => setActiveView('manuals')}
          className={cn(
            "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
            activeView === 'manuals' ? "bg-brand-primary text-black" : "text-slate-500 hover:text-slate-300 bg-white/5"
          )}
        >
          Manuales (REV, goBILDA, AndyMark)
        </button>
      </div>

      {activeView === 'ideas' ? (
        <>
          {/* Header */}
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center border border-brand-primary/30 shadow-[0_0_20px_var(--brand-glow)]">
            <Wrench className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-widest uppercase mb-1">Taller de Prototipado</h1>
            <p className="text-xs text-brand-secondary font-mono tracking-widest opacity-80 uppercase">Diseño de Ingeniería // Copa Ka'i 2026</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={cn(
            "px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2",
            isAdding ? "bg-red-500/10 text-red-400 border border-red-500/30" : "bg-brand-primary text-black"
          )}
        >
          {isAdding ? 'CANCELAR PROTOCOLO' : <><Lightbulb className="w-4 h-4" /> Nueva Idea de Fabricación</>}
        </button>
      </section>

      {/* Adding Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="overflow-hidden"
          >
            <div className="p-8 bg-slate-900 border-2 border-brand-primary/30 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl relative">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nombre del Mecanismo</label>
                  <input 
                    value={newIdea.title}
                    onChange={e => setNewIdea({...newIdea, title: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-primary/50 outline-none transition-all"
                    placeholder="Ej: Elevador de 4 barras"
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Categoría del Sistema</label>
                   <div className="grid grid-cols-2 gap-2">
                     {categories.map(cat => (
                       <button
                         key={cat.name}
                         onClick={() => setNewIdea({...newIdea, category: cat.name})}
                         className={cn(
                           "px-4 py-2 rounded-lg text-[9px] font-bold uppercase transition-all border",
                           newIdea.category === cat.name ? "bg-brand-primary/20 border-brand-primary text-brand-secondary" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/10"
                         )}
                       >
                         {cat.name}
                       </button>
                     ))}
                   </div>
                </div>
              </div>
              <div className="space-y-6 flex flex-col">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Descripción Técnica / Materiales</label>
                  <textarea 
                    value={newIdea.desc}
                    onChange={e => setNewIdea({...newIdea, desc: e.target.value})}
                    className="w-full h-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-primary/50 outline-none transition-all min-h-[120px]"
                    placeholder="Describe cómo funciona y qué piezas necesitas..."
                  />
                </div>
                <button 
                  onClick={handleSaveIdea}
                  className="w-full py-4 bg-brand-primary text-black font-bold text-sm uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-[0_0_25px_var(--brand-glow)]"
                >
                  Registrar en el Taller
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Categories Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
             <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
               <Settings className="w-5 h-5 text-brand-primary" /> Guía de Componentes
             </h3>
             <div className="space-y-6">
               {categories.map((cat, i) => (
                 <div key={i} className="space-y-3">
                   <div className="flex items-center gap-2 text-brand-secondary">
                     {cat.icon}
                     <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
                   </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item, ii) => {
                        const hasDetails = componentData[item];
                        return (
                          <button 
                            key={ii} 
                            onClick={() => {
                              if (hasDetails) {
                                setSelectedComponent({
                                  name: item,
                                  category: cat.name,
                                  ...hasDetails
                                });
                              }
                            }}
                            className={cn(
                              "px-3 py-1 rounded-full text-[9px] font-bold border transition-all flex items-center gap-1.5",
                              hasDetails 
                                ? "bg-brand-primary/5 border-brand-primary/20 text-brand-secondary hover:bg-brand-primary/10 hover:border-brand-primary/40" 
                                : "bg-white/5 border-white/5 text-slate-500 cursor-default"
                            )}
                          >
                            {item}
                            {hasDetails && <Info className="w-3 h-3 opacity-50" />}
                          </button>
                        );
                      })}
                    </div>
                 </div>
               ))}
             </div>
           </div>

           <div className="p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-3xl">
             <h4 className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
               <Hammer className="w-4 h-4" /> Nota de Fabricación
             </h4>
             <p className="text-[11px] text-slate-400 leading-relaxed italic">
               "Recuerda que en la Copa Ka'i, la simplicidad suele ganar a la complejidad innecesaria. ¡Prueba, falla rápido y optimiza!"
             </p>
           </div>
        </aside>

        {/* Ideas Grid */}
        <main className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between border-b border-white/5 pb-4">
             <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
               <ListChecks className="w-5 h-5 text-brand-primary" /> Ideas Registradas
             </h3>
             <span className="text-[10px] text-slate-500 font-mono italic">Total: {ideas.length} Conceptos</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {ideas.map((idea) => (
               <div 
                 key={idea.id} 
                 className="p-6 bg-[#0a0c12] border border-white/10 rounded-2xl hover:border-brand-primary/30 transition-all group relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Cog className="w-16 h-16 text-brand-primary -mr-8 -mt-8 rotate-12" />
                 </div>

                 <div className="flex items-start justify-between mb-4 relative z-10">
                   <span className="px-2 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-secondary text-[9px] font-bold rounded uppercase tracking-tighter">
                     {idea.category}
                   </span>
                   <span className={cn(
                     "text-[9px] font-bold tracking-widest",
                     idea.difficulty === 'BAJO' ? "text-emerald-400" : idea.difficulty === 'MEDIO' ? "text-yellow-400" : "text-red-400"
                   )}>
                     DIF: {idea.difficulty}
                   </span>
                 </div>

                 <h4 className="text-white font-bold mb-2 text-base group-hover:text-brand-primary transition-colors">{idea.title}</h4>
                 <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3 italic">
                   "{idea.desc}"
                 </p>

                 <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                   <span className="text-[9px] text-slate-600 font-mono">ID: {idea.id.slice(-6)}</span>
                   <button className="text-[10px] font-bold text-brand-secondary flex items-center gap-1 hover:gap-2 transition-all">
                     VER DETALLES <ArrowRight className="w-3 h-3" />
                   </button>
                 </div>
               </div>
             ))}
           </div>

           {ideas.length === 0 && (
             <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-slate-600">
               <Lightbulb className="w-12 h-12 mb-4 opacity-20" />
               <p className="text-xs uppercase tracking-widest font-bold">Sin prototipos en cola</p>
               <p className="text-[10px] mt-2">Empieza a registrar tus ideas para la competencia</p>
             </div>
           )}
        </main>
      </div>
        </>
      ) : activeView === 'design_tools' ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-4">
             <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
               <Box className="w-6 h-6 text-brand-primary" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-white uppercase tracking-widest">Centro de Diseño & Simulación</h2>
               <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">Herramientas Profesionales Gratuitas // Ingeniería de Detalle</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designTools.map((category, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  {category.icon}
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.tools.map((tool, tIdx) => (
                    <a 
                      key={tIdx}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "block p-5 bg-[#0a0c12] border rounded-2xl hover:border-brand-primary/40 transition-all group relative overflow-hidden",
                        tool.color
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors">{tool.name}</h4>
                          {tool.vpn && (
                            <span className="text-[7px] text-orange-400 font-bold uppercase mt-0.5 flex items-center gap-1">
                              <Shield className="w-2 h-2" /> Requiere Proton VPN (VZLA)
                            </span>
                          )}
                        </div>
                        <span className="text-[8px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-slate-400 group-hover:text-brand-primary">
                          {tool.level}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed mb-3 italic">"{tool.desc}"</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-brand-secondary opacity-60 uppercase">{tool.type}</span>
                        <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-brand-primary/5 border border-brand-primary/20 rounded-3xl flex items-center gap-6">
            <div className="hidden md:block w-24 h-24 shrink-0 rounded-2xl bg-black/40 border border-white/5 p-4">
               <Zap className="w-full h-full text-brand-primary animate-pulse" />
            </div>
            <div>
              <h4 className="text-white font-bold mb-2 uppercase tracking-tight">Potencia tu Diseño con Simulación</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                Antes de gastar materiales reales o soldar componentes, utiliza las herramientas de simulación como <strong>Wokwi</strong> o <strong>Tinkercad Circuits</strong>. Esto te ahorrará tiempo crítico en la competencia y protegerá tus componentes de errores eléctricos comunes.
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-4">
             <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
               <BookOpen className="w-6 h-6 text-brand-primary" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-white uppercase tracking-widest">Manuales y Recursos de Ingeniería</h2>
               <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">Bibliotecas oficiales de Hardware // FTC & Copa Ka'i</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {manuals.map((m, i) => (
              <div key={i} className={cn("p-8 bg-slate-900 border rounded-3xl space-y-6 hover:scale-[1.02] transition-transform", m.color)}>
                 <div className="h-12 flex items-center justify-center bg-white rounded-xl p-2 mb-4 overflow-hidden">
                    <img src={m.logo} alt={m.brand} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                 </div>
                 <div className="space-y-2">
                   <h3 className="text-white font-bold text-lg">{m.brand}</h3>
                   <p className="text-xs text-slate-400 leading-relaxed italic">"{m.desc}"</p>
                 </div>
                 <div className="space-y-3 pt-4 border-t border-white/5">
                   {m.links.map((link, li) => (
                     <a 
                       key={li} 
                       href={link.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="group flex items-center justify-between p-3 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-white"
                     >
                       {link.label}
                       <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                     </a>
                   ))}
                 </div>
              </div>
            ))}
          </div>

          <div className="p-10 bg-brand-primary/5 border border-brand-primary/20 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Settings className="w-32 h-32 text-brand-primary animate-spin-slow" />
             </div>
             <div className="relative z-10 max-w-2xl space-y-4">
                <h3 className="text-white font-bold text-lg uppercase tracking-tight">¿No encuentras el manual?</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Muchos equipos utilizan piezas personalizadas impresas en 3D o cortadas en láser. Si necesitas ayuda con la fabricación de piezas fuera de estos kits, consulta con el <strong>Ingeniero KAI</strong> en la Bóveda de Consulta.
                </p>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
