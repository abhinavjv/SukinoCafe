import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';

interface OrderInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { id: 'coffee', name: 'Coffee' },
  { id: 'teas', name: 'Teas' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'mains', name: 'Mains' },
  { id: 'desserts', name: 'Desserts' },
];

const MENU_ITEMS = [
  { id: 'c1', category: 'coffee', name: 'Kyoto Cold Brew', desc: 'Slow-drip single origin over 12 hours.', price: 350 },
  { id: 'c2', category: 'coffee', name: 'Toasted Sesame Latte', desc: 'Espresso, house-made sesame syrup, oat milk.', price: 420 },
  { id: 'c3', category: 'coffee', name: 'Estate Pour Over', desc: 'Ratnagiri Estate, light roast. Notes of jasmine.', price: 380 },
  { id: 't1', category: 'teas', name: 'Ceremonial Matcha', desc: 'Uji matcha, whisked to order.', price: 450 },
  { id: 't2', category: 'teas', name: 'Hojicha Roasted Tea', desc: 'Low caffeine, smoky and caramel notes.', price: 320 },
  { id: 'b1', category: 'breakfast', name: 'Miso Mushroom Toast', desc: 'Sourdough, whipped ricotta, shiitake.', price: 480 },
  { id: 'b2', category: 'breakfast', name: 'Soufflé Pancakes', desc: 'Cloud-like pancakes, yuzu butter, maple.', price: 550 },
  { id: 'm1', category: 'mains', name: 'Truffle Udon', desc: 'Hand-pulled noodles, cream, shaved truffle.', price: 750 },
  { id: 'm2', category: 'mains', name: 'Katsu Sando', desc: 'Panko-crusted chicken, milk bread, tonkatsu sauce.', price: 620 },
  { id: 'd1', category: 'desserts', name: 'Black Sesame Tart', desc: 'Charcoal crust, sesame ganache, gold leaf.', price: 400 },
  { id: 'd2', category: 'desserts', name: 'Yuzu Cheesecake', desc: 'Basque style, burnt top, citrus center.', price: 450 },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const OrderInterface: React.FC<OrderInterfaceProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyingItems, setFlyingItems] = useState<{ id: number; x: number; y: number }[]>([]);
  const [orderStatus, setOrderStatus] = useState<'shopping' | 'success'>('shopping');

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (e: React.MouseEvent, item: typeof MENU_ITEMS[0]) => {
    // Add to cart logic
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });

    // Animation logic
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const newFlyingItem = { id: Date.now(), x: rect.left, y: rect.top };
    setFlyingItems(prev => [...prev, newFlyingItem]);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handlePlaceOrder = () => {
    setOrderStatus('success');
    setTimeout(() => {
      setCart([]);
      setOrderStatus('shopping');
      setIsCartOpen(false);
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-espresso flex flex-col md:flex-row overflow-hidden"
        >
          {/* Header (Mobile) */}
          <div className="md:hidden flex justify-between items-center p-6 border-b border-gold/10">
            <h2 className="font-display text-2xl text-cream">Order Online</h2>
            <button onClick={onClose} className="text-latte hover:text-gold"><X /></button>
          </div>

          {/* Left Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gold/10 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto scrollbar-hide shrink-0">
            <div className="hidden md:flex justify-between items-center p-8 pb-4">
              <h2 className="font-display text-3xl text-cream">Menu</h2>
              <button onClick={onClose} className="text-latte hover:text-gold transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="flex md:flex-col p-4 md:p-8 gap-4 md:gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-4 px-4 py-3 text-left transition-all duration-300 whitespace-nowrap md:whitespace-normal rounded-lg ${
                    activeCategory === cat.id 
                      ? 'text-gold bg-gold/5 shadow-[0_0_15px_rgba(201,169,110,0.1)]' 
                      : 'text-latte hover:text-cream hover:bg-white/5'
                  }`}
                >
                  
                  <span className="font-label tracking-widest uppercase text-sm">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12 relative">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <h3 className="font-display text-4xl text-cream mb-10 hidden md:block">
                {CATEGORIES.find(c => c.id === activeCategory)?.name}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredItems.map(item => {
                  const cartItem = cart.find(i => i.id === item.id);
                  return (
                    <div key={item.id} className="group flex justify-between items-start p-6 border border-gold/10 bg-roast/30 hover:bg-roast/60 transition-colors">
                      <div className="pr-6">
                        <h4 className="font-playfair text-xl text-cream mb-2">{item.name}</h4>
                        <p className="font-body text-latte text-sm leading-relaxed mb-4">{item.desc}</p>
                        <p className="font-body text-gold font-bold">₹{item.price}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => handleAddToCart(e, item)}
                          className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-espresso transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </motion.button>
                        {cartItem && (
                          <span className="font-label text-xs text-gold bg-gold/10 px-2 py-1 rounded-full">
                            {cartItem.quantity} in cart
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Floating Cart Button */}
          <AnimatePresence>
            {cartCount > 0 && !isCartOpen && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg shadow-gold/20 z-[105] hover:scale-105 transition-transform"
              >
                <ShoppingBag className="w-6 h-6 text-espresso" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-cream text-espresso rounded-full font-label text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Right Drawer (Cart) */}
          <AnimatePresence>
            {isCartOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCartOpen(false)}
                  className="fixed inset-0 bg-espresso/80 backdrop-blur-sm z-[108]"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 h-full w-full md:w-96 bg-roast border-l border-gold/20 z-[110] flex flex-col"
                >
                  {orderStatus === 'shopping' ? (
                    <>
                      <div className="p-6 border-b border-gold/10 flex justify-between items-center">
                        <h3 className="font-display text-2xl text-cream">Your Order</h3>
                        <button onClick={() => setIsCartOpen(false)} className="text-latte hover:text-gold transition-colors">
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                          <p className="text-latte font-body text-center mt-10">Your cart is empty.</p>
                        ) : (
                          cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div className="flex-1">
                                <h4 className="font-playfair text-cream">{item.name}</h4>
                                <p className="font-body text-gold text-sm">₹{item.price}</p>
                              </div>
                              <div className="flex items-center gap-3 bg-espresso/50 rounded-full px-2 py-1 border border-gold/10">
                                <button onClick={() => updateQuantity(item.id, -1)} className="text-latte hover:text-gold p-1">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-body text-cream text-sm w-4 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="text-latte hover:text-gold p-1">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {cart.length > 0 && (
                        <div className="p-6 border-t border-gold/10 bg-espresso/50">
                          <div className="flex justify-between items-center mb-6">
                            <span className="font-label tracking-widest uppercase text-latte text-sm">Subtotal</span>
                            <span className="font-display text-2xl text-cream">₹{cartTotal}</span>
                          </div>
                          <button 
                            onClick={handlePlaceOrder}
                            className="w-full py-4 bg-gold text-espresso font-label tracking-widest uppercase text-sm font-bold flex items-center justify-center gap-2 hover:bg-cream transition-colors animate-pulse-glow"
                          >
                            Place Order <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                    >
                      <span className="text-6xl mb-6">🍵</span>
                      <h3 className="font-display text-3xl text-cream mb-4">Order received!</h3>
                      <p className="font-body text-latte">Estimated preparation time:<br/><span className="text-gold text-lg mt-2 block">20–30 mins</span></p>
                    </motion.div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Parabolic Micro-animations */}
          {flyingItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ x: item.x, y: item.y, scale: 1, opacity: 1 }}
              animate={{ 
                x: window.innerWidth - 60, // approximate cart icon X
                y: window.innerHeight - 60, // approximate cart icon Y
                scale: 0.2, 
                opacity: 0 
              }}
              transition={{ 
                duration: 0.7,
                x: { ease: "linear" },
                y: { ease: "easeIn" }
              }}
              onAnimationComplete={() => setFlyingItems(prev => prev.filter(i => i.id !== item.id))}
              className="fixed z-[200] w-6 h-6 rounded-full bg-gold pointer-events-none shadow-[0_0_10px_rgba(201,169,110,0.8)]"
            />
          ))}

        </motion.div>
      )}
    </AnimatePresence>
  );
};
