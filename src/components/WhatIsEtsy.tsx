const WhatIsEtsy = () => {
  return (
    <section className="bg-info-cream py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            What is Etsy?
          </h2>
          <a href="#" className="text-sm text-foreground underline underline-offset-4 hover:no-underline">
            Read our wonderfully weird story
          </a>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
              A community doing good
            </h3>
            <p className="text-foreground leading-relaxed">
              Etsy is a global online marketplace, where people come together to make, sell, buy and collect unique items. We're also a community pushing for positive change for small businesses, people, and the planet.{" "}
              <a href="#" className="underline underline-offset-4 hover:no-underline">
                Here are some of the ways we're making a positive impact, together.
              </a>
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
              Support independent creators
            </h3>
            <p className="text-foreground leading-relaxed">
              There's no Etsy warehouse – just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.
            </p>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
              Peace of mind
            </h3>
            <p className="text-foreground leading-relaxed">
              Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support.
            </p>
          </div>
        </div>

        {/* Help Center CTA */}
        <div className="text-center">
          <p className="text-lg font-medium text-foreground mb-4">
            Have a question? Well, we've got some answers.
          </p>
          <button className="outline-button">
            Go to Help Centre
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatIsEtsy;
