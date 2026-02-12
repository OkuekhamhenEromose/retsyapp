import { Gift, Calendar, Lightbulb, Sparkles, Heart, Star } from "lucide-react";

const reasons = [
  {
    icon: Gift,
    title: "Plenty of incredible presents",
    description: "From personalised portraits to custom furniture, the independent sellers on Etsy make it easy to find extraordinary gifts you won't find anywhere else.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: Calendar,
    title: "Finds for every occasion",
    description: "Weddings, babies, birthdays, housewarmings, or just because. Create a registry for any milestone—big, small, or somewhere in between.",
    color: "bg-amber-50",
    iconColor: "text-amber-600"
  },
  {
    icon: Lightbulb,
    title: "Tips and inspiration",
    description: "Our registry experts curate fresh ideas, trending gifts, and complete guides to help you build the perfect wishlist.",
    color: "bg-blue-50",
    iconColor: "text-blue-600"
  },
];

const ReasonsToLove = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#D5E8D4] text-[#2D6A4F] text-sm font-medium rounded-full mb-4">
            Why Etsy Registry
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Reasons to love Etsy Registry
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what makes our registry unique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className={`w-20 h-20 rounded-full ${reason.color} flex items-center justify-center`}>
                    <Icon className={`h-10 w-10 ${reason.iconColor}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-gray-200 pt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">4.8★</div>
            <p className="text-sm text-gray-600">Average review</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">10M+</div>
            <p className="text-sm text-gray-600">Gifts purchased</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">100k+</div>
            <p className="text-sm text-gray-600">Active registries</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">50k+</div>
            <p className="text-sm text-gray-600">Sellers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReasonsToLove;