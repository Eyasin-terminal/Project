import React, { useState, useMemo } from 'react';
import { SAMPLE_TRANSACTIONS, TransactionRecord } from '../data/projectData';
import { 
  CheckCircle, 
  AlertCircle, 
  Filter, 
  Search, 
  Layers, 
  ArrowRight, 
  Info, 
  ShieldAlert, 
  CheckCheck,
  Eye,
  SlidersHorizontal,
  X
} from 'lucide-react';

export const DataInspector: React.FC = () => {
  const [viewMode, setViewMode] = useState<'golden' | 'raw'>('golden');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecord, setSelectedRecord] = useState<TransactionRecord | null>(SAMPLE_TRANSACTIONS[0]);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return SAMPLE_TRANSACTIONS.filter((item) => {
      // Anomaly type filter
      if (selectedFilter === 'anomalies-only' && !item.isAnomaly) return false;
      if (selectedFilter === 'time-travel' && item.anomalyType !== 'Time-Travel') return false;
      if (selectedFilter === 'concurrency' && item.anomalyType !== 'Concurrency-Bug') return false;
      if (selectedFilter === 'zero-dollar' && item.anomalyType !== 'Zero-Dollar') return false;
      if (selectedFilter === 'geo-mismatch' && item.anomalyType !== 'Geo-Mismatch') return false;
      if (selectedFilter === 'clean-only' && item.isAnomaly) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          item.orderId.toLowerCase().includes(q) ||
          item.userId.toLowerCase().includes(q) ||
          item.product.toLowerCase().includes(q) ||
          item.cleanCountryCode.toLowerCase().includes(q) ||
          item.rawCountryCode.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <section id="data-inspector" className="py-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
              <span>Interactive Data Grid</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>12,450 Transformed Records</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
              Before vs. After: Live Anomaly Inspector
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Toggle between raw ingested corruption and the audited Golden Dataset. Click any row to examine the commercial business logic and technical root cause.
            </p>
          </div>

          {/* Interactive View Mode Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('raw')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'raw'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Raw Messy Feed</span>
            </button>
            <button
              onClick={() => setViewMode('golden')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'golden'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Audited Golden Dataset</span>
            </button>
          </div>
        </div>

        {/* Status Callout Banner based on active viewMode */}
        <div className={`p-4 rounded-xl border mb-6 transition-colors ${
          viewMode === 'raw'
            ? 'bg-rose-950/20 border-rose-900/50 text-rose-200'
            : 'bg-emerald-950/20 border-emerald-900/50 text-emerald-200'
        }`}>
          <div className="flex items-start gap-3">
            {viewMode === 'raw' ? (
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="text-xs font-bold uppercase tracking-wide">
                {viewMode === 'raw' ? 'Viewing Corrupted Ingestion Pipeline' : 'Viewing Production-Ready Golden Dataset'}
              </span>
              <p className="text-xs opacity-90 mt-0.5">
                {viewMode === 'raw' 
                  ? 'Notice negative delivery lead times (Aug 10 shipping vs Aug 14 purchase), duplicate Order IDs on web flash sales, $0 checkout drop-offs, and non-standard regional codes.'
                  : 'All ISO-3 country codes normalized, Order IDs split into distinct sub-indices (GZ-1049-A), $0 leaks tagged, and Is_Valid_Logistics helper flags applied to protect $382K+ in revenue.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4">
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'all' ? 'bg-slate-800 text-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Records ({SAMPLE_TRANSACTIONS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('time-travel')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'time-travel' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Time-Travel (9.15%)
            </button>
            <button
              onClick={() => setSelectedFilter('concurrency')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'concurrency' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Race Condition (0.7%)
            </button>
            <button
              onClick={() => setSelectedFilter('zero-dollar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'zero-dollar' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              $0 Leakage
            </button>
            <button
              onClick={() => setSelectedFilter('geo-mismatch')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'geo-mismatch' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Geo-Code #N/A
            </button>
            <button
              onClick={() => setSelectedFilter('clean-only')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'clean-only' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Clean Validated
            </button>
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Order, User, Product..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Desktop Grid: Main Data Table + Diagnostic Side-Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Table View (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold">
                    <th className="py-3 px-3.5 whitespace-nowrap">Order ID</th>
                    <th className="py-3 px-3 whitespace-nowrap">User ID</th>
                    <th className="py-3 px-3 whitespace-nowrap">Product</th>
                    <th className="py-3 px-3 whitespace-nowrap">Channel</th>
                    <th className="py-3 px-3 whitespace-nowrap">Purchase</th>
                    <th className="py-3 px-3 whitespace-nowrap">Ship Date</th>
                    <th className="py-3 px-3 whitespace-nowrap text-right">Total</th>
                    <th className="py-3 px-3 whitespace-nowrap">Country</th>
                    <th className="py-3 px-3 whitespace-nowrap text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filteredData.map((row) => {
                    const isSelected = selectedRecord?.orderId === row.orderId && selectedRecord?.userId === row.userId;

                    // Display IDs based on view mode
                    const displayOrderId = viewMode === 'golden' && row.anomalyType === 'Concurrency-Bug' 
                      ? `${row.orderId}-${row.userId === 'USR-4920' ? 'A' : 'B'}`
                      : row.orderId;
                    
                    const displayCountry = viewMode === 'golden' ? row.cleanCountryCode : row.rawCountryCode;

                    // Time travel check
                    const isTimeTravelCorrupted = viewMode === 'raw' && row.anomalyType === 'Time-Travel';
                    const isDuplicateCollision = viewMode === 'raw' && row.anomalyType === 'Concurrency-Bug';
                    const isZeroDollarGlitch = viewMode === 'raw' && row.anomalyType === 'Zero-Dollar';
                    const isGeoCorrupted = viewMode === 'raw' && row.anomalyType === 'Geo-Mismatch';

                    return (
                      <tr
                        key={`${row.orderId}-${row.userId}`}
                        onClick={() => setSelectedRecord(row)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-indigo-950/40 border-l-2 border-indigo-400'
                            : 'hover:bg-slate-800/40'
                        }`}
                      >
                        {/* Order ID */}
                        <td className="py-2.5 px-3.5 whitespace-nowrap font-semibold">
                          <span className={isDuplicateCollision ? 'text-rose-400 underline decoration-rose-500/80 decoration-wavy' : 'text-slate-200'}>
                            {displayOrderId}
                          </span>
                        </td>

                        {/* User ID */}
                        <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">
                          {row.userId}
                        </td>

                        {/* Product */}
                        <td className="py-2.5 px-3 whitespace-nowrap font-sans text-slate-300 max-w-[150px] truncate" title={row.product}>
                          {row.product}
                        </td>

                        {/* Channel */}
                        <td className="py-2.5 px-3 whitespace-nowrap font-sans text-slate-400">
                          {row.channel}
                        </td>

                        {/* Purchase Date */}
                        <td className="py-2.5 px-3 whitespace-nowrap tabular-nums text-slate-300">
                          {row.purchaseDate}
                        </td>

                        {/* Shipping Date */}
                        <td className="py-2.5 px-3 whitespace-nowrap tabular-nums">
                          {isTimeTravelCorrupted ? (
                            <span className="text-amber-400 bg-amber-950/50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                              <span>{row.shippingDate}</span>
                              <span className="text-[10px] text-amber-500 font-sans">(-4d)</span>
                            </span>
                          ) : (
                            <span className="text-slate-300">{row.shippingDate}</span>
                          )}
                        </td>

                        {/* Total Amount */}
                        <td className="py-2.5 px-3 whitespace-nowrap tabular-nums text-right font-semibold">
                          {isZeroDollarGlitch ? (
                            <span className="text-rose-400 bg-rose-950/50 px-1 py-0.5 rounded">
                              $0.00 !
                            </span>
                          ) : (
                            <span className="text-slate-200">${row.totalAmount.toFixed(2)}</span>
                          )}
                        </td>

                        {/* Country Code */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {isGeoCorrupted ? (
                            <span className="text-sky-400 bg-sky-950/50 px-1 py-0.5 rounded text-[11px]">
                              {displayCountry} (#N/A)
                            </span>
                          ) : (
                            <span className="text-slate-300">{displayCountry}</span>
                          )}
                        </td>

                        {/* Remediation Status */}
                        <td className="py-2.5 px-3 whitespace-nowrap text-center font-sans">
                          {row.isAnomaly ? (
                            viewMode === 'raw' ? (
                              <span className="text-[11px] text-rose-400 font-medium">Anomaly</span>
                            ) : (
                              <span className="text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>{row.remediationAction?.split(' ')[0]}</span>
                              </span>
                            )
                          ) : (
                            <span className="text-[11px] text-slate-500">Valid</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer info */}
            <div className="py-2.5 px-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono tabular-nums">
                Showing {filteredData.length} sample transactions from 12,450 audit set
              </span>
              <span className="text-[11px] text-slate-500">
                Click any row to open the Analytical Diagnostic Drawer
              </span>
            </div>
          </div>

          {/* Diagnostic Inspector Drawer / Card (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl sticky top-20">
            {selectedRecord ? (
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                      Analytical Audit Card
                    </span>
                    <h3 className="text-base font-bold text-slate-100 font-mono">
                      {selectedRecord.orderId}
                    </h3>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    selectedRecord.isAnomaly
                      ? 'bg-amber-950/60 border border-amber-800/80 text-amber-300'
                      : 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-300'
                  }`}>
                    {selectedRecord.isAnomaly ? selectedRecord.anomalyType : 'Clean & Verified'}
                  </span>
                </div>

                {/* Key Row Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="text-[11px] text-slate-500 font-sans block">Customer</span>
                    <span className="text-slate-200">{selectedRecord.userId}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-sans block">Order Total</span>
                    <span className="text-slate-200 font-bold">${selectedRecord.totalAmount.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-sans block">Channel</span>
                    <span className="text-slate-200 font-sans">{selectedRecord.channel}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-sans block">Region / Geo</span>
                    <span className="text-slate-200 font-sans">{selectedRecord.region} ({selectedRecord.cleanCountryCode})</span>
                  </div>
                </div>

                {/* Date Integrity timeline */}
                <div className="mb-4 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-2 font-sans">
                    Date Sequence Check
                  </span>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Purchase</span>
                      <span className="text-slate-200">{selectedRecord.purchaseDate}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">Shipped</span>
                      <span className={selectedRecord.anomalyType === 'Time-Travel' ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                        {selectedRecord.shippingDate}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">Delivered</span>
                      <span className="text-slate-200">{selectedRecord.deliveryDate}</span>
                    </div>
                  </div>
                </div>

                {/* Audit Explanation */}
                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-semibold text-slate-300 block mb-1">
                      Business Rule Evaluation:
                    </span>
                    <p className="text-slate-400 bg-slate-950/50 p-2.5 rounded border border-slate-800">
                      {selectedRecord.isAnomaly 
                        ? selectedRecord.anomalyExplanation 
                        : 'Passed all commercial integrity constraints: non-zero settlement, valid temporal transit duration, distinct customer key, and ISO geo-resolution.'}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-indigo-300 block mb-1">
                      Commercial Impact ("The So What?"):
                    </span>
                    <p className="text-slate-300">
                      {selectedRecord.businessImpact}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-emerald-300 block mb-1">
                      Remediation Strategy:
                    </span>
                    <p className="text-slate-400">
                      {selectedRecord.remediationAction === 'Flagged (Retain Revenue)' && (
                        'Engineered Is_Valid_Logistics = FALSE column in Excel. Row is retained in financial models ($499.99 gross sales preserved) but excluded from fulfillment SLA dashboards.'
                      )}
                      {selectedRecord.remediationAction === 'Resolved & Re-indexed' && (
                        'Appended transaction sub-indices (e.g. -A and -B). Relinked customer account history in SQL/Power Query and submitted reproducible bug ticket to Web Engineering.'
                      )}
                      {selectedRecord.remediationAction === 'Investigated & Standardized' && (
                        'Reconciled against secondary dimensions and ISO 3166-1 alpha-3 mapping table, replacing ambiguous raw inputs.'
                      )}
                      {selectedRecord.remediationAction === 'Validated' && (
                        'Pre-cleared for direct ingestion into downstream Power BI and Tableau operational cubes.'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Select a row from the data table to inspect its audit details.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
