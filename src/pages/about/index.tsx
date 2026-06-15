import AboutHero from './AboutHero';
import AboutStory from './AboutStory';
import AboutValues from './AboutValues';
import AboutHighlights from './AboutHighlights';
import HomeCTA from '../home/HomeCTA';

// Orchestrator for the About Us page layout
export default function About() {
  return (
    <div className="w-full bg-transparent text-[var(--lords-charcoal)] overflow-hidden">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutHighlights />
      <HomeCTA />
    </div>
  );
}
