import React from 'react';
import { motion } from 'motion/react';
import { Globe, Book, Landmark, Microscope, Satellite, Zap, Plus, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';

export function StemVenezuela() {
  const [selectedArea, setSelectedArea] = React.useState<number | null>(null);

  const areas = [
    {
      title: "Misión FIRST Global Venezuela",
      desc: "Potencia Mundial en Robótica. Historial de excelencia del Team Venezuela.",
      fullDesc: "Venezuela es hoy un referente global en robótica competitiva. Desde la histórica victoria en Singapur hasta la reciente hazaña en Italia 2026, el equipo nacional ha demostrado consistencia, innovación y liderazgo en el FIRST Global Challenge.",
      skills: ["Competencia Internacional", "Trabajo en Equipo", "Diplomacia Técnica", "Ingeniería de Alto Rendimiento"],
      institutions: ["Fundasteam Venezuela", "Gobernación del Zulia", "Copa Ka'i"],
      projects: [
        "Singapur 2023: Albert Einstein (ORO MUNDIAL)",
        "Atenas 2024: Albert Einstein (PLATA) + Social Media Award",
        "FGC 2025: Engineering Design Award + Global Innovation",
        "Italia 2026: Team Excellence Award + Alianza Finalista"
      ],
      icon: <Rocket className="w-5 h-5 text-yellow-400" />,
      tag: "POTENCIA MUNDIAL",
      color: "border-yellow-500/30 bg-yellow-500/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
    },
    {
      title: "Ciencias Espaciales (ABAE)",
      desc: "Monitoreo satelital para soberanía territorial, gestión de riesgos y agricultura de precisión.",
      fullDesc: "La Agencia Bolivariana para Actividades Espaciales (ABAE) gestiona los satélites VRSS (Miranda/Sucre). Se requiere personal capacitado en teledetección, control de órbita y análisis de telemetría.",
      skills: ["Python", "GIS / Teledetección", "Matemática Orbital", "Electrónica RF"],
      institutions: ["ABAE (Base Aeroespacial Manuel Ríos)", "CENDIT"],
      projects: ["Satélite VRSS-2 (Sucre)", "Cartografía de Alta Resolución"],
      icon: <Satellite className="w-5 h-5 text-brand-secondary" />,
      tag: "ESTRATÉGICO",
      color: "border-cyan-500/30 bg-cyan-500/5"
    },
    {
      title: "Biotecnología y Salud (IVIC)",
      desc: "Investigación en soberanía de semillas, desarrollo de vacunas y genómica aplicada.",
      fullDesc: "El Instituto Venezolano de Investigaciones Científicas (IVIC) lidera el estudio de células madre y mejora de cultivos. Es vital para la seguridad alimentaria y el control de enfermedades regionales.",
      skills: ["Biología Molecular", "Química Orgánica", "Bio-Informática", "Microscopía"],
      institutions: ["IVIC", "IDEA (Fundación Instituto de Estudios Avanzados)"],
      projects: ["Soberanía de Semillas de Papa", "Células Madre para Odontología"],
      icon: <Microscope className="w-5 h-5 text-brand-secondary" />,
      tag: "SOBERANÍA",
      color: "border-emerald-500/30 bg-emerald-500/5"
    },
    {
      title: "Infraestructura y Redes Eléctricas",
      desc: "Modernización de la red nacional mediante sistemas SCADA y energías limpias.",
      fullDesc: "El sistema eléctrico nacional requiere una transición hacia redes inteligentes (Smart Grids) para prevenir fallas y optimizar la generación en represas como el Guri.",
      skills: ["Sistemas SCADA", "Energía Solar/Eólica", "Lógica Digital", "Gestión de Cargas"],
      institutions: ["Corpoelec (Unidad de Investigación)", "Facultad de Ingeniería UCV/USB"],
      projects: ["Optimización del Guri v2", "Redes Micro-Solares"],
      icon: <Zap className="w-5 h-5 text-brand-secondary" />,
      tag: "CRÍTICO",
      color: "border-yellow-500/30 bg-yellow-500/5"
    },
    {
      title: "IA y Desarrollo de Software",
      desc: "Construcción de soluciones locales de Fintech, Blockchain y procesos industriales.",
      fullDesc: "Venezuela tiene un alto potencial en desarrollo de software. El enfoque actual es la digitalización de servicios públicos y la creación de plataformas de economía digital descentralizada.",
      skills: ["Fullstack JS/Rust", "Blockchain / Cripto", "SQL Databases", "Seguridad Informática"],
      institutions: ["SUSCERTE", "CNTI (Centro Nac. de Tecnologías de Información)"],
      projects: ["Interoperabilidad de Datos Públicos", "Soberanía Criptográfica"],
      icon: <Globe className="w-5 h-5 text-brand-secondary" />,
      tag: "INNOVACIÓN",
      color: "border-fuchsia-500/30 bg-fuchsia-500/5"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary/20 rounded-lg">
            <Globe className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-white">NÚCLEO STEM VENEZUELA</h2>
            <p className="text-[10px] text-brand-secondary font-mono tracking-widest">MAPA DE OPORTUNIDADES ESTRATÉGICAS</p>
          </div>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl mt-2">
          Ingeniero, esta es tu brújula para el desarrollo del país. Selecciona un área para ver los detalles técnicos y dónde puedes aplicar tus conocimientos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {areas.map((area, i) => (
          <div 
            key={i} 
            className={cn(
              "p-6 border rounded-2xl transition-all group flex flex-col gap-4 cursor-pointer relative overflow-hidden",
              area.color,
              selectedArea === i ? "ring-2 ring-brand-primary scale-[1.02]" : "hover:border-brand-primary/50"
            )}
            onClick={() => setSelectedArea(selectedArea === i ? null : i)}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[40px] -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-all" />

            <div className="flex items-start justify-between relative z-10">
              <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                {area.icon}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[9px] px-3 py-1 rounded-full border border-white/10 bg-black/40 text-brand-secondary font-bold uppercase tracking-tighter">
                  {area.tag}
                </span>
                <span className="text-[9px] text-slate-500 font-mono">ID: VZ_STEM_0{i+1}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">{area.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{area.desc}"
              </p>
            </div>

            {selectedArea === i && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pt-4 mt-4 border-t border-white/10 space-y-4"
              >
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {area.fullDesc}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-brand-primary uppercase">Habilidades a Desarrollar</h4>
                    <ul className="space-y-1">
                      {area.skills.map((skill, si) => (
                        <li key={si} className="text-[10px] text-slate-500 flex items-center gap-2">
                          <div className="w-1 h-1 bg-brand-primary rounded-full" /> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-brand-primary uppercase">Centros de Referencia</h4>
                    <ul className="space-y-1">
                      {area.institutions.map((ins, ii) => (
                        <li key={ii} className="text-[10px] text-slate-500 flex items-center gap-2">
                          <div className="w-1 h-1 bg-brand-secondary rounded-full" /> {ins}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg border border-white/5">
                   <h4 className="text-[9px] font-bold text-white uppercase mb-1">Proyecto en Curso:</h4>
                   <p className="text-[10px] text-brand-secondary italic">
                     {area.projects.join(" // ")}
                   </p>
                </div>
              </motion.div>
            )}
            {!selectedArea && (
              <div className="mt-4 text-[9px] text-slate-500 flex items-center gap-1 font-mono uppercase tracking-widest group-hover:text-brand-primary transition-colors">
                <Plus className="w-3 h-3" /> Expandir detalles
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-8 bg-brand-primary/5 border border-brand-primary/20 rounded-3xl space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="relative z-10">
          <h4 className="text-sm font-bold text-brand-secondary uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
            <Book className="w-5 h-5" /> RECOMENDACIONES DE ACADEMIA
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StudyTip 
              title="ETAPA INICIAL (9-12 años)" 
              desc="Enfócate en la lógica algorítmica. Juega con bloques de código y aprende cómo los sensores traducen el mundo físico en datos." 
            />
            <StudyTip 
              title="ETAPA MEDIA (13-15 años)" 
              desc="Es momento de los circuitos electrónicos. Aprende la ley de Ohm, usa soldadura y comienza a escribir tus primeros scripts en Python." 
            />
            <StudyTip 
              title="ETAPA LANZAMIENTO (16-18 años)" 
              desc="Especialización. Elige un área crítica y busca pasantías o cursos en sistemas embebidos, Big Data o física aplicada." 
            />
          </div>
        </div>
      </div>

      <div className="p-8 border border-white/5 rounded-3xl bg-gradient-to-br from-brand-primary/5 to-transparent">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-brand-primary" /> El Futuro en Tus Manos
        </h3>
        <div className="space-y-4 text-sm text-slate-400 leading-relaxed text-justify">
          <p>
            La robótica en Venezuela ha dejado de ser un sueño para convertirse en una realidad competitiva de clase mundial. Al participar en iniciativas como la <span className="text-brand-secondary font-bold">Copa Ka'i 2026</span> y aspirar a representar al país en eventos globales, no solo aprendes a construir máquinas; te conviertes en parte de una generación dorada de ingenieros.
          </p>
          <p>
            El legado es innegable: desde el <span className="text-brand-secondary font-bold italic">Oro en Singapur 2023</span>, pasando por la <span className="text-brand-secondary font-bold italic">Plata en Atenas 2024</span>, el éxito en 2025, hasta el impacto reciente en el <span className="text-white font-bold italic">FIRST Global Challenge Italia 2026</span>. Estos logros demuestran que el talento venezolano está en la cúspide de la tecnología internacional. Esta es tu oportunidad de continuar esa historia de éxito.
          </p>
        </div>
      </div>
    </div>
  );
}

function StudyTip({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-bold text-white uppercase tracking-tight border-b border-brand-primary/20 pb-1">{title}</p>
      <p className="text-[11px] text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
