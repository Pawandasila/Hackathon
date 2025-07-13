import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  Truck, 
  Recycle, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Award,
  Sparkles
} from "lucide-react";

const metrics = [
  {
    icon: Leaf,
    title: "Carbon Footprint Reduction",
    value: 87,
    unit: "%",
    trend: "down",
    trendValue: 12,
    description: "Monthly carbon emissions reduced through AI optimization",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    darkBgColor: "dark:bg-green-900/20"
  },
  {
    icon: Truck,
    title: "Supply Chain Efficiency",
    value: 92,
    unit: "%",
    trend: "up",
    trendValue: 12,
    description: "Optimized delivery routes and inventory management",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    darkBgColor: "dark:bg-blue-900/20"
  },
  {
    icon: Recycle,
    title: "Waste Reduction",
    value: 76,
    unit: "%",
    trend: "down",
    trendValue: 12,
    description: "Food waste and packaging materials diverted from landfills",
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-50",
    darkBgColor: "dark:bg-purple-900/20"
  },
  {
    icon: Zap,
    title: "Energy Efficiency",
    value: 94,
    unit: "%",
    trend: "up",
    trendValue: 12,
    description: "Smart energy management across retail locations",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    darkBgColor: "dark:bg-yellow-900/20"
  }
];

export const SustainabilityMetrics = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Animate the numbers
          metrics.forEach((metric, index) => {
            let start = 0;
            const duration = 2000;
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = Math.round(metric.value * easeOutQuart);
              
              setAnimatedValues(prev => {
                const newValues = [...prev];
                newValues[index] = currentValue;
                return newValues;
              });
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            setTimeout(() => animate(), index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-slate-50 via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/10  min-h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
    <div ref={sectionRef} className="relative py-12 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/10 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl border border-emerald-200/50 rounded-full text-sm font-medium text-emerald-700 shadow-lg mb-6">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span>Real-time Impact Metrics</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Measurable
            </span>{" "}
            <span className="text-slate-900 dark:text-white">Impact</span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Track your sustainability progress with real-time analytics and AI-powered insights that drive meaningful environmental change
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
            
            return (
              <Card 
                key={index}
                className={`group relative p-8 border-0 shadow-xl backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 hover:shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                  inView ? "animate-in slide-in-from-bottom-10 fade-in duration-700" : "opacity-0"
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
                }}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${metric.color} shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      metric.trend === "up" 
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" 
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                      <TrendIcon className="h-3.5 w-3.5" />
                      <span>{metric.trend === "up" ? "+" : "-"}{metric.trendValue}%</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white group-hover:text-slate-700 transition-colors">
                    {metric.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                      {animatedValues[index]}
                    </span>
                    <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">{metric.unit}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Progress</span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{animatedValues[index]}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                        style={{ width: `${animatedValues[index]}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Achievement Badges */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Our Certifications & Achievements</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Carbon Neutral Certified", icon: "🌱" },
              { name: "Zero Waste Achievement", icon: "♻️" }, 
              { name: "Sustainable Supply Chain", icon: "🚛" },
              { name: "Energy Star Rating", icon: "⭐" }
            ].map((achievement, index) => (
              <div
                key={index}
                className={`group flex items-center gap-3 px-6 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 ${
                  inView ? "animate-in slide-in-from-bottom-5 fade-in duration-500" : "opacity-0"
                }`}
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{achievement.icon}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{achievement.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};
            
           