const Subscribe = () => {
  return (
    <section className="bg-[hsl(213,70%,85%)] py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-foreground text-lg mb-6">
          Yes! Send me exclusive offers, unique gift ideas, and personalised tips for shopping and selling on Etsy.
        </p>
        
        <div className="max-w-xl mx-auto">
          <div className="flex bg-background rounded-full overflow-hidden border border-border">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 py-3 px-6 text-base focus:outline-none bg-transparent"
            />
            <button className="px-6 py-3 font-medium text-foreground hover:bg-secondary transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;