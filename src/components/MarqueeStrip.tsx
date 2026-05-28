
interface MarqueeStripProps {
  variant?: 'green' | 'gold';
  text?: string;
}

export default function MarqueeStrip({ 
  variant = 'green',
  text = "ELEGANCE ABOVE THE HILLS  ·  HAPUTALE SRI LANKA  ·  MISTY MOUNTAINS  ·  BOUTIQUE LUXURY  ·  BOOK YOUR ESCAPE  ·  "
}: MarqueeStripProps) {
  
  const containerStyle = variant === 'green' 
    ? "bg-gradient-to-r from-[var(--lords-fog)] via-[var(--lords-stone)] to-[var(--lords-fog)] border-y border-[var(--lords-gold)]/20 text-[var(--lords-gold)]" 
    : "bg-gradient-to-r from-[var(--lords-gold)] to-[var(--lords-gold-light)] border-y border-white/10 text-[var(--lords-mist)]";
  
  // Custom premium text
  const cleanText = text.replace(/·/g, "✦");
  const repeatedText = Array(4).fill(cleanText).join(' ');

  return (
    <div className={`w-full h-14 overflow-hidden flex items-center shadow-lg relative z-20 ${containerStyle}`}>
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-label text-[11px] md:text-[12px] uppercase tracking-[0.35em] px-4 select-none">
          {repeatedText}
        </span>
        <span className="font-label text-[11px] md:text-[12px] uppercase tracking-[0.35em] px-4 select-none">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
