import { useState, type ChangeEvent, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject line.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Your message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific error on typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success banner after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-zinc-50 dark:bg-transparent text-zinc-800 dark:text-zinc-100 transition-colors duration-300 relative z-10"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-zinc-200/50 dark:bg-white/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Connect & Reserve Table
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Have any inquiries about our signature private events, customized chef catering, or reservations? Write to us, and our concierge team will respond promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* LEFT: DIRECT CONTACT DETAIL BLOCKS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Our Sanctuary</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    1200 Gastronomy Boulevard, Suite 400<br />
                    Culinary Hills, CA 90210
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Direct Line</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    <a href="tel:+13105550192" className="hover:text-amber-500 transition-colors font-semibold">
                      +1 (310) 555-0192
                    </a>
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Reservations highly recommended</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Inquiries</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    <a href="mailto:concierge@bistrocatering.com" className="hover:text-amber-500 transition-colors font-semibold">
                      concierge@bistrocatering.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Bespoke Hours</h4>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 space-y-1">
                    <p><span className="font-semibold text-zinc-700 dark:text-zinc-300">Mon - Thu:</span> 12:00 PM – 10:00 PM</p>
                    <p><span className="font-semibold text-zinc-700 dark:text-zinc-300">Fri - Sat:</span> 12:00 PM – 11:30 PM</p>
                    <p><span className="font-semibold text-zinc-700 dark:text-zinc-300">Sunday Brunch:</span> 11:00 AM – 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HIGHLY STYLIZED MAP PLACEHOLDER */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 dark:backdrop-blur-md shadow-sm p-4 h-60 flex flex-col justify-between">
              {/* Abstract Blueprint Grid Map styling */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] pointer-events-none opacity-80" />
              <div className="absolute inset-0 bg-linear-to-tr from-amber-500/5 via-transparent to-rose-500/5 pointer-events-none" />

              {/* Vector representation elements */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                    GPS Coordinates: 34.0522° N, 118.2437° W
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 text-[10px] font-bold font-mono">
                    LIVE STATUS
                  </span>
                </div>

                {/* Simulated Landmark / Marker */}
                <div className="self-center flex flex-col items-center justify-center gap-2">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </div>
                  <div className="bg-zinc-950 text-white rounded-xl py-2 px-3.5 shadow-xl text-center border border-zinc-800">
                    <span className="text-xs font-bold font-sans">Bistro Restaurant</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Culinary Hills, Suite 400</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mt-2 border-t border-zinc-100 dark:border-white/5 pt-2 relative z-10">
                  <span className="text-zinc-500">Valet parking services available</span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-600 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    View Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE VALIDATED CONTACT FORM */}
          <div className="lg:col-span-7 bg-white dark:bg-white/5 dark:backdrop-blur-xl rounded-3xl p-8 border border-zinc-200/60 dark:border-white/10 shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Send Us a Message</h3>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-4"
                  id="contact-success-banner"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Message Transmitted!</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Bistro. Our lead hospitality manager has received your inquiry and will contact you within the next 12 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="restaurant-contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Liam Sterling"
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md border text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                          errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-200 dark:border-white/10 focus:border-amber-500'
                        }`}
                        id="contact-input-name"
                      />
                      {errors.name && (
                        <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. liam@sterling.com"
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md border text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                          errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-200 dark:border-white/10 focus:border-amber-500'
                        }`}
                        id="contact-input-email"
                      />
                      {errors.email && (
                        <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Private Catering, Event Hall booking..."
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md border text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                        errors.subject ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-200 dark:border-white/10 focus:border-amber-500'
                      }`}
                      id="contact-input-subject"
                    />
                    {errors.subject && (
                      <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your request details here..."
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md border text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none ${
                        errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-200 dark:border-white/10 focus:border-amber-500'
                      }`}
                      id="contact-input-message"
                    />
                    {errors.message && (
                      <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-white font-semibold bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 shadow-md shadow-amber-500/10 hover:opacity-95 disabled:opacity-50 active:scale-99 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5" />
                        <span>Send Culinary Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
