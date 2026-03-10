import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Minus, Plus } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  const [requests, setRequests] = useState('');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // Generate times 9 AM to 11 PM
  const times = [];
  for (let i = 9; i <= 22; i++) {
    times.push(`${i.toString().padStart(2, '0')}:00`);
    times.push(`${i.toString().padStart(2, '0')}:30`);
  }
  times.push('23:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const formatDisplayDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const formatDisplayTime = (t: string) => {
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/95 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-gold hover:text-cream transition-colors z-50"
          >
            <X className="w-8 h-8 stroke-[1]" />
          </button>

          <div className="w-full max-w-2xl relative my-auto">
            <AnimatePresence mode="wait">
              {step === 'form' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  onSubmit={handleSubmit}
                  className="bg-roast/50 border border-gold/10 p-8 md:p-12"
                >
                  <h2 className="font-display text-4xl text-cream mb-8 text-center">Reserve a Table</h2>
                  
                  <div className="space-y-8">
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="peer w-full bg-transparent border-b border-gold/30 py-2 text-cream font-body focus:outline-none focus:border-gold transition-colors"
                        />
                        <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-body ${name ? '-top-4 text-xs text-gold' : 'top-2 text-latte peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold'}`}>
                          Full Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="peer w-full bg-transparent border-b border-gold/30 py-2 text-cream font-body focus:outline-none focus:border-gold transition-colors"
                        />
                        <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-body ${phone ? '-top-4 text-xs text-gold' : 'top-2 text-latte peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold'}`}>
                          Phone Number
                        </label>
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <label className="text-xs text-gold font-body mb-4 block">Select Date</label>
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {dates.map((d, i) => {
                          const isSelected = d.toDateString() === date.toDateString();
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setDate(d)}
                              className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 border transition-all duration-300 ${isSelected ? 'border-gold bg-gold/10 text-gold' : 'border-gold/20 text-latte hover:border-gold/50 hover:text-cream'}`}
                            >
                              <span className="text-xs uppercase font-label">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                              <span className="text-2xl font-display">{d.getDate()}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time & Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative">
                        <label className="text-xs text-gold font-body mb-2 block">Time</label>
                        <div 
                          className="w-full border-b border-gold/30 py-2 flex justify-between items-center cursor-pointer group"
                          onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                        >
                          <span className="text-cream font-body">{formatDisplayTime(time)}</span>
                          <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>
                        <AnimatePresence>
                          {isTimeDropdownOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 w-full max-h-48 overflow-y-auto bg-roast border border-gold/20 z-20 mt-1 shadow-2xl"
                            >
                              {times.map((t) => (
                                <div 
                                  key={t}
                                  onClick={() => { setTime(t); setIsTimeDropdownOpen(false); }}
                                  className={`px-4 py-2 font-body cursor-pointer transition-colors ${time === t ? 'text-gold bg-gold/10' : 'text-latte hover:text-cream hover:bg-white/5'}`}
                                >
                                  {formatDisplayTime(t)}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label className="text-xs text-gold font-body mb-2 block">Guests</label>
                        <div className="flex items-center justify-between border-b border-gold/30 py-2">
                          <button 
                            type="button"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            className="text-gold hover:text-cream transition-colors p-1"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-cream font-body">{guests} {guests === 1 ? 'Person' : 'People'}</span>
                          <button 
                            type="button"
                            onClick={() => setGuests(Math.min(10, guests + 1))}
                            className="text-gold hover:text-cream transition-colors p-1"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="relative pt-4">
                      <textarea
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                        rows={1}
                        className="peer w-full bg-transparent border-b border-gold/30 py-2 text-cream font-body focus:outline-none focus:border-gold transition-colors resize-none"
                      />
                      <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-body ${requests ? 'top-0 text-xs text-gold' : 'top-6 text-latte peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold'}`}>
                        Special Requests (Optional)
                      </label>
                    </div>
                  </div>

                  <div className="mt-12 flex justify-center">
                    <button 
                      type="submit"
                      className="relative overflow-hidden group border border-gold px-12 py-4 font-label tracking-widest uppercase text-sm text-gold transition-colors duration-400 hover:text-espresso w-full md:w-auto"
                    >
                      <span className="relative z-10">Confirm Reservation</span>
                      <div className="absolute inset-0 bg-gold transform scale-y-0 origin-bottom transition-transform duration-400 ease-out group-hover:scale-y-100" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-center py-20"
                >
                  <div className="flex justify-center mb-8">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                      <path d="M17 8C17 8 17 14 12 14C7 14 7 8 7 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      <path d="M19 8H5C3.89543 8 3 8.89543 3 10V11C3 12.1046 3.89543 13 5 13H19C20.1046 13 21 12.1046 21 11V10C21 8.89543 20.1046 8 19 8Z" stroke="currentColor" strokeWidth="1"/>
                      <path d="M12 22C16.4183 22 20 18.4183 20 14H4C4 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="1"/>
                      <motion.path 
                        d="M9 4C9 3 10 2 10 2" 
                        stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                        animate={{ y: [-2, -6], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                      />
                      <motion.path 
                        d="M12 4C12 2 13 1 13 1" 
                        stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                        animate={{ y: [-2, -8], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      />
                      <motion.path 
                        d="M15 4C15 3 16 2 16 2" 
                        stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                        animate={{ y: [-2, -6], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl text-cream mb-6 leading-relaxed">
                    Your table awaits, <span className="text-gold italic">{name.split(' ')[0]}</span>.
                  </h2>
                  <p className="text-latte font-body text-lg md:text-xl">
                    We'll see you on {formatDisplayDate(date)} at {formatDisplayTime(time)} <span className="text-gold ml-2">✦</span>
                  </p>
                  
                  <button 
                    onClick={onClose}
                    className="mt-16 font-label tracking-widest uppercase text-sm text-gold hover:text-cream transition-colors border-b border-gold/30 pb-1"
                  >
                    Return to Home
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
