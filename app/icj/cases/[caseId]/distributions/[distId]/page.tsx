import { AppShell } from "@/components/layout/AppShell";
import { Page } from "@/components/layout/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, CheckCircle2, Clock, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DistributionDetailPage({ params }: { params: Promise<{ caseId: string; distId: string }> }) {
  const { caseId, distId } = await params;
  // Mock distribution data
  const distribution = {
    id: distId,
    title: "Circular Letter to UN Member States (EN)",
    date: "2024-03-20",
    recipientCount: 191,
    delivered: 189,
    pending: 2,
    failed: 0,
    exclusions: ["Gabon", "Equatorial Guinea"],
    attachments: ["Application (2024/1)", "Press Release (2024/PR/001)"],
  };

  return (
    <AppShell>
      <Page
        title="Distribution Details"
        breadcrumbs={[
          { label: "Cases", href: "/icj/cases" },
          { label: "Gabon v. Equatorial Guinea", href: `/icj/cases/${caseId}` },
          { label: "Distributions" },
          { label: distribution.id },
        ]}
      >
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <Send className="h-6 w-6 text-muted-foreground mt-1" />
              <div>
                <CardTitle>{distribution.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1">
                  {formatDate(distribution.date)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                Delivery Status
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <div className="font-semibold text-green-700">{distribution.delivered}</div>
                  <div className="text-green-600">Delivered</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <Clock className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                  <div className="font-semibold text-yellow-700">{distribution.pending}</div>
                  <div className="text-yellow-600">Pending</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200">
                  <XCircle className="h-5 w-5 text-red-600 mx-auto mb-1" />
                  <div className="font-semibold text-red-700">{distribution.failed}</div>
                  <div className="text-red-600">Failed</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Excluded Parties
              </div>
              <div className="flex flex-wrap gap-2">
                {distribution.exclusions.map((country) => (
                  <Badge key={country} variant="secondary">
                    {country}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Attachments
              </div>
              <div className="space-y-1">
                {distribution.attachments.map((attachment, idx) => (
                  <div key={idx} className="text-sm">
                    • {attachment}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Total Recipients
              </div>
              <div className="text-sm font-medium">{distribution.recipientCount} states</div>
            </div>
          </CardContent>
        </Card>
      </Page>
    </AppShell>
  );
}
