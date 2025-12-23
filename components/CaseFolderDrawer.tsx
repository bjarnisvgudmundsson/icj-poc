"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Folder, FileText, Search } from "lucide-react";
import type { CaseFolderNode, Document } from "@/lib/types";

interface CaseFolderDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folderStructure: CaseFolderNode[];
  documents: Document[];
  caseId: string;
}

export function CaseFolderDrawer({
  open,
  onOpenChange,
  folderStructure,
  documents,
  caseId,
}: CaseFolderDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const documentMap = useMemo(() => {
    const map = new Map<string, Document>();
    documents.forEach((doc) => {
      map.set(doc.id, doc);
    });
    return map;
  }, [documents]);

  const filterFolderStructure = (
    nodes: CaseFolderNode[],
    query: string
  ): CaseFolderNode[] => {
    if (!query.trim()) return nodes;

    const lowerQuery = query.toLowerCase();

    return nodes.reduce((acc, node) => {
      const titleMatches = node.title.toLowerCase().includes(lowerQuery);

      const matchingDocs = node.documentIds.filter((docId) => {
        const doc = documentMap.get(docId);
        return doc && (
          doc.title.toLowerCase().includes(lowerQuery) ||
          doc.ref.toLowerCase().includes(lowerQuery)
        );
      });

      const filteredChildren = node.children
        ? filterFolderStructure(node.children, query)
        : [];

      if (titleMatches || matchingDocs.length > 0 || filteredChildren.length > 0) {
        acc.push({
          ...node,
          documentIds: titleMatches ? node.documentIds : matchingDocs,
          children: filteredChildren.length > 0 ? filteredChildren : node.children,
        });
      }

      return acc;
    }, [] as CaseFolderNode[]);
  };

  const filteredStructure = useMemo(
    () => filterFolderStructure(folderStructure, searchQuery),
    [folderStructure, searchQuery]
  );

  const renderFolderNode = (node: CaseFolderNode) => {
    const docs = node.documentIds.map((id) => documentMap.get(id)).filter(Boolean) as Document[];
    const totalCount = docs.length + (node.children?.reduce((sum, child) => sum + getTotalDocCount(child), 0) || 0);

    if (!node.children || node.children.length === 0) {
      return (
        <div key={node.id} className="mb-2">
          <div className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent/50 transition-colors">
            <Folder className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-medium flex-1">{node.title}</span>
            {totalCount > 0 && (
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                {totalCount}
              </Badge>
            )}
          </div>
          {docs.length > 0 && (
            <div className="ml-6 mt-1 space-y-1">
              {docs.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/icj/cases/${caseId}/documents/${doc.id}`}
                  className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-accent/70 transition-colors group"
                >
                  <FileText className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                  <span className="text-xs flex-1 group-hover:text-foreground">{doc.ref}</span>
                  <Badge variant="outline" className="text-xs h-4 px-1">
                    {doc.language}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <AccordionItem key={node.id} value={node.id} className="border-0">
        <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-accent/50 hover:no-underline">
          <div className="flex items-center gap-2 flex-1">
            <Folder className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium flex-1 text-left">{node.title}</span>
            {totalCount > 0 && (
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                {totalCount}
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0 pt-1">
          <div className="ml-4">
            {docs.length > 0 && (
              <div className="mb-2 space-y-1">
                {docs.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/icj/cases/${caseId}/documents/${doc.id}`}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-accent/70 transition-colors group"
                  >
                    <FileText className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                    <span className="text-xs flex-1 group-hover:text-foreground">{doc.ref}</span>
                    <Badge variant="outline" className="text-xs h-4 px-1">
                      {doc.language}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
            {node.children && node.children.length > 0 && (
              <Accordion type="multiple" className="w-full">
                {node.children.map((child) => renderFolderNode(child))}
              </Accordion>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  const getTotalDocCount = (node: CaseFolderNode): number => {
    return node.documentIds.length + (node.children?.reduce((sum, child) => sum + getTotalDocCount(child), 0) || 0);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Case Folder</SheetTitle>
          <SheetDescription>
            Browse all documents organized by proceeding type
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search in case folder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {filteredStructure.length === 0 ? (
            <div className="text-center py-12 text-sm text-muted-foreground">
              {searchQuery ? "No documents found matching your search" : "No folder structure available"}
            </div>
          ) : (
            <Accordion type="multiple" className="w-full">
              {filteredStructure.map((node) => renderFolderNode(node))}
            </Accordion>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
