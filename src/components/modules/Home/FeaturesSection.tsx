type Feature = {
  icon: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: "🌿",
    title: "Sustainably Sourced",
    description:
      "Ethically made with certified organic and recycled fabrics. Fashion that respects the planet.",
  },
  {
    icon: "✂️",
    title: "Artisan Craftsmanship",
    description:
      "Each piece is hand-inspected by master tailors before it reaches your door.",
  },
  {
    icon: "↩️",
    title: "Easy 60-day Returns",
    description:
      "Not in love? Free returns within 60 days. No questions asked, no fine print.",
  },
  {
    icon: "🚚",
    title: "Express Delivery",
    description:
      "Next-day delivery available in 50+ cities. Free standard shipping on all orders over $120.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#1c1a16] text-white py-24 px-6 md:px-16 lg:px-20">
      {/* HEADER */}
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#b8975a] flex items-center gap-2">
          <span className="w-5 h-px bg-[#b8975a]" />
          Why QuickCart
        </p>

        <h2 className="text-3xl md:text-4xl font-serif font-light mt-4">
          Dressed in Values
        </h2>

        <p className="text-white/50 mt-4 leading-relaxed">
          Every stitch tells a story. We believe fashion should feel as good as
          it looks.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {features.map((f, i) => (
          <div
            key={i}
            className="relative border border-white/10 rounded-sm p-6 overflow-hidden group transition-transform hover:-translate-y-2"
          >
            {/* gradient hover overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-[#b8975a15] to-transparent" />

            {/* icon */}
            <div className="text-3xl mb-4 relative z-10">{f.icon}</div>

            {/* title */}
            <h3 className="font-serif text-lg font-light mb-2 relative z-10">
              {f.title}
            </h3>

            {/* description */}
            <p className="text-sm text-white/50 leading-relaxed relative z-10">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}