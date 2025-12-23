"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

interface CaseSearchProps {
  onSearch: (query: string) => void;
  onFiltersChange: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  stage: string | null;
  hasPM: boolean;
  hasPO: boolean;
}

export function CaseSearch({ onSearch, onFiltersChange }: CaseSearchProps) {
  const [query, setQuery] = useState("");
  const [booleanMode, setBooleanMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    stage: null,
    hasPM: false,
    hasPO: false,
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const activeFilterCount =
    (filters.stage ? 1 : 0) + (filters.hasPM ? 1 : 0) + (filters.hasPO ? 1 : 0);

  return (
    <div className="space-y-3 mb-8">
      {/* Search Bar */}
      <div
        className={`flex items-center bg-white border rounded-xl px-4 transition-all ${
          showFilters ? "border-blue-500 shadow-sm" : "border-slate-200"
        }`}
      >
        <Search className="text-slate-400 flex-shrink-0" size={18} />
        <input
          type="text"
          placeholder="Search cases by name, party, subject matter..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-3 py-3 text-sm outline-none"
        />
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={() => setBooleanMode(!booleanMode)}
            className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-colors ${
              booleanMode
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
            title="Boolean search mode"
          >
            {"{ }"}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-slate-300 transition-colors"
          >
            <Filter size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-blue-600 text-white rounded-full text-[10px]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Boolean Mode Help */}
      {booleanMode && (
        <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
          <strong>Boolean mode:</strong> Use AND, OR, NOT, "exact phrase",
          applicant:Country, stage:written
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stage Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Stage
            </label>
            <div className="flex flex-wrap gap-2">
              {["Initiation", "Written", "Oral", "Deliberation"].map((stage) => (
                <button
                  key={stage}
                  onClick={() =>
                    handleFilterChange({
                      stage:
                        filters.stage === stage.toLowerCase()
                          ? null
                          : stage.toLowerCase(),
                    })
                  }
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    filters.stage === stage.toLowerCase()
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Incidental Proceedings Filter */}
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Incidental Proceedings
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasPM}
                  onChange={(e) =>
                    handleFilterChange({ hasPM: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">
                  Has Provisional Measures
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasPO}
                  onChange={(e) =>
                    handleFilterChange({ hasPO: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">
                  Has Preliminary Objections
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
