// Category data for Hot Right Now section
const categories = [
  {
    id: 1,
    title: 'CHERRY PURPLE SETS',
    description: "Train and chill in deep cherry shades that everyone wants to get their hands on.",
    image: '/hot4 (2).avif',
  },
  {
    id: 2,
    title: 'WINTER ARC PREP',
    description: "Layering season starts now. Prep for your winter arc with these must-haves.",
    image: '/hot4 (3).avif',
  },
  {
    id: 3,
    title: 'RUNNING',
    description: "Running stuff so good it'll (almost) make you want to do cardio.",
    image: '/hot4 (4).avif',
  },
  {
    id: 4,
    title: 'OVERSIZED ALWAYS LOOKS COOL',
    description: "If it's not oversized, we don't want it.",
    image: '/hot4 (1).avif',
  },
];

function Hot() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-3xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          HOT RIGHT NOW
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              {/* Category Image */}
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Category Info */}
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hot;
