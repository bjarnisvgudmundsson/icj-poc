import { AppShell } from "@/components/layout/AppShell";
import { Page } from "@/components/layout/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DocumentDetailPage({ params }: { params: Promise<{ caseId: string; docId: string }> }) {
  const { caseId, docId } = await params;
  // Mock document data - in real app would fetch from API
  const document = {
    id: docId,
    title: "Acknowledgement Letter to Applicant",
    ref: "ACK-001",
    language: "EN",
    date: "2024-03-16",
    pages: 2,
    fileSize: "245 KB",
    status: "Final",
  };

  return (
    <AppShell>
      <Page
        title="Document Details"
        breadcrumbs={[
          { label: "Cases", href: "/icj/cases" },
          { label: "Gabon v. Equatorial Guinea", href: `/icj/cases/${caseId}` },
          { label: "Documents" },
          { label: document.ref },
        ]}
      >
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-muted-foreground mt-1" />
                <div>
                  <CardTitle>{document.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge>{document.language}</Badge>
                    <Badge variant="outline">{document.status}</Badge>
                  </div>
                </div>
              </div>
              <Button>
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Reference
                </div>
                <div className="font-medium">{document.ref}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Date Created
                </div>
                <div className="font-medium">{formatDate(document.date)}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Pages
                </div>
                <div className="font-medium">{document.pages}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  File Size
                </div>
                <div className="font-medium">{document.fileSize}</div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/30 text-sm">
              <div className="font-medium mb-2">Document Preview</div>
              <div className="text-muted-foreground">
                Document preview would appear here in a production environment.
              </div>
            </div>
          </CardContent>
        </Card>
      </Page>
    </AppShell>
  );
}
