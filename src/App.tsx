import React, { useEffect, useState, useRef } from 'react';
import { Utensils, Facebook, Instagram, Phone } from 'lucide-react';
import { fetchMenuData } from './utils/fetchMenu';
import { MenuCategory } from './components/MenuCategory';
import type { MenuData } from './types';

function App() {
  const [menuData, setMenuData] = useState<MenuData>({ categories: [], items: {} });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const categoriesRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMenuData = async () => {
      const data = await fetchMenuData();
      setMenuData(data);
      if (data.categories.length > 0) {
        setSelectedCategory(data.categories[0]);
      }
    };
    loadMenuData();
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      categoriesRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Instant scroll to top
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo(0, 0);
    }
  };

  const handlePhoneClick = () => {
    const phoneNumber = '+201030309394';
    navigator.clipboard.writeText(phoneNumber);
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div ref={mainContainerRef} className="h-screen overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div style={{ backgroundColor: "rgb(60, 95, 136) " }}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <img 
              src="/images/logo.png" 
              alt="Restaurant Logo" 
              className="h-24 w-24 mr-3"
            />
            <h1 className="text-5xl font-bold font-mono" style={{ color: "rgb(220, 155, 33)" }}>ABO ALEZZ</h1>
          </div>
        </div>
      </div>

      {/* Categories - Sticky */}
      <div className="sticky top-0 bg-white z-10 shadow-md">
        <div className="relative">
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white to-transparent px-4"
          >
            ‹
          </button>
          <div
            ref={categoriesRef}
            className="flex overflow-x-auto scrollbar-hide py-4 px-8 space-x-4"
          >
            {menuData.categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`
                  whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium
                  transition-colors duration-200
                  ${selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white to-transparent px-4"
          >
            ›
          </button>
        </div>
      </div>

      {/* Menu Items with background */}
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="bg-black/40">
          <div className="container mx-auto py-8">
            {selectedCategory && menuData.items[selectedCategory] && (
              <div id={selectedCategory}>
                <MenuCategory 
                  items={menuData.items[selectedCategory]} 
                  showCategories={selectedCategory === 'All'}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg" style={{ backgroundColor: "rgb(34, 42, 65)" }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/19rYiQbPwS/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[rgb(220,155,33)] hover:text-orange-500 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/aboelezzsyrian?igsh=MTZvOHEybGxnemd0OQ== " 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[rgb(220,155,33)] hover:text-orange-500 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <button 
              onClick={handlePhoneClick}
              className="flex items-center space-x-1 text-[rgb(220,155,33)] hover:text-orange-500 transition-colors"
            >
              <Phone className="h-6 w-6" />
              <span className="font-medium">01144435111</span>
            </button>
            <button 
              onClick={handlePhoneClick}
              className="flex items-center space-x-1 text-[rgb(220,155,33)] hover:text-orange-500 transition-colors"
            >
              <Phone className="h-6 w-6" />
              <span className="font-medium">01011445555</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;