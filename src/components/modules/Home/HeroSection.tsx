import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="grid min-h-[92vh] grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* LEFT TEXT */}
      <div className="px-8 md:px-16 lg:px-20 py-20 flex flex-col justify-center animate-fadeUp">
        <div className="text-xs tracking-[0.2em] uppercase text-[#b8975a] font-medium mb-6 flex items-center gap-3">
          <span className="w-7 h-px bg-[#b8975a]" />
          Spring / Summer 2026
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight font-light mb-6 tracking-tight">
          Where Fashion <br />
          Meets <span className="italic text-[#b8975a]">Intention</span>
        </h1>

        <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
          Curated pieces for the modern wardrobe. Timeless craft, contemporary
          spirit, and quiet luxury for those who dress with purpose.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/collections"
            className="bg-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#b8975a] transition flex items-center gap-2"
          >
            Shop Collection <span className="transition-transform">→</span>
          </Link>

          
        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="relative hidden lg:flex items-center justify-center bg-[#1c1a16] overflow-hidden">
        {/* pattern */}
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,#b8975a20_40px,#b8975a20_41px),repeating-linear-gradient(-45deg,transparent,transparent_40px,#b8975a20_40px,#b8975a20_41px)]" />

        {/* emoji */}
        <div className="text-[9rem] animate-float drop-shadow-2xl relative z-10">
          👗
        </div>

        {/* badges */}
        <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md border border-[#b8975a55] text-white px-5 py-4 rounded-md">
          <p className="text-xs uppercase tracking-widest text-[#e8d9b8]">
            New Arrivals
          </p>
          <p className="font-serif text-2xl mt-1 font-light">120+ Styles</p>
        </div>

        <div className="absolute top-10 right-10 bg-[#b8975a] text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm">
          Free Shipping Over $120
        </div>
      </div>
    </section>
  );
}