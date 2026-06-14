import ContactHero from './ContactHero';
import ContactMapForm from './ContactMapForm';
import ContactDetails from './ContactDetails';
import ContactFAQ from './ContactFAQ';

// Orchestrator for the Contact page layout
export default function Contact() {
  return (
    <div className="w-full bg-transparent text-[var(--lords-charcoal)] overflow-hidden">
      <ContactHero />
      <ContactMapForm />
      <ContactDetails />
      <ContactFAQ />
    </div>
  );
}
