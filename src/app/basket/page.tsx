'use client';

import { Handshake, Leaf } from "lucide-react";

const Basket = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Your basket</h1>

        {/* Purchase Protection */}
        <div className="flex items-start gap-4 mb-10">
          <Handshake className="h-10 w-10 text-foreground flex-shrink-0 mt-1" />
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-bold">Buy confidently</span> with Etsy's Purchase Protection programme for buyers, get a full refund in the rare case your item doesn't arrive, arrives damaged, or isn't as described.{" "}
            <a href="#" className="underline font-medium">See eligibility</a>
          </p>
        </div>

        {/* Empty basket */}
        <div className="text-center py-16">
          <h2 className="text-3xl text-muted-foreground font-light italic font-serif">
            Your basket is empty.
          </h2>
        </div>

        {/* Climate */}
        <div className="flex items-start gap-4 mt-8">
          <Leaf className="h-6 w-6 text-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            Etsy invests in climate solutions like electric trucks and carbon offsets for every delivery.{" "}
            <a href="#" className="underline font-medium">See how</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Basket;
