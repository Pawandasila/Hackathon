import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="font-sans text-gray-800 antialiased">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-500 to-green-600 py-24 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-green-300 filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-green-400 filter blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Shop Sustainably, <span className="text-green-100">Earn Rewards!</span>
          </h1>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get points for every eco-friendly purchase—redeem for discounts, gifts, or plant trees!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* <Link href="/signup">
              <a className="bg-white hover:bg-gray-100 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Join Now & Start Earning
              </a>
            </Link> */}
            {/* <Link href="/how-it-works">
              <a className="border-2 border-white hover:border-green-200 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300">
                Learn More
              </a>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Sustainability Value Proposition */}
      <section className="bg-white py-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 relative">
            <span className="relative z-10">Our Sustainability Promise</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {[
              { icon: '♻', title: 'Carbon-Neutral Shipping', desc: 'All shipments offset through verified programs' },
              { icon: '🌱', title: '100% Recycled Packaging', desc: 'Zero virgin materials in our packaging' },
              { icon: '🌍', title: 'Funds Environmental Causes', desc: '5% of profits donated monthly' }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex-1 min-w-[200px] max-w-[280px] bg-gradient-to-b from-green-50 to-white p-6 rounded-2xl border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <div className="relative bg-gray-100" style={{ aspectRatio: '16/9' }}>
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="/video-poster.jpg"
              >
                <source src="/sustainability.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Earn rewards while making a positive impact on the planet
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-green-200 transform -translate-y-1/2 z-0"></div>
            
            {[
              { 
                step: '1', 
                title: 'Shop Sustainably', 
                desc: 'Browse our curated selection of eco-friendly products', 
                icon: '🛍️',
                color: 'bg-green-500'
              },
              { 
                step: '2', 
                title: 'Earn Points', 
                desc: 'Get 10 points per dollar spent (20 points for eco-certified items)', 
                icon: '💰',
                color: 'bg-blue-500'
              },
              { 
                step: '3', 
                title: 'Redeem Rewards', 
                desc: 'Use points for discounts, donations, or exclusive perks', 
                icon: '🎁',
                color: 'bg-purple-500'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative z-10 group"
              >
                <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-6 transform group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                  <div className="text-sm font-semibold text-gray-500 mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-md border border-green-100">
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="font-medium">Example Reward:</div>
                  <div className="text-green-600 font-bold">Spend $50 → Get 500 Points → Redeem for a $5 Discount!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Eco-Friendly Product Showcase
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover products that are good for you and the planet
          </p>
          
          <div className="flex justify-center flex-wrap gap-3 mb-12">
            {['Vegan', 'Zero-Waste', 'Upcycled', 'Organic', 'All'].map((category, index) => (
              <button 
                key={index}
                className={`px-5 py-2 rounded-full border transition-all duration-300 ${index === 0 ? 'bg-green-600 text-white border-green-600' : 'border-gray-300 hover:bg-green-50 hover:border-green-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item}
                className="group border p-4 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                  <Image 
                    src={`/product${item}.jpg`} 
                    alt="Eco Product" 
                    width={300} 
                    height={300} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    ECO
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">Sustainable Product {item}</h3>
                <div className="text-green-700 font-medium mb-2">$29.99</div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.8
                  </span>
                  <span>•</span>
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">+20 pts/$</span>
                </div>
                <button className="mt-4 w-full bg-gray-100 hover:bg-green-600 hover:text-white text-gray-800 py-2 rounded-lg transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            {/* <Link href="/shop">
              <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg">
                View All Products
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Reward Dashboard */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Your Reward Dashboard
          </h2>
          
          <div className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-sm rounded-2xl p-8 mb-10 border border-white border-opacity-20">
            <div className="text-lg mb-2 text-green-800">Current Balance</div>
            <div className="text-5xl font-bold mb-6 text-green-700">1,200 <span className="text-2xl text-green-600">points</span></div>
            
            <div className="w-full bg-green-100 bg-opacity-40 h-3 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-yellow-400 h-full rounded-full" 
                style={{ width: '60%' }}
              ></div>
            </div>
            
            <div className="text-sm text-green-700">
              <span className="font-semibold">600 points</span> to next tier
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
            {[
              { title: 'Refer a friend', points: '+200 pts', icon: '👋' },
              { title: 'Leave a review', points: '+50 pts', icon: '✍️' },
              { title: 'Recycle packaging', points: '+100 pts', icon: '♻️' }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-30 hover:bg-opacity-50 backdrop-filter backdrop-blur-sm border border-white border-opacity-30 rounded-xl p-4 transition-all duration-300 cursor-pointer"
              >
                <div className="text-2xl mb-2 text-green-700">{item.icon}</div>
                <div className="font-medium text-green-800">{item.title}</div>
                <div className="text-yellow-600 text-sm">{item.points}</div>
              </div>
            ))}
          </div>
          
          <div className="text-lg mb-4 text-white">
            Redeem your points for:
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            {['Discounts', 'Charity Donations', 'Plant-a-Tree', 'Exclusive Products', 'Gift Cards'].map((item, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-5 py-2 rounded-full border border-white border-opacity-40 transition-all duration-300 cursor-pointer"
                style={{ color: '#065f46', fontWeight: 600, borderColor: '#d1fae5', backgroundColor: 'rgba(236, 253, 245, 0.7)' }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Monthly Sustainability Challenges
          </h2>
          
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-bl-full"></div>
            <div className="relative z-10">
              <div className="text-green-600 font-bold text-lg mb-2">JUNE CHALLENGE</div>
              <h3 className="text-2xl font-bold mb-4">"Go Plastic-Free"</h3>
              <p className="text-gray-700 mb-6">Complete 5 plastic-free orders to earn 500 Bonus Points!</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-green-600 h-3 rounded-full" 
                  style={{ width: '40%' }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">2/5 completed • Ends in 12 days</div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 inline-block">
            <h3 className="font-bold text-lg mb-4">Leaderboard: Top Eco-Shoppers</h3>
            <div className="flex justify-center gap-8">
              {[
                { name: 'Sarah J.', points: '2,450', place: '🥇' },
                { name: 'Alex M.', points: '2,100', place: '🥈' },
                { name: 'Jamie R.', points: '1,950', place: '🥉' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl">{item.place}</div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.points} pts</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Tracker */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Collective Impact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { value: '10,000', unit: 'kg', label: 'CO₂ emissions saved', icon: '🌲' },
              { value: '500', unit: '', label: 'trees planted', icon: '💧' },
              { value: '25,000', unit: 'L', label: 'water conserved', icon: '🔄' }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {item.value} <span className="text-2xl">{item.unit}</span>
                </div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
          
          <div className="relative h-64 bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-2xl mb-2">🌎</div>
                <h3 className="text-xl font-bold mb-2">Interactive Impact Map</h3>
                <p className="text-gray-600">Coming Soon - Track your personal impact globally</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Resources */}
      <section className="bg-green-600 py-20 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Learn &amp; Grow With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
            {[
              { title: '5 Easy Ways to Shop Sustainably', tag: 'Guide' },
              { title: 'How Our Reward Points Make a Difference', tag: 'Impact' },
              { title: 'The Truth About Carbon Offsetting', tag: 'Education' },
              { title: 'Meet Our Sustainability Partners', tag: 'Story' }
            ].map((item, index) => (
              <div
            key={index}
            className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl p-6 border border-white/30 transition-all duration-300 cursor-pointer"
              >
            <div className="text-xs font-semibold text-green-100 mb-2">{item.tag}</div>
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <div className="mt-3 text-sm text-green-50 flex items-center font-medium">
              Read Article
              <svg className="ml-1 w-4 h-4 text-green-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-white">Get Sustainability Tips &amp; Exclusive Offers</h3>
            <form className="flex bg-white rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-3 focus:outline-none text-gray-900 placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 font-semibold transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-green-100 mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">EcoRewards</h3>
              <p className="text-sm mb-4">Making sustainable shopping rewarding for you and the planet.</p>
              <div className="flex gap-4">
                {['twitter', 'facebook', 'instagram'].map((social) => (
                  <a 
                    key={social}
                    href="#"
                    className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-300"
                  >
                    <span className="sr-only">{social}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Shop', 'Rewards', 'Our Impact', 'About Us'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Sustainability</h3>
              <ul className="space-y-2">
                {['Our Mission', 'Recycling Program', 'Carbon Offset Partners', 'B Corp Certification'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm">hello@ecorewards.com</li>
                <li className="text-sm">1-800-ECO-REWD</li>
                <li className="text-sm">San Francisco, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-sm text-center">
            <p>© 2023 EcoRewards. All rights reserved. We donate 5% of profits to sustainability initiatives.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Page;