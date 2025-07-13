"use client";
import { useState, useEffect } from 'react';
import { CartManager, CartItem } from '@/lib/cart';
import { Product } from '@/types/product';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);

  const updateCartState = () => {
    const items = CartManager.getCartItems();
    setCartItems(items);
    setItemCount(CartManager.getCartItemCount());
    setTotal(CartManager.getCartTotal());
  };

  useEffect(() => {
    updateCartState();

    const handleCartUpdate = () => updateCartState();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    const success = CartManager.addToCart(product, quantity);
    if (success) {
      updateCartState();
      // Trigger toast notification
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('showToast', {
          detail: {
            message: `${product.name} added to cart!`,
            type: 'success'
          }
        }));
      }
    }
    return success;
  };

  const removeFromCart = (productId: string) => {
    const success = CartManager.removeFromCart(productId);
    if (success) {
      updateCartState();
    }
    return success;
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const success = CartManager.updateQuantity(productId, quantity);
    if (success) {
      updateCartState();
    }
    return success;
  };

  const clearCart = () => {
    const success = CartManager.clearCart();
    if (success) {
      updateCartState();
    }
    return success;
  };

  const isInCart = (productId: string) => {
    return CartManager.isInCart(productId);
  };

  const getCartItem = (productId: string) => {
    return CartManager.getCartItem(productId);
  };

  return {
    cartItems,
    itemCount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItem,
  };
}

export default useCart;
