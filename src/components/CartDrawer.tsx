import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    toggleCart,
    cart,
    removeFromCart,
    updateCartQuantity,
    discountPercent,
    applyCoupon,
    checkout,
    openProductModal
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal >= 200 || cart.length === 0 ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const freeShippingThreshold = 200;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponMsg('15% DISCOUNT APPLIED!');
    } else {
      setCouponMsg('INVALID COUPON. USE CODE "VANTA15"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#09090b] border-l border-zinc-800 h-full p-6 flex flex-col justify-between text-white overflow-hidden">
        {/* Top Header */}
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-white" />
              <h3 className="font-editorial text-xl font-bold uppercase">SHOPPING BAG</h3>
              <span className="font-mono text-xs text-zinc-400">({cart.length} ITEMS)</span>
            </div>
            <button onClick={() => toggleCart(false)} className="text-zinc-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="py-4 border-b border-zinc-800">
            <div className="flex justify-between text-[11px] font-mono text-zinc-300 mb-1.5">
              <span>
                {remainingForFreeShipping > 0
                  ? `ADD $${remainingForFreeShipping.toFixed(0)} MORE FOR FREE EXPRESS SHIPPING`
                  : 'YOU QUALIFY FOR FREE EXPRESS SHIPPING!'}
              </span>
              <span className="font-bold">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white to-[#00f0ff] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="py-4 space-y-4 max-h-[40vh] overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 font-mono text-xs">
                YOUR BAG IS CURRENTLY EMPTY.
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex space-x-4 bg-zinc-900 border border-zinc-800 p-3 items-center justify-between"
                >
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-16 h-20 object-cover bg-zinc-950 cursor-pointer"
                    onClick={() => {
                      toggleCart(false);
                      openProductModal(item.product.id);
                    }}
                  />

                  <div className="flex-1 min-w-0 font-mono text-xs">
                    <span className="font-editorial font-bold text-white block truncate">
                      {item.product.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">
                      COLOR: {item.selectedColor} | SIZE: {item.selectedSize}
                    </span>
                    <span className="text-white font-bold block mt-1">
                      ${item.product.price}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, -1)
                        }
                        className="px-2 py-0.5 bg-zinc-800 text-white"
                      >
                        -
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, 1)
                        }
                        className="px-2 py-0.5 bg-zinc-800 text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.product.id, item.selectedColor, item.selectedSize)
                    }
                    className="text-zinc-500 hover:text-red-400 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Totals & Checkout */}
        <div className="pt-4 border-t border-zinc-800 space-y-4 font-mono text-xs">
          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={e => setCouponInput(e.target.value)}
              placeholder="COUPON (TRY 'VANTA15')"
              className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 text-white uppercase placeholder-zinc-500 text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-800 text-white font-bold hover:bg-zinc-700 uppercase"
            >
              APPLY
            </button>
          </form>
          {couponMsg && (
            <p className={`text-[10px] ${discountPercent > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {couponMsg}
            </p>
          )}

          {/* Subtotal Calculations */}
          <div className="space-y-1.5 text-zinc-400">
            <div className="flex justify-between">
              <span>SUBTOTAL</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>DISCOUNT ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>ESTIMATED SHIPPING</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-zinc-800">
              <span>TOTAL</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={checkout}
            disabled={cart.length === 0}
            className="w-full py-4 bg-white text-black font-bold uppercase hover:bg-zinc-200 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
