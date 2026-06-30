import HomeHero from './HomeHero';
import HomeAbout from './HomeAbout';
import HomeRooms from './HomeRooms';
import HomeExperience from './HomeExperience';
import HomeDestinations from './HomeDestinations';
import HomeTestimonials from './HomeTestimonials';
import HomeCTA from './HomeCTA';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <HomeAbout />
      <HomeRooms />
      <HomeExperience />
      <HomeDestinations />
      <HomeTestimonials />
      <HomeCTA />
    </div>
  );
}
