"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartManager, CartItem } from "@/lib/cart";
import PageHeader from "@/components/custom/PageHeader";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = () => {
      const items = CartManager.getCartItems();
      setCartItems(items);
      setLoading(false);
    };

    loadCartItems();

    // Listen for cart updates
    const handleCartUpdate = () => loadCartItems();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const updateQuantity = (productId: string, quantity: number) => {
    CartManager.updateQuantity(productId, quantity);
    setCartItems(CartManager.getCartItems());
  };

  const removeItem = (productId: string) => {
    CartManager.removeFromCart(productId);
    setCartItems(CartManager.getCartItems());
  };

  const clearCart = () => {
    CartManager.clearCart();
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <PageHeader
        title="Shopping Cart"
        subtitle={`${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart`}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any eco-friendly products to your cart yet. 
              Start shopping to make a positive impact!
            </p>
            <Link href="/marketing">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Cart Items</h2>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>

              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-2xl"
                        />
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {item.shortDesc}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-xl font-bold text-green-600">
                              ₹{item.price}
                            </span>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-1 font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800 mb-2">
                            ₹{item.price * item.quantity}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="sticky top-24 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Items ({totalItems})</span>
                        <span>₹{total}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between text-lg font-bold text-gray-800">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link href="/checkout">
                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold shadow-lg">
                          Proceed to Checkout
                        </Button>
                      </Link>
                      
                      <Link href="/marketing">
                        <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 py-3 rounded-2xl">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-2xl">
                      <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Eco Impact
                      </div>
                      <p className="text-sm text-green-600">
                        Your purchase will save approximately{" "}
                        <span className="font-bold">
                          {cartItems.reduce((sum, item) => sum + (item.ecoPoints * item.quantity), 0)} eco points
                        </span>{" "}
                        worth of environmental impact!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
