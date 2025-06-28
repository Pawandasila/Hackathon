import { useRef } from "react";
import { useInView } from "framer-motion";
import Ballpit from "./Ballpit";

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { 
    once: false, 
    margin: "-100px 0px -100px 0px" 
  });

  return (
    <footer ref={footerRef} className="group bg-[#f6eee8]">
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "500px",
          maxHeight: "500px",
          width: "100%",
        }}
      >
        <h1 className="hidden sm:block text-[12vw] group-hover:translate-y-1 translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent transition-all duration-200 ease-linear relative z-0">
          EcoTrack360
        </h1>
        <section className="bg-[#e8dbc6] h-40 relative z-5 grid place-content-center text-2xl rounded-tr-full rounded-tl-full">
          <div className="text-center text-gray-700">
            <div className="text-3xl mb-2">🌍</div>
            <p>Tracking Impact, Inspiring Change</p>
            <p className="text-sm text-gray-600 mt-2">
              "Be the change you wish to see in the world"
            </p>
          </div>
        </section>
        {isInView && (
          <div className="absolute inset-0 z-50 pointer-events-auto">
            <Ballpit
              count={150}
              gravity={0.5}
              friction={0.9975}
              wallBounce={0.95}
              followCursor={false}
              colors={[
                0x10b981, // emerald-500
                0x059669, // emerald-600  
                0x047857, // emerald-700
                0x22c55e, // green-500
                0x16a34a, // green-600
                0x15803d, // green-700
                0x06b6d4, // cyan-500
                0x0891b2, // cyan-600
                0x0e7490, // cyan-700
                0x14b8a6, // teal-500
                0x0d9488, // teal-600
                0x0f766e, // teal-700
                0x84cc16, // lime-500
                0x65a30d, // lime-600
                0x16a085, // teal-400
              ]}
            />
          </div>
        )}
      </div>
    </footer>
  );
}
