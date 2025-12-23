# ICJ Sandbox UI Mock

A proof-of-concept case management dashboard for the International Court of Justice (ICJ), implementing the Crystal Ball/Casedoc visual system.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - automatically redirects to `/icj/cases/gg-2024-001`

## Keyboard Shortcuts

- **⌘K / Ctrl+K** - Open command palette
- **↑ / ↓** - Navigate commands
- **Enter** - Execute selected command
- **Esc** - Close command palette

## What's Mocked

### Data & API Routes
- **2 complete case records** with full metadata, documents, parties, deadlines
- **25+ contacts** with version history (representing 193 UN member states)
- **Distributions** with delivery tracking and auto-exclusions
- **API routes** under `/api/icj/*`:
  - `GET /api/icj/cases/[id]` - Full case dashboard JSON
  - `POST /api/icj/letters/generate` - Draft letter generation
  - `POST /api/icj/distributions/create` - Distribution creation
  - `POST /api/icj/ai/summarise` - AI summary with citations

### UI Features
- **Command palette** with 9 context-aware actions
- **Generate Letter modal** with letter type selection, EN/FR toggle, merge fields preview
- **New Distribution modal** with recipient scope, auto-exclusions, file size warnings
- **File Document modal** with bilingual support, translation status, annex count
- **Activity feed** updates in real-time when actions are executed
- **Key Documents** toggle with instant UI updates
- **Incidental Proceedings tabs** (disabled when no data, active for Cameroon v Nigeria case)

### Mock Behaviors
- All modal actions append to Recent Activity feed
- Toast notifications on action completion
- Delivery tracking shows Delivered/Pending/Failed counts
- File size warning when attachments exceed 10MB (mocked)
- Auto-exclusion of Applicant and Respondent from distributions
- "Translation expected" status for bilingual documents
- OCR status and "single PDF" warnings for annex-heavy documents

## Design System (Crystal Ball Look)

### Colors & Typography
- **Canvas**: `zinc-50` / `slate-50`
- **Cards**: White with subtle border and soft shadow, `rounded-lg`
- **Primary accent**: `#1764a1` (links, focus rings, primary buttons)
- **Font**: Inter (loaded via `next/font/google`)
- **Typography scale**:
  - H1: `text-3xl font-bold tracking-tight`
  - Card titles: `text-base font-semibold`
  - Labels: `text-xs uppercase text-muted-foreground tracking-wide`

### Spacing Rhythm
- Outer section gap: `gap-6`
- Card padding: `p-6` (or `p-4` for dense lists)
- Consistent use of Tailwind spacing scale

### Components
- Built with shadcn/ui and Radix UI primitives
- Button, Card, Dialog, Tabs, Badge, Select, Switch, Toast
- Custom AppShell with dark navy/blue gradient header
- Breadcrumbs: subtle, small text above page title

## Case Dashboard Sections → ICJ Workflow Pain Points

### 1. Initiation Checklist (Day 1 Steps)
**Pain Points Addressed:**
- ✓ Single place to see what has been done
- ✓ Track: filing registration, acknowledgements, circular notifications, UN SG notification, distribution cover pages, press release, time-limits order
- ✓ Bilingual handling: "distribute now then follow up when translation arrives"

**Implementation:**
- Progress meter showing 8/10 complete
- Each checklist item with completion status
- "Time-limits fixed by Order" shown as pending

### 2. Documents Tab System
**Pain Points Addressed:**
- ✓ Key Documents filter
- ✓ Translation status badges (Translation / Received / Pending / Awaited)
- ✓ Language badges (EN/FR)
- ✓ Annex navigation: Memorial with 250 annexes
- ✓ OCR status flag (Complete / Partial / Not run)
- ✓ Single PDF warning

**Implementation:**
- Tabs: Key Documents / All Documents / Correspondence / Pleadings
- Star icon to toggle Key status
- Gabon v Equatorial Guinea: Memorial with 250 annexes, OCR: Partial, ⚠ Single PDF
- Translation status color-coded badges

### 3. Distribution & Letter Generation
**Pain Points Addressed:**
- ✓ 193+ states distribution (mock as ~25 sample + "+168 more")
- ✓ Manual contacts with delivery tracking
- ✓ Exclude case parties from circular distribution
- ✓ Email size warnings
- ✓ Multiple letters with variants and merge fields
- ✓ Bilingual cover pages EN/FR

**Implementation:**
- **Generate Letter modal**: Type dropdown, EN/FR toggle, merge fields preview (agent, case title, deadline)
- **New Distribution modal**: Recipient scope selector, auto-exclusions locked (Applicant/Respondent), attachments picker, file size warning when > 10MB
- **Latest Distribution Status card**: Delivered/Pending/Failed counts, exclusions list, "+168 more (mock)"

### 4. Incidental Proceedings Tabs
**Pain Points Addressed:**
- ✓ Tabs only activate when relevant data exists

**Implementation:**
- 4 tabs: Provisional Measures / Prelim. Objections / Interventions / Counter-claims
- Gabon v Equatorial Guinea: all tabs disabled, empty state message
- Cameroon v Nigeria: Intervention tab enabled, shows status/filed date/documents

### 5. Related PV Decisions
**Pain Points Addressed:**
- ✓ Judges/clerks visibility
- ✓ Permissions note

**Implementation:**
- Card lists PV decisions with dates and ref numbers
- "Access managed by permissions" note with alert icon

### 6. Recent Activity Feed
**Pain Points Addressed:**
- ✓ Single place to see what has been done
- ✓ Audit trail of actions

**Implementation:**
- Real-time updates when command palette or modal actions are executed
- Shows: document filings, distributions, letter generation, AI summaries
- Newest first, with timestamps

## Project Structure

```
icj-poc/
├── app/
│   ├── api/icj/             # Mock API routes
│   │   ├── cases/[id]/
│   │   ├── letters/generate/
│   │   ├── distributions/create/
│   │   └── ai/summarise/
│   ├── icj/
│   │   ├── cases/[caseId]/  # Main case dashboard
│   │   ├── calendar/        # Placeholder pages
│   │   ├── distributions/
│   │   ├── reports/
│   │   └── admin/
│   ├── layout.tsx           # Root layout with Inter font
│   ├── globals.css          # Tailwind + design tokens
│   └── page.tsx             # Root redirect
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx     # Top bar + nav + container
│   │   └── Page.tsx         # Title + breadcrumbs
│   ├── modals/
│   │   ├── LetterModal.tsx
│   │   ├── DistributionModal.tsx
│   │   └── DocumentModal.tsx
│   ├── ui/                  # shadcn/ui components
│   └── CommandPalette.tsx   # ⌘K command palette
├── lib/
│   ├── types.ts             # TypeScript types
│   ├── icj-mock.ts          # Mock data (cases, contacts)
│   └── utils.ts             # Helpers (cn, formatDate, etc.)
└── README.md                # This file
```

## Acceptance Tests

✓ Visiting `/` lands on `/icj/cases/gg-2024-001`
✓ Case dashboard is polished and "Crystal Ball-like" (Inter font, cards, spacing rhythm)
✓ ⌘K opens command palette; selecting an action writes to activity feed
✓ "New Distribution" auto-excludes parties and shows delivery tracking + counts
✓ "Generate Letter" produces a draft with merge fields and language toggle
✓ Key Documents tab works and shows translation statuses
✓ Incidental proceedings tabs are disabled on Gabon case and enabled on Cameroon case (Intervention)
✓ Annex-heavy document (Memorial of Gabon) shows OCR status and single-PDF warning

## Technology Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Radix UI primitives)
- **Lucide React** (icons)
- **Inter font** (Google Fonts)

## Notes

- All data is mocked locally in `lib/icj-mock.ts`
- No external API calls or real integrations
- Command palette and modals use client-side state
- Activity feed updates are session-only (no persistence)
- "+168 more" appears in distribution recipients to represent full 193 UN member states

---

**Built for ICJ Registry Department workflow demonstration**
