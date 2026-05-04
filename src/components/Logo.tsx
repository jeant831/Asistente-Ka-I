import React from 'react';
import { cn } from '../lib/utils';

export function KaiLogo({ className, colorClassName }: { className?: string, colorClassName?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg 
        viewBox="0 0 100 100" 
        className={cn("w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]", colorClassName)}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="2" className="opacity-20" />
        
        {/* Stylized Robotic Primate Head */}
        <path 
          d="M30 40C30 30 40 25 50 25C60 25 70 30 70 40V60C70 70 60 75 50 75C40 75 30 70 30 60V40Z" 
          className="fill-slate-900" 
          stroke="currentColor"
          strokeWidth="3" 
        />
        
        {/* Ears/Side Hardware */}
        <rect x="22" y="45" width="8" height="15" rx="2" className="fill-slate-800" stroke="currentColor" strokeWidth="2" />
        <rect x="70" y="45" width="8" height="15" rx="2" className="fill-slate-800" stroke="currentColor" strokeWidth="2" />
        
        {/* Optical Sensors (Eyes) */}
        <circle cx="42" cy="45" r="4" className="fill-current animate-pulse opacity-80" />
        <circle cx="58" cy="45" r="4" className="fill-current animate-pulse opacity-80" />
        
        {/* Mouth/Data Port */}
        <rect x="40" y="60" width="20" height="4" rx="1" className="fill-slate-950" stroke="currentColor" strokeWidth="1" />
        
        {/* Geometric Accents */}
        <path d="M50 25V15M35 30L28 23M65 30L72 23" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}
