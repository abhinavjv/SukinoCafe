import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, MapPin, Coffee, Utensils, UtensilsCrossed, CakeSlice, Quote } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { FadeIn } from './components/FadeIn';
import { ReservationModal } from './components/ReservationModal';
import { OrderInterface } from './components/OrderInterface';
import { MenuPage } from './components/MenuPage';

export default function App() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const [showReservation, setShowReservation] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showMenuPage, setShowMenuPage] = useState(false);

  return (
    <div className="relative min-h-screen bg-espresso font-body overflow-x-hidden">
      <div className="grain-overlay" />
      <CustomCursor />

      {/* Modals & Pages */}
      <ReservationModal isOpen={showReservation} onClose={() => setShowReservation(false)} />
      <OrderInterface isOpen={showOrder} onClose={() => setShowOrder(false)} />
      <MenuPage isOpen={showMenuPage} onClose={() => setShowMenuPage(false)} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="font-label text-xl tracking-[0.2em] text-cream uppercase">Sukino</a>
          <div className="hidden md:flex gap-8 font-label text-sm tracking-widest text-cream">
            {['About', 'Menu', 'Visit'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative group uppercase">
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center z-10 px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="font-display text-7xl md:text-9xl lg:text-[12rem] text-cream leading-none tracking-tight mb-6"
          >
            Sukino
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="flex flex-col items-center"
          >
            <p className="font-label text-latte tracking-[0.3em] uppercase text-sm md:text-base mb-8">
              Cafe & Kitchen <span className="mx-3 text-gold/50">·</span> Bengaluru
            </p>
            <div className="w-px h-24 bg-gradient-to-b from-gold/50 to-transparent" />
          </motion.div>
        </motion.div>
        
        {/* Decorative thin line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* 2. ABOUT */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeIn direction="right">
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-8 leading-tight">
              A corner of calm on <br/>
              <span className="italic text-gold">17th Main Road</span>
            </h2>
            <p className="text-latte text-lg md:text-xl leading-relaxed mb-8">
              Nestled in the heart of Banashankari, Sukino is an homage to the slow, deliberate art of coffee making. We blend the meticulous nature of Japanese minimalism with the warm, rich heritage of Indian estates.
            </p>
            <p className="text-latte text-lg md:text-xl leading-relaxed">
              Here, every cup is crafted with intention, and every plate is a celebration of quiet luxury. Unhurried. Timeless. Yours.
            </p>
          </FadeIn>
          
          <FadeIn direction="left" delay={0.2}>
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              <div className="absolute inset-0 border border-cream/20 p-3">
                <div className="w-full h-full bg-roast relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent"></div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-gold/40"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-gold/40"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. HOURS & INFO */}
      <section id="visit" className="py-24 bg-roast/30 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-gold/10">
              <div className="flex flex-col items-center md:items-start md:pr-12 py-6 md:py-0">
                <Clock className="w-6 h-6 text-gold mb-6 stroke-[1.5]" />
                <h3 className="font-label tracking-widest text-cream mb-4 uppercase">Hours</h3>
                <p className="text-latte font-body">Open Daily</p>
                <p className="text-latte font-body mt-1">8:00 AM — 11:00 PM</p>
              </div>
              <div className="flex flex-col items-center md:items-start md:px-12 py-6 md:py-0">
                <MapPin className="w-6 h-6 text-gold mb-6 stroke-[1.5]" />
                <h3 className="font-label tracking-widest text-cream mb-4 uppercase">Location</h3>
                <p className="text-latte font-body leading-relaxed">
                  183, 17th Main Rd,<br/>
                  Siddanna Layout, Banashankari Stage II,<br/>
                  Bengaluru 560070
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start md:pl-12 py-6 md:py-0">
                <Utensils className="w-6 h-6 text-gold mb-6 stroke-[1.5]" />
                <h3 className="font-label tracking-widest text-cream mb-4 uppercase">Service</h3>
                <ul className="text-latte font-body space-y-2 text-center md:text-left">
                  <li>Dine-in</li>
                  <li>Takeaway</li>
                  <li>No-contact Delivery</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. MENU TEASER */}
      <section id="menu" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-cream">Our Offerings</h2>
            <button onClick={() => setShowMenuPage(true)} className="font-label text-gold tracking-widest uppercase text-sm mt-6 md:mt-0 hover:text-cream transition-colors border-b border-gold/30 pb-1">
              View Full Menu
            </button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Coffee', icon: Coffee, desc: 'Single-origin pour overs & rich espresso blends.' },
            { title: 'Breakfast', icon: UtensilsCrossed, desc: 'Artisanal toasts, soft eggs & morning pastries.' },
            { title: 'Mains', icon: Utensils, desc: 'Thoughtful plates combining local produce & global techniques.' },
            { title: 'Desserts', icon: CakeSlice, desc: 'Delicate entremets & classic comfort bakes.' }
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1} className="group relative h-80 border border-cream/10 bg-roast/20 hover:bg-roast/40 transition-all duration-700 overflow-hidden flex flex-col justify-end p-8 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent opacity-80" />
              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-4">
                <item.icon className="w-8 h-8 text-gold/50 mb-6 transition-colors duration-500 group-hover:text-gold stroke-[1]" />
                <h3 className="font-display text-3xl text-cream mb-2">{item.title}</h3>
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <p className="text-gold font-body text-sm mt-4 italic">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5. RESERVE / ORDER */}
      <section className="py-24 px-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 bg-roast/50 backdrop-blur-sm" />
        <div className="absolute inset-0 border-y border-gold/10" />
        
        <FadeIn className="relative z-10 text-center w-full max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-12">Experience Sukino</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setShowReservation(true)}
              className="relative overflow-hidden group border border-gold px-10 py-4 font-label tracking-widest uppercase text-sm text-gold transition-colors duration-500 hover:text-espresso"
            >
              <span className="relative z-10">Reserve a Table</span>
              <div className="absolute inset-0 bg-gold transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </button>
            <button 
              onClick={() => setShowOrder(true)}
              className="relative overflow-hidden group border border-gold px-10 py-4 font-label tracking-widest uppercase text-sm text-gold transition-colors duration-500 hover:text-espresso"
            >
              <span className="relative z-10">Order Online</span>
              <div className="absolute inset-0 bg-gold transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </button>
          </div>
        </FadeIn>
      </section>

      {/* 6. REVIEWS */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1,2,3,4].map(i => <span key={i} className="text-gold text-xl">★</span>)}
            <span className="text-gold text-xl opacity-50">★</span>
          </div>
          <p className="font-label tracking-widest uppercase text-latte text-sm">4.5 Stars based on 214 reviews</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { text: "The most serene coffee experience in South Bengaluru. Their pour-over is unmatched.", author: "Aanya R." },
            { text: "A beautiful fusion of minimalist aesthetics and deeply comforting food. The perfect weekend retreat.", author: "Vikram S." },
            { text: "Quiet, elegant, and the staff pays attention to every little detail. Truly a hidden gem.", author: "Meera K." }
          ].map((review, i) => (
            <FadeIn key={i} delay={i * 0.2} className="p-8 border border-cream/5 bg-roast/10 relative">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gold/10 rotate-180" />
              <p className="font-body text-cream/90 text-lg leading-relaxed mb-8 relative z-10">"{review.text}"</p>
              <p className="font-label tracking-widest uppercase text-gold text-sm">— {review.author}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-gold/20 bg-espresso pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl text-cream mb-4">Sukino</h2>
            <p className="text-latte font-body text-sm max-w-xs">
              183, 17th Main Rd, Siddanna Layout,<br/>
              Banashankari Stage II, Bengaluru
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <a href="#" className="font-label tracking-widest uppercase text-gold hover:text-cream transition-colors text-sm">
              Get Directions
            </a>
            <div className="flex gap-6 mt-4 md:mt-0">
              {['Instagram', 'Facebook', 'Twitter'].map(social => (
                <a key={social} href="#" className="font-label tracking-widest uppercase text-latte hover:text-cream transition-colors text-xs">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cream/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label tracking-widest uppercase text-latte/50 text-xs">
            © {new Date().getFullYear()} Sukino Cafe & Kitchen
          </p>
          <p className="font-label tracking-widest uppercase text-latte/50 text-xs">
            Designed with intention
          </p>
        </div>
      </footer>
    </div>
  );
}
