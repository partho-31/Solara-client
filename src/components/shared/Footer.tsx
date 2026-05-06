export default function Footer() {
  return (
    <footer className="bg-[#1c1a16] text-white/70 px-6 md:px-16 lg:px-20 pt-20 pb-10">
      {/* TOP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
        {/* BRAND */}
        <div>
          <h2 className="font-serif text-xl text-white tracking-widest">
            SOL<span className="text-[#b8975a]">ara</span>
          </h2>

          <p className="text-sm text-white/40 mt-4 leading-relaxed max-w-xs">
            Modern fashion rooted in timeless craft. We design for people who
            believe style is a form of self-expression.
          </p>

          <div className="flex gap-3 mt-6 text-xs">
            <button className="w-8 h-8 border border-white/10 hover:border-[#b8975a] hover:text-[#b8975a] transition">
              IG
            </button>
            <button className="w-8 h-8 border border-white/10 hover:border-[#b8975a] hover:text-[#b8975a] transition">
              PT
            </button>
            <button className="w-8 h-8 border border-white/10 hover:border-[#b8975a] hover:text-[#b8975a] transition">
              TK
            </button>
            <button className="w-8 h-8 border border-white/10 hover:border-[#b8975a] hover:text-[#b8975a] transition">
              𝕏
            </button>
          </div>
        </div>

        {/* SHOP */}

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white mb-4">
            Shop
          </h4>
          <ul className="space-y-2 text-sm text-white/40">
            <li>New Arrivals</li>
            <li>Tops </li>
            <li>Outerwear</li>
            <li>Accessories</li>
            <li>Sale</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white mb-4">
            Help
          </h4>
          <ul className="space-y-2 text-sm text-white/40">
            <li>Size Guide</li>
            <li>Returns</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-white/40">
            <li>Our Story</li>
            <li>Sustainability</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-xs text-white/30">
        <p>© 2026 SOLARA Fashion Ltd. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="/privacy&policy" className="hover:text-white/60 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white/60 transition">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
