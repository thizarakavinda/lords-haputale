import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// ContactMapForm houses the Google Map and floating overlay Contact Form
export default function ContactMapForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Simulate contact form submission API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1200);
  };

  return (
    <section className="relative w-full lg:h-[700px] flex flex-col lg:block bg-[var(--lords-mist)]">
      {/* Google Maps Embed (Filtered using custom CSS style classes) */}
      <div className="w-full h-[350px] sm:h-[450px] lg:h-full relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.047735751085!2d80.95021397399582!3d6.764034393232658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4719a8a6f3a89%3A0x4fc8d27c72ac07ec!2s50%2C%2010%20Beragala-Hali%20Ela%2C%20Haputale%2090160!5e0!3m2!1sen!2slk!4v1749019333270!5m2!1sen!2slk"
          className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lord's Haputale Location Map"
        />
        {/* Shading overlays to integrate Map boundaries */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--lords-mist)] via-transparent to-[var(--lords-mist)]/30 pointer-events-none lg:hidden" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--lords-mist)] to-transparent pointer-events-none hidden lg:block" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--lords-mist)] to-transparent pointer-events-none hidden lg:block" />
      </div>

      {/* Floating Contact Form overlay */}
      <div className="px-6 py-12 lg:py-0 w-full lg:absolute lg:inset-y-0 lg:right-24 lg:flex lg:items-center lg:justify-end z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="pointer-events-auto w-full max-w-[440px] bg-[rgba(9,18,13,0.92)] backdrop-blur-[20px] border border-[rgba(197,168,128,0.18)] shadow-[0_24px_64px_rgba(0,0,0,0.65)] rounded-lg p-8 md:p-10 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="contact-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-serif text-[28px] text-[var(--lords-cream)] font-light mb-1 leading-tight">
                  Send a Message
                </h2>
                <div className="w-10 h-[2px] bg-[var(--lords-gold)] mb-8 mt-2" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name field */}
                  <div className="relative w-full group">
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder=" "
                      required
                      className="block py-2.5 px-0 w-full text-sm text-[var(--lords-cream)] bg-transparent border-0 border-b border-[var(--lords-stone)] focus:border-[var(--lords-gold)] focus:outline-none transition-colors duration-300 peer"
                    />
                    <label
                      htmlFor="fullname"
                      className="absolute left-0 top-2.5 text-[var(--lords-muted)] text-sm -translate-y-4 scale-75 origin-[0] transform transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[var(--lords-gold)]"
                    >
                      Full Name *
                    </label>
                  </div>

                  {/* Email field */}
                  <div className="relative w-full group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=" "
                      required
                      className="block py-2.5 px-0 w-full text-sm text-[var(--lords-cream)] bg-transparent border-0 border-b border-[var(--lords-stone)] focus:border-[var(--lords-gold)] focus:outline-none transition-colors duration-300 peer"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-2.5 text-[var(--lords-muted)] text-sm -translate-y-4 scale-75 origin-[0] transform transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[var(--lords-gold)]"
                    >
                      Email Address *
                    </label>
                  </div>

                  {/* Phone field */}
                  <div className="relative w-full group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-sm text-[var(--lords-cream)] bg-transparent border-0 border-b border-[var(--lords-stone)] focus:border-[var(--lords-gold)] focus:outline-none transition-colors duration-300 peer"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-0 top-2.5 text-[var(--lords-muted)] text-sm -translate-y-4 scale-75 origin-[0] transform transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[var(--lords-gold)]"
                    >
                      Phone Number
                    </label>
                  </div>

                  {/* Message textarea */}
                  <div className="relative w-full group mt-2">
                    <textarea
                      id="message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder=" "
                      rows={4}
                      required
                      className="block py-2.5 px-0 w-full text-sm text-[var(--lords-cream)] bg-transparent border-0 border-b border-[var(--lords-stone)] focus:border-[var(--lords-gold)] focus:outline-none transition-colors duration-300 peer resize-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-0 top-2.5 text-[var(--lords-muted)] text-sm -translate-y-4 scale-75 origin-[0] transform transition-all duration-300 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[var(--lords-gold)]"
                    >
                      Message *
                    </label>
                  </div>

                  {/* Submit buttons */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--lords-moss)] text-white hover:bg-[var(--lords-forest)] disabled:opacity-50 text-[11px] font-label font-medium uppercase tracking-[0.25em] py-4 rounded-sm transition-colors duration-300 shadow-md cursor-pointer mt-4"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                {/* Premium animated checkmark wrapper */}
                <div className="w-20 h-20 bg-[var(--lords-stone)]/50 rounded-full flex items-center justify-center border border-[var(--lords-gold)]/20 mb-6 relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="text-[var(--lords-gold)]"
                  >
                    <Check size={36} strokeWidth={2.5} />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[var(--lords-gold)]"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.3 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                </div>

                <h3 className="font-serif text-2xl text-[var(--lords-cream)] mb-3 font-light">
                  Message Sent!
                </h3>
                <p className="font-body text-[14.5px] text-[var(--lords-smoke)] leading-relaxed mb-6 font-light">
                  Thank you for reaching out. We have received your message and will reply to you within 24 hours.
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-label text-xs text-[var(--lords-gold)] hover:text-[var(--lords-gold-light)] uppercase tracking-widest border-b border-[var(--lords-gold)] pb-1 hover:border-[var(--lords-gold-light)] transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
