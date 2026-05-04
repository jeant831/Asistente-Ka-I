import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Save, FileText, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  team: string;
}

export function MissionNotebook() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [teamSelection, setTeamSelection] = useState('ALPHA');

  useEffect(() => {
    const saved = localStorage.getItem('kai_mission_notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const saveNotes = (updated: Note[]) => {
    setNotes(updated);
    localStorage.setItem('kai_mission_notes', JSON.stringify(updated));
  };

  const addNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString(),
      team: teamSelection
    };
    saveNotes([newNote, ...notes]);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-brand-secondary">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Cuaderno de Bitácora</h2>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all",
            isAdding ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-brand-primary text-black shadow-[0_0_15px_var(--brand-glow)]"
          )}
        >
          {isAdding ? "Cancelar" : <><Plus className="w-3 h-3" /> Nuevo Registro</>}
        </button>
      </div>

      {isAdding && (
        <div className="p-4 rounded-xl bg-slate-900 border-2 border-brand-primary/30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 font-mono uppercase">Título de la Observación</label>
              <input 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-brand-primary/50"
                placeholder="Ej: Análisis Giro 45°"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 font-mono uppercase">Escuadrón</label>
              <select 
                value={teamSelection}
                onChange={(e) => setTeamSelection(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-brand-secondary outline-none"
              >
                <option value="ALPHA">EQUIPO ALPHA</option>
                <option value="BETA">EQUIPO BETA</option>
                <option value="GAMMA">EQUIPO GAMMA</option>
                <option value="OMEGA">EQUIPO OMEGA</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] text-slate-500 font-mono uppercase">Detalles Técnicos / Hallazgos</label>
            <textarea 
              value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none focus:border-brand-primary/50 min-h-[80px]"
              placeholder="Describe lo que descubriste o el reto que estás resolviendo..."
            />
          </div>
          <button 
            onClick={addNote}
            className="w-full py-2 bg-brand-primary hover:opacity-90 text-black text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> REGISTRAR EN MEMORIA CENTRAL
          </button>
        </div>
      )}

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/5">
        {notes.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-slate-600 gap-3">
             <FileText className="w-8 h-8 opacity-20" />
             <p className="text-[10px] font-mono uppercase tracking-widest text-center px-8">
               Sin registros detectados.<br/>Inicia una nueva entrada para documentar tu investigación.
             </p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="group p-4 bg-white/5 border border-white/5 rounded-xl hover:border-brand-primary/20 transition-all relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => deleteNote(note.id)} className="text-slate-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                 </button>
               </div>
               <div className="flex items-center gap-3 mb-2">
                 <span className="px-2 py-0.5 rounded bg-brand-primary/10 text-brand-secondary text-[9px] font-bold border border-brand-primary/20">
                   {note.team}
                 </span>
                 <span className="flex items-center gap-1 text-[9px] text-slate-500 font-mono">
                    <Calendar className="w-3 h-3" /> {note.date}
                 </span>
               </div>
               <h3 className="text-white text-sm font-bold mb-1">{note.title}</h3>
               <p className="text-[11px] text-slate-400 leading-relaxed font-sans italic">
                 "{note.content}"
               </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
