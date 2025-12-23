import { AppShell } from "@/components/layout/AppShell";
import { Page } from "@/components/layout/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default async function EventDetailPage({ params }: { params: Promise<{ caseId: string; eventId: string }> }) {
  const { caseId, eventId } = await params;
  // Mock event data
  const event = {
    id: eventId,
    title: "General List Entry Created",
    type: "Registration",
    date: "2024-03-15T10:00:00Z",
    performedBy: "Registry Office",
    description: "Case registered in the General List of the International Court of Justice",
  };

  return (
    <AppShell>
      <Page
        title="Event Details"
        breadcrumbs={[
          { label: "Cases", href: "/icj/cases" },
          { label: "Gabon v. Equatorial Guinea", href: `/icj/cases/${caseId}` },
          { label: "Events" },
          { label: event.type },
        ]}
      >
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <Calendar className="h-6 w-6 text-muted-foreground mt-1" />
              <div>
                <CardTitle>{event.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1">
                  {formatDateTime(event.date)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Event Type
              </div>
              <div className="font-medium">{event.type}</div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Performed By
              </div>
              <div className="font-medium">{event.performedBy}</div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Description
              </div>
              <div className="text-sm">{event.description}</div>
            </div>
          </CardContent>
        </Card>
      </Page>
    </AppShell>
  );
}
