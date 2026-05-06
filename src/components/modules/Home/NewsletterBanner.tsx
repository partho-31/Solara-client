export default function NewsletterBanner() {
  return (
    <section className="bg-[#0f0e0c] text-white py-28 px-6 md:px-16 lg:px-20 relative overflow-hidden">
      {/* decorative rings */}
      <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full border border-[#b8975a1f]" />
      <div className="absolute -top-20 -right-20 w-87.5 h-87.5 rounded-full border border-[#b8975a14]" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT TEXT */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#b8975a] flex items-center gap-2">
            <span className="w-5 h-px bg-[#b8975a]" />
            Stay in the Know
          </p>

          <h2 className="text-3xl md:text-4xl font-serif font-light mt-4">
            Join the Inner Circle
          </h2>

          <p className="text-white/50 mt-4 leading-relaxed max-w-md">
            Early access to new drops, exclusive member pricing, and style notes
            from our editors.
          </p>

          {/* perks */}
          <div className="mt-6 space-y-2 text-sm text-white/60">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#b8975a] rounded-full" />
              First access to limited releases
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#b8975a] rounded-full" />
              15% off your first order
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#b8975a] rounded-full" />
              Monthly style curation newsletter
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div>
          <div className="flex flex-col sm:flex-row gap-0 border border-white/15 rounded-sm overflow-hidden">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white/5 text-white outline-none placeholder-white/30 focus:bg-white/10"
            />
            <button className="bg-[#b8975a] px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#a07840] transition">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-white/30 mt-3">
            No spam ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}