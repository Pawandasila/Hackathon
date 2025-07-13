"use client";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  Package,
  Truck,
  Home,
  Download,
  Mail,
  Calendar,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BillingManager, Order } from "@/lib/billing";
import Link from "next/link";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      const foundOrder = BillingManager.getOrder(orderId);
      setOrder(foundOrder || null);
    }
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
          <Link href="/marketing">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const deliverySteps = [
    {
      icon: CheckCircle,
      title: "Order Confirmed",
      description: "Your order has been placed successfully",
      status: "completed",
    },
    {
      icon: Package,
      title: "Processing",
      description: "We're preparing your eco-friendly products",
      status: "current",
    },
    {
      icon: Truck,
      title: "Shipped",
      description: "Your order is on its way",
      status: "upcoming",
    },
    {
      icon: Home,
      title: "Delivered",
      description: "Enjoy your sustainable products!",
      status: "upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-xl text-gray-600">
            Thank you for your eco-friendly purchase
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Order ID: <span className="font-mono font-medium">{order.id}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-sm">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-200" />

                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{order.total - Math.round(order.total * 0.18)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (18%)</span>
                    <span>₹{Math.round(order.total * 0.18)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>

                {/* Order Info */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    Order Information
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-green-600">
                      <span className="font-medium">Order Date:</span>{" "}
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-green-600">
                      <span className="font-medium">Payment Method:</span> Razorpay
                    </p>
                    <p className="text-green-600">
                      <span className="font-medium">Estimated Delivery:</span>{" "}
                      {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Delivery Tracking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Delivery Progress */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Delivery Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliverySteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.status === "completed"
                              ? "bg-green-500 text-white"
                              : step.status === "current"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-medium ${
                              step.status === "completed" || step.status === "current"
                                ? "text-gray-800"
                                : "text-gray-500"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p className="font-medium">
                    {order.billingData.firstName} {order.billingData.lastName}
                  </p>
                  <p>{order.billingData.address}</p>
                  <p>
                    {order.billingData.city}, {order.billingData.state} {order.billingData.zipCode}
                  </p>
                  <p>{order.billingData.country}</p>
                  <p className="text-gray-600 mt-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    {order.billingData.email}
                  </p>
                  <p className="text-gray-600">
                    📱 {order.billingData.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              
              <Link href="/marketing">
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 py-3 rounded-2xl">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Eco Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  🌱 Thank You for Choosing Sustainability!
                </h3>
                <p className="text-green-700 mb-4">
                  Your purchase has saved approximately{" "}
                  <span className="font-bold">
                    {order.items.reduce((sum: number, item: any) => sum + (item.ecoPoints * item.quantity), 0)} eco points
                  </span>{" "}
                  worth of environmental impact!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">🌳</div>
                    <p className="text-green-700">Trees Saved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">💧</div>
                    <p className="text-green-700">Water Conserved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">♻️</div>
                    <p className="text-green-700">Waste Reduced</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
