import HomeHero from './HomeHero';
import HomeAbout from './HomeAbout';
import HomeRooms from './HomeRooms';
import HomeExperience from './HomeExperience';
import HomeDestinations from './HomeDestinations';
import HomeTestimonials from './HomeTestimonials';
import HomeCTA from './HomeCTA';
import MarqueeStrip from '../../components/MarqueeStrip';

export default function Home() {
  return (
    <div className="bg-[var(--lords-mist)]">
      <HomeHero />
      <MarqueeStrip variant="green" />
      <HomeAbout />
      <HomeRooms />
      <HomeExperience />
      <HomeDestinations />
      <HomeTestimonials />
      <HomeCTA />
    </div>
  );
}
