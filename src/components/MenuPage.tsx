import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MenuPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_DATA = [
  {
    id: 'coffee', num: 'I', title: 'Coffee & Espresso',
    items: [
      { name: 'Kyoto Cold Brew', desc: 'Slow-drip single origin over 12 hours.', price: 350 },
      { name: 'Toasted Sesame Latte', desc: 'Espresso, house-made sesame syrup, oat milk.', price: 420 },
      { name: 'Estate Pour Over', desc: 'Ratnagiri Estate, light roast. Notes of jasmine.', price: 380 },
      { name: 'Cortado', desc: 'Equal parts espresso and steamed milk.', price: 280 },
      { name: 'Madagascar Vanilla Bean Latte', desc: 'House-made vanilla bean syrup, espresso, milk.', price: 400 },
      { name: 'Classic Espresso', desc: 'Double shot of our seasonal house blend.', price: 220 },
    ]
  },
  {
    id: 'teas', num: 'II', title: 'Teas & Specials',
    items: [
      { name: 'Ceremonial Matcha', desc: 'Uji matcha, whisked to order.', price: 450 },
      { name: 'Hojicha Roasted Tea', desc: 'Low caffeine, smoky and caramel notes.', price: 320 },
      { name: 'Yuzu Oolong', desc: 'Cold-brewed oolong with Japanese citrus.', price: 380 },
      { name: 'Spiced Chai', desc: 'Assam black tea, whole spices, slow-steeped.', price: 250 },
    ]
  },
  {
    id: 'breakfast', num: 'III', title: 'Breakfast',
    items: [
      { name: 'Miso Mushroom Toast', desc: 'Sourdough, whipped ricotta, shiitake.', price: 480 },
      { name: 'Soufflé Pancakes', desc: 'Cloud-like pancakes, yuzu butter, maple.', price: 550 },
      { name: 'Tamagoyaki Sando', desc: 'Japanese rolled omelette, milk bread, kewpie.', price: 420 },
      { name: 'Granola & Coconut Yogurt', desc: 'House-baked matcha granola, seasonal fruits.', price: 380 },
    ]
  },
  {
    id: 'mains', num: 'IV', title: 'Mains & Kitchen',
    items: [
      { name: 'Truffle Udon', desc: 'Hand-pulled noodles, cream, shaved truffle.', price: 750 },
      { name: 'Katsu Sando', desc: 'Panko-crusted chicken, milk bread, tonkatsu sauce.', price: 620 },
      { name: 'Miso Glazed Eggplant', desc: 'Roasted nasu, sesame, spring onion, rice.', price: 580 },
      { name: 'Wagyu Donburi', desc: 'Sliced wagyu beef, onsen egg, sweet soy.', price: 1200 },
    ]
  },
  {
    id: 'desserts', num: 'V', title: 'Desserts & Sweets',
    items: [
      { name: 'Black Sesame Tart', desc: 'Charcoal crust, sesame ganache, gold leaf.', price: 400 },
      { name: 'Yuzu Cheesecake', desc: 'Basque style, burnt top, citrus center.', price: 450 },
      { name: 'Matcha Tiramisu', desc: 'Ladyfingers, mascarpone, ceremonial matcha.', price: 480 },
      { name: 'Kinako Mochi', desc: 'Roasted soybean flour, kuromitsu syrup.', price: 320 },
    ]
  }
];

export const MenuPage: React.FC<MenuPageProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('coffee');

  useEffect(() => {
    if (!isOpen) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id.replace('menu-', ''));
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });

    MENU_DATA.forEach(sec => {
      const el = document.getElementById(`menu-${sec.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`menu-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[150] bg-espresso overflow-y-auto overflow-x-hidden"
        >
          <div className="grain-overlay" />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="fixed top-6 right-6 z-[200] w-12 h-12 flex items-center justify-center rounded-full bg-roast/80 border border-gold/20 text-latte hover:text-gold hover:border-gold/50 transition-all backdrop-blur-sm"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>

          {/* Sticky Nav */}
          <div className="sticky top-0 z-[160] w-full bg-espresso/90 backdrop-blur-md border-b border-gold/10 py-4">
            <div className="max-w-5xl mx-auto px-6 flex justify-start md:justify-center gap-8 overflow-x-auto scrollbar-hide">
              {MENU_DATA.map(sec => (
                <button 
                  key={sec.id} 
                  onClick={() => scrollToSection(sec.id)}
                  className={`font-label tracking-widest uppercase text-xs transition-colors whitespace-nowrap pb-1 border-b ${activeSection === sec.id ? 'text-gold border-gold' : 'text-latte border-transparent hover:text-cream'}`}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          </div>

          {/* Page Content */}
          <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
            {/* Header */}
            <div className="text-center mb-24">
              <motion.h1 
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-display text-5xl md:text-7xl text-cream tracking-[0.15em] uppercase"
              >
                The Menu
              </motion.h1>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="w-full max-w-md mx-auto h-px bg-gold/30 mt-12" 
              />
            </div>

            {/* Sections */}
            <div className="space-y-24">
              {MENU_DATA.map((sec, index) => (
                <motion.section 
                  key={sec.id}
                  id={`menu-${sec.id}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={containerVariants}
                  className="scroll-mt-32"
                >
                  <motion.div variants={itemVariants} className="mb-12 text-center md:text-left flex items-baseline justify-center md:justify-start gap-4">
                    <span className="font-display text-gold text-3xl md:text-4xl">{sec.num}</span>
                    <h2 className="font-display text-4xl md:text-5xl text-cream">{sec.title}</h2>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                    {sec.items.map((item, i) => (
                      <motion.div 
                        key={i}
                        variants={itemVariants} 
                        className="group flex flex-col p-4 hover:bg-[rgba(201,169,110,0.07)] transition-colors duration-300 rounded-sm"
                      >
                        <div className="flex items-baseline w-full">
                          <span className="text-cream font-dm-serif text-lg md:text-xl group-hover:translate-x-1 transition-transform duration-300 ease-out">{item.name}</span>
                          <div className="flex-grow border-b-2 border-dotted border-gold/20 mx-4 relative -top-1 transition-opacity duration-300 group-hover:border-gold/40"></div>
                          <span className="text-gold font-dm-serif text-lg md:text-xl shrink-0">₹{item.price}</span>
                        </div>
                        <p className="text-latte font-dm-serif text-sm md:text-base mt-2 group-hover:translate-x-1 transition-transform duration-300 ease-out">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {index !== MENU_DATA.length - 1 && (
                    <motion.div variants={itemVariants} className="w-full h-px bg-gold/10 mt-24" />
                  )}
                </motion.section>
              ))}
            </div>
            
            {/* Footer Note */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-32 text-center"
            >
              <p className="font-label tracking-widest uppercase text-latte/50 text-xs">
                Please inform us of any allergies. <br className="md:hidden" />
                A 10% service charge is applicable.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
