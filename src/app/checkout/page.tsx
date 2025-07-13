"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  CreditCard, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Lock, 
  ShieldCheck,
  ArrowLeft,
  Calendar,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartManager, CartItem } from "@/lib/cart";
import { BillingManager, BillingData } from "@/lib/billing";
import PageHeader from "@/components/custom/PageHeader";
import Link from "next/link";

interface FormErrors {
  [key: string]: string;
}

// Helper functions for card formatting
const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
};

const formatExpiryDate = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 2) {
    return v.substring(0, 2) + '/' + v.substring(2, 4);
  }
  return v;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [billingData, setBillingData] = useState<BillingData>({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Billing Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    
    // Preferences
    saveInfo: false,
    newsletter: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    // Load cart items
    setCartItems(CartManager.getCartItems());
    
    // Load saved billing data
    const savedData = BillingManager.getBillingData();
    if (savedData) {
      setBillingData(savedData);
    }
  }, []);

  // Save to localStorage whenever billingData changes
  useEffect(() => {
    if (billingData.saveInfo) {
      BillingManager.saveBillingData(billingData);
    }
  }, [billingData]);

  const handleInputChange = (field: keyof BillingData, value: string | boolean) => {
    setBillingData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Personal Information
    if (!billingData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!billingData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!billingData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(billingData.email)) newErrors.email = 'Email is invalid';
    if (!billingData.phone.trim()) newErrors.phone = 'Phone number is required';

    // Billing Address
    if (!billingData.address.trim()) newErrors.address = 'Address is required';
    if (!billingData.city.trim()) newErrors.city = 'City is required';
    if (!billingData.state.trim()) newErrors.state = 'State is required';
    if (!billingData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Payment Information
    if (!billingData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (billingData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Card number must be 16 digits';
    
    if (!billingData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    else if (!/^\d{2}\/\d{2}$/.test(billingData.expiryDate)) newErrors.expiryDate = 'Invalid expiry date format';
    
    if (!billingData.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (billingData.cvv.length < 3) newErrors.cvv = 'CVV must be 3-4 digits';
    
    if (!billingData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: 'Please fill in all required fields correctly.',
          type: 'error'
        }
      }));
      return;
    }
    
    // Validate card details
    const cardValidation = BillingManager.validateCardDetails(billingData);
    if (!cardValidation.isValid) {
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: cardValidation.errors.join(', '),
          type: 'error'
        }
      }));
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Save billing data to localStorage
      if (billingData.saveInfo) {
        BillingManager.saveBillingData(billingData);
      }
      
      // Process payment with dummy payment system
      const result = await BillingManager.processPayment(cartItems, billingData, finalTotal);
      
      if (result.success) {
        // Clear cart after successful payment
        CartManager.clearCart();
        
        // Redirect to success page
        router.push(`/order-success?orderId=${result.orderId}`);
      } else {
        console.error("Payment processing failed:", result.error);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: 'Failed to place order. Please try again.',
          type: 'error'
        }
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const total = CartManager.getCartTotal();
  const shipping = total > 1000 ? 0 : 50;
  const tax = Math.round(total * 0.18); // 18% GST
  const finalTotal = total + shipping + tax;

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your eco-friendly purchase. Your order has been placed successfully and you'll receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <Link href="/marketing">
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <PageHeader
          title="Checkout"
          subtitle="Your cart is empty"
        />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 mb-8">Add some items to your cart before checkout.</p>
          <Link href="/marketing">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <PageHeader
        title="Secure Checkout"
        subtitle="Complete your eco-friendly purchase"
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <User className="w-5 h-5 text-green-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={billingData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'border-red-500' : ''}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={billingData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-red-500' : ''}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={billingData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={billingData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                          placeholder="+91 9876543210"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="address"
                        value={billingData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={`pl-10 ${errors.address ? 'border-red-500' : ''}`}
                        placeholder="123 Main Street, Apt 4B"
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={billingData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={errors.city ? 'border-red-500' : ''}
                        placeholder="Mumbai"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={billingData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={errors.state ? 'border-red-500' : ''}
                        placeholder="Maharashtra"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={billingData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={errors.zipCode ? 'border-red-500' : ''}
                        placeholder="400001"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name *</Label>
                    <Input
                      id="cardholderName"
                      value={billingData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      className={errors.cardholderName ? 'border-red-500' : ''}
                      placeholder="John Doe"
                    />
                    {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="cardNumber"
                        value={billingData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        className={`pl-10 ${errors.cardNumber ? 'border-red-500' : ''}`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="expiryDate"
                          value={billingData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                          className={`pl-10 ${errors.expiryDate ? 'border-red-500' : ''}`}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="cvv"
                          value={billingData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                          className={`pl-10 ${errors.cvv ? 'border-red-500' : ''}`}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={billingData.saveInfo}
                        onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">Save this information for faster checkout next time</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={billingData.newsletter}
                        onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">Subscribe to our eco-friendly newsletter</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-sm">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <hr className="border-gray-200" />
                
                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST 18%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold shadow-lg"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Order
                      </>
                    )}
                  </Button>
                  
                  <Link href="/cart">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Cart
                    </Button>
                  </Link>
                </div>
                
                {/* Security Notice */}
                <div className="p-3 bg-green-50 rounded-lg mt-4">
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
