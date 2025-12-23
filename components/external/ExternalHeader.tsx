"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/ExternalLanguageContext";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import { mockNotifications } from "@/lib/mockExternalData";

export function ExternalHeader() {
  const { language, setLanguage } = useLanguage();
  const t = useExternalTranslation();

  const unreadCount = mockNotifications.filter(n => n.status === 'unread').length;

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top bar - matching ICJ website */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-1.5">
          <div className="flex justify-between items-center">
            {/* Left nav */}
            <nav className="flex gap-4 text-sm text-gray-600">
              <Link href="/external" className="hover:text-[#005A9C] transition-colors">
                {t.home}
              </Link>
              <Link href="/external/help" className="hover:text-[#005A9C] transition-colors">
                {t.contact}
              </Link>
              <Link href="/external/help" className="hover:text-[#005A9C] transition-colors">
                {t.faq}
              </Link>
              <Link href="/external/help" className="hover:text-[#005A9C] transition-colors">
                {t.help}
              </Link>
            </nav>

            {/* Right nav */}
            <div className="flex items-center gap-4">
              {/* Language toggle - ICJ website style */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="text-sm text-[#005A9C] hover:underline transition-all"
              >
                {language === 'en' ? 'Français' : 'English'}
              </button>

              {/* Notification bell */}
              <Link
                href="/external/notifications"
                className="relative hover:opacity-70 transition-opacity"
                title="Notifications"
              >
                <Bell size={18} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#005A9C] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header with logo - matching ICJ website */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/external" className="hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png.webp"
              alt="International Court of Justice"
              width={150}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <div>
            <h1 className="text-lg font-serif text-gray-900 tracking-wide">
              INTERNATIONAL COURT OF JUSTICE
            </h1>
            <p className="text-sm text-gray-500 uppercase tracking-wider mt-0.5">
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
