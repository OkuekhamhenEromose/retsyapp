'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Mail, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I add items to an Etsy registry?",
    answer: "Browse any Etsy listing and look for the 'Add to registry' button below the item photos. You can also save items from your favorites or search directly from your registry dashboard. Items stay in your registry until purchased or removed.",
  },
  {
    question: "How do I find an Etsy registry?",
    answer: "Visit the Etsy Registry page and use the search bar at the top. You can search by the registrant's full name or the email address associated with their registry. Once found, you can view their wishlist and purchase gifts directly.",
  },
  {
    question: "How do I access my registry?",
    answer: "Sign in to your Etsy account and click on 'Registry' in the main navigation. From your dashboard, you can add or remove items, track purchases, manage your registry settings, and share your registry link with family and friends.",
  },
  {
    question: "Is an Etsy Registry free?",
    answer: "Yes! Creating and managing an Etsy Registry is completely free. There are no fees to set up your registry, add items, or share it with others. You only pay for items you choose to purchase, and guests only pay for gifts they buy.",
  },
  {
    question: "What can you register for on Etsy?",
    answer: "You can register for virtually anything sold on Etsy! This includes handmade home décor, personalized jewellery, vintage finds, art prints, kitchenware, furniture, baby items, wedding accessories, and craft supplies. The possibilities are endless.",
  },
  {
    question: "Can I have more than one registry?",
    answer: "Yes! You can create separate registries for different occasions - a wedding registry, baby registry, birthday wishlist, or housewarming registry. Each registry is independent and can be shared separately.",
  },
  {
    question: "What happens when someone buys an item from my registry?",
    answer: "When a guest purchases an item from your registry, it's automatically marked as purchased and removed from your public wishlist. You'll receive an email notification, and you can track all purchases in your registry dashboard.",
  },
];

const RegistryFAQ = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-gray-700" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Questions? We've got answers
          </h2>
          <p className="text-gray-600">
            Everything you need to know about Etsy Registry
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-gray-200 rounded-lg bg-white px-6"
              >
                <AccordionTrigger className="text-base font-medium py-5 hover:no-underline text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full text-sm font-medium hover:border-gray-300 transition-colors"
            >
              <Mail className="h-4 w-4" />
              registry@etsy.com
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full text-sm font-medium hover:border-gray-300 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Live chat
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Visit help centre
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistryFAQ;