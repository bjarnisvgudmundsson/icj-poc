import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Page({ title, breadcrumbs, children, actions }: PageProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
