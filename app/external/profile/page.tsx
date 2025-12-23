"use client";

import { ArrowLeft, User, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import { mockUser } from "@/lib/mockExternalData";

export default function ProfilePage() {
  const t = useExternalTranslation();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Back Button */}
      <Link
        href="/external"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#5B92E5] transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        {t.backToDashboard}
      </Link>

      {/* Page Header */}
      <h1 className="text-2xl font-serif font-semibold text-slate-900 mb-6">
        Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-[#5B92E5] flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {mockUser.countryCode}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{mockUser.name}</h2>
            <p className="text-sm text-slate-600">{mockUser.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Mail size={20} className="text-slate-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">{t.email}</p>
              <p className="text-sm text-slate-900">{mockUser.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Globe size={20} className="text-slate-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">Country</p>
              <p className="text-sm text-slate-900">{mockUser.country}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <User size={20} className="text-slate-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">{t.role}</p>
              <p className="text-sm text-slate-900">{mockUser.role}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <User size={20} className="text-slate-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">User ID</p>
              <p className="text-sm text-slate-900 font-mono">{mockUser.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">
          Account Settings
        </h3>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
            <p className="text-sm font-medium text-slate-900">Update Contact Information</p>
            <p className="text-xs text-slate-600">Modify your email and contact details</p>
          </button>
          <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
            <p className="text-sm font-medium text-slate-900">Security Settings</p>
            <p className="text-xs text-slate-600">Change password and security preferences</p>
          </button>
          <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
            <p className="text-sm font-medium text-slate-900">Notification Preferences</p>
            <p className="text-xs text-slate-600">Manage email and system notifications</p>
          </button>
        </div>
      </div>
    </div>
  );
}
