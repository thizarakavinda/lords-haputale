
interface MarqueeStripProps {
  variant?: 'green' | 'gold';
  text?: string;
}

export default function MarqueeStrip({ 
  variant = 'green',
  text = "ELEGANCE ABOVE THE HILLS  ·  HAPUTALE SRI LANKA  ·  MISTY MOUNTAINS  ·  BOUTIQUE LUXURY  ·  BOOK YOUR ESCAPE  ·  "
}: MarqueeStripProps) {
  
  const bgClass = variant === 'green' ? 'bg-[var(--lords-moss)] text-white' : 'bg-[var(--lords-gold)] text-[var(--lords-charcoal)]';
  
  // Duplicate text several times to ensure smooth infinite scrolling
  const repeatedText = Array(4).fill(text).join(' ');

  return (
    <div className={`w-full h-14 overflow-hidden flex items-center ${bgClass}`}>
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-label text-[13px] uppercase tracking-[0.3em] px-4">
          {repeatedText}
        </span>
        <span className="font-label text-[13px] uppercase tracking-[0.3em] px-4">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
