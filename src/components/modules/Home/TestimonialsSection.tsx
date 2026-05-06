type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
  avatarColor?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sofia R.",
    location: "New York, USA",
    quote:
      "The linen blazer is the most versatile thing in my wardrobe. I've worn it to meetings, dinners, and weekend markets. Absolutely stunning quality.",
    rating: 5,
    avatar: "SR",
  },
  {
    name: "Amara M.",
    location: "London, UK",
    quote:
      "I was skeptical buying online but the fit guide was perfect. The silk dress arrived beautifully packaged and looks even better in person.",
    rating: 5,
    avatar: "AM",
    avatarColor: "#7a5a8a",
  },
  {
    name: "Julien L.",
    location: "Paris, France",
    quote:
      "Finally a brand that understands quiet luxury. Every piece I own from QuickCart gets compliments. The cashmere turtleneck is a dream.",
    rating: 5,
    avatar: "JL",
    avatarColor: "#4a7a6a",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#f3ede2] py-24 px-6 md:px-16 lg:px-20">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-[#b8975a]">
          Real Stories
        </p>

        <h2 className="text-3xl md:text-4xl font-serif font-light mt-3">
          Worn & Loved
        </h2>

        <p className="text-gray-500 mt-4">
          What our customers say about the QuickCart experience.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white border border-[#e2dbd0] rounded-sm p-6 flex flex-col gap-4 hover:-translate-y-2 hover:shadow-lg transition"
          >
            {/* Stars */}
            <div className="text-[#b8975a] text-sm tracking-widest">
              {"★".repeat(t.rating)}
            </div>

            {/* Quote */}
            <p className="font-serif italic text-lg leading-relaxed text-gray-800">
              “{t.quote}”
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#e2dbd0]">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                style={{ backgroundColor: t.avatarColor || "#b8975a" }}
              >
                {t.avatar}
              </div>

              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-gray-500">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}