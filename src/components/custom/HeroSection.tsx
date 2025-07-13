import { useEffect, useRef } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-sustainable-warehouse.jpg";
import CustomButton from "./CustomButton";
import ButtonCustom from "../ui/Button.custom";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%]"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Enhanced gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="reveal-up mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-white shadow-lg">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>AI-Powered Retail Sustainability Platform</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="reveal-up text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Retail with
            </span>
            <br />
            <span className="text-white">Purpose</span>
          </h1>

          {/* Subtitle */}
          <p className="reveal-up text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
            Transform your retail operations with AI-driven sustainability solutions. 
            Reduce waste, optimize supply chains, and build a responsible future that benefits both planet and profit.
          </p>

          {/* CTA Buttons */}
          <div className="reveal-up flex flex-col sm:flex-row gap-4 mb-12">
            <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Journey
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>

            {/* <ButtonCustom value="Start Your Journey" icon={<ArrowRight />} />
            <ButtonCustom value="Watch Demo" icon={<Play />} /> */}
          </div>

          {/* Stats */}
          <div className="reveal-up grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "45%", label: "Waste Reduction" },
              { number: "30%", label: "Carbon Footprint Cut" },
              { number: "25%", label: "Cost Savings" },
              { number: "500+", label: "Retailers Served" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/2 right-10 w-20 h-20 bg-gradient-eco rounded-full opacity-20 float animate-delay-1000" />
      <div className="absolute bottom-1/4 left-10 w-12 h-12 bg-accent rounded-full opacity-30 float animate-delay-2000" />
      <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-primary-glow rounded-full opacity-40 float animate-delay-500" />
    </div>
  );
};

export default HeroSection;