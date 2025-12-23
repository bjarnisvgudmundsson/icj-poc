"use client";

import { ArrowLeft, HelpCircle, FileText, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";

export default function HelpPage() {
  const t = useExternalTranslation();

  const faqs = [
    {
      question: "How do I submit a filing?",
      answer: "Navigate to your case and click the 'Submit' tab. Select the filing type, upload your documents, and click submit. You will receive an acknowledgment within 24 hours."
    },
    {
      question: "What file formats are accepted?",
      answer: "The Court accepts PDF documents. All submissions should be in PDF/A format when possible for long-term archival."
    },
    {
      question: "How can I track deadlines?",
      answer: "All upcoming deadlines are displayed on your dashboard and in the Deadlines panel. You can also view case-specific deadlines in each case detail page."
    },
    {
      question: "How do I acknowledge receipt of communications?",
      answer: "Open any notification and click the 'Acknowledge Receipt' button. This will notify the Registry that you have received and reviewed the communication."
    }
  ];

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
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
          {t.help} & Support
        </h1>
        <p className="text-sm text-slate-600">
          Find answers to common questions and get support
        </p>
      </div>

      {/* FAQs */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-serif font-semibold text-slate-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="pb-4 border-b border-slate-100 last:border-0">
              <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-start gap-2">
                <HelpCircle size={16} className="text-[#5B92E5] mt-0.5 flex-shrink-0" />
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 ml-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-serif font-semibold text-slate-900 mb-4">
          Contact Support
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Mail size={20} className="text-[#5B92E5] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900">Email Support</p>
              <p className="text-sm text-slate-600">registry@icj-cij.org</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Phone size={20} className="text-[#5B92E5] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900">Phone Support</p>
              <p className="text-sm text-slate-600">+31 70 302 2323</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <FileText size={20} className="text-[#5B92E5] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900">Documentation</p>
              <a
                href="https://www.icj-cij.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#5B92E5] hover:underline"
              >
                Visit ICJ Documentation Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
