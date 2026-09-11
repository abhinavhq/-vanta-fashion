import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/fashionData';
import { MOCK_PRODUCTS } from '../data/fashionData';
import confetti from 'canvas-confetti';

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  theme: 'dark' | 'light';
  activeView: string;
  selectedProductId: string | null;
  selectedArticleId: string | null;
  selectedAestheticFilter: string | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isAiAssistantOpen: boolean;
  isOutfitBuilderOpen: boolean;
  userStyleProfile: {
    favoriteAesthetics: string[];
    recentViewedIds: string[];
  };
  discountPercent: number;
  couponCode: string;

  // Actions
  setActiveView: (view: string) => void;
  openProductModal: (productId: string) => void;
  closeProductModal: () => void;
  viewArticle: (articleId: string) => void;
  setSelectedAestheticFilter: (aesthetic: string | null) => void;
  toggleCart: (isOpen?: boolean) => void;
  toggleSearch: (isOpen?: boolean) => void;
  toggleAiAssistant: (isOpen?: boolean) => void;
  toggleOutfitBuilder: (isOpen?: boolean) => void;
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  addMultipleToCart: (items: { product: Product; color: string; size: string }[]) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateCartQuantity: (productId: string, color: string, size: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleTheme: () => void;
  applyCoupon: (code: string) => boolean;
  checkout: () => void;
  
  // Admin Actions
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vanta_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vanta_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('vanta_wishlist');
    return saved ? JSON.parse(saved) : ['van-001', 'van-003'];
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedAestheticFilter, setSelectedAestheticFilter] = useState<string | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isOutfitBuilderOpen, setIsOutfitBuilderOpen] = useState(false);

  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponCode, setCouponCode] = useState('');

  const [userStyleProfile, setUserStyleProfile] = useState<{
    favoriteAesthetics: string[];
    recentViewedIds: string[];
  }>({
    favoriteAesthetics: ['Korean Streetwear', 'Japanese Minimalism'],
    recentViewedIds: ['van-001', 'van-002']
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('vanta_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('vanta_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vanta_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync dark class on body
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const openProductModal = (productId: string) => {
    setSelectedProductId(productId);
    // Track user viewing history for personalization engine
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setUserStyleProfile(prev => {
        const updatedRecent = [productId, ...prev.recentViewedIds.filter(id => id !== productId)].slice(0, 10);
        const updatedAesthetics = Array.from(new Set([prod.aesthetic, ...prev.favoriteAesthetics]));
        return {
          recentViewedIds: updatedRecent,
          favoriteAesthetics: updatedAesthetics
        };
      });
    }
  };

  const closeProductModal = () => {
    setSelectedProductId(null);
  };

  const viewArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setActiveView('journal');
  };

  const toggleCart = (isOpen?: boolean) => {
    setIsCartOpen(prev => (isOpen !== undefined ? isOpen : !prev));
  };

  const toggleSearch = (isOpen?: boolean) => {
    setIsSearchOpen(prev => (isOpen !== undefined ? isOpen : !prev));
  };

  const toggleAiAssistant = (isOpen?: boolean) => {
    setIsAiAssistantOpen(prev => (isOpen !== undefined ? isOpen : !prev));
  };

  const toggleOutfitBuilder = (isOpen?: boolean) => {
    setIsOutfitBuilderOpen(prev => (isOpen !== undefined ? isOpen : !prev));
  };

  const addToCart = (product: Product, color?: string, size?: string, quantity: number = 1) => {
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const chosenSize = size || product.sizes[0] || 'M';

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor === chosenColor && item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedColor: chosenColor, selectedSize: chosenSize, quantity }];
      }
    });

    setIsCartOpen(true);
  };

  const addMultipleToCart = (items: { product: Product; color: string; size: string }[]) => {
    items.forEach(item => {
      addToCart(item.product, item.color, item.size, 1);
    });
  };

  const removeFromCart = (productId: string, color: string, size: string) => {
    setCart(prev =>
      prev.filter(item => !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size))
    );
  };

  const updateCartQuantity = (productId: string, color: string, size: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId && item.selectedColor === color && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    if (code.trim().toUpperCase() === 'VANTA15') {
      setDiscountPercent(15);
      setCouponCode('VANTA15');
      return true;
    }
    return false;
  };

  const checkout = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#00f0ff', '#d4af37']
    });
    alert('Thank you for choosing VANTA. Your order has been placed successfully!');
    clearCart();
    setIsCartOpen(false);
  };

  // Admin Actions
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        theme,
        activeView,
        selectedProductId,
        selectedArticleId,
        selectedAestheticFilter,
        isCartOpen,
        isSearchOpen,
        isAiAssistantOpen,
        isOutfitBuilderOpen,
        userStyleProfile,
        discountPercent,
        couponCode,

        setActiveView,
        openProductModal,
        closeProductModal,
        viewArticle,
        setSelectedAestheticFilter,
        toggleCart,
        toggleSearch,
        toggleAiAssistant,
        toggleOutfitBuilder,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleTheme,
        applyCoupon,
        checkout,

        addProduct,
        deleteProduct,
        updateProduct
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
