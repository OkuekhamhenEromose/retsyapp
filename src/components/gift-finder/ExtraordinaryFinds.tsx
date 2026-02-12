'use client';

import { ArrowRight, Heart, Users, Briefcase, User, UserPlus, GraduationCap, Baby, LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GiftRecipient } from "@/services/api";

const iconMap: Record<string, LucideIcon> = {
  Heart, Users, Briefcase, User, UserPlus, GraduationCap, Baby
};

interface ExtraordinaryFindsProps {
  recipients: GiftRecipient[];
}

const ExtraordinaryFinds = ({ recipients }: ExtraordinaryFindsProps) => {
  const otherPeople = [
    { label: "Kids", icon: Baby, slug: "kids" },
    { label: "Coworker", icon: Briefcase, slug: "coworker" },
    { label: "Sibling", icon: Users, slug: "sibling" },
    { label: "Friend", icon: UserPlus, slug: "friend" },
    { label: "Teacher", icon: GraduationCap, slug: "teacher" },
    { label: "Grandparent", icon: User, slug: "grandparent" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-gray-900">
          Extraordinary finds for everyone in your life
        </h2>

        {recipients.map((recipient) => {
          const Icon = iconMap[recipient.icon] || Heart;
          
          return (
            <div key={recipient.id} className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{recipient.label}</h3>
                </div>
                <Link 
                  href={`/gift-recipient/${recipient.slug}`} 
                  className="flex items-center gap-1 text-sm font-medium hover:underline text-gray-700"
                >
                  Shop all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {recipient.items.map((item) => (
                  <Link 
                    key={item.id} 
                    href={`/gift-recipient/${recipient.slug}/${item.slug}`} 
                    className="group"
                  >
                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow">
                      <div className="aspect-square relative bg-gray-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 33vw, 16vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Icon className="h-12 w-12" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900 text-center py-3 px-2">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Other special people */}
        <h3 className="text-xl font-serif text-center mb-6 text-gray-900">
          Other special people to shop for
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {otherPeople.map((person, idx) => {
            const Icon = person.icon;
            return (
              <Link
                key={idx}
                href={`/gift-recipient/${person.slug}`}
                className="flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow bg-white"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-gray-900" />
                </div>
                <span className="font-medium text-gray-900">{person.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExtraordinaryFinds;