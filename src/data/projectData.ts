export interface TransactionRecord {
  orderId: string;
  userId: string;
  product: string;
  category: 'Consoles' | 'Accessories' | 'Games' | 'VR';
  channel: 'Website' | 'Physical Store';
  purchaseDate: string;
  shippingDate: string;
  deliveryDate: string;
  price: number;
  quantity: number;
  totalAmount: number;
  promoCode: string | null;
  rawCountryCode: string;
  cleanCountryCode: string;
  region: string;
  // Raw vs Clean attributes
  isAnomaly: boolean;
  anomalyType?: 'Time-Travel' | 'Concurrency-Bug' | 'Zero-Dollar' | 'Geo-Mismatch' | 'None';
  anomalyExplanation?: string;
  remediationAction?: 'Flagged (Retain Revenue)' | 'Resolved & Re-indexed' | 'Investigated & Standardized' | 'Validated';
  businessImpact?: string;
}

export interface IssueLogItem {
  id: string;
  category: 'Logistics Logic' | 'Identity Logic' | 'Financial Integrity' | 'Geographic Data';
  anomalyName: string;
  frequency: string;
  percentage: string;
  rootCause: string;
  commercialImpact: string;
  actionTaken: 'Flagged' | 'Fixed' | 'Escalated';
  remediationDetails: string;
  seniorAnalystNote: string;
}

export interface BoardQuestionInsight {
  questionNumber: number;
  title: string;
  executiveQuestion: string;
  executiveAnswer: string;
  keyMetric: string;
  metricLabel: string;
  breakdown: { label: string; value: number; unit: string; secondary?: string }[];
  strategicRecommendation: string;
}

export const AUDIT_METRICS = {
  totalRecords: 12450,
  cleanGoldenRecords: 12450,
  timeTravelFlagged: 1139, // 9.15%
  timeTravelPercentage: '9.15%',
  concurrencyBugs: 87, // ~0.7%
  concurrencyPercentage: '0.70%',
  zeroDollarTransactions: 42,
  geoMismatchCount: 312,
  totalAuditedRevenue: '$4,285,410',
  flaggedRevenuePreserved: '$382,400',
  averageDeliveryDaysClean: '3.8 Days',
  averageDeliveryDaysCorrupted: '1.4 Days (Skewed by negative values)',
};

export const SAMPLE_TRANSACTIONS: TransactionRecord[] = [
  {
    orderId: 'GZ-8492',
    userId: 'USR-3042',
    product: 'PlayStation 5 Console',
    category: 'Consoles',
    channel: 'Website',
    purchaseDate: '2026-08-14',
    shippingDate: '2026-08-10', // Before purchase!
    deliveryDate: '2026-08-11', // Delivery preceding order
    price: 499.99,
    quantity: 1,
    totalAmount: 499.99,
    promoCode: null,
    rawCountryCode: 'USA',
    cleanCountryCode: 'USA',
    region: 'North America',
    isAnomaly: true,
    anomalyType: 'Time-Travel',
    anomalyExplanation: 'Shipping date (Aug 10) and Delivery date (Aug 11) recorded 3 days prior to Purchase date (Aug 14). Resulted in negative transit lead time (-3.0 days).',
    remediationAction: 'Flagged (Retain Revenue)',
    businessImpact: 'Erases logistics SLA reliability. Deleting row would artificially erase $499.99 revenue. Flagged with Is_Valid_Logistics=FALSE to isolate operational KPI reporting.',
  },
  {
    orderId: 'GZ-1049',
    userId: 'USR-4920',
    product: 'Nintendo Switch OLED',
    category: 'Consoles',
    channel: 'Website',
    purchaseDate: '2026-07-22',
    shippingDate: '2026-07-23',
    deliveryDate: '2026-07-26',
    price: 349.99,
    quantity: 1,
    totalAmount: 349.99,
    promoCode: null,
    rawCountryCode: 'UK',
    cleanCountryCode: 'GBR',
    region: 'Europe',
    isAnomaly: true,
    anomalyType: 'Concurrency-Bug',
    anomalyExplanation: 'Identical Order_ID (GZ-1049) assigned simultaneously to USR-4920 and USR-8813 during peak midnight flash sale checkout.',
    remediationAction: 'Resolved & Re-indexed',
    businessImpact: 'Distorts Customer Lifetime Value (CLV), churn tracking, and returns authorization. Diagnosed 100% correlation with Website + Switch flash sale. Re-indexed as GZ-1049-A & GZ-1049-B.',
  },
  {
    orderId: 'GZ-1049', // Duplicate Order ID instance
    userId: 'USR-8813',
    product: 'Nintendo Switch OLED',
    category: 'Consoles',
    channel: 'Website',
    purchaseDate: '2026-07-22',
    shippingDate: '2026-07-23',
    deliveryDate: '2026-07-27',
    price: 349.99,
    quantity: 1,
    totalAmount: 349.99,
    promoCode: null,
    rawCountryCode: 'GBR',
    cleanCountryCode: 'GBR',
    region: 'Europe',
    isAnomaly: true,
    anomalyType: 'Concurrency-Bug',
    anomalyExplanation: 'Concurrency collision duplicate with USR-4920. Both users transacted within 120ms of each other on web gateway.',
    remediationAction: 'Resolved & Re-indexed',
    businessImpact: 'Technical race condition in backend web transaction sequence lock. Documented for Web Engineering sprint ticket #ENG-4912.',
  },
  {
    orderId: 'GZ-3921',
    userId: 'USR-7104',
    product: 'DualSense Wireless Controller',
    category: 'Accessories',
    channel: 'Website',
    purchaseDate: '2026-09-02',
    shippingDate: '2026-09-03',
    deliveryDate: '2026-09-06',
    price: 74.99,
    quantity: 1,
    totalAmount: 0.00, // Glitch $0
    promoCode: null, // No promo!
    rawCountryCode: 'US-CA',
    cleanCountryCode: 'USA',
    region: 'North America',
    isAnomaly: true,
    anomalyType: 'Zero-Dollar',
    anomalyExplanation: 'Transaction recorded at $0.00 total despite item price of $74.99 and zero recorded promotional campaign code.',
    remediationAction: 'Investigated & Standardized',
    businessImpact: 'Financial reporting leakage. Identified checkout webhook failure where payment token timed out but order confirmation dispatched.',
  },
  {
    orderId: 'GZ-5520',
    userId: 'USR-1923',
    product: 'Xbox Series X',
    category: 'Consoles',
    channel: 'Physical Store',
    purchaseDate: '2026-08-19',
    shippingDate: '2026-08-19',
    deliveryDate: '2026-08-19',
    price: 499.99,
    quantity: 1,
    totalAmount: 499.99,
    promoCode: null,
    rawCountryCode: 'DEU-BER',
    cleanCountryCode: 'DEU',
    region: 'Europe',
    isAnomaly: true,
    anomalyType: 'Geo-Mismatch',
    anomalyExplanation: 'Non-standard localized store code DEU-BER mapped to non-matching regional lookup table.',
    remediationAction: 'Investigated & Standardized',
    businessImpact: 'Caused #N/A in VLOOKUP geo-reports. Normalized to standard ISO-3 DEU for Europe regional budget allocations.',
  },
  {
    orderId: 'GZ-6190',
    userId: 'USR-5120',
    product: 'Meta Quest 3 VR Headset',
    category: 'VR',
    channel: 'Physical Store',
    purchaseDate: '2026-09-12',
    shippingDate: '2026-09-12',
    deliveryDate: '2026-09-12',
    price: 499.99,
    quantity: 1,
    totalAmount: 499.99,
    promoCode: null,
    rawCountryCode: 'JPN',
    cleanCountryCode: 'JPN',
    region: 'APAC',
    isAnomaly: false,
    anomalyType: 'None',
    remediationAction: 'Validated',
    businessImpact: 'Clean in-store point of sale transaction. Verified against Regional Store Ledger #JP-881.',
  },
  {
    orderId: 'GZ-7301',
    userId: 'USR-9021',
    product: 'Nintendo Switch OLED',
    category: 'Consoles',
    channel: 'Physical Store',
    purchaseDate: '2026-08-05',
    shippingDate: '2026-08-05',
    deliveryDate: '2026-08-05',
    price: 349.99,
    quantity: 1,
    totalAmount: 349.99,
    promoCode: null,
    rawCountryCode: 'USA',
    cleanCountryCode: 'USA',
    region: 'North America',
    isAnomaly: false,
    anomalyType: 'None',
    remediationAction: 'Validated',
    businessImpact: 'Clean physical store retail receipt. No race condition detected in store POS terminals.',
  },
  {
    orderId: 'GZ-9144',
    userId: 'USR-6192',
    product: 'Cyberpunk 2077: Phantom Liberty',
    category: 'Games',
    channel: 'Website',
    purchaseDate: '2026-09-18',
    shippingDate: '2026-09-19',
    deliveryDate: '2026-09-21',
    price: 39.99,
    quantity: 2,
    totalAmount: 79.98,
    promoCode: 'GAMEFALL10',
    rawCountryCode: 'AUS',
    cleanCountryCode: 'AUS',
    region: 'APAC',
    isAnomaly: false,
    anomalyType: 'None',
    remediationAction: 'Validated',
    businessImpact: 'Valid discounted transaction with compliant promotional coupon and regular 2.0-day dispatch window.',
  },
  {
    orderId: 'GZ-9821',
    userId: 'USR-2241',
    product: 'SteelSeries Arctis Nova Headset',
    category: 'Accessories',
    channel: 'Website',
    purchaseDate: '2026-09-25',
    shippingDate: '2026-09-21', // Time travel
    deliveryDate: '2026-09-23',
    price: 179.99,
    quantity: 1,
    totalAmount: 179.99,
    promoCode: null,
    rawCountryCode: 'CAN',
    cleanCountryCode: 'CAN',
    region: 'North America',
    isAnomaly: true,
    anomalyType: 'Time-Travel',
    anomalyExplanation: 'Shipping date occurs 4 days prior to customer order placement. Warehouse scanning station time synchronization skew.',
    remediationAction: 'Flagged (Retain Revenue)',
    businessImpact: 'Identified systematic clock drift on Seattle distribution hub barcode scanners. Kept for revenue, isolated for delivery KPI.',
  },
  {
    orderId: 'GZ-4410',
    userId: 'USR-7732',
    product: 'Pro Racing Wheel & Pedals',
    category: 'Accessories',
    channel: 'Website',
    purchaseDate: '2026-07-15',
    shippingDate: '2026-07-16',
    deliveryDate: '2026-07-19',
    price: 299.99,
    quantity: 1,
    totalAmount: 299.99,
    promoCode: null,
    rawCountryCode: 'FRA',
    cleanCountryCode: 'FRA',
    region: 'Europe',
    isAnomaly: false,
    anomalyType: 'None',
    remediationAction: 'Validated',
    businessImpact: 'Clean cross-border shipment via Paris logistics hub with verified 3.0-day transit.',
  }
];

export const ISSUE_LOG_DATA: IssueLogItem[] = [
  {
    id: 'ISSUE-01',
    category: 'Logistics Logic',
    anomalyName: 'The "Time Travel" Operational Glitch',
    frequency: '1,139 records',
    percentage: '9.15%',
    rootCause: 'Warehouse barcode guns recorded UTC timestamp while order database stored local PDT time; plus retroactive batch-scan uploads upon truck dispatch.',
    commercialImpact: 'Distorts Supply Chain Board KPI: naive analysis calculated average delivery as 1.4 days. Real delivery was 3.8 days. Deleting would drop $382.4K valid revenue.',
    actionTaken: 'Flagged',
    remediationDetails: 'Created helper column Is_Valid_Logistics = FALSE. Preserved rows in Golden Dataset for Finance/Sales team, while filtering out of SLA calculations.',
    seniorAnalystNote: 'Never delete valid sales transactions to fix an operational timestamp bug. Consulted Operations and provided dual views: Financial Golden Set vs Logistics KPI Set.',
  },
  {
    id: 'ISSUE-02',
    category: 'Identity Logic',
    anomalyName: 'The "Nintendo Switch" Concurrency Race Condition',
    frequency: '87 instances',
    percentage: '0.70%',
    rootCause: '100% correlation with Website purchases of Nintendo Switch during 12:00 AM promotional drop. Web server lacked row-level transaction locks during simultaneous clicks.',
    commercialImpact: 'Different User_IDs assigned identical Order_IDs. Breaks Customer Lifetime Value (CLV), purchase frequency, customer support lookups, and fraud detection.',
    actionTaken: 'Escalated',
    remediationDetails: 'Appended unique sub-index suffixes (e.g., GZ-1049-A, GZ-1049-B) in Golden Dataset. Escalated formal bug ticket with reproducible data proof to Web Engineering.',
    seniorAnalystNote: 'By filtering Product x Channel x Timestamp, proved this was an architectural race condition rather than random data entry error.',
  },
  {
    id: 'ISSUE-03',
    category: 'Financial Integrity',
    anomalyName: 'Unbacked $0.00 Transaction Records',
    frequency: '42 records',
    percentage: '0.34%',
    rootCause: 'Payment gateway callback timeout: user credit card was declined or abandoned at 3D-Secure step, but web store erroneously logged a $0 completion.',
    commercialImpact: 'Artificially inflated unit sales while deflating Average Order Value (AOV). Could lead to uncollected inventory being shipped without payment confirmation.',
    actionTaken: 'Fixed',
    remediationDetails: 'Cross-referenced against merchant bank settlement records. Confirmed unfulfilled abandoned carts; tagged as Voided_Transaction and reconciled inventory.',
    seniorAnalystNote: 'Cross-audited against promotional campaign database to verify no legit 100% voucher existed for these specific order numbers.',
  },
  {
    id: 'ISSUE-04',
    category: 'Geographic Data',
    anomalyName: 'Inconsistent Country & Regional Store Codes',
    frequency: '312 records',
    percentage: '2.51%',
    rootCause: 'Mixed alphanumeric formats (UK vs GBR, US-CA vs USA, Deutschland vs DEU) originating from legacy POS store terminals vs new Shopify frontend.',
    commercialImpact: 'Caused #N/A lookup errors in Excel pivot tables and broke geographic aggregation for executive marketing budget distribution.',
    actionTaken: 'Fixed',
    remediationDetails: 'Engineered lookup normalization table using ISO 3166-1 alpha-3 standards and nested XLOOKUP/INDEX-MATCH formulas with fallback error handling.',
    seniorAnalystNote: 'Created a centralized Master Geography Dimension table to serve as a single source of truth for all downstream reporting.',
  }
];

export const BOARD_INSIGHTS: BoardQuestionInsight[] = [
  {
    questionNumber: 1,
    title: 'Product Portfolio Analysis',
    executiveQuestion: 'Which products are driving the highest revenue vs. volume across our global channels?',
    executiveAnswer: 'Hardware consoles generate 68% of total revenue despite representing only 28% of unit volume. Conversely, gaming accessories and software drive 72% of order volume with high recurring margins.',
    keyMetric: '$2.91M',
    metricLabel: 'Console Revenue (68% of Total)',
    breakdown: [
      { label: 'PlayStation 5', value: 1420000, unit: 'USD', secondary: '2,840 Units' },
      { label: 'Nintendo Switch OLED', value: 1120000, unit: 'USD', secondary: '3,200 Units' },
      { label: 'Xbox Series X', value: 370000, unit: 'USD', secondary: '740 Units' },
      { label: 'Controllers & Audio', value: 890000, unit: 'USD', secondary: '11,870 Units' },
      { label: 'VR & Peripherals', value: 485410, unit: 'USD', secondary: '1,620 Units' },
    ],
    strategicRecommendation: 'Bundle high-volume, high-margin accessories (controllers/headsets) with console purchases to increase AOV by an estimated 14% while securing hardware attach rates.',
  },
  {
    questionNumber: 2,
    title: 'Logistics & Supply Chain Performance',
    executiveQuestion: 'How efficient is our delivery system across different regions, and what is our true delivery SLA?',
    executiveAnswer: 'After isolating the 9.15% "time-travel" timestamp noise, the true global average order-to-delivery lead time is 3.8 days (previously masked as 1.4 days by negative dates). North America leads at 2.9 days, while APAC faces a 5.2-day transit bottleneck.',
    keyMetric: '3.8 Days',
    metricLabel: 'Audited Global Delivery Lead Time',
    breakdown: [
      { label: 'North America', value: 2.9, unit: 'Days Avg', secondary: '98.2% on-time' },
      { label: 'Europe (West & Central)', value: 3.4, unit: 'Days Avg', secondary: '95.1% on-time' },
      { label: 'APAC (East & Southeast)', value: 5.2, unit: 'Days Avg', secondary: '87.4% on-time' },
      { label: 'Latin America', value: 4.8, unit: 'Days Avg', secondary: '89.0% on-time' },
    ],
    strategicRecommendation: 'Partner with regional third-party logistics (3PL) hubs in Tokyo/Singapore to bring APAC transit under 3.5 days, eliminating customer churn in our fastest-growing region.',
  },
  {
    questionNumber: 3,
    title: 'Geographical Growth & Market Penetration',
    executiveQuestion: 'Which regions are generating the most sales, and where is market penetration expanding fastest?',
    executiveAnswer: 'North America remains GameZone\'s primary revenue engine ($1.89M, 44%), followed by Europe ($1.33M, 31%). However, APAC represents the highest expansion opportunity with +27% quarter-over-quarter revenue growth.',
    keyMetric: '+27% MoM',
    metricLabel: 'APAC Revenue Velocity',
    breakdown: [
      { label: 'North America', value: 1885000, unit: 'USD', secondary: '44% Share' },
      { label: 'Europe', value: 1328000, unit: 'USD', secondary: '31% Share' },
      { label: 'APAC', value: 771410, unit: 'USD', secondary: '18% Share (+27% Growth)' },
      { label: 'Latin America', value: 301000, unit: 'USD', secondary: '7% Share' },
    ],
    strategicRecommendation: 'Reallocate 20% of North American promotional spend into APAC digital marketing channels, capitalizing on the rising mobile/hybrid console boom.',
  }
];

export const RESUME_BULLET_POINTS = [
  {
    role: 'BI Analyst / Analytics Engineer Focus',
    bullets: [
      'Audited and cleansed enterprise e-commerce dataset of 12,450+ multi-channel transactions in MS Excel, resolving 1,580+ integrity anomalies across logistics, financial, and relational dimensions.',
      'Diagnosed root cause for 9.15% operational "time-travel" delivery glitch; prevented $382K+ revenue misstatement by engineering dual financial/logistics validation logic instead of naive data deletion.',
      'Uncovered 100% correlated web concurrency race condition during flash sale checkouts; synthesized telemetry evidence and partnered with Web Engineering to remediate checkout session locks.',
      'Produced executive "Golden Dataset" and automated issue log enabling C-suite quarterly review to accurately evaluate global delivery SLAs (3.8-day baseline) and $4.2M product portfolio performance.'
    ]
  },
  {
    role: 'Data Quality & Governance Specialist Focus',
    bullets: [
      'Designed end-to-end Data Quality Framework: defined commercial business logic rules enforcing shipping constraints, user uniqueness constraints, and ISO 3166-1 geographic standardization.',
      'Authored comprehensive Data Remediation & Analyst Handoff Note, documenting data lineage, error distribution heatmaps, and downstream Power BI/Tableau ingestion protocols.',
      'Reconciled $0 unbacked transaction leakage with merchant payment gateways, identifying checkout drop-off webhooks and securing financial reporting audit readiness.'
    ]
  }
];

export const SKILLS_MATRIX = {
  hardSkills: [
    { name: 'Root Cause Analysis (RCA)', description: 'Isolating systemic technical faults from random noise via multi-variable correlation tests.' },
    { name: 'Data Quality Assurance (QA)', description: 'Designing assertion rules for business impossibilities rather than just null-checking.' },
    { name: 'E-Commerce & Supply Chain Analytics', description: 'Order-to-delivery SLA calculations, fulfillment lead times, and retail channel dynamics.' },
    { name: 'Advanced MS Excel & Data Modeling', description: 'Complex nested formulas (XLOOKUP, INDEX-MATCH, SUMIFS), Power Query transformation, and relational logic.' },
    { name: 'ETL Pipeline Architecture', description: 'Structured 4-stage pipeline: Ingestion -> Audit & Issue Log -> Remediation -> Golden Dataset handoff.' },
    { name: 'Data Governance & Lineage', description: 'Audit trails, version-controlled issue logs, and non-destructive data handling protocols.' },
  ],
  softSkills: [
    { name: 'Analytical Skepticism', description: 'Questioning implausible data (e.g. 1.4-day global delivery) rather than accepting surface-level dashboard metrics.' },
    { name: 'Business Acumen ("The So What")', description: 'Connecting data flaws to real commercial risks (CLV distortion, revenue under-reporting, inventory leakage).' },
    { name: 'Ambiguity Management', description: 'Making reasoned trade-offs (retaining revenue vs discarding corrupted transit dates) with clear documentation.' },
    { name: 'Stakeholder Communication', description: 'Translating complex database concurrency race conditions into executive decision-ready insights.' },
  ]
};

export const ANALYST_HANDOFF_NOTE = `================================================================================
GAMEZONE GLOBAL · BI ANALYST HANDOFF DOCUMENT
Target: Analytics Team, BI Developers (Power BI / Tableau), Engineering Leads
Dataset: Cleaned_data_gamezone.xlsx (Golden Dataset v2.4)
Author: Eyasin (BI Analyst)
================================================================================

1. EXECUTIVE OVERVIEW
The Golden Dataset contains 12,450 audited global sales transactions spanning Q3 2026.
All geographic dimensions have been standardized to ISO 3166-1 alpha-3 standards.
Zero-dollar checkout glitches have been reconciled against merchant payment gateway settlements.

2. CRITICAL CONSUMPTION DIRECTIVES

[DIRECTIVE A: LOGISTICS & TRANSIT SLA REPORTING]
- Column 'Is_Valid_Logistics' [BOOLEAN]:
  * Contains 1,139 rows (9.15% of dataset) marked as FALSE.
  * SOURCING: Warehouse barcode scanning guns in Seattle & Rotterdam experienced time-zone
    mismatches and delayed batch syncs, causing Delivery_Date to register prior to Purchase_Date.
  * ACTION REQUIRED: When computing Order-to-Delivery lead time, on-time delivery percentages,
    or carrier SLAs, FILTER EXCLUSIVELY ON 'Is_Valid_Logistics = TRUE'.
  * DO NOT DELETE THESE ROWS FROM MASTER REPORTING: These rows represent $382,400 in verified
    revenue. Deleting them will corrupt top-line financial and revenue attribution reporting.

[DIRECTIVE B: IDENTITY & RETENTION (CLV) REPORTING]
- Column 'Order_ID':
  * 87 order numbers experienced a web concurrency race condition during flash sale spikes.
  * Affected rows have been re-indexed with alphanumeric suffixes (e.g. GZ-1049-A, GZ-1049-B).
  * Use 'Clean_Order_ID' for transaction counting and 'User_ID' for customer retention analysis.
  * Ticket #ENG-4912 has been logged with Web Engineering to implement redis row-locks on cart checkouts.

3. DATA DICTIONARY HIGHLIGHTS
- Order_ID: Primary transaction key (re-indexed for concurrency splits)
- User_ID: Unique customer account identifier
- Clean_Country_Code: Standardized ISO-3 country abbreviation
- Region: Master geographical roll-up (North America, Europe, APAC, Latin America)
- Total_Amount: Normalized net commercial revenue (USD)
- Is_Valid_Logistics: Flag indicating timestamp temporal integrity

4. CONTACT & REPOSITORY
For inquiries regarding audit methodology or Excel logic formulas, contact:
Eyasin · BI Analyst · eyasin.113t@gmail.com
GitHub: Eyasin_terminal
================================================================================`;
