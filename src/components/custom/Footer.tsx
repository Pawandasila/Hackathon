export default function Footer() {
  return (
    <footer className="group bg-[#f6eee8]">
      <h1 className="hidden sm:block text-[12vw] group-hover:translate-y-1 translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent transition-all ease-linear">
        EcoTrack360
      </h1>
      <section className="bg-[#e8dbc6] h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full">
        <div className="text-center text-gray-700">
          <div className="text-3xl mb-2">🌍</div>
          <p>Tracking Impact, Inspiring Change</p>
          <p className="text-sm text-gray-600 mt-2">
            "Be the change you wish to see in the world"
          </p>
        </div>
      </section>
    </footer>
  );
}
