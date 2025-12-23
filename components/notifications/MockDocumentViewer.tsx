"use client";

import { ZoomIn, ZoomOut, Download, Printer } from "lucide-react";
import type { Attachment } from "@/lib/notifications-data";

interface MockDocumentViewerProps {
  document: Attachment;
}

export function MockDocumentViewer({ document }: MockDocumentViewerProps) {
  return (
    <div className="flex flex-col flex-1 bg-[#525659] rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-4 px-4 py-2.5 bg-[#3c3f41] border-b border-[#2d2d2d]">
        <span className="text-xs font-medium text-white flex-1 truncate">
          {document.name}
        </span>

        <div className="flex items-center gap-2 text-[#ccc] text-[11px]">
          <button className="p-1 hover:text-white transition-colors">
            <ZoomOut size={14} />
          </button>
          <span>100%</span>
          <button className="p-1 hover:text-white transition-colors">
            <ZoomIn size={14} />
          </button>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 bg-[#5a5d5f] hover:bg-[#6a6d6f] text-white rounded transition-colors">
            <Download size={12} /> Download
          </button>
          <button className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 bg-[#5a5d5f] hover:bg-[#6a6d6f] text-white rounded transition-colors">
            <Printer size={12} /> Print
          </button>
        </div>
      </div>

      {/* Page Container */}
      <div className="flex-1 overflow-auto p-6 flex justify-center">
        <div className="w-[595px] min-h-[842px] bg-white shadow-2xl p-12 relative" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          {/* Letterhead */}
          <div className="flex items-center gap-4 mb-5">
            <div className="text-5xl">⚖️</div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-wider">INTERNATIONAL COURT OF JUSTICE</span>
              <span className="text-sm italic text-slate-600">COUR INTERNATIONALE DE JUSTICE</span>
              <span className="text-[11px] text-slate-500 mt-1">Peace Palace, The Hague</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-0.5 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] my-4 mb-6" />

          {/* Document Title */}
          <div className="text-center mb-6">
            <span className="block text-lg font-bold uppercase tracking-[2px] mb-2">ORDER</span>
            <span className="text-[13px] text-slate-600">17 December 2025</span>
          </div>

          {/* Case Reference */}
          <div className="text-center mb-8 italic">
            <strong className="block text-sm not-italic">
              Certain Questions Relating to the Obligation to Prosecute or Extradite
            </strong>
            <span className="text-[13px] text-slate-600">(Gabon v. Equatorial Guinea)</span>
          </div>

          {/* Body Content */}
          <div className="text-[13px] leading-relaxed text-justify space-y-4">
            <p>The Court,</p>

            <p className="pl-6">
              Having regard to Article 48 of the Statute of the Court and to Articles 44 and 45 of the Rules of Court,
            </p>

            <p className="pl-6">
              Having regard to the Application filed by the Republic of Gabon on 15 March 2024, instituting proceedings against the Republic of Equatorial Guinea,
            </p>

            <p className="pl-6">
              Makes the following Order:
            </p>

            <p className="pl-6">
              The time-limits for the filing of the written pleadings in the present case are fixed as follows:
            </p>

            <ul className="list-none pl-12 space-y-2 my-4">
              <li className="relative before:content-['—'] before:absolute before:-left-4">
                For the Memorial of the Republic of Gabon: <strong>28 February 2026</strong>
              </li>
              <li className="relative before:content-['—'] before:absolute before:-left-4">
                For the Counter-Memorial of the Republic of Equatorial Guinea: <strong>28 August 2026</strong>
              </li>
            </ul>

            <p className="pl-6">
              The subsequent procedure is reserved for further decision.
            </p>
          </div>

          {/* Signature Block */}
          <div className="flex justify-between mt-12 pt-8">
            <div className="flex flex-col items-center w-44">
              <div className="border-b border-slate-800 w-full mb-2" />
              <span className="text-xs font-bold">Joan E. DONOGHUE</span>
              <span className="text-[11px] text-slate-600">President</span>
            </div>
            <div className="flex flex-col items-center w-44">
              <div className="border-b border-slate-800 w-full mb-2" />
              <span className="text-xs font-bold">Philippe GAUTIER</span>
              <span className="text-[11px] text-slate-600">Registrar</span>
            </div>
          </div>

          {/* Page Number */}
          <div className="absolute bottom-6 left-0 right-0 text-center text-[11px] text-slate-500">
            Page 1 of 2
          </div>
        </div>
      </div>
    </div>
  );
}
