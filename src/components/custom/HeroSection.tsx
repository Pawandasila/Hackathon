"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ButtonCustom from "../ui/Button.custom";

interface CarouselImage {
  src: string;
  alt: string;
}

const carouselImages: CarouselImage[] = [
  {
    src: "/earth.jpg",
    alt: "Earth sustainability visualization",
  },
  {
    src: "/earthImage.jpg",
    alt: "Environmental conservation imagery",
  },
  {
    src: "/earthhold.png",
    alt: "Sustainability illustration and icons",
  },
  {
    src: "/earthsust.png",
    alt: "Global environmental awareness",
  },
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(imageInterval);
  }, []);

  return (
    <section className="grid place-content-center sticky top-0 text-gray-800 min-h-screen w-full bg-[#f6eee8] overflow-hidden px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#8b5a2b20_1px,transparent_1px),linear-gradient(to_bottom,#8b5a2b20_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 w-full max-w-7xl min-h-[550px]">
        {/* Content Section */}
        <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-12 xl:p-16 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-1"
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl mb-4 lg:mb-6">
              🌱
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 lg:mb-4 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                EcoTrack360
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-3 lg:mb-4">
              Your AI Co-Pilot for a Greener Future
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-4 lg:mb-4">
              Effortlessly track, analyze, and improve your carbon footprint
              with actionable, real-time insights. Empower your lifestyle or
              business with data-driven sustainability, tailored
              recommendations, and measurable impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <ButtonCustom value="Join us Now" />
              <ButtonCustom value="Get Started" />
            </div>
          </motion.div>
        </div>

        {/* Image Carousel Section */}
        <div className="relative flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 order-1 lg:order-2">
          <div className="absolute inset-0 bg-gradient-radial from-emerald-100/30 via-transparent to-transparent"></div>

          <div className="relative w-full h-64 sm:h-80 lg:h-full max-w-xs sm:max-w-sm lg:max-w-md max-h-64 sm:max-h-80 lg:max-h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  {/* Enhanced Spotlight Ring with Multiple Layers */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-3 sm:-inset-4 lg:-inset-6 rounded-full opacity-30 blur-sm"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #10b981, #059669, #047857, #064e3b, #10b981)",
                    }}
                  />
                  {/* Secondary Glow Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-2 sm:-inset-3 lg:-inset-4 rounded-full opacity-20 blur-md"
                    style={{
                      background:
                        "conic-gradient(from 180deg, #6ee7b7, #34d399, #10b981, #059669, #6ee7b7)",
                    }}
                  />
                  {/* Image */}
                  {carouselImages[currentImage].src.endsWith(".svg") ? (
                    <img
                      src={carouselImages[currentImage].src}
                      alt={carouselImages[currentImage].alt}
                      className="w-full h-full object-cover rounded-xl lg:rounded-2xl shadow-xl border-2 sm:border-3 lg:border-4 border-white/50"
                    />
                  ) : (
                    <Image
                      src={carouselImages[currentImage].src}
                      alt={carouselImages[currentImage].alt}
                      fill
                      className="object-cover rounded-xl lg:rounded-2xl shadow-xl border-2 sm:border-3 lg:border-4 border-white/50"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={currentImage === 0}
                    />
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent rounded-xl lg:rounded-2xl"></div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl shadow-lg"
            >
              🌍
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 lg:-bottom-4 lg:-left-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center text-sm sm:text-lg lg:text-xl shadow-lg"
            >
              ♻️
            </motion.div>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
            {carouselImages.map((_, index) => (
              <motion.button
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentImage
                    ? "bg-emerald-500 w-4 sm:w-6"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                onClick={() => setCurrentImage(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
