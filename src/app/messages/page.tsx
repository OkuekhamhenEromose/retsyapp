'use client';

import { Search, Heart, Gift, Bell, Store, ShoppingCart, User, ChevronDown, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function MessagesPage() {
  const sidebarItems = [
    { label: 'Inbox', active: true },
    { label: 'Starred', active: false },
    { label: 'From potential buyers', active: false },
    { label: 'From Etsy', active: false },
    { label: 'Sent', active: false },
    { label: 'All', active: false },
    { label: 'Unread', active: false },
    { label: 'Spam', active: false },
    { label: 'Recycling bin', active: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <h2 className="text-2xl font-medium text-gray-900">Messages</h2>
          <div className="relative w-96">
            <Input
              type="text"
              placeholder="Search your messages"
              className="w-full h-11 pl-4 pr-10 rounded-full border border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-0"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex max-w-[1400px] mx-auto">
        <aside className="w-56 border-r border-gray-200 min-h-[calc(100vh-200px)]">
          <nav className="py-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full text-left px-6 py-2.5 text-sm transition-colors ${
                  item.active
                    ? 'bg-gray-200 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 px-6">
          <div className="border-b border-gray-200 py-4 flex items-center gap-4">
            <Checkbox className="h-4 w-4" />
            <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">
              Recycling bin
            </button>
            <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">
              Mark Unread
            </button>
            <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">
              Mark Read
            </button>
            <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">
              Report
            </button>
            <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">
              Archive
            </button>
            <button className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1">
              Label
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-24">
            <svg
              width="200"
              height="160"
              viewBox="0 0 200 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-6"
            >
              <path
                d="M60 80C60 80 65 60 75 55C85 50 90 60 90 70C90 80 85 100 75 105C65 110 55 105 50 95"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              <path
                d="M140 80C140 80 135 60 125 55C115 50 110 60 110 70C110 80 115 100 125 105C135 110 145 105 150 95"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              <ellipse cx="55" cy="100" rx="25" ry="35" fill="none" stroke="#D1D5DB" strokeWidth="2" />
              <rect x="50" y="130" width="10" height="8" fill="none" stroke="#D1D5DB" strokeWidth="2" />
              <line x1="50" y1="132" x2="60" y2="132" stroke="#D1D5DB" strokeWidth="1" />
              <line x1="50" y1="134" x2="60" y2="134" stroke="#D1D5DB" strokeWidth="1" />
              <line x1="50" y1="136" x2="60" y2="136" stroke="#D1D5DB" strokeWidth="1" />
              <path
                d="M145 85C145 75 150 70 155 75C160 70 165 75 165 85"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect x="145" y="85" width="20" height="35" rx="2" fill="none" stroke="#D1D5DB" strokeWidth="2" />
              <line x1="148" y1="95" x2="162" y2="95" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <p className="text-lg text-gray-900 font-medium">No conversations to see here!</p>
          </div>
        </main>
      </div>

      <button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        style={{ backgroundColor: '#222222' }}
      >
        <Star className="h-7 w-7" style={{ fill: '#F1C744', color: '#F1C744' }} />
      </button>

      <footer className="fixed bottom-0 left-0 right-0 h-16" style={{ backgroundColor: '#2952CC' }}>
      </footer>
    </div>
  );
}
