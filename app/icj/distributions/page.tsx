"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Page } from "@/components/layout/Page";
import { DistributionTable } from "@/components/distributions/DistributionTable";
import { DistributionDetail } from "@/components/distributions/DistributionDetail";
import { NewDistributionModal, NewDistributionData } from "@/components/distributions/NewDistributionModal";
import { Button } from "@/components/ui/button";
import { MOCK_DISTRIBUTIONS, Distribution } from "@/lib/distributions-data";

export default function DistributionsPage() {
  const [selectedDistribution, setSelectedDistribution] = useState<Distribution | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [distributions, setDistributions] = useState<Distribution[]>(MOCK_DISTRIBUTIONS);

  const handleSelectDistribution = (distribution: Distribution) => {
    setSelectedDistribution(distribution);
  };

  const handleCloseDetail = () => {
    setSelectedDistribution(null);
  };

  const handleCreateDistribution = (data: NewDistributionData) => {
    console.log("Creating distribution:", data);
    // In a real app, this would make an API call
    // For now, just close the modal
    setShowNewModal(false);
  };

  return (
    <AppShell>
      <Page title="Distributions">
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-[1600px] mx-auto px-8 py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Distributions
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Manage and track document distributions
                </p>
              </div>
              <Button
                onClick={() => setShowNewModal(true)}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                New Distribution
              </Button>
            </div>

            {/* Distributions Table */}
            <DistributionTable
              distributions={distributions}
              onSelectDistribution={handleSelectDistribution}
            />
          </div>
        </div>

        {/* Distribution Detail Panel */}
        {selectedDistribution && (
          <DistributionDetail
            distribution={selectedDistribution}
            onClose={handleCloseDetail}
          />
        )}

        {/* New Distribution Modal */}
        <NewDistributionModal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          onCreate={handleCreateDistribution}
        />
      </Page>
    </AppShell>
  );
}
