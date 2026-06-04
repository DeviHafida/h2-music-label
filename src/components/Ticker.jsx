import { tickerItems } from '../data/mockData';

export default function Ticker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-[#0d160d] border-b border-[#1a2e1a] overflow-hidden h-8 flex items-center">
      <div className="ticker-inner">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5 mr-8 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39e07a] inline-block" />
            <span className="text-[10px] font-mono text-[#4d7a4d] uppercase tracking-widest">{item.label}:</span>
            <span className="text-[10px] font-mono text-[#39e07a] tracking-wide">{item.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
