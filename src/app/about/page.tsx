'use client';

import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import ButtonCustom from "@/components/ui/Button.custom";

export const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1624377149599-65e4b8cd6fa0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Retail with Purpose"
        heading=" Aligning sustainability with profit in retail"
      >
        <ExampleContent 
          title="About Us"
          description="We are committed to transforming the retail industry by integrating sustainability into every aspect of our operations. Our platform connects eco-conscious consumers with brands that prioritize environmental responsibility."
          buttonText="know more"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Smart Solutions, Greener Operations"
        heading=" Harnessing AI to reduce waste and optimize every step of the retail supply chain."
      >
        <ExampleContent 
          title="What We Do"
          description="We harness the power of advanced artificial intelligence to enhance efficiency and reduce environmental impact across every aspect of retail operations, our tools are designed to make sustainability both scalable and achievable.
"
          buttonText="Explore"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://plus.unsplash.com/premium_photo-1661371394983-42485fed3a58?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Driving Impact Through Innovation"
        heading="Helping businesses grow responsibly while creating a better future for the planet."
      >
        <ExampleContent 
          title="Driving Impact Through Innovation"
          description="Sustainability is no longer optional it's a smart business move. By integrating AI into daily retail decisions, we help brands boost profits, earn customer trust, and meet modern environmental standards. Together, we're shaping a better future one responsible choice at a time.
"
          buttonText="See the Impact"
        />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 120;

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

interface ExampleContentProps {
  title: string;
  description: string;
  buttonText: string;
}

const ExampleContent = ({ title, description, buttonText }: ExampleContentProps) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:gap-8 px-4 pb-12 sm:pb-24 pt-8 sm:pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-2xl sm:text-3xl font-bold md:col-span-4">
      {title}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-3 sm:mb-4 text-lg sm:text-xl text-neutral-600 md:text-2xl">
        {description}
      </p>
      <ButtonCustom value={buttonText} icon={<ArrowUp className="inline" />} />
    </div>
  </div>
);

// Default export for Next.js page component
export default TextParallaxContentExample;