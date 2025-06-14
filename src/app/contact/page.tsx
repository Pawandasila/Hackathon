'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare,
  CheckCircle,
  Sparkles,
  Globe,
  Leaf
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate form submission
    setTimeout(() => setIsSubmitted(false), 3000);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "contact@ecotrack360.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Green Street, Eco City, EC 12345",
      description: "Our sustainable headquarters"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6eee8] via-[#e8dbc6] to-[#f6eee8] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-10 text-emerald-600/30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Leaf size={40} />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-green-600/30"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Globe size={50} />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 text-teal-600/30"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Sparkles size={35} />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-2xl"
              whileHover={{
                scale: 1.1,
                rotate: 360,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
              }}
              transition={{ duration: 0.6 }}
            >
              <Mail className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Ready to start your sustainability journey? We'd love to hear from you. 
              Let's work together to create a greener future.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.h2 
                className="text-3xl font-bold text-gray-800 mb-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Connect With Us
              </motion.h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{
                        scale: 1.02,
                        y: -5,
                        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.1)",
                      }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {info.title}
                        </h3>
                        <p className="text-emerald-600 font-medium mb-1">
                          {info.content}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <motion.div 
                className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Send us a message
                      </h3>

                      {/* Name Field */}
                      <div className="relative">
                        <motion.div
                          className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all duration-300 ${
                            focusedField === 'name'
                              ? 'border-emerald-500 bg-emerald-50/50'
                              : 'border-gray-200 bg-white/50'
                          }`}
                          whileFocus={{ scale: 1.02 }}
                        >
                          <User className={`w-5 h-5 transition-colors duration-300 ${
                            focusedField === 'name' ? 'text-emerald-500' : 'text-gray-400'
                          }`} />
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            required
                          />
                        </motion.div>
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <motion.div
                          className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all duration-300 ${
                            focusedField === 'email'
                              ? 'border-emerald-500 bg-emerald-50/50'
                              : 'border-gray-200 bg-white/50'
                          }`}
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Mail className={`w-5 h-5 transition-colors duration-300 ${
                            focusedField === 'email' ? 'text-emerald-500' : 'text-gray-400'
                          }`} />
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            required
                          />
                        </motion.div>
                      </div>

                      {/* Subject Field */}
                      <div className="relative">
                        <motion.div
                          className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all duration-300 ${
                            focusedField === 'subject'
                              ? 'border-emerald-500 bg-emerald-50/50'
                              : 'border-gray-200 bg-white/50'
                          }`}
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Sparkles className={`w-5 h-5 transition-colors duration-300 ${
                            focusedField === 'subject' ? 'text-emerald-500' : 'text-gray-400'
                          }`} />
                          <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            required
                          />
                        </motion.div>
                      </div>

                      {/* Message Field */}
                      <div className="relative">
                        <motion.div
                          className={`flex items-start space-x-3 p-4 border-2 rounded-xl transition-all duration-300 ${
                            focusedField === 'message'
                              ? 'border-emerald-500 bg-emerald-50/50'
                              : 'border-gray-200 bg-white/50'
                          }`}
                          whileFocus={{ scale: 1.02 }}
                        >
                          <MessageSquare className={`w-5 h-5 mt-1 transition-colors duration-300 ${
                            focusedField === 'message' ? 'text-emerald-500' : 'text-gray-400'
                          }`} />
                          <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            rows={4}
                            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 resize-none"
                            required
                          />
                        </motion.div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Send Message</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;