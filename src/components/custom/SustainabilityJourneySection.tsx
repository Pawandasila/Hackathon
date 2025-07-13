"use client";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "motion/react";
import { JSX, useRef } from "react";
import Image from "next/image";
import Carbon from "@/assets/carbon.png"
import ButtonCustom from "../ui/Button.custom";
import { StaticImageData } from "next/image";

const projects = [
  {
    title: "Track Your Carbon Footprint",
    description:
      "Take control of your climate impact by tracking your daily energy use, lifestyle habits, and travel activities. Our AI-powered analytics offer real-time visibility into your carbon footprint, empowering you to identify, understand, and address your biggest emission areas effortlessly.",
    src: "sustainability-track.jpg",
    link: Carbon,
    color: "#3B82F6", // blue-500
    features: [
      "Real-time carbon analytics",
      "Device and activity integration",
      "Actionable daily reports",
    ],
  },
  {
    title: "Get Smart Recommendations",
    description:
      "Receive clear, personalized recommendations to reduce your emissions without disrupting your lifestyle. Our intelligent system suggests practical swaps—from energy-efficient appliances to eco-friendly commute choices—helping you live sustainably while saving time and money.",
    src: "smart-insights.jpg",
    link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    color: "#6366F1", // indigo-500
    features: [
      "Personalized AI insights",
      "Practical lifestyle swaps",
      "Save energy and costs",
    ],
  },
  {
    title: "Take Sustainable Actions",
    description:
      "Turn your insights into meaningful change with guided sustainability action plans. Whether it’s reducing water waste, optimizing your home energy, or mindful shopping, our system helps you build consistent eco-friendly habits with measurable progress you can see.",
    src: "sustainable-actions.jpg",
    link: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
    color: "#10B981", // emerald-500
    features: [
      "Guided eco action plans",
      "Track habit progress",
      "Reduce your footprint daily",
    ],
  },
  {
    title: "Earn EcoCoins & Rewards",
    description:
      "Make sustainability rewarding! Earn EcoCoins for every green action you take, whether it’s reducing energy use, biking to work, or using eco-friendly products. Redeem your coins for exclusive eco-friendly products, carbon offsets, or support global climate initiatives.",
    src: "/ecocoin.jpg",
    link: "https://www.rimi.org/images/legacy.png",
    color: "#F97316", // orange-500
    features: [
      "Earn EcoCoins for actions",
      "Exclusive eco marketplace",
      "Support climate initiatives",
    ],
  },
  {
    title: "Create Global Impact",
    description:
      "Join a vibrant community of climate champions working towards a greener world. Collaborate, track collective progress, and contribute to impactful environmental projects, from local cleanups to reforestation. Together, we can amplify your individual actions into global change.",
    src: "global-impact.jpg",
    link: "https://images.pexels.com/photos/6289026/pexels-photo-6289026.jpeg",
    color: "#0D9488", // teal-600
    features: [
      "Community climate challenges",
      "Collective impact tracking",
      "Global environmental projects",
    ],
  },
];

export default function index(): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <ReactLenis root>
      <main className="bg-gradient-to-b from-[#f6eee8]" ref={container}>
        <section className="text-white   w-full bg-[#f6eee8]  ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center p-4 sm:p-6 lg:p-8 mb-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 relative">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Your Journey to <br />
              </span>
              <span className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></span>
              <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
                Sustainability
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2 sm:px-0">
              EcoTrack360 empowers individuals and businesses to make meaningful
              environmental impact through intelligent tracking and actionable
              insights.
            </p>
          </motion.div>

          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                features={project?.features}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}
interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string | StaticImageData;
  color: string;
  features: string[];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}
export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  features,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 px-2 sm:px-4"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] sm:h-[500px] lg:h-[550px] w-[95%] sm:w-[90%] lg:w-[80%] rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-10 origin-top shadow-lg sm:shadow-xl lg:shadow-2xl`}
      >
        {/* Step indicator and title - only show on larger screens */}
        <div className="hidden sm:flex items-center justify-between mb-3 lg:mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-xl border border-white/30">
            {i + 1}
          </div>
          
          <h2 className="text-lg sm:text-xl lg:text-3xl text-center font-bold leading-tight text-white flex-1 mx-4">
            {title}
          </h2>
          
          <div className="text-white/80 text-xs sm:text-sm font-medium bg-white/10 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full backdrop-blur-sm border border-white/20">
            Step {i + 1} of {projects.length}
          </div>
        </div>

        {/* Mobile title */}
        <h2 className="sm:hidden text-xl text-center font-bold leading-tight mb-3 text-white px-2">
          {title}
        </h2>

        <div className={`flex flex-col lg:flex-row flex-1 gap-3 sm:gap-4 lg:gap-8`}>
          {/* Content Section */}
          <div className={`w-full lg:w-[45%] flex flex-col justify-start space-y-2 sm:space-y-3 lg:space-y-4`}>
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <p className="text-white/90 text-xs sm:text-sm lg:text-lg leading-relaxed">
                {description}
              </p>

              {/* Features - hide on mobile, show condensed on tablet */}
              <div className="hidden sm:block space-y-1 lg:space-y-2">
                <h3 className="text-white font-semibold text-xs lg:text-sm">
                  Key Features:
                </h3>
                <div className="space-y-1 lg:space-y-2">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-white/80"
                    >
                      <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-xs lg:text-[15px]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-3 sm:pt-4 lg:pt-6">

              <ButtonCustom value="Start This Step" />
            </div>
          </div>

          {/* Image Section */}
          <div className={`relative w-full lg:w-[55%] h-[280px] sm:h-[320px] lg:flex-1 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden border border-white/20 lg:border-2`}>
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <Image 
                fill 
                src={url} 
                alt={title} 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
