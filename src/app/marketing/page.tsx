"use client"
import { useEffect,useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Leaf, Recycle, Globe, Award, Users, Star, Play, CheckCircle, ArrowRight, Heart, Shield } from "lucide-react"
import Link from "next/link"

export default function SustainableProductPage() {const [windowSize, setWindowSize] = useState({ width: typeof window !== "undefined" ? window.innerWidth : 1200, 
  height: typeof window !== "undefined" ? window.innerHeight : 800 });

useEffect(() => {
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 relative overflow-hidden">
      {/* Animated Background Elements
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-400/40"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
            initial={{
              x: Math.random() * windowSize.width,
y: Math.random() * windowSize.height,
              
            }}
            animate={{
              x: Math.random() * windowSize.width,
  y: Math.random() * windowSize.height,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-4 h-4 bg-green-400/60 rounded-full"
            initial={{
              x: Math.random() * (window?.innerWidth || 1200),
              y: Math.random() * (window?.innerHeight || 800),
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div> */}

      <main className="flex-1">
        {/* Hero Section with Video */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 hover:bg-green-200 transition-colors">
                    🌱 Carbon Neutral Certified
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-900">
                    Sustainable Living Made Simple
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Transform your daily routine with our eco-friendly products. Reduce your carbon footprint while
                    enjoying premium quality that doesn't compromise on performance.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Free shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Lifetime warranty</span>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div className="relative">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm"
                    >
                      <Play className="mr-2 h-6 w-6" />
                      Watch Our Story
                    </Button>
                  </div>
                  {/* Placeholder for actual video */}
                  <div className="absolute bottom-4 left-4 right-4">
                  </div>
                </div>
                {/* Floating stats */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border">
                  <div className="text-2xl font-bold text-green-600">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 border">
                  <div className="text-2xl font-bold text-green-600">1M+</div>
                  <div className="text-sm text-gray-600">Trees Saved</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-900">
                  Why Choose Sustainable?
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Every product is designed with the planet in mind, without compromising on quality or performance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-green-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Recycle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900">100% Recyclable</h3>
                  </div>
                  <p className="text-gray-600">
                    All our products are made from recyclable materials and can be fully recycled at the end of their
                    lifecycle.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Globe className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900">Carbon Neutral</h3>
                  </div>
                  <p className="text-gray-600">
                    We offset 100% of our carbon emissions through verified environmental projects and renewable energy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900">Ethically Made</h3>
                  </div>
                  <p className="text-gray-600">
                    Fair trade certified with ethical labor practices and sustainable supply chain management.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white/80 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 hover:bg-green-200 transition-colors">
                  Featured Products
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-900">
                  Sustainable Essentials
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our carefully curated collection of eco-friendly products designed for modern sustainable
                  living.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              {/* Product 1 */}
              <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 relative overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <Leaf className="h-16 w-16 text-white" />
                      </div>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
                      Best Seller
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2">
                      <Heart className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-green-900">EcoClean Starter Kit</h3>
                      <p className="text-gray-600 text-sm">
                        Complete zero-waste cleaning solution with bamboo brushes, organic soaps, and reusable
                        containers.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">(127 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-green-600">₹49.99</div>
                          <div className="text-sm text-gray-500 line-through">₹69.99</div>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product 2 */}
              <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 relative overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                        <Globe className="h-16 w-16 text-white" />
                      </div>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                      New
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2">
                      <Heart className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-green-900">Ocean Bottle Collection</h3>
                      <p className="text-gray-600 text-sm">
                        Premium water bottles made from 100% recycled ocean plastic. Keeps drinks cold for 24 hours.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">(89 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-green-600">₹34.99</div>
                          <div className="text-sm text-green-600">Free shipping</div>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product 3 */}
              <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <Recycle className="h-16 w-16 text-white" />
                      </div>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-amber-600 px-3 py-1 text-sm font-medium text-white">
                      Limited Edition
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2">
                      <Heart className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-green-900">Solar Power Bank</h3>
                      <p className="text-gray-600 text-sm">
                        Portable solar charger with 20,000mAh capacity. Perfect for outdoor adventures and emergency
                        backup.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-3 w-3 text-gray-300" />
                        </div>
                        <span className="text-sm text-gray-600">(64 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-green-600">₹89.99</div>
                          <div className="text-sm text-green-600">2-year warranty</div>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* View All Products Button */}
            <div className="flex justify-center pt-8">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-white/80 backdrop-blur-sm"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="w-full py-12 md:py-24 lg:py-32 bg-green-50/80 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
                    Environmental Impact
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-900">
                    Making a Real Difference
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed">
                    Every purchase contributes to a healthier planet. See the measurable impact we're making together.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center lg:text-left">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">2.5M</div>
                    <div className="text-sm text-gray-600">Plastic bottles recycled</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">15K</div>
                    <div className="text-sm text-gray-600">Tons CO₂ offset</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">500+</div>
                    <div className="text-sm text-gray-600">Communities supported</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-gray-600">Customer satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full bg-gradient-to-br from-green-400 to-green-600 p-8 shadow-2xl">
                  <div className="h-full w-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center text-white">
                      <Heart className="h-16 w-16 mx-auto mb-4" />
                      <div className="text-2xl font-bold">Planet First</div>
                      <div className="text-sm opacity-90">Always</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-900">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Join thousands of satisfied customers making a positive impact.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Amazing quality and I love knowing that my purchase is helping the environment. The packaging is
                    beautiful too!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-900">Sarah Chen</div>
                      <div className="text-sm text-gray-600">Verified Customer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Finally found a company that aligns with my values. Great products and even better mission!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-900">Mike Rodriguez</div>
                      <div className="text-sm text-gray-600">Verified Customer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "The quality exceeded my expectations and I feel good about supporting sustainable practices."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-900">Emma Thompson</div>
                      <div className="text-sm text-gray-600">Verified Customer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-600 to-green-700 relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                  Ready to Make a Difference?
                </h2>
                <p className="max-w-[600px] text-green-100 md:text-xl/relaxed">
                  Join our community of conscious consumers and start your sustainable journey today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1 bg-white/10 border-white/20 text-white placeholder:text-green-100"
                  />
                  <Button type="submit" className="bg-white text-green-600 hover:bg-green-50">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-green-100">Get 15% off your first order. No spam, unsubscribe anytime.</p>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-green-100">
                  <Award className="h-4 w-4" />
                  <span className="text-sm">B-Corp Certified</span>
                </div>
                <div className="flex items-center gap-2 text-green-100">
                  <Leaf className="h-4 w-4" />
                  <span className="text-sm">Climate Neutral</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="w-full mx-auto">
        <footer className="max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t bg-green-50 text-center sm:text-left">
          <p className="text-2xl text-gray-600">© 2024 EcoFlow. All rights reserved. Made with 💚 for the planet.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
              Sustainability Report
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  )
}