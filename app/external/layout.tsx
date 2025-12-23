import { ExternalLanguageProvider } from "@/contexts/ExternalLanguageContext";
import { ExternalHeader } from "@/components/external/ExternalHeader";
import { ExternalFooter } from "@/components/external/ExternalFooter";
import "@/styles/external.css";

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExternalLanguageProvider>
      <div className="min-h-screen flex flex-col bg-white font-body">
        <ExternalHeader />
        <main className="flex-1">
          {children}
        </main>
        <ExternalFooter />
      </div>
    </ExternalLanguageProvider>
  );
}
