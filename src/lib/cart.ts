import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
  addedAt: Date;
}

export class CartManager {
  private static readonly CART_KEY = "cartItems";

  // Get all cart items
  static getCartItems(): CartItem[] {
    if (typeof window === "undefined") return [];
    
    try {
      const items = localStorage.getItem(this.CART_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Error reading cart items:", error);
      return [];
    }
  }

  // Save cart items to localStorage
  private static saveCartItems(items: CartItem[]): void {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(items));
      // Dispatch custom event to notify cart updates
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: items }));
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  }

  // Add item to cart
  static addToCart(product: Product, quantity: number = 1): boolean {
    try {
      const cartItems = this.getCartItems();
      const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const newItem: CartItem = {
          ...product,
          quantity,
          addedAt: new Date(),
        };
        cartItems.push(newItem);
      }

      this.saveCartItems(cartItems);
      return true;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return false;
    }
  }

  // Remove item from cart
  static removeFromCart(productId: string): boolean {
    try {
      const cartItems = this.getCartItems();
      const filteredItems = cartItems.filter(item => item.id !== productId);
      this.saveCartItems(filteredItems);
      return true;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return false;
    }
  }

  // Update item quantity
  static updateQuantity(productId: string, quantity: number): boolean {
    try {
      const cartItems = this.getCartItems();
      const itemIndex = cartItems.findIndex(item => item.id === productId);

      if (itemIndex > -1) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          return this.removeFromCart(productId);
        } else {
          cartItems[itemIndex].quantity = quantity;
          this.saveCartItems(cartItems);
        }
      }
      return true;
    } catch (error) {
      console.error("Error updating item quantity:", error);
      return false;
    }
  }

  // Clear entire cart
  static clearCart(): boolean {
    try {
      this.saveCartItems([]);
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return false;
    }
  }

  // Get cart item count
  static getCartItemCount(): number {
    return this.getCartItems().reduce((total, item) => total + item.quantity, 0);
  }

  // Get cart total price
  static getCartTotal(): number {
    return this.getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Check if product is in cart
  static isInCart(productId: string): boolean {
    return this.getCartItems().some(item => item.id === productId);
  }

  // Get specific cart item
  static getCartItem(productId: string): CartItem | undefined {
    return this.getCartItems().find(item => item.id === productId);
  }
}

// Global function to add to cart (can be called from anywhere)
export const addToCart = (product: Product, quantity: number = 1): boolean => {
  const success = CartManager.addToCart(product, quantity);
  
  if (success) {
    // Show success notification (you can replace this with your notification system)
    console.log(`Added ${product.name} to cart!`);
    
    // Optional: Show a toast notification
    if (typeof window !== "undefined") {
      // You can implement a toast notification here
      const event = new CustomEvent('showToast', {
        detail: {
          message: `${product.name} added to cart!`,
          type: 'success'
        }
      });
      window.dispatchEvent(event);
    }
  }
  
  return success;
};

export default CartManager;
